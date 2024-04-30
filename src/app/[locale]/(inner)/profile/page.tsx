import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ProfileModule from "@/app/[locale]/(inner)/profile/content-module";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.profile.title`),
    description: t(`pages.profile.description`),
    keywords: t(`pages.profile.keywords`),
  };
}

export default function Profile({ params: { locale } }: { params: { locale: string } }) {
  return (
    <InnerLayout locale={locale} page="profile">
      <ProfileModule />
    </InnerLayout>
  );
}
