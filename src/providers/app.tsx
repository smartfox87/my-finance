"use client";

import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/items/locale";
import { I18nProvider } from "@/providers/items/i18n";
import { CSSVariablesInitialization } from "@/providers/items/css";
import type { ReactNode } from "react";
import type { Resource } from "i18next";

export function AppProvider({ children, i18nResources }: { children: ReactNode; i18nResources: Resource }) {
  return (
    <Provider store={store}>
      <I18nProvider resources={i18nResources}>
        <LocaleProvider>
          <CSSVariablesInitialization>{children}</CSSVariablesInitialization>
        </LocaleProvider>
      </I18nProvider>
    </Provider>
  );
}
