import type { Metadata } from "next";
import initTranslations from "@/i18n";
import HomeContent from "@/app/[locale]/(inner)/content";
import { type Locale } from "@/types/router";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`home.title`, { ns: Namespaces.HOME }),
    description: t(`home.description`, { ns: Namespaces.HOME }),
    keywords: t(`home.keywords`, { ns: Namespaces.HOME }),
  };
}

export default function Home() {
  return <HomeContent />;
}
