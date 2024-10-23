"use client";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/simple-button/simple-button";
import { useAppDispatch } from "@/hooks/store";
import { IS_PRODUCTION } from "../../constants/config";
import { captureException } from "@sentry/nextjs";

export const DemoUserAuth = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleAuthorize = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const { loginDemoUserThunk } = await import("@/features/auth-store");
      await dispatch(loginDemoUserThunk()).unwrap();
    } catch (error) {
      if (IS_PRODUCTION) captureException(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SimpleButton size="large" type="primary" loading={isLoading} data-cy="demo-login-btn" onClick={handleAuthorize}>
      {t("buttons.sign_in_demo_user")}
    </SimpleButton>
  );
};
