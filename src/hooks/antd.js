import { useContext, useEffect } from "react";
import { AntdContext } from "@/providers/AntdProvider";

export const useAntd = () => {
  const state = useContext(AntdContext);
  if (state === undefined) throw new Error("useAntd must be used within a AntdProvider");

  useEffect(() => {
    if (state.isLoadedAntd && state.isLoadingAntd) state.setIsLoadingAntd(false);
  }, []);

  return state;
};
