import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import { databaseReducer } from './slices/DatabaseSlice';

const rootReducer = combineReducers({
    databaseReducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });
};