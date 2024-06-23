import type { Metadata } from "next";
import initTranslations from "@/i18n";
import HomeContent from "@/app/[locale]/(inner)/content";
import { type Locale } from "@/types/router";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON, Namespaces.HOME];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`page.title`, { ns: Namespaces.HOME }),
    description: t(`page.description`, { ns: Namespaces.HOME }),
    keywords: t(`page.keywords`, { ns: Namespaces.HOME }),
  };
}

export default function Home() {
  return <HomeContent />;
}
