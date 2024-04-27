/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

import { Currency } from "@/types/components";

export type CurrencyState = {
    currency: Currency[]
}

export type CurrencyActions = {
    updateCurrencyState: (currency: CurrencyState['currency']) => void
}


export type CurrencyStore = CurrencyState & CurrencyActions;


export const usePublicCurrency = create<CurrencyState & CurrencyActions>((set) => ({
    currency: [],
    updateCurrencyState: (currency) => set(()=> ({currency: currency}))
}))