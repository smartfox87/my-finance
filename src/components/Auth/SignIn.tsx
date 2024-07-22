import { INITIAL_SIGN_IN_FIELDS } from "@/constants/auth";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport";
import SvgSignIn from "@/assets/sprite/sign-in.svg";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useAntd } from "@/hooks/providers/antd";
import { useModalState } from "@/hooks/providers/modalState";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/hooks/redux";
import { DefaultFormSaveHandler } from "@/types/form";
import { isLoginData } from "@/predicates/auth";
import { showCommonError } from "@/helpers/errors";

const AuthModal = dynamic(() => import("@/components/Auth/AuthModal").then(({ AuthModal }) => ({ default: AuthModal })));

export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();

  const { isLoadedAuthModal, isOpenSignInModal, toggleSignInModalVisibility } = useModalState();
  const { initAntd, isLoadedAntd, isLoadingAntd } = useAntd();
  const isLoading = isOpenSignInModal && !isLoadedAuthModal;

  const handleToggleVisibility = (): void => {
    toggleSignInModalVisibility();
    if (!isLoadedAntd) initAntd();
  };

  const handleSubmitForm: DefaultFormSaveHandler = async (fieldsValues): Promise<void> => {
    try {
      if (!isLoginData(fieldsValues)) return;
      const { loginUserThunk } = await import("@/store/authSlice");
      // todo unwrap all dispatches
      await dispatch(loginUserThunk(fieldsValues)).unwrap();
      handleToggleVisibility();
    } catch (error) {
      showCommonError();
    }
  };

  return (
    <>
      <SimpleButton type="primary" loading={isLoading} data-cy="modal-login-btn" onClick={handleToggleVisibility}>
        <SvgSignIn className="h-4 w-4" />
        {!isMobile ? t("buttons.sign_in") : null}
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
