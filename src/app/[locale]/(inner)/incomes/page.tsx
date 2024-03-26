import type { Metadata } from "next";
import initTranslations from "@/i18n";
import IncomesContent from "@/app/[locale]/(inner)/incomes/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.incomes.title`),
    description: t(`pages.incomes.description`),
    keywords: t(`pages.incomes.keywords`),
  };
}

export default function Incomes() {
  return <IncomesContent />;
}
