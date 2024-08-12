import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/components/Layout/inner/InnerLayout";
import ProfileModule from "@/app/[locale]/(inner)/profile/content-module";
import { Pages } from "@/types/router";
import type { Metadata } from "next";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.profile.title`),
    description: t(`pages.profile.description`),
  };
}

export default function Profile() {
  return (
    <InnerLayout page={Pages.PROFILE}>
      <ProfileModule />
    </InnerLayout>
  );
}
