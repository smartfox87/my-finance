import { createContext, useCallback, useMemo, useState } from "react";
import { useViewport } from "@/hooks/viewport";
import type { ModalStateContextType } from "@/types/providers/modal-state";
import type { ComponentChildrenProps } from "@/types/common";

export const ModalStateContext = createContext<ModalStateContextType | undefined>(undefined);

export const ModalStateProvider = ({ children }: ComponentChildrenProps) => {
  const [isInitializedModal, setIsInitializedModal] = useState(false);
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [isLoadedAuthModal, setIsLoadedAuthModal] = useState(false);

  const { isTablet } = useViewport();

  const toggleSignInModalVisibility = useCallback((): void => {
    if (isTablet && isOpenMenuModal && isOpenSignInModal) setIsOpenMenuModal(false);
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignInModal((prev) => !prev);
  }, [isTablet, isOpenMenuModal, isOpenSignInModal]);

  const toggleSignUpModalVisibility = useCallback((): void => {
    if (isTablet && isOpenMenuModal && isOpenSignUpModal) setIsOpenMenuModal(false);
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignUpModal((prev) => !prev);
  }, [isTablet, isOpenMenuModal, isOpenSignUpModal]);

  const contextValue = useMemo(
    () => ({
      isInitializedModal,
      setIsInitializedModal,
      isOpenMenuModal,
      setIsOpenMenuModal,
      isOpenSignInModal,
      toggleSignInModalVisibility,
      isOpenSignUpModal,
      toggleSignUpModalVisibility,
      isLoadedAuthModal,
    }),
    [isInitializedModal, isOpenMenuModal, isOpenSignInModal, isOpenSignUpModal, isLoadedAuthModal, toggleSignInModalVisibility, toggleSignUpModalVisibility],
  );

  return <ModalStateContext.Provider value={contextValue}>{children}</ModalStateContext.Provider>;
};
