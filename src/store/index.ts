import { combineSlices, configureStore } from "@reduxjs/toolkit";
import type { LazyLoadedSlices } from "@/types/store";

export const rootReducer = combineSlices({}).withLazyLoadedSlices<LazyLoadedSlices>();

export const store = configureStore({
  reducer: rootReducer,
});
