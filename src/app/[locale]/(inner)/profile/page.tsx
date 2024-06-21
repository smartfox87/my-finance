import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ProfileModule from "@/app/[locale]/(inner)/profile/content-module";
import { type Locale, Pages } from "@/types/router";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
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
