import type { Metadata } from "next";
import initTranslations from "@/i18n";
import ProfileContent from "@/app/[locale]/(inner)/profile/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.profile.title`),
    description: t(`pages.profile.description`),
    keywords: t(`pages.profile.keywords`),
  };
}

export default function Profile() {
  return <ProfileContent />;
}
