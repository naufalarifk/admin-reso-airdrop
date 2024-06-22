/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from '@/api/config';
import type { GetTokenService, PrivateAuthState } from '@/store/types';
// import { buildQueryString } from '@/utils';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

interface PayloadToken {
  signature: string;
  message: string;
  public_key: string;
}

const initialState: PrivateAuthState = {
   getTokenService: {
      data: {
         account: '',
         created_at: '',
         csrf_token: '',
         data: '',
         data_storages: [],
         email: '',
         labels: [],
         level: 0,
         otp: false,
         phone: '',
         profiles: [],
         referral_uid: '',
         role: '',
         state: '',
         uid: '',
         updated_at: '',
         username: ''
      },
      isLoading: false,
      isSuccess: false
}};


export const postAuthUser = createAsyncThunk(
   'private/auth/postAuthUser',
   async (payload: PayloadToken, { rejectWithValue }) => {
      try {
         const response: GetTokenService = await baseApi.post(`auth/identity/sessions/sign/auth`, payload)
         console.log('response', response)
         return response
      } catch (error: any) {
         toast.error('Authentication error!')
         return rejectWithValue(error);
   }
   }
)


const privateAuthSlice = createSlice({
   name: 'privateAuthSlice',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(postAuthUser.pending, state => {
            state.getTokenService.isLoading = true;
            state.getTokenService.isSuccess = false;
         })
         .addCase(postAuthUser.fulfilled, (state, action) => {
            state.getTokenService.isLoading = false;
            state.getTokenService.isSuccess = true;
            state.getTokenService.data = action.payload.data;
            console.log('state.getTokenService.data', state.getTokenService.data)
            console.log('action.payload.data', action.payload.data)
         })
         .addCase(postAuthUser.rejected, (state, action) => {
            state.getTokenService.isLoading = false;
            state.getTokenService.isSuccess = true;
            state.getTokenService.data = {
         account: '',
         created_at: '',
         csrf_token: '',
         data: '',
         data_storages: [],
         email: '',
         labels: [],
         level: 0,
         otp: false,
         phone: '',
         profiles: [],
         referral_uid: '',
         role: '',
         state: '',
         uid: '',
         updated_at: '',
         username: ''
            };
            state.getTokenService.error = action.payload;
         })
   },
});

export const { reducer: privateAuthReducer } = privateAuthSlice;
