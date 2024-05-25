import { useCallback, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
   MarketTicker,
   usePublicMarket,
   usePublicMarketTicker,
} from '@/pages/Swap/hooks/usePublicMarkets';

const WS_URL = import.meta.env.VITE_API_WS_URL;
const RECONNECT_INTERVAL = 5000; // Interval time (in milliseconds) before attempting to reconnect
const MAX_RECONNECT_ATTEMPTS = 5; // Maximum number of reconnection attempts

const WebsocketService = () => {
   const location = useLocation();
   const marketPathname = location?.pathname
      .toLowerCase()
      .replace(/[^a-z/]/g, '')
      .split('/');
   const marketId = marketPathname[marketPathname.length - 1];

   const reconnectAttemptsRef = useRef(0);
   const wsRef = useRef<WebSocket | null>(null);
   const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

   const closeWebSocket = useCallback(() => {
      if (wsRef.current) {
         wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
         clearTimeout(reconnectTimeoutRef.current);
      }
   }, []);

   const handleWebSocketMessage = useCallback(
      async (message: unknown) => {
         try {
            const data = JSON.parse(message as string);

            if (Object.prototype.hasOwnProperty.call(data, `${marketId}.kline-1m`)) {
               const klineData = data[`${marketId}.kline-1m`];
               const kLine = { ...usePublicMarket.getState().k_line };

               const updates = [...kLine, klineData];
               usePublicMarket.getState().updateKLine(updates);
            } else if (Object.prototype.hasOwnProperty.call(data, 'global.tickers')) {
               const tickersData = data['global.tickers'];

               const newTicker: MarketTicker[] = Object.values(tickersData);
               usePublicMarketTicker.getState().updateAllMarketTickers(newTicker);

               if (tickersData[marketId]) {
                  const newMarketTicker = {
                     at: parseInt(tickersData[marketId].at, 10),
                     ticker: {
                        amount: parseFloat(tickersData[marketId].amount),
                        at: parseInt(tickersData[marketId].at, 10),
                        avg_price: parseFloat(tickersData[marketId].avg_price),
                        high: parseFloat(tickersData[marketId].high),
                        last: parseFloat(tickersData[marketId].last),
                        low: parseFloat(tickersData[marketId].low),
                        open: parseFloat(tickersData[marketId].open),
                        price_change_percent: tickersData[marketId].price_change_percent,
                        vol: parseFloat(tickersData[marketId].volume),
                        volume: parseFloat(tickersData[marketId].volume),
                        transactions: parseFloat(tickersData[marketId].transactions),
                     },
                  };
                  usePublicMarketTicker.getState().updateMarketTickerState(newMarketTicker);
               }
            } else if (Object.prototype.hasOwnProperty.call(data, `${marketId}.depth`)) {
               const depthData = data[`${marketId}.depth`];

               if (depthData && 'sequence' in depthData) {
                  const previousSequence = getSequenceFromLocalStorage();
                  const currentSequence = depthData.sequence;

                  saveSequenceToLocalStorage(currentSequence);

                  if (previousSequence === null) {
                     window.console.log('OrderBook increment received before snapshot');
                  } else if (previousSequence + 1 !== currentSequence) {
                     window.console.log(
                        `Bad sequence detected in incremental orderbook previous: ${previousSequence}, event: ${currentSequence}`,
                     );
                     closeWebSocket();
                     return;
                  } else {
                     // Jika previousSequence sama dengan currentSequence atau null, atau previousSequence + 1 sama dengan currentSequence

                     // Ambil data depth yang ada
                     const currentDepth = { ...usePublicMarket.getState().depth };

                     // Jika ada perubahan pada asks
                     if (depthData.asks.length > 0) {
                        currentDepth.asks = [...currentDepth.asks, ...depthData.asks];
                     }

                     // Jika ada perubahan pada bids
                     if (depthData.bids.length > 0) {
                        currentDepth.bids = [...currentDepth.bids, ...depthData.bids];
                     }

                     // Update keseluruhan depth pasar
                     usePublicMarket.getState().updateDepth(currentDepth);
                  }
               }
            }
         } catch (error) {
            console.error('Error parsing message:', error);
         }
      },
      [closeWebSocket, marketId],
   );

   const connectWebSocket = useCallback(() => {
      const baseUrl = `${WS_URL}/public`;

      const streams: string[] = ['global.tickers'];

      if (location.pathname.includes('/trade/')) {
         streams.push(`${marketId}.kline-1m`, `${marketId}.depth`, `${marketId}.trades`);
      }

      const ws = new WebSocket(generateSocketURI(baseUrl, streams));
      wsRef.current = ws;

      ws.onopen = () => {
         console.log('WebSocket connection established.');
         reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
      };

      ws.onmessage = event => {
         handleWebSocketMessage(event.data);
      };

      ws.onerror = error => {
         console.error('WebSocket error:', error);
      };

      ws.onclose = () => {
         console.log('WebSocket connection closed.');
         if (reconnectTimeoutRef.current) {
            clearTimeout(reconnectTimeoutRef.current);
         }
         if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
            reconnectTimeoutRef.current = setTimeout(() => {
               reconnectAttemptsRef.current += 1;
               connectWebSocket();
            }, RECONNECT_INTERVAL);
         } else {
            console.error('Max reconnect attempts reached. Will not reconnect.');
         }
      };
   }, [handleWebSocketMessage, location.pathname, marketId]);

   useEffect(() => {
      connectWebSocket();

      return () => {
         closeWebSocket();
      };
   }, [closeWebSocket, connectWebSocket]);

   useEffect(() => {
      const ws = wsRef.current;

      if (ws) {
         ws.onclose = event => {
            console.log('WebSocket connection closed:', event);
            if (reconnectTimeoutRef.current) {
               clearTimeout(reconnectTimeoutRef.current);
            }
            if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
               reconnectTimeoutRef.current = setTimeout(() => {
                  reconnectAttemptsRef.current += 1;
                  connectWebSocket();
               }, RECONNECT_INTERVAL);
            } else {
               console.error('Max reconnect attempts reached. Will not reconnect.');
            }
         };
      }

      return () => {
         if (ws) {
            ws.onclose = null;
         }
      };
   }, [closeWebSocket, connectWebSocket]);

   return null;
};

const generateSocketURI = (baseUrl: string, streams: string[]) =>
   `${baseUrl}?stream=${streams.sort().join('&stream=')}`;

const saveSequenceToLocalStorage = (sequence: number) => {
   localStorage.setItem('orderBookSequence', sequence.toString());
};

const getSequenceFromLocalStorage = () => {
   const sequence = localStorage.getItem('orderBookSequence');
   return sequence ? parseInt(sequence, 10) : null;
};
export default WebsocketService;
