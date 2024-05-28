import { combineReducers } from '@reduxjs/toolkit';
import { publicPoolReducer } from '@/store/features/public';
import { privatePoolReducer } from '@/store/features/private';

const publicReducer = combineReducers({
   pool: publicPoolReducer,
});

const privateReducer = combineReducers({
   pool: privatePoolReducer,
});

export const rootReducer = combineReducers({
   public: publicReducer,
   private: privateReducer,
});
