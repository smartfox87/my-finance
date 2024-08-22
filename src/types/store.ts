import { rootReducer, store } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export interface LazyLoadedSlices {}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// todo check it
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
