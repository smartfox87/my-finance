import { useContext } from "react";
import { ModalStateContext } from "@/providers/ModalStateProvider";

export const useModalState = () => useContext(ModalStateContext);
