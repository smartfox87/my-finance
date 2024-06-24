"use client";

import { createContext, createRef, lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";

const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

const GoogleRecaptcha = dynamic(() => import("react-google-recaptcha"), { ssr: false });
export const RecaptchaContext = createContext({ initCaptcha: async () => undefined, isLoadedCaptcha: false, getScore: async () => 0 });

export const RecaptchaProvider = ({ children }) => {
  const recaptchaRef = createRef();

  const [isInjectedCaptcha, setIsInjectedCaptcha] = useState(false);
  const [isLoadedCaptcha, setIsLoadedCaptcha] = useState(false);

  const initCaptcha = useCallback(() => setIsInjectedCaptcha(true), []);
  const handleAsyncScriptLoad = useCallback(() => setIsLoadedCaptcha(true), []);

  const getScore = useCallback(
    () =>
      async ({ action = "signup" } = {}) => {
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
      },
    [],
  );

  useEffect(() => {
    window.recaptchaOptions = { enterprise: true };
  }, []);

  const contextValue = useMemo(() => ({ initCaptcha, isLoadedCaptcha, getScore }), [initCaptcha, isLoadedCaptcha, getScore]);

  return (
    <RecaptchaContext.Provider value={contextValue}>
      {children}
      {isInjectedCaptcha && <GoogleRecaptcha ref={recaptchaRef} size="invisible" sitekey={siteKey} className="hidden" asyncScriptOnLoad={handleAsyncScriptLoad} />}
    </RecaptchaContext.Provider>
  );
};
