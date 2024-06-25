"use client";

import { createContext, createRef, forwardRef, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import * as Sentry from "@sentry/nextjs";
import ReCAPTCHA, { type ReCAPTCHAProps } from "react-google-recaptcha";

interface RecaptchaContextType {
  initCaptcha: () => void;
  isLoadedCaptcha: boolean;
  getScore: (options?: { action?: string }) => Promise<number>;
}

const siteKey = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;

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

export const RecaptchaProvider = ({ children }: { children: ReactNode }) => {
  if (!siteKey) throw new Error("RECAPTCHA_SITE_KEY is not defined in .env");
  const recaptchaRef = createRef<ReCAPTCHA>();

  const [isInjectedCaptcha, setIsInjectedCaptcha] = useState(false);
  const [isLoadedCaptcha, setIsLoadedCaptcha] = useState(false);

  const initCaptcha = useCallback(() => setIsInjectedCaptcha(true), []);
  const handleAsyncScriptLoad = useCallback(() => setIsLoadedCaptcha(true), []);

  const getScore = useCallback(async ({ action = "signup" } = {}) => {
    if (recaptchaRef.current) {
      try {
        // if (!("executeAsync" in recaptchaRef.current)) throw new Error("executeAsync is not supported in this version of react-google-recaptcha");
        // const value = await recaptchaRef.current?.executeAsync();
        const value = await recaptchaRef.current?.executeAsync();
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
        if (process.env.NODE_ENV === "production") Sentry.captureException(error);
        return 0.9;
      }
    }
  }, []);

  useEffect(() => {
    if ("recaptchaOptions" in window) window.recaptchaOptions = { enterprise: true };
  }, []);

  const contextValue = useMemo(() => ({ initCaptcha, isLoadedCaptcha, getScore }), [initCaptcha, isLoadedCaptcha, getScore]);

  return (
    <RecaptchaContext.Provider value={contextValue}>
      {children}
      {isInjectedCaptcha && <GoogleRecaptcha ref={recaptchaRef} size="invisible" sitekey={siteKey} className="hidden" asyncScriptOnLoad={handleAsyncScriptLoad} />}
    </RecaptchaContext.Provider>
  );
};
