/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

import { Currency } from "@/types/components";

export type CurrencyState = {
    currency: Currency[]
    single_currency: Currency
}

export type CurrencyActions = {
    updateCurrencyState: (currency: CurrencyState['currency']) => void
    updateSingleCurrency: (currency: CurrencyState['single_currency']) => void
}


export type CurrencyStore = CurrencyState & CurrencyActions;


export const usePublicCurrency = create<CurrencyState & CurrencyActions>((set) => ({
    currency: [],
    single_currency: {
        base_factor: '',
        deposit_enabled: '',
        deposit_fee: '',
        description: '',
        explorer_address: '',
        explorer_transaction: '',
        homepage: '',
        icon_url: '',
        id: '',
        min_confirmations: '',
        min_deposit_amount: '',
        min_withdraw_amount: '',
        name: '',
        parent_id: '',
        position: '',
        precision: '',
        price: '',
        type: '',
        withdraw_fee: '',
        withdrawal_enabled: ''
    },
    updateCurrencyState: (currency) => set(() => ({ currency: currency })),
    updateSingleCurrency: (single_currency) => set(()=> ({single_currency: single_currency}))
}))