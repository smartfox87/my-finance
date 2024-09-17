"use client";

import { createContext, createRef, forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { captureException } from "@sentry/nextjs";
import { IS_PRODUCTION, RECAPTCHA_SITE_KEY } from "@/constants/config";
import ReCAPTCHA, { type ReCAPTCHAProps } from "react-google-recaptcha";
import type { ComponentChildrenProps } from "@/types/common";
import type { GetScore, RecaptchaContextType } from "@/types/providers/recaptcha";

const GoogleRecaptcha = dynamic(
  () =>
    import("react-google-recaptcha").then((mod) =>
      forwardRef<ReCAPTCHA, ReCAPTCHAProps>(function GoogleRecaptchaRef(props, ref) {
        return <mod.default {...props} ref={ref} />;
      }),
    ),
  {
    ssr: false,
  },
);

export const RecaptchaContext = createContext<RecaptchaContextType | undefined>(undefined);

export const RecaptchaProvider = ({ children }: ComponentChildrenProps) => {
  if (!RECAPTCHA_SITE_KEY) throw new Error("RECAPTCHA_SITE_KEY is not defined in .env");
  const recaptchaRef = createRef<ReCAPTCHA>();

  const [isInjectedCaptcha, setIsInjectedCaptcha] = useState(false);
  const [isLoadedCaptcha, setIsLoadedCaptcha] = useState(false);

  const initCaptcha = useCallback((): void => setIsInjectedCaptcha(true), []);
  const handleAsyncScriptLoad = useCallback((): void => setIsLoadedCaptcha(true), []);

  const getScore: GetScore = useCallback(async ({ action = "signup" } = {}) => {
    try {
      if (!recaptchaRef.current) throw new Error("Recaptcha is not initialized");
      const value = await recaptchaRef.current.executeAsync();
      const body = { token: value, expectedAction: action, siteKey: RECAPTCHA_SITE_KEY };
      const { score, error } = await fetch("/api/recaptcha", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json());
      if (!score && error) throw new Error(error);
      return score;
    } catch (error) {
      if (IS_PRODUCTION) captureException(error);
      return 0.999;
    }
  }, []);

  useEffect((): void => {
    if ("recaptchaOptions" in window) window.recaptchaOptions = { enterprise: true };
  }, []);

  const contextValue = useMemo((): RecaptchaContextType => ({ initCaptcha, isLoadedCaptcha, getScore }), [initCaptcha, isLoadedCaptcha, getScore]);

  return (
    <RecaptchaContext.Provider value={contextValue}>
      {children}
      {isInjectedCaptcha && <GoogleRecaptcha ref={recaptchaRef} size="invisible" sitekey={RECAPTCHA_SITE_KEY} className="hidden" asyncScriptOnLoad={handleAsyncScriptLoad} />}
    </RecaptchaContext.Provider>
  );
};
