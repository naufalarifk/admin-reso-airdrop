import { combineReducers } from '@reduxjs/toolkit';
import { publicPoolReducer } from '@/store/features/public';
import { privateAirdropReducer, privatePoolReducer, privateAuthReducer } from '@/store/features/private';

const publicReducer = combineReducers({
   pool: publicPoolReducer,
});

const privateReducer = combineReducers({
   pool: privatePoolReducer,
   airdrop: privateAirdropReducer,
   auth: privateAuthReducer
});

export const rootReducer = combineReducers({
   public: publicReducer,
   private: privateReducer,
});
