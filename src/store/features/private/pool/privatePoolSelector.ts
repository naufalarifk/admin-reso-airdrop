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

// Post Private Pool Payment Market
export const selectPostPrivatePoolMarketLoading = (state: RootState) =>
   state.private.pool.createPaymentPoolMarket.isLoading;

// Post Create Pool Market New
export const selectCreatePoolMarketNewLoading = (state: RootState) =>
   state.private.pool.createNewPoolMarket.isLoading;
