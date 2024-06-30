// import { I18nextProvider } from "react-i18next";
// import initTranslations from "../i18n";
// import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
// import { type I18nNamespace, Locale } from "@/types/locales";
// import { i18n, Resource, TFunction } from "i18next";
//
// interface Props {
//   children: ReactNode;
//   locale: Locale;
// }
//
// interface I18nContextType {
//   i18n: i18n;
//   t: TFunction;
//   namespaces: I18nNamespace[];
//   resources: Resource;
//   initI18n: () => Promise<void>;
//   language?: Locale;
// }
//
// export const I18nContext = createContext<I18nContextType | undefined>(undefined);
//
// export default async function I18nProvider({ children, locale }: Props) {
//   const [state, setState] = useState<Omit<I18nContextType, "initI18n"> | undefined>();
//
//   const initI18n = useCallback(async () => {
//     const response = await initTranslations({ locale });
//     setState({ ...response, language: locale });
//   }, [locale]);
//   if (!state) await initI18n();
//
//   const contextValue = useMemo(() => (state ? { ...state, initI18n } : undefined), [state, initI18n]);
//
//   return (
//     state && (
//       <I18nContext.Provider value={contextValue}>
//         <I18nextProvider i18n={state.i18n}>{children}</I18nextProvider>
//       </I18nContext.Provider>
//     )
//   );
// }
import { I18nextProvider } from "react-i18next";
import { ReactNode } from "react";
import { initTranslations } from "@/i18n";
import { Locale } from "@/types/locales";

export async function I18nProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  const response = await initTranslations({ locale });

  return <I18nextProvider i18n={response.i18n}>{children}</I18nextProvider>;
}
