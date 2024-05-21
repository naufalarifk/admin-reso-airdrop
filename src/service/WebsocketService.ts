/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { MarketTicker, usePublicMarket, usePublicMarketTicker } from "@/pages/Swap/hooks/usePublicMarkets";
import { getMarketKLine } from "@/api/services/public/markets";

const WS_URL = import.meta.env.VITE_API_WS_URL;

const RECONNECT_INTERVAL = 5000; // Interval waktu (dalam milidetik) sebelum mencoba kembali koneksi
const MAX_RECONNECT_ATTEMPTS = 5; // Maksimal jumlah percobaan koneksi ulang

const WebsocketService = () => {
  const location = useLocation();
  const marketPathname = location?.pathname?.toLowerCase().replace(/[^a-z/]/g, '')?.split('/');
  const marketId = marketPathname[marketPathname.length - 1];

  const reconnectAttemptsRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleWebSocketMessage = useCallback(async (message: any) => {
    try {
      const data = JSON.parse(message);
  
      if (Object.prototype.hasOwnProperty.call(data, `${marketId}.kline-3m`)) {
        const klineData = data[`${marketId}.kline-3m`];
        const kLine = await getMarketKLine(marketId, {});
  
        const updates = [...kLine, klineData];
        usePublicMarket.getState().updateKLine(updates);
      } 
      else if (Object.prototype.hasOwnProperty.call(data, "global.tickers")) {
        const tickersData = data["global.tickers"];
  
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
                  transactions:  parseFloat(tickersData[marketId].transactions)
              }
          };
          usePublicMarketTicker.getState().updateMarketTickerState(newMarketTicker);
        }
      } else if (Object.prototype.hasOwnProperty.call(data, `${marketId}.depth`)) {
        // const currentData = await getMarketDepth(marketId, {});
        console.log('RESPONSE WS DEPTH', data)
        
        usePublicMarket.getState().updateDepth(data);
      }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  }, [marketId]);

  const connectWebSocket = useCallback(() => {
    const baseUrl = `${WS_URL}/public`;

    const streams: string[] = ['global.tickers'];

    if (location.pathname.includes('/swap/')) {
      streams.push(`${marketId}.kline-3m`, `${marketId}.depth`, `${marketId}.trades`);
    }

    const ws = new WebSocket(generateSocketURI(baseUrl, streams));
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection established.");
      reconnectAttemptsRef.current = 0; // Reset reconnect attempts on successful connection
    };

    ws.onmessage = (event) => {
      handleWebSocketMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
        reconnectTimeoutRef.current = setTimeout(() => {
          reconnectAttemptsRef.current += 1;
          connectWebSocket();
        }, RECONNECT_INTERVAL);
      } else {
        console.error("Max reconnect attempts reached. Will not reconnect.");
      }
    };
  }, [handleWebSocketMessage, location.pathname, marketId]);

  useEffect(() => {
    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, [connectWebSocket]);

  return null;
};

const generateSocketURI = (baseUrl: string, streams: string[]) =>
  `${baseUrl}?stream=${streams.sort().join('&stream=')}`;

export default WebsocketService;



// const updateDepth = (currentDepth, newDepth) => {
//   const currentBestAsk = currentDepth.asks.length > 0 ? currentDepth.asks[0] : null;
//   const currentBestBid = currentDepth.bids.length > 0 ? currentDepth.bids[0] : null;
//   const newBestAsk = newDepth.asks.length > 0 ? newDepth.asks[0] : null;
//   const newBestBid = newDepth.bids.length > 0 ? newDepth.bids[0] : null;

//   let isUpdated = false;

//   // Compare best asks
//   if (currentBestAsk && newBestAsk) {
//       if (currentBestAsk[0] !== newBestAsk[0] || currentBestAsk[1] !== newBestAsk[1]) {
//           currentDepth.asks = newDepth.asks;
//           isUpdated = true;
//       }
//   } else if (newBestAsk) {
//       currentDepth.asks = newDepth.asks;
//       isUpdated = true;
//   }

//   // Compare best bids
//   if (currentBestBid && newBestBid) {
//       if (currentBestBid[0] !== newBestBid[0] || currentBestBid[1] !== newBestBid[1]) {
//           currentDepth.bids = newDepth.bids;
//           isUpdated = true;
//       }
//   } else if (newBestBid) {
//       currentDepth.bids = newDepth.bids;
//       isUpdated = true;
//   }

//   if (isUpdated) {
//       console.log("Depth data updated:", currentDepth);
//       return currentDepth;
//   } else {
//       console.log("Depth data not updated. No significant changes.");
//       return currentDepth;
//   }
// };
