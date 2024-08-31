import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/components/layout/inner-layout";
import { SettingsPageModule } from "@/features/profile";
import { Pages } from "@/types/router";
import type { Metadata } from "next";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.settings.title`),
    description: t(`pages.settings.description`),
  };
}

export default function Settings() {
  return (
    <InnerLayout page={Pages.SETTINGS}>
      <SettingsPageModule />
    </InnerLayout>
  );
}
