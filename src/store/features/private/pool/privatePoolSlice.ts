import { baseApi } from '@/api/config';
import type { PrivatePoolState } from '@/store/types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: PrivatePoolState = {
   getPollCurrencies: {
      isLoading: false,
      isSuccess: false,
      data: [],
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

const privatePoolSlice = createSlice({
   name: 'privatePoolSlice',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getPrivatePoolCurrencies.pending, state => {
            state.getPollCurrencies.isLoading = true;
            state.getPollCurrencies.isSuccess = false;
         })
         .addCase(getPrivatePoolCurrencies.fulfilled, (state, action) => {
            state.getPollCurrencies.isLoading = false;
            state.getPollCurrencies.isSuccess = true;
            state.getPollCurrencies.data = action.payload.data;
         })
         .addCase(getPrivatePoolCurrencies.rejected, (state, action) => {
            state.getPollCurrencies.isLoading = false;
            state.getPollCurrencies.isSuccess = true;
            state.getPollCurrencies.data = [];
            state.getPollCurrencies.error = action.payload;
         });
   },
});

export const { reducer: privatePoolReducer } = privatePoolSlice;
