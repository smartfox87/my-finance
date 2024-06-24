import { createContext, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const initialData = {
  isOpenMenuModal: false,
  setIsOpenMenuModal: (value: SetStateAction<boolean>): void => undefined,
  isOpenSignInModal: false,
  toggleSignInModalVisibility: (): void => undefined,
  isOpenSignUpModal: false,
  toggleSignUpModalVisibility: (): void => undefined,
  isLoadedAuthModal: false,
};

export const ModalStateContext = createContext(initialData);

export const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(initialData.isOpenMenuModal);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(initialData.isOpenSignInModal);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(initialData.isOpenSignUpModal);
  const [isLoadedAuthModal, setIsLoadedAuthModal] = useState(initialData.isLoadedAuthModal);

  const toggleSignInModalVisibility = useCallback(() => {
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignInModal((prev) => !prev);
  }, []);

  const toggleSignUpModalVisibility = useCallback(() => {
    if (!isLoadedAuthModal && !isOpenSignInModal) setIsLoadedAuthModal(true);
    setIsOpenSignUpModal((prev) => !prev);
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    setIsOpenMenuModal(false);
  }, [pathname]);

  const contextValue = useMemo(
    () => ({ isOpenMenuModal, setIsOpenMenuModal, isOpenSignInModal, toggleSignInModalVisibility, isOpenSignUpModal, toggleSignUpModalVisibility, isLoadedAuthModal }),
    [isOpenMenuModal, isOpenSignInModal, isOpenSignUpModal, isLoadedAuthModal],
  );

  return <ModalStateContext.Provider value={contextValue}>{children}</ModalStateContext.Provider>;
};
