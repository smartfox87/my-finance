import { useContext } from "react";
import { ModalStateContext } from "@/providers/ModalStateProvider";

export const useModalState = () => {
  const state = useContext(ModalStateContext);
  if (state === undefined) throw new Error("useModalState must be used within a ModalStateProvider");
  return state;
};
