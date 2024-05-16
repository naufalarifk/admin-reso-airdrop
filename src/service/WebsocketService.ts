import { useEffect } from "react"; 
import { usePublicMarket } from "@/pages/Swap/hooks/usePublicMarkets";

const handleWebSocketMessage = (message: any) => {
  const kLineData = JSON.parse(message);
  usePublicMarket.getState().updateKLine(kLineData);
};

const WebsocketService = () => {
  useEffect(() => {
    const ws = new WebSocket('wss://beta.rectoverso.exchange/api/v2/websocket/public'); 

    ws.onopen = () => {
      console.log('WebSocket connection established.');
    };

    ws.onmessage = (event) => {
      handleWebSocketMessage(event.data);
    };

    ws.onerror = (error) => {
      if (error && error.message) {
        console.error('WebSocket error:', error.message); 
      } else {
        console.error('WebSocket error:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      ws.close();
    };
  }, []);

  return null; 
};

export default WebsocketService;
