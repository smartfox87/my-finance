import type { Metadata } from "next";
import initTranslations from "@/i18n";
import BudgetsContent from "@/app/[locale]/(inner)/budgets/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.budgets.title`),
    description: t(`pages.budgets.description`),
    keywords: t(`pages.budgets.keywords`),
  };
}

export default function Budgets() {
  return <BudgetsContent />;
}
