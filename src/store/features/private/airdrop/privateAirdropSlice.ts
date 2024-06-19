/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/api/config';
import type { PrivateAirdropState } from '@/store/types';
// import { buildQueryString } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

// type StateUserAirdrop =
//    | 'connected'
//    | 'disconnected'
//    | 'under_review'
//    | 'eligible'
//    | 'non_eligible';

// interface PrivatePoolMarketParams {
//    state: StateUserAirdrop;
// }

const initialState: PrivateAirdropState = {
   getJoinAirdrop: {
      data: {
      address: '',
      state: '',
      transaction: '',
      volume: '',
      },
      isLoading: false,
      isSuccess: false,
   },
   postJoinAirdrop: {
      data: {
                  address: '',
      state: '',
      transaction: '',
      volume: '',
      },
      isLoading: false,
      isSuccess: false,
   }

};

export const getPrivateAirdrop = createAsyncThunk(
   'private/getPrivateAirdrop',
   async (_, { rejectWithValue }) => {
      try {
         const response = await baseApi.get(`/trade/pool/currencies`);
         return response;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const postPrivateAirdrop = createAsyncThunk(
   'private/postPrivateAirdrop',
   async (token: string, { rejectWithValue }) => {
      try {
      const response = await baseApi.post("trade/airdrop/airdrops", 
      {},
      {
        headers: {
          "X-CSRF-TOKEN": token,
        },
      }
      );
         return response
      } catch (error: any) {
         toast.error(error.message);
         return rejectWithValue(error);
      }
   }
)


const privateAirdropSlice = createSlice({
   name: 'privateAirdropSlice',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getPrivateAirdrop.pending, state => {
            state.getJoinAirdrop.isLoading = true;
            state.getJoinAirdrop.isSuccess = false;
         })
         .addCase(getPrivateAirdrop.fulfilled, (state, action) => {
            state.getJoinAirdrop.isLoading = false;
            state.getJoinAirdrop.isSuccess = true;
            state.getJoinAirdrop.data = action.payload.data;
         })
         .addCase(getPrivateAirdrop.rejected, (state, action) => {
            state.getJoinAirdrop.isLoading = false;
            state.getJoinAirdrop.isSuccess = true;
            state.getJoinAirdrop.data = {
               address: '',
               state: '',
               transaction: '',
               volume: '',
            };
            state.getJoinAirdrop.error = action.payload;
         })
         .addCase(postPrivateAirdrop.pending, state => {
            state.postJoinAirdrop.isLoading = true;
            state.postJoinAirdrop.isSuccess = false;
         })
         .addCase(postPrivateAirdrop.fulfilled, (state, action) => {
            state.postJoinAirdrop.isLoading = false;
            state.postJoinAirdrop.isSuccess = true;
            state.postJoinAirdrop.data = action.payload.data;
         })
         .addCase(postPrivateAirdrop.rejected, (state, action) => {
            state.postJoinAirdrop.isSuccess = false;
            state.postJoinAirdrop.error = action.payload;
         });
   },
});

export const { reducer: privateAirdropReducer } = privateAirdropSlice;
