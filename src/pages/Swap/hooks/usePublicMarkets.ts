/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";


import { Market, MarketTrade, OrderBook } from "@/types/components";


export type MarketState = {
    market: Market[];
    k_line: any;
    depth: any;
    order_book: OrderBook
}

export type MarketActions = {
    updateMarketState: (market: MarketState['market']) => void;
    updateKLine: (market: MarketState['k_line']) => void;
    updateDepth: (market: MarketState['depth']) => void;
    updateOrderBook: (market: MarketState['order_book']) => void;
}

export type MarketStore = MarketState & MarketActions

export const usePublicMarket = create<MarketState & MarketActions>((set) => ({
    market: [],
    k_line: null,
    depth: null,
    order_book: {
        asks: [],
        bids: [],
    },
    updateMarketState: (market) => set(() => ({ market: market })),
    updateKLine: (k_line) => set(() => ({ k_line: k_line })),
    updateDepth: (depth) => set(() => ({ depth: depth })),
    updateOrderBook: (order_book) => set(()=> ({order_book: order_book}))
}))


export type MarketTradeState = {
    market_trade: MarketTrade[]
}

export type MarketTradeActions = {
    updateMarketTradeState: (market_trade: MarketTradeState['market_trade']) => void;
}

export type MarketTradeStore = MarketTradeState & MarketTradeActions


export const usePublicMarketTrade = create<MarketTradeState & MarketTradeActions>((set) => ({
    market_trade: [],
    updateMarketTradeState: (market_trade) => set(() => ({ market_trade: market_trade }))
}))

export interface MarketTicker {
    at:     number;
    ticker: {
    low:                  number;
    high:                 number;
    open:                 number;
    last:                 number;
    volume:               number;
    amount:               number;
    vol:                  number;
    avg_price:            number;
    price_change_percent: string;
    at:                   number;
    }
}

export type MarketTickerState = {
all_market_ticker: MarketTicker[]
market_ticker: MarketTicker
}

export type MarketTickerActions = {
    updateMarketTickerState: (market_ticker: MarketTickerState['market_ticker']) => void
    updateAllMarketTickers: (market_ticker: MarketTickerState['all_market_ticker']) => void
}

export type MarketTickerStore = MarketTickerState & MarketTickerActions

export const usePublicMarketTicker = create<MarketTickerState & MarketTickerActions>((set) => ({
    market_ticker: {
        at: 0,
        ticker: {
            amount: 0,
            at: 1,
            avg_price: 0,
            high: 0,
            last: 0,
            low: 0,
            open: 0,
            price_change_percent: '',
            vol: 0,
            volume: 0
        }
    },
    all_market_ticker: [],
    updateMarketTickerState: (market_ticker) => set(() => ({ market_ticker: market_ticker })),
    updateAllMarketTickers: (all_market_ticker) => set(() => ({ all_market_ticker: all_market_ticker }))
}))
