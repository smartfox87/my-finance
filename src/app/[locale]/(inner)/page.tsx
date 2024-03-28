import type { Metadata } from "next";
import initTranslations from "@/i18n";
import HomeContent from "@/app/[locale]/(inner)/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.home.title`),
    description: t(`pages.home.description`),
    keywords: t(`pages.home.keywords`),
  };
}

export default function Home() {
  return <HomeContent />;
}
