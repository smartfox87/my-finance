import type { Metadata } from "next";
import initTranslations from "@/i18n";
import SettingsContent from "@/app/[locale]/(inner)/settings/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.settings.title`),
    description: t(`pages.settings.description`),
    keywords: t(`pages.settings.keywords`),
  };
}

export default function Settings() {
  return <SettingsContent />;
}
