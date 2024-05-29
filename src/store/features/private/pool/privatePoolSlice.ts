/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/api/config';
import type { PrivatePoolState } from '@/store/types';
import { buildQueryString } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type StateMarket =
   | 'pending'
   | 'validate_fee'
   | 'validate_listing'
   | 'validate_pair'
   | 'paid'
   | 'cancel'
   | 'rejected';

type KindTypes = 'fee' | 'liquidity' | 'listing';

interface PrivatePoolMarketParams {
   state: StateMarket;
   currency: string;
   pair_currency: string;
   market: string;
}

interface PayloadCreatePaymentPool {
   kinds: KindTypes;
   hash: string;
   amount: string;
}

interface PayloadNewPoolMarket {
   amount_precision?: number;
   price_precision?: number;
   total_precision?: number;
   max_price?: number;
   data?: any;
   state?: 'enabled' | 'disabled' | 'hidden' | 'locked' | 'sale' | 'presale';
   base_currency: string;
   quote_currency: string;
   min_price: number;
   min_amount: number;
   type?: string;
   engine_name?: string;
   engine_id?: string;
}

const initialState: PrivatePoolState = {
   getPoolCurrencies: {
      isLoading: false,
      isSuccess: false,
      data: [],
   },
   getPoolMarket: {
      isLoading: false,
      isSuccess: false,
      data: [],
   },
   createPaymentPoolMarket: {
      isLoading: false,
      isSuccess: false,
   },
   createNewPoolMarket: {
      isLoading: false,
      isSuccess: false,
   },
};

export const getPrivatePoolCurrencies = createAsyncThunk(
   'private/getPrivatePoolCurrencies',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseApi.get(`/trade/pool/currencies`);
         return response;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getPrivatePoolMarketPairUser = createAsyncThunk(
   'private/getPrivatePoolMarket',
   async (params: PrivatePoolMarketParams, { rejectWithValue }) => {
      try {
         const response = await baseApi.get(`/trade/pool/market?${buildQueryString(params)}`);
         return response;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const postPaymentPoolMarket = createAsyncThunk(
   'private/postPaymentPoolMarket',
   async (
      { uid, payload }: { uid: string; payload: PayloadCreatePaymentPool },
      { rejectWithValue },
   ) => {
      try {
         const response = await baseApi.post(`/trade/pool/market/${uid}/payment`, payload);
         return response;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const createPostPoolMarketNew = createAsyncThunk(
   'private/postPoolMarketNew',
   async (payload: PayloadNewPoolMarket, { rejectWithValue }) => {
      try {
         const response = await baseApi.post(`/trade/pool/market/`, payload);
         return response;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

const privatePoolSlice = createSlice({
   name: 'privatePoolSlice',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getPrivatePoolCurrencies.pending, state => {
            state.getPoolCurrencies.isLoading = true;
            state.getPoolCurrencies.isSuccess = false;
         })
         .addCase(getPrivatePoolCurrencies.fulfilled, (state, action) => {
            state.getPoolCurrencies.isLoading = false;
            state.getPoolCurrencies.isSuccess = true;
            state.getPoolCurrencies.data = action.payload.data;
         })
         .addCase(getPrivatePoolCurrencies.rejected, (state, action) => {
            state.getPoolCurrencies.isLoading = false;
            state.getPoolCurrencies.isSuccess = true;
            state.getPoolCurrencies.data = [];
            state.getPoolCurrencies.error = action.payload;
         })
         .addCase(getPrivatePoolMarketPairUser.pending, state => {
            state.getPoolMarket.isLoading = true;
            state.getPoolMarket.isSuccess = false;
         })
         .addCase(getPrivatePoolMarketPairUser.fulfilled, (state, action) => {
            state.getPoolMarket.isLoading = false;
            state.getPoolMarket.isSuccess = true;
            state.getPoolMarket.data = action.payload.data;
         })
         .addCase(getPrivatePoolMarketPairUser.rejected, (state, action) => {
            state.getPoolMarket.isSuccess = false;
            state.getPoolMarket.error = action.payload;
         })
         .addCase(postPaymentPoolMarket.pending, state => {
            state.createPaymentPoolMarket.isLoading = true;
            state.createPaymentPoolMarket.isSuccess = false;
         })
         .addCase(postPaymentPoolMarket.fulfilled, state => {
            state.createPaymentPoolMarket.isLoading = false;
            state.createPaymentPoolMarket.isSuccess = true;
         })
         .addCase(postPaymentPoolMarket.rejected, (state, action) => {
            state.createPaymentPoolMarket.isSuccess = false;
            state.createPaymentPoolMarket.isLoading = false;
            state.createPaymentPoolMarket.error = action.payload;
         })
         .addCase(createPostPoolMarketNew.pending, state => {
            state.createNewPoolMarket.isLoading = true;
            state.createNewPoolMarket.isSuccess = false;
         })
         .addCase(createPostPoolMarketNew.fulfilled, state => {
            state.createNewPoolMarket.isLoading = false;
            state.createPaymentPoolMarket.isSuccess = true;
         })
         .addCase(createPostPoolMarketNew.rejected, (state, action) => {
            state.createNewPoolMarket.isLoading = false;
            state.createNewPoolMarket.isSuccess = false;
            state.createNewPoolMarket.error = action.payload;
         });
   },
});

export const { reducer: privatePoolReducer } = privatePoolSlice;
