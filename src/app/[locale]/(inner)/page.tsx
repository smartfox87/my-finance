import { initTranslations } from "@/i18n";
import { Page } from "@/features/home";
import type { Metadata } from "next";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.home.title`),
    description: t(`pages.home.description`),
    keywords: t(`pages.home.keywords`),
  };
}

export default function Home() {
  return <Page />;
}
