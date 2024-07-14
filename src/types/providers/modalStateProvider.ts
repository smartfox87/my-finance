import { SetStateAction } from "react";

export interface ModalStateContextType {
  isOpenMenuModal: boolean;
  setIsOpenMenuModal: (value: SetStateAction<boolean>) => void;
  isOpenSignInModal: boolean;
  toggleSignInModalVisibility: () => void;
  isOpenSignUpModal: boolean;
  toggleSignUpModalVisibility: () => void;
  isLoadedAuthModal: boolean;
}
