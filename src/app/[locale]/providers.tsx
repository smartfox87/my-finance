import { RecaptchaProvider } from "@/providers/RecaptchaProvider";
import { Provider } from "react-redux";
import { store } from "@/store";
import { LocaleProvider } from "@/providers/LocaleProvider";
import { AntdProvider } from "@/providers/AntdProvider";
import { I18nProvider } from "@/providers/I18nProvider";
import { ModalStateProvider } from "@/providers/ModalStateProvider";
import { ReactNode } from "react";
import { Locale } from "@/types/locales";

export default function Providers({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <Provider store={store}>
      <RecaptchaProvider>
        <I18nProvider locale={locale}>
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
