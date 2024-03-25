// import LanguageChanger from "@/components/LanguageChanger";
import { useTranslation } from "react-i18next";
import type { Metadata } from "next";
import initTranslations from "@/i18n";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.home.title`),
    description: t(`pages.home.description`),
    keywords: t(`pages.home.keywords`),
  };
}

export default async function Home({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return (
    <main>
      <h1>{t("pages.home.title")}</h1>
      {/*{<LanguageChanger />}*/}
    </main>
  );
}
