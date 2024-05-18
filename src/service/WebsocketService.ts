/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
// import { usePublicMarket } from "@/pages/Swap/hooks/usePublicMarkets";
import { useWalletStore } from "@/components";

const handleWebSocketMessage = (data: any) => {
  // const kLineData = JSON.parse(message);
  // usePublicMarket.getState().updateKLine(kLineData);
  // usePublicMarket.getState().updateOrderBook(kLineData);
  console.log("data", data);
};

const WS_URL = import.meta.env.VITE_API_WS_URL;

const WebsocketService = () => {
  const { connected } = useWalletStore();

  // const generateSocketURI = (baseUrl: string, s: string[]) => `${baseUrl}?stream=${s.sort().join('&stream=')}`;

  useEffect(() => {
    // const baseUrl = `${WS_URL}/${connected ? 'private' : 'public'}`;
    // const streams: string[] = ['global.tickers'];

    // if (connected) {
    //     streams = [
    //         ...streams,
    //         'balances',
    //         'order',
    //         'trade',
    //         'deposit_address',
    //     ];
    // }

    // const ws = new WebSocket(generateSocketURI(baseUrl, streams));
    const baseUrl = `${WS_URL}/public?stream=global.tickers`;
    const ws = new WebSocket(baseUrl);

    ws.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.onmessage = (event) => {
      handleWebSocketMessage(event.data);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    return () => {
      ws.close();
    };
  }, [connected]);

  return null;
};

export default WebsocketService;
