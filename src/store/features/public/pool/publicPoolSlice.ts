import { baseApi } from '@/api/config';
import type { GetPublicPoolState } from '@/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState: GetPublicPoolState = {
   isLoading: false,
   isSuccess: false,
   item: null,
};

export const getPublicPoolAction = createAsyncThunk(
   'public/getPublicPool',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseApi.get(``);
         return response;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

const publicPoolSlice = createSlice({
   name: 'publicPoolSlice',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getPublicPoolAction.pending, state => {
            state.isLoading = true;
            state.isSuccess = false;
         })
         .addCase(getPublicPoolAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.item = action.payload.data;
         })
         .addCase(getPublicPoolAction.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.item = null;
            state.error = action.payload;
         });
   },
});

export const { reducer: publicPoolReducer } = publicPoolSlice;
