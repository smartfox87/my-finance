import { createContext, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { useViewport } from "@/hooks/viewport";

interface ModalStateContextType {
  isOpenMenuModal: boolean;
  setIsOpenMenuModal: (value: SetStateAction<boolean>) => void;
  isOpenSignInModal: boolean;
  toggleSignInModalVisibility: () => void;
  isOpenSignUpModal: boolean;
  toggleSignUpModalVisibility: () => void;
  isLoadedAuthModal: boolean;
}

export const ModalStateContext = createContext<ModalStateContextType | undefined>(undefined);

export const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [isLoadedAuthModal, setIsLoadedAuthModal] = useState(false);

  const { viewport } = useViewport();
  const isMobile = useMemo(() => ["sm", "xs", "xxs"].includes(viewport), [viewport]);

  const toggleSignInModalVisibility = useCallback(() => {
    if (isMobile && isOpenMenuModal && isOpenSignInModal) setIsOpenMenuModal(false);
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignInModal((prev) => !prev);
  }, [isMobile, isOpenMenuModal, isOpenSignInModal]);

  const toggleSignUpModalVisibility = useCallback(() => {
    if (isMobile && isOpenMenuModal && isOpenSignUpModal) setIsOpenMenuModal(false);
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignUpModal((prev) => !prev);
  }, [isMobile, isOpenMenuModal, isOpenSignUpModal]);

  const contextValue = useMemo(
    () => ({ isOpenMenuModal, setIsOpenMenuModal, isOpenSignInModal, toggleSignInModalVisibility, isOpenSignUpModal, toggleSignUpModalVisibility, isLoadedAuthModal }),
    [isOpenMenuModal, isOpenSignInModal, isOpenSignUpModal, isLoadedAuthModal],
  );

  return <ModalStateContext.Provider value={contextValue}>{children}</ModalStateContext.Provider>;
};
