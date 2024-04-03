import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useInjectReducer } from "@/hooks/injectReducer";

export const GoogleAuth = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { thunks } = useInjectReducer();

  const [isLoading, setIsLoading] = useState(false);
  const handleAuthorize = () => {
    setIsLoading(true);
    dispatch(thunks.auth.loginByProviderUserThunk("google"));
  };

  return (
    <SimpleButton size="large" type="primary" loading={isLoading} onClick={handleAuthorize}>
      {t("buttons.sign_in_google")}
    </SimpleButton>
  );
};
