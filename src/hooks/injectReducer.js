import { useContext } from "react";
import { InjectReducerContext } from "@/providers/InjectReducerProvider.jsx";

export const useInjectReducer = () => useContext(InjectReducerContext);
