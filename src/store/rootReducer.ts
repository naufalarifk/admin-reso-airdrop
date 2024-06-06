import { combineReducers } from '@reduxjs/toolkit';
import { publicPoolReducer } from '@/store/features/public';
import { privateAirdropReducer, privatePoolReducer } from '@/store/features/private';

const publicReducer = combineReducers({
   pool: publicPoolReducer,
});

const privateReducer = combineReducers({
   pool: privatePoolReducer,
   airdrop: privateAirdropReducer
});

export const rootReducer = combineReducers({
   public: publicReducer,
   private: privateReducer,
});
