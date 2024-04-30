import { INITIAL_SIGN_UP_FIELDS } from "@/initial-data/auth.js";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { lazy, Suspense, useState } from "react";
import { useViewport } from "@/hooks/viewport.js";
import { useRecaptcha } from "@/hooks/recaptcha.js";
import SvgSignUp from "@/assets/sprite/sign-up.svg";
import { SimpleButton } from "@/components/Form/SimpleButton";
import { useAntd } from "@/hooks/antd.js";

let isOpenRef = false;
let AuthModalRef = false;
export const SignUp = () => {
  const dispatch = useDispatch();
  const { viewport } = useViewport();
  const { t } = useTranslation();
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
    const score = await getScore();
    await import("@/store/authSlice");
    if (score < 0.5) return import("@/helpers/modals.js").then(({ showNotification }) => showNotification({ title: t("notifications.recaptcha_invalid") }));
    const { registerUserThunk } = await import("@/store/authSlice");
    await dispatch(registerUserThunk({ ...fieldsValues, score }));
    handleToggleVisibility();
  };

  return (
    <>
      <SimpleButton type="primary" loading={isLoading} onClick={handleToggleVisibility}>
        <SvgSignUp className="h-4 w-4" />
        {!["xs", "xxs"].includes(viewport) ? t("buttons.sign_up") : null}
      </SimpleButton>
      <Suspense fallback={<div className="hidden" />}>
        {AuthModal && <AuthModal title={t("titles.registration")} fields={INITIAL_SIGN_UP_FIELDS} isOpen={isOpen} onSaveForm={handleSubmitForm} onToggleVisibility={handleToggleVisibility} />}
      </Suspense>
    </>
  );
};
