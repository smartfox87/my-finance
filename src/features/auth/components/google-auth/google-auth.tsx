"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/simple-button/simple-button";
import { useAppDispatch } from "@/hooks/store";

export const GoogleAuth = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleAuthorize = async (): Promise<void> => {
    setIsLoading(true);
    const { loginByProviderUserThunk } = await import("@/features/auth-store");
    dispatch(loginByProviderUserThunk("google"));
  };

  return (
    <SimpleButton size="large" type="primary" loading={isLoading} onClick={handleAuthorize}>
      {t("buttons.sign_in_google")}
    </SimpleButton>
  );
};
