import { SetStateAction } from "react";

export interface ModalStateContextType {
  isInitializedModal: boolean;
  setIsInitializedModal: (value: SetStateAction<boolean>) => void;
  isOpenMenuModal: boolean;
  setIsOpenMenuModal: (value: SetStateAction<boolean>) => void;
  isOpenSignInModal: boolean;
  toggleSignInModalVisibility: () => void;
  isOpenSignUpModal: boolean;
  toggleSignUpModalVisibility: () => void;
  isLoadedAuthModal: boolean;
}
