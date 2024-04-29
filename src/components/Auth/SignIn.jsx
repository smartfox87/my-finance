import { useDispatch } from "react-redux";
import { INITIAL_SIGN_IN_FIELDS } from "@/initial-data/auth.js";
import { useTranslation } from "react-i18next";
import { lazy, Suspense, useState } from "react";
import { useViewport } from "@/hooks/viewport.js";
import { useRecaptcha } from "@/hooks/recaptcha.js";
import SvgSignIn from "@/assets/sprite/sign-in.svg";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useAntd } from "@/hooks/antd.js";
import { loginUserThunk } from "@/store/authSlice";

let isOpenRef = false;
let AuthModalRef = false;
export const SignIn = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { viewport } = useViewport();
  const { initCAPTCHA, isLoaded, getScore } = useRecaptcha();

  const [isOpen, setIsOpen] = useState(isOpenRef);
  const [AuthModal, setAuthModal] = useState(AuthModalRef);
  const { initAntd, isLoadedAntd } = useAntd();
  const isLoading = isOpen && (!isLoaded || !AuthModal);

  const loadAuthModal = async () => !isOpen && !AuthModal && setAuthModal((AuthModalRef = lazy(() => import("@/components/Auth/AuthModal.jsx").then(({ AuthModal }) => ({ default: AuthModal })))));
  const handleToggleVisibility = () => {
    setIsOpen((prevState) => (isOpenRef = !prevState));
    Promise.all([!isLoadedAntd && initAntd(), !isLoaded && initCAPTCHA(), loadAuthModal()]);
  };

  const handleSubmitForm = async (fieldsValues) => {
    const score = await getScore("login");
    await import("@/store/authSlice");
    await dispatch(loginUserThunk({ ...fieldsValues, score }));
    handleToggleVisibility();
  };

  return (
    <>
      <SimpleButton type="primary" loading={isLoading} onClick={handleToggleVisibility}>
        <SvgSignIn className="h-4 w-4" />
        {!["xs", "xxs"].includes(viewport) ? t("buttons.sign_in") : null}
      </SimpleButton>
      <Suspense fallback={<div className="hidden" />}>
        {AuthModal && <AuthModal title={t("titles.authorisation")} fields={INITIAL_SIGN_IN_FIELDS} isOpen={isOpen} onSaveForm={handleSubmitForm} onToggleVisibility={handleToggleVisibility} />}
      </Suspense>
    </>
  );
};
