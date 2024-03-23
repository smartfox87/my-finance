import { createContext, createRef, lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";

const siteKey = import.meta.env.VITE_GOOGLE_RECAPTCHA_SITE_KEY;
window.recaptchaOptions = { enterprise: true };

export const RecaptchaContext = createContext();

export const RecaptchaProvider = ({ children }) => {
  const recaptchaRef = createRef();

  const [DynamicReCAPTCHA, setDynamicReCAPTCHA] = useState();
  const initCAPTCHA = async () => !DynamicReCAPTCHA && setDynamicReCAPTCHA(lazy(() => import("react-google-recaptcha")));

  const [isLoaded, setIsLoaded] = useState(false);
  const handleAsyncScriptLoad = () => setIsLoaded(true);

  const getScore = async ({ action = "signup" } = {}) => {
    if (recaptchaRef.current) {
      try {
        const value = await recaptchaRef.current.executeAsync();
        const body = {
          event: {
            token: value,
            expectedAction: action,
            siteKey: siteKey,
          },
        };
        const { score } = await fetch("/api/recaptcha", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json());
        return score;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
  };

  return (
    <RecaptchaContext.Provider value={{ initCAPTCHA, isLoaded, getScore }}>
      {children}
      <Suspense fallback={<div className="hidden" />}>
        {DynamicReCAPTCHA && <DynamicReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={siteKey} className="hidden" asyncScriptOnLoad={handleAsyncScriptLoad} />}
      </Suspense>
    </RecaptchaContext.Provider>
  );
};

RecaptchaProvider.propTypes = {
  children: PropTypes.node,
};
