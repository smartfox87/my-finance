"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/simple-button";
import { useAppDispatch } from "@/hooks/store";
import { ButtonSizes, ButtonTypes } from "@/types/button";

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
    <SimpleButton size={ButtonSizes.LARGE} type={ButtonTypes.PRIMARY} loading={isLoading} onClick={handleAuthorize}>
      {t("buttons.sign_in_google")}
    </SimpleButton>
  );
};
