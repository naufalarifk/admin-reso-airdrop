/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";


type PoolPayment = {
    txid:       string;
    amount:     string;
    state:      string;
    kind:       string;
    created_at: string;
}

export interface AddNewMarket {
    symbol:           string;
    name:             string;
    type:             string;
    base_unit:        string;
    quote_unit:       string;
    min_price:        number;
    max_price:        number;
    min_amount:       number;
    amount_precision: number;
    price_precision:  number;
    total_precision:  number;
    liquidity:        number;
    low_liquidity:    string;
    state:            string;
}

export interface PoolMarket {
    uid:                  string;
    currency_id:          string;
    pair_currency_id:     string;
    listing_amount:       string;
    pair_listing_amount:  string;
    markets:              Markets;
    state:                string;
    listing_fee:          string;
    txid:                 string;
    errored:              string;
    pool_market_payments: PoolMarketPayments;
    created_at:           string;
}

export interface Markets {
    symbol:           string;
    name:             string;
    type:             string;
    base_unit:        string;
    quote_unit:       string;
    min_price:        number;
    max_price:        number;
    min_amount:       number;
    amount_precision: number;
    price_precision:  number;
    total_precision:  number;
    liquidity:        number;
    low_liquidity:    string;
    state:            string;
}

export interface PoolMarketPayments {
    txid:       string;
    amount:     string;
    state:      string;
    kind:       string;
    created_at: string;
}




export type PoolState = {
    payment: PoolPayment
    add_new_market: AddNewMarket;
    pool_market: PoolMarket[];
    add_new_currency: any;
}

export type PoolActions = {
    updatePoolPaymentState: (payment: PoolState['payment']) => void
    updateAddNewMarketState: (add_new_market: PoolState['add_new_market']) => void
    updatePoolMarketState: (pool_market: PoolState['pool_market']) => void
    updateAddNewCurrency: (add_new_currency: PoolState['add_new_currency']) => void
}

export type PoolStore = PoolState & PoolActions;


export const usePools = create<PoolState & PoolActions>((set) => ({
    payment: {
        amount: '',
        created_at: '',
        kind: '',
        state: '',
        txid: '',
    },
    add_new_market: {
        symbol: '',
        name: '',
        base_unit: '',
        quote_unit: '',
        min_price: 0,
        max_price: 0,
        min_amount: 0,
        amount_precision: 0,
        price_precision: 0,
        liquidity: 0,
        low_liquidity: '',
        state: '',
        total_precision: 0,
        type: ''
    },
    pool_market: [],
    add_new_currency: null,
    updatePoolMarketState: (pool_market) => set(()=> ({pool_market: pool_market})),
    updateAddNewMarketState: (add_new_market) => set(()=> ({add_new_market: add_new_market})),
    updatePoolPaymentState: (payment) => set(() => ({ payment: payment })),
    updateAddNewCurrency: (add_new_currency) => set(()=> ({add_new_currency: add_new_currency}))
}))