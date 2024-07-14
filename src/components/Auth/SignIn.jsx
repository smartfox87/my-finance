import { useDispatch } from "react-redux";
import { INITIAL_SIGN_IN_FIELDS } from "@/constants/auth";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport";
import { useRecaptcha } from "@/hooks/providers/recaptcha.ts";
import SvgSignIn from "@/assets/sprite/sign-in.svg";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useAntd } from "@/hooks/providers/antd.ts";
import { useModalState } from "@/hooks/providers/modalState";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const AuthModal = dynamic(() => import("@/components/Auth/AuthModal.jsx").then(({ AuthModal }) => ({ default: AuthModal })));

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();
  const { initCaptcha, isLoadedCaptcha, getScore } = useRecaptcha();

  const { isLoadedAuthModal, isOpenSignInModal, toggleSignInModalVisibility } = useModalState();
  const { initAntd, isLoadedAntd, isLoadingAntd } = useAntd();
  const isLoading = isOpenSignInModal && (!isLoadedCaptcha || !isLoadedAuthModal);

  const handleToggleVisibility = () => {
    toggleSignInModalVisibility();
    if (!isLoadedAntd) initAntd();
    if (!isLoadedCaptcha) initCaptcha();
  };

  const handleSubmitForm = async (fieldsValues) => {
    const score = await getScore("login");
    const { loginUserThunk } = await import("@/store/authSlice");
    await dispatch(loginUserThunk({ ...fieldsValues, score }));
    handleToggleVisibility();
  };

  return (
    <>
      <SimpleButton type="primary" loading={isLoading} data-cy="modal-login-btn" onClick={handleToggleVisibility}>
        <SvgSignIn className="h-4 w-4" />
        {!["xs", "xxs"].includes(viewport) ? t("buttons.sign_in") : null}
      </SimpleButton>
      {isLoadedAuthModal && (
        <AuthModal
          type="login"
          title={t("titles.authorisation")}
          fields={INITIAL_SIGN_IN_FIELDS}
          isOpen={!isLoadingAntd && isOpenSignInModal}
          onSaveForm={handleSubmitForm}
          onToggleVisibility={handleToggleVisibility}
        />
      )}
    </>
  );
};
