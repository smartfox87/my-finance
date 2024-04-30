import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/Form/SimpleButton";

export const DemoUserAuth = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleAuthorize = async () => {
    setIsLoading(true);
    const { loginDemoUserThunk } = await import("@/store/authSlice");
    dispatch(loginDemoUserThunk());
  };

  return (
    <SimpleButton size="large" type="primary" loading={isLoading} onClick={handleAuthorize}>
      {t("buttons.sign_in_demo_user")}
    </SimpleButton>
  );
};
