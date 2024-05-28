import type { RootState } from '@/store';

// Get Private Pool Market
export const selectGetPrivatePoolMarketData = (state: RootState) =>
   state.private.pool.getPoolMarket?.data;
export const selectGetPrivatePoolMarketLoading = (state: RootState) =>
   state.private.pool.getPoolMarket.isLoading;

// Get Private Pool Currency
export const selectGetPrivatePoolCurrencyData = (state: RootState) =>
   state.private.pool?.getPoolCurrencies.data;
export const selectGetPrivatePoolCurrencyLoading = (state: RootState) =>
   state.private.pool.getPoolCurrencies.isLoading;
