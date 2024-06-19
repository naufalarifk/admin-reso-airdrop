import type { RootState } from '@/store';

export const selectGetPublicPoolLoading = (state: RootState) => state.public.pool.isLoading;
export const selectGetPublicPoolData = (state: RootState) => state.public.pool.item;
export const selectGetPublicPoolError = (state: RootState) => state.public.pool.error;
