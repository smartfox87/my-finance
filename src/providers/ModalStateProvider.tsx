import { createContext, lazy, ReactNode, useEffect, useMemo, useState } from "react";

export const ModalStateContext = createContext({});

export const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);

  const contextValue = useMemo(
    () => ({ isOpenMenuModal, setIsOpenMenuModal, isOpenSignInModal, setIsOpenSignInModal, isOpenSignUpModal, setIsOpenSignUpModal }),
    [isOpenMenuModal, isOpenSignInModal, isOpenSignUpModal],
  );

  return <ModalStateContext.Provider value={contextValue}>{children}</ModalStateContext.Provider>;
};
