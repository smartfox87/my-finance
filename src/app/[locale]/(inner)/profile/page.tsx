import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ProfileModule from "@/app/[locale]/(inner)/profile/content-module";
import { type Locale } from "@/types/router";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.profile.title`),
    description: t(`pages.profile.description`),
    keywords: t(`pages.profile.keywords`),
  };
}

export default function Profile({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <InnerLayout locale={locale} page="profile">
      <ProfileModule />
    </InnerLayout>
  );
}
