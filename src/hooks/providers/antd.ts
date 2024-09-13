import { useContext, useEffect } from "react";
import { AntdContext } from "@/providers/items/antd";
import type { AntdContextType } from "@/types/providers/antd";

export const useAntd = (): AntdContextType => {
  const state = useContext(AntdContext);
  if (state === undefined) throw new Error("useAntd must be used within a AntdProvider");

  useEffect(() => {
    if (state.isLoadedAntd && state.isLoadingAntd) state.setIsLoadingAntd(false);
  }, []);

  return state;
};
