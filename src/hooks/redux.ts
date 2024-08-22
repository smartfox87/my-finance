import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "@/types/store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

// todo check it
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
