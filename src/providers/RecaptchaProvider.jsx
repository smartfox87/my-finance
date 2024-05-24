"use client";

import { createContext, createRef, lazy, Suspense, useEffect, useMemo, useState } from "react";

const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

export const RecaptchaContext = createContext({ initCAPTCHA: () => Promise.resolve(), isLoaded: false, getScore: () => Promise.resolve() });

export const RecaptchaProvider = ({ children }) => {
  const recaptchaRef = createRef();

  const [DynamicReCAPTCHA, setDynamicReCAPTCHA] = useState();
  const initCAPTCHA = async () => {
    !DynamicReCAPTCHA && setDynamicReCAPTCHA(lazy(() => import("react-google-recaptcha")));
  };

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

  useEffect(() => {
    window.recaptchaOptions = { enterprise: true };
  }, []);

  const contextValue = useMemo(() => ({ initCAPTCHA, isLoaded, getScore }), [initCAPTCHA, isLoaded, getScore]);

  return (
    <RecaptchaContext.Provider value={contextValue}>
      {children}
      <Suspense fallback={<div className="hidden" />}>
        {DynamicReCAPTCHA && <DynamicReCAPTCHA ref={recaptchaRef} size="invisible" sitekey={siteKey} className="hidden" asyncScriptOnLoad={handleAsyncScriptLoad} />}
      </Suspense>
    </RecaptchaContext.Provider>
  );
};
