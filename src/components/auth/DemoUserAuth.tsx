import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/form/SimpleButton";
import { useAppDispatch } from "@/hooks/store";

export const DemoUserAuth = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleAuthorize = async (): Promise<void> => {
    setIsLoading(true);
    const { loginDemoUserThunk } = await import("@/store/slices/authSlice");
    dispatch(loginDemoUserThunk());
  };

  return (
    <SimpleButton size="large" type="primary" loading={isLoading} data-cy="demo-login-btn" onClick={handleAuthorize}>
      {t("buttons.sign_in_demo_user")}
    </SimpleButton>
  );
};
