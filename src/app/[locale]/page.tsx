// import { getDictionary } from "./dictionaries";
//
// export default async function Page({ params: { lang } }: { params: { lang: string } }) {
//   const dict = await getDictionary(lang);
//   return <div>{dict}</div>;
// }
import initTranslations from "../i18n";
import TranslationsProvider from "@/providers/TranslationsProvider";
import LanguageChanger from "@/components/LanguageChanger";

const i18nNamespaces = ["home"];

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t, resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <TranslationsProvider namespaces={i18nNamespaces} locale={locale} resources={resources}>
      <main>
        <h1>{t("header")}</h1>
        {<LanguageChanger />}
      </main>
    </TranslationsProvider>
  );
}
