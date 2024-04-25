import { Action, combineSlices, configureStore, Middleware } from "@reduxjs/toolkit";
import commonReducer from "./commonSlice.js";

export interface LazyLoadedSlices {}

export const rootReducer = combineSlices({
  common: commonReducer,
}).withLazyLoadedSlices<LazyLoadedSlices>();

export const store = configureStore({
  reducer: rootReducer,
});
