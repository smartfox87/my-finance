import { createContext, createRef, forwardRef, useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { captureException } from "@sentry/nextjs";
import ReCAPTCHA, { type ReCAPTCHAProps } from "react-google-recaptcha";
import type { ComponentChildrenProps } from "@/types/common";
import type { RecaptchaContextType } from "@/types/providers/recaptchaProvider";

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

export const RecaptchaProvider = ({ children }: ComponentChildrenProps) => {
  if (!siteKey) throw new Error("RECAPTCHA_SITE_KEY is not defined in .env");
  const recaptchaRef = createRef<ReCAPTCHA>();

  const [isInjectedCaptcha, setIsInjectedCaptcha] = useState(false);
  const [isLoadedCaptcha, setIsLoadedCaptcha] = useState(false);

  const initCaptcha = useCallback((): void => setIsInjectedCaptcha(true), []);
  const handleAsyncScriptLoad = useCallback((): void => setIsLoadedCaptcha(true), []);

  const getScore = useCallback(async ({ action = "signup" }: { action?: string } = {}): Promise<number> => {
    try {
      if (!recaptchaRef.current) throw new Error("Recaptcha is not initialized");
      const value = await recaptchaRef.current.executeAsync();
      const body = { token: value, expectedAction: action, siteKey: siteKey };
      const { score, error } = await fetch("/api/recaptcha", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).then((res) => res.json());
      if (!score && error) throw new Error(error);
      return score;
    } catch (error) {
      if (process.env.NODE_ENV === "production") captureException(error);
      return 0.999;
    }
  }, []);

  useEffect((): void => {
    if ("recaptchaOptions" in window) window.recaptchaOptions = { enterprise: true };
  }, []);

  // todo add ts types
  const contextValue = useMemo(() => ({ initCaptcha, isLoadedCaptcha, getScore }), [initCaptcha, isLoadedCaptcha, getScore]);

  return (
    <RecaptchaContext.Provider value={contextValue}>
      {children}
      {isInjectedCaptcha && <GoogleRecaptcha ref={recaptchaRef} size="invisible" sitekey={siteKey} className="hidden" asyncScriptOnLoad={handleAsyncScriptLoad} />}
    </RecaptchaContext.Provider>
  );
};
