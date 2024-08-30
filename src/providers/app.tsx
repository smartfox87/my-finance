"use client";

import { RecaptchaProvider } from "@/providers/recaptcha";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/locale";
import { AntdProvider } from "@/providers/antd";
import { I18nProvider } from "@/providers/i18n";
import { ModalStateProvider } from "@/providers/modal-state";
import { ReactNode } from "react";
import { Resource } from "i18next";
import InitialData from "@/providers/initial-data";

export function AppProvider({ children, i18nResources }: { children: ReactNode; i18nResources: Resource }) {
  return (
    <Provider store={store}>
      <RecaptchaProvider>
        <I18nProvider resources={i18nResources}>
          <LocaleProvider>
            <ModalStateProvider>
              <AntdProvider>
                <InitialData>{children}</InitialData>
              </AntdProvider>
            </ModalStateProvider>
          </LocaleProvider>
        </I18nProvider>
      </RecaptchaProvider>
    </Provider>
  );
}
