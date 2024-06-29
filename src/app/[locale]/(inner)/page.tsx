import type { Metadata } from "next";
import initTranslations from "@/i18n";
import HomeContent from "@/app/[locale]/(inner)/content";
import { type Locale } from "@/types/locales";
import { allI18nNamespaces } from "@/constants/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, allI18nNamespaces);
  return {
    title: t(`pages.home.title`),
    description: t(`pages.home.description`),
    keywords: t(`pages.home.keywords`),
  };
}

export default function Home() {
  return <HomeContent />;
}
