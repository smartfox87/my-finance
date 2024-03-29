import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import BudgetsModule from "@/app/[locale]/(inner)/budgets/content-module";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.budgets.title`),
    description: t(`pages.budgets.description`),
    keywords: t(`pages.budgets.keywords`),
  };
}

export default function Budgets({ params: { locale } }: { params: { locale: string } }) {
  return (
    <InnerLayout locale={locale} page="budgets">
      <BudgetsModule />
    </InnerLayout>
  );
}
