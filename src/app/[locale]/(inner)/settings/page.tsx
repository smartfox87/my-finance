import type { Metadata } from "next";
import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import SettingsModule from "@/app/[locale]/(inner)/settings/content-module";
import { Pages } from "@/types/router";
import { type Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.settings.title`),
    description: t(`pages.settings.description`),
  };
}

export default function Settings({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <InnerLayout page={Pages.SETTINGS}>
      <SettingsModule />
    </InnerLayout>
  );
}
