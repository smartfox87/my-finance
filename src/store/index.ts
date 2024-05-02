import { combineSlices, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice.js";

export interface LazyLoadedSlices {}

export const rootReducer = combineSlices({
  common: commonReducer,
}).withLazyLoadedSlices<LazyLoadedSlices>();

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
