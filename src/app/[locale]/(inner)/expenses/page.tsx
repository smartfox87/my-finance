import type { Metadata } from "next";
import initTranslations from "@/i18n";
import CostsContent from "@/app/[locale]/(inner)/expenses/content";
import { InnerLayout } from "@/components/Layout/InnerLayout";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.expenses.title`),
    description: t(`pages.expenses.description`),
    keywords: t(`pages.expenses.keywords`),
  };
}

export default async function Costs({ params: { locale } }: { params: { locale: string } }) {
  return (
    <InnerLayout locale={locale} page="expenses">
      <CostsContent />;
    </InnerLayout>
  );
}
