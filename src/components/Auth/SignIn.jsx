import { useDispatch } from "react-redux";
import { INITIAL_SIGN_IN_FIELDS } from "@/constants/auth.js";
import { useTranslation } from "react-i18next";
import { lazy, Suspense, useState } from "react";
import { useViewport } from "@/hooks/viewport.js";
import { useRecaptcha } from "@/hooks/recaptcha.js";
import SvgSignIn from "@/assets/sprite/sign-in.svg";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useAntd } from "@/hooks/antd.js";
import { useModalState } from "@/hooks/providers/modalState.js";

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();
  const { initCAPTCHA, isLoadedCaptcha, getScore } = useRecaptcha();

  const { isOpenSignInModal, setIsOpenSignInModal } = useModalState();
  const { AuthModal, setAuthModal } = useModalState();
  const { initAntd, isLoadedAntd } = useAntd();
  const isLoading = isOpenSignInModal && (!isLoadedCaptcha || !AuthModal);

  const loadAuthModal = async () => !AuthModal && setAuthModal(lazy(() => import("@/components/Auth/AuthModal.jsx").then(({ AuthModal }) => ({ default: AuthModal }))));
  const handleToggleVisibility = () => {
    setIsOpenSignInModal((prevState) => !prevState);
    Promise.all([!isLoadedAntd && initAntd(), !isLoadedCaptcha && initCAPTCHA(), !AuthModal && loadAuthModal()]);
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
      <Suspense fallback={<div className="hidden" />}>
        {AuthModal && (
          <AuthModal
            type="login"
            title={t("titles.authorisation")}
            fields={INITIAL_SIGN_IN_FIELDS}
            isOpen={isOpenSignInModal}
            onSaveForm={handleSubmitForm}
            onToggleVisibility={handleToggleVisibility}
          />
        )}
      </Suspense>
    </>
  );
};
