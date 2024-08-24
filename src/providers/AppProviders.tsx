"use client";

import { RecaptchaProvider } from "@/providers/RecaptchaProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { ModalStateProvider } from "@/providers/ModalStateProvider";
import { ReactNode } from "react";
import { Resource } from "i18next";

export function AppProviders({ children, i18nResources }: { children: ReactNode; i18nResources: Resource }) {
  return (
    <Provider store={store}>
      <RecaptchaProvider>
        <I18nProvider resources={i18nResources}>
          <LocaleProvider>
            <ModalStateProvider>
              <AntdProvider>{children}</AntdProvider>
            </ModalStateProvider>
          </LocaleProvider>
        </I18nProvider>
      </RecaptchaProvider>
    </Provider>
  );
}
