import { INITIAL_SIGN_IN_FIELDS } from "../../constants";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport";
import SvgSignIn from "@/assets/sprite/sign-in.svg";
import { SimpleButton } from "@/components/form/SimpleButton";
import { useAntd } from "@/hooks/providers/antd";
import { useModalState } from "@/hooks/providers/modal-state";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/hooks/store";
import { isLoginData } from "../../predicates";
import { showCommonError } from "@/utils/errors";
import type { DefaultFormSaveHandler } from "@/types/form";

const AuthModal = dynamic(() => import("../auth-modal").then(({ AuthModal }) => ({ default: AuthModal })));

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

  const handleSubmitForm: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      if (!isLoginData(fieldsValues)) return;
      const { loginUserThunk } = await import("../../store");
      await dispatch(loginUserThunk(fieldsValues)).unwrap();
      handleToggleVisibility();
    } catch (error) {
      showCommonError({ error });
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
