import { createContext, lazy, ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const ModalStateContext = createContext({});

export const ModalStateProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenMenuModal, setIsOpenMenuModal] = useState(false);
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false);
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false);
  const [AuthModal, setAuthModal] = useState(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    setIsOpenMenuModal(false);
  }, [pathname, searchParams]);

  const contextValue = useMemo(
    () => ({ isOpenMenuModal, setIsOpenMenuModal, isOpenSignInModal, setIsOpenSignInModal, isOpenSignUpModal, setIsOpenSignUpModal, AuthModal, setAuthModal }),
    [isOpenMenuModal, isOpenSignInModal, isOpenSignUpModal, AuthModal],
  );

  return <ModalStateContext.Provider value={contextValue}>{children}</ModalStateContext.Provider>;
};
