/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";


import { Market } from "@/types/components";




export type MarketState = {
    market: Market[];
  modalVisible: boolean;

}

export type MarketActions = {
    setModalVisible: (visible: boolean) => void;
    updateMarketState: (market: MarketState['market']) => void;
}

export type MarketStore = MarketState & MarketActions

export const usePublicMarket = create<MarketState & MarketActions>((set) => ({
    market: [],
    modalVisible: false,
    updateMarketState: (market) => set(() => ({ market: market })),
    setModalVisible: (visible: boolean) => set(() => ({ modalVisible: visible }))
}))


// export type MarketTradeState = {
//     market_trade: 
// }