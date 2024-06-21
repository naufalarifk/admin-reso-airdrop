import type { RootState } from '@/store';

// Get Private Auth Market
export const selectGetPrivateAuthData = (state: RootState) =>
   state.private.auth.getTokenService.data
export const selectGetPrivateAuthLoading = (state: RootState) =>
   state.private.auth.getTokenService.isLoading;
