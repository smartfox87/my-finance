import { useContext } from "react";
import { AntdContext } from "@/providers/AntdProvider";

export const useAntd = () => {
  const state = useContext(AntdContext);
  if (state === undefined) throw new Error("useAntd must be used within a AntdProvider");
  return state;
};
