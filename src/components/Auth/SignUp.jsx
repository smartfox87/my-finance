import { INITIAL_SIGN_UP_FIELDS } from "@/constants/auth";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport";
import { useRecaptcha } from "@/hooks/recaptcha.js";
import SvgSignUp from "@/assets/sprite/sign-up.svg";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useAntd } from "@/hooks/antd.js";
import { useModalState } from "@/hooks/providers/modalState.js";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("@/components/Auth/AuthModal.jsx").then(({ AuthModal }) => ({ default: AuthModal })));

export const SignUp = () => {
  const dispatch = useDispatch();
  const { viewport } = useViewport();
  const { t } = useTranslation();
  const { initCaptcha, isLoadedCaptcha, getScore } = useRecaptcha();

  const { isLoadedAuthModal, isOpenSignUpModal, toggleSignUpModalVisibility } = useModalState();
  const { initAntd, isLoadedAntd, isLoadingAntd } = useAntd();
  const isLoading = isOpenSignUpModal && (!isLoadedCaptcha || !isLoadedAuthModal);

  const handleToggleVisibility = () => {
    toggleSignUpModalVisibility();
    if (!isLoadedAntd) initAntd();
    if (!isLoadedCaptcha) initCaptcha();
  };

  const handleSubmitForm = async (fieldsValues) => {
    const score = await getScore();
    await import("@/store/authSlice");
    if (score < 0.5) return import("@/helpers/modals.js").then(({ showNotification }) => showNotification({ title: t("notifications.recaptcha_invalid") }));
    const { registerUserThunk } = await import("@/store/authSlice");
    await dispatch(registerUserThunk({ ...fieldsValues, score }));
    handleToggleVisibility();
  };

  return (
    <>
      <SimpleButton type="primary" loading={isLoading} data-cy="register-btn" onClick={handleToggleVisibility}>
        <SvgSignUp className="h-4 w-4" />
        {!["xs", "xxs"].includes(viewport) ? t("buttons.sign_up") : null}
      </SimpleButton>
      {isLoadedAuthModal && (
        <AuthModal
          type="register"
          title={t("titles.registration")}
          fields={INITIAL_SIGN_UP_FIELDS}
          isOpen={!isLoadingAntd && isOpenSignUpModal}
          onSaveForm={handleSubmitForm}
          onToggleVisibility={handleToggleVisibility}
        />
      )}
    </>
  );
};
