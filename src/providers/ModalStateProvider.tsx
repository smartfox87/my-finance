import { createContext, ReactNode, useCallback, useMemo, useState } from "react";
import { useViewport } from "@/hooks/viewport";
import { ModalStateContextType } from "@/types/modalStateProvider";

export const ModalStateContext = createContext<ModalStateContextType | undefined>(undefined);

export const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [isLoadedAuthModal, setIsLoadedAuthModal] = useState(false);

  const { isMobile } = useViewport();

  const toggleSignInModalVisibility = useCallback((): void => {
    if (isMobile && isOpenMenuModal && isOpenSignInModal) setIsOpenMenuModal(false);
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignInModal((prev) => !prev);
  }, [isMobile, isOpenMenuModal, isOpenSignInModal]);

  const toggleSignUpModalVisibility = useCallback((): void => {
    if (isMobile && isOpenMenuModal && isOpenSignUpModal) setIsOpenMenuModal(false);
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignUpModal((prev) => !prev);
  }, [isMobile, isOpenMenuModal, isOpenSignUpModal]);

  const contextValue = useMemo(
    () => ({ isOpenMenuModal, setIsOpenMenuModal, isOpenSignInModal, toggleSignInModalVisibility, isOpenSignUpModal, toggleSignUpModalVisibility, isLoadedAuthModal }),
    [isOpenMenuModal, isOpenSignInModal, isOpenSignUpModal, isLoadedAuthModal, toggleSignInModalVisibility, toggleSignUpModalVisibility],
  );

  return <ModalStateContext.Provider value={contextValue}>{children}</ModalStateContext.Provider>;
};
