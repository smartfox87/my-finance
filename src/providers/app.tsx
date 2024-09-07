"use client";

import { RecaptchaProvider } from "@/providers/recaptcha";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/locale";
import { AntdProvider } from "@/providers/antd";
import { I18nProvider } from "@/providers/i18n";
import { ModalStateProvider } from "@/providers/modals";
import { ReferencesLoading } from "@/providers/references";
import { AccountsLoading } from "./accounts";
import { ProfileLoading } from "@/features/profile";
import { AuthInitialisation } from "@/providers/auth";
import { CSSVariablesInitialisation } from "@/providers/css";
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
                <CSSVariablesInitialisation>
                  <ReferencesLoading>
                    <AuthInitialisation>
                      <AccountsLoading>
                        <ProfileLoading>{children}</ProfileLoading>
                      </AccountsLoading>
                    </AuthInitialisation>
                  </ReferencesLoading>
                </CSSVariablesInitialisation>
              </AntdProvider>
            </ModalStateProvider>
          </LocaleProvider>
        </I18nProvider>
      </RecaptchaProvider>
    </Provider>
  );
}
