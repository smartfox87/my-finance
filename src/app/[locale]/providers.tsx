"use client";
import { RecaptchaProvider } from "@/providers/RecaptchaProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import TranslationsProvider from "@/providers/TranslationsProvider";
import { ReactNodeLike } from "prop-types";

export default function Providers({ children, locale, resources, i18nNamespaces }: { children: ReactNodeLike; locale: string; resources: any; i18nNamespaces: string[] }) {
  return (
    <Provider store={store}>
      <RecaptchaProvider>
        <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
          <LocaleProvider>
            <AntdProvider>{children}</AntdProvider>
          </LocaleProvider>
        </TranslationsProvider>
      </RecaptchaProvider>
    </Provider>
  );
}
