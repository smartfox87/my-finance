"use client";

import { RecaptchaProvider } from "@/providers/items/recaptcha";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/items/locale";
import { AntdProvider } from "@/providers/items/antd";
import { I18nProvider } from "@/providers/items/i18n";
import { ModalStateProvider } from "@/providers/items/modals";
import { CSSVariablesInitialization } from "@/providers/items/css";
import type { ReactNode } from "react";
import type { Resource } from "i18next";

export function AppProvider({ children, i18nResources }: { children: ReactNode; i18nResources: Resource }) {
  return (
    <Provider store={store}>
      <RecaptchaProvider>
        <I18nProvider resources={i18nResources}>
          <LocaleProvider>
            <ModalStateProvider>
              <AntdProvider>
                <CSSVariablesInitialization>{children}</CSSVariablesInitialization>
              </AntdProvider>
            </ModalStateProvider>
          </LocaleProvider>
        </I18nProvider>
      </RecaptchaProvider>
    </Provider>
  );
}
