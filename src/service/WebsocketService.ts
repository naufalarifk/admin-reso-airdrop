/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWalletStore } from "@/components";
import { usePublicMarket } from "@/pages/Swap/hooks/usePublicMarkets";
import { getMarketKLine } from "@/api/services/public/markets";

const WS_URL = import.meta.env.VITE_API_WS_URL;

const WebsocketService = () => {
  const { connected } = useWalletStore();
  const location = useLocation();
  const marketPathname = location?.pathname?.toLowerCase().replace(/[^a-z/]/g, '')?.split('/');
  const marketId = marketPathname[marketPathname.length - 1];

  const handleWebSocketMessage = async (message: any) => {
    try {
      const data = JSON.parse(message);
      // console.log("Received data:", data);

      if (data.hasOwnProperty(`${marketId}.kline-3m`)) {
        const klineData = data[`${marketId}.kline-3m`];
        // console.log("Update K-Line data:", klineData);
        const kLine = await getMarketKLine(marketId, {});
        // console.log("kLine", kLine);
        
        const updates = [...kLine, klineData];
        usePublicMarket.getState().updateKLine(updates);
      } 
      
    //   else if (data.hasOwnProperty("global.tickers")) {
    //     const tickersData = data["global.tickers"];
    //     // usePublicMarketTicker.getState().updateAllMarketTickers(tickersData);
    //     console.log("Update Global Tickers data:", tickersData);
    //     // Handle global tickers update
    //   }
    } catch (error) {
      console.error("Error parsing message:", error);
    }
  }

  useEffect(() => {
    let ws: WebSocket;

    const connectWebSocket = () => {
      const baseUrl = `${WS_URL}/${connected ? 'private' : 'public'}`;
      let streams: string[] = ['global.tickers'];

      if (connected) {
        streams = [
          ...streams,
          'balances',
          'order',
          'trade',
          'deposit_address',
        ];
      }

      if (location.pathname.includes('/swap/')) {
        streams.push(`${marketId}.kline-3m`);
      }

      ws = new WebSocket(generateSocketURI(baseUrl, streams));

      ws.onopen = () => {
        console.log("WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        // console.log("Received message:", event.data);
        handleWebSocketMessage(event.data);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed.");
        // Reconnect WebSocket
        connectWebSocket();
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connected, location.pathname, marketId]);

  return null;
};

const generateSocketURI = (baseUrl: string, streams: string[]) =>
  `${baseUrl}?stream=${streams.sort().join('&stream=')}`;

export default WebsocketService;
