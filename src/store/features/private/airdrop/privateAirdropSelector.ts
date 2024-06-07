import type { RootState } from '@/store';

// Get Private Airdrop Market
export const selectGetPrivateAirdropMarketData = (state: RootState) =>
   state.private.airdrop.getJoinAirdrop?.data;
export const selectGetPrivateAirdropMarketLoading = (state: RootState) =>
   state.private.airdrop.getJoinAirdrop.isLoading;

// Get Private Airdrop Currency
export const selectGetPrivateAirdropCurrencyData = (state: RootState) =>
   state.private.airdrop.postJoinAirdrop.data;
export const selectGetPrivateAirdropCurrencyLoading = (state: RootState) =>
   state.private.airdrop.postJoinAirdrop.isLoading;
