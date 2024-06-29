import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ProfileModule from "@/app/[locale]/(inner)/profile/content-module";
import { Pages } from "@/types/router";
import { type Locale } from "@/types/locales";
import { allI18nNamespaces } from "@/constants/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, allI18nNamespaces);
  return {
    title: t(`pages.profile.title`),
    description: t(`pages.profile.description`),
  };
}

export default function Profile({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <InnerLayout locale={locale} page={Pages.PROFILE}>
      <ProfileModule />
    </InnerLayout>
  );
}
