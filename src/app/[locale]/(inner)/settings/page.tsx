import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import SettingsModule from "@/app/[locale]/(inner)/settings/content-module";
import { type Locale } from "@/types/router";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.settings.title`),
    description: t(`pages.settings.description`),
    keywords: t(`pages.settings.keywords`),
  };
}

export default function Settings({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <InnerLayout locale={locale} page="settings">
      <SettingsModule />
    </InnerLayout>
  );
}
