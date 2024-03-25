import { useContext } from "react";
import { AntdContext } from "@/providers/AntdProvider";

export const useAntd = () => useContext(AntdContext);
