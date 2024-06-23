"use client";
import { RecaptchaProvider } from "@/providers/RecaptchaProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import TranslationsProvider from "@/providers/TranslationsProvider";
import { ModalStateProvider } from "@/providers/ModalStateProvider";
import { ReactNode, Suspense } from "react";
import { Spinner } from "@/components/Layout/Spinner";

export default function Providers({ children, locale, resources, i18nNamespaces }: { children: ReactNode; locale: string; resources: any; i18nNamespaces: string[] }) {
  return (
    <Provider store={store}>
      <RecaptchaProvider>
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
          <LocaleProvider>
            <Suspense fallback={<Spinner isVisible />}>
              <ModalStateProvider>
                <AntdProvider>{children}</AntdProvider>
              </ModalStateProvider>
            </Suspense>
          </LocaleProvider>
        </TranslationsProvider>
      </RecaptchaProvider>
    </Provider>
  );
}
