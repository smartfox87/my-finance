import { INITIAL_SIGN_UP_FIELDS } from "../../constants";
import { useTranslation } from "react-i18next";
import { useRecaptcha } from "@/hooks/providers/recaptcha";
import { useAppDispatch } from "@/hooks/store";
import { isRegisterData } from "../../predicates";
import { DefaultForm } from "@/features/default-form";
import { showNotification } from "@/utils/modals";
import { registerUserThunk } from "@/store/slices/auth";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { captureException } from "@sentry/nextjs";
import { IS_PRODUCTION } from "@/constants/config";
import type { DefaultFormSaveHandler } from "@/types/form";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const { initCaptcha, isLoadedCaptcha, getScore } = useRecaptcha();

  const handleFieldChange = useCallback((): void => {
    if (!isLoadedCaptcha) initCaptcha();
  }, [isLoadedCaptcha, initCaptcha]);

  const handleSubmitForm: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      const score = await getScore();
      const registerData = { ...fieldsValues, score };
      if (!isRegisterData(registerData)) return;
      if (score < 0.5) return showNotification({ title: t("notifications.recaptcha_invalid") });
      await dispatch(registerUserThunk(registerData)).unwrap();
      router.push("/");
    } catch (error) {
      if (IS_PRODUCTION) captureException(error);
    }
  };

  return <DefaultForm fields={INITIAL_SIGN_UP_FIELDS} data-cy="register-form" onSaveForm={handleSubmitForm} onChange={handleFieldChange} />;
};
