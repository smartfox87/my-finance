import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { loginByProviderUserThunk } from "@/store/authSlice";

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState(false);
  const handleAuthorize = async () => {
    setIsLoading(true);
    await import("@/store/authSlice");
    dispatch(loginByProviderUserThunk("google"));
  };

  return (
    <SimpleButton size="large" type="primary" loading={isLoading} onClick={handleAuthorize}>
      {t("buttons.sign_in_google")}
    </SimpleButton>
  );
};
