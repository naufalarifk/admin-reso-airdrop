import { combineReducers } from '@reduxjs/toolkit';
import { publicPoolReducer } from '@/store/features/public';

const publicReducer = combineReducers({
   pool: publicPoolReducer,
});

export const rootReducer = combineReducers({
   public: publicReducer,
});
