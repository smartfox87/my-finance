import { combineSlices, configureStore } from "@reduxjs/toolkit";

export interface LazyLoadedSlices {}

export const rootReducer = combineSlices({}).withLazyLoadedSlices<LazyLoadedSlices>();

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: rootReducer,
});
