import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ExpensesModule from "@/app/[locale]/(inner)/expenses/content-module";
import { getJsonLdBreadcrumbs, LinkType } from "@/helpers/jsonLd";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.expenses.title`),
    description: t(`pages.expenses.description`),
    keywords: t(`pages.expenses.keywords`),
  };
}

export default async function Expenses({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkType[] = [
    { path: "", name: t("navigation.home") },
    { path: "expenses", name: t("navigation.expenses.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <InnerLayout locale={locale} page="expenses" breadcrumbs={breadcrumbList}>
        <ExpensesModule />
      </InnerLayout>
    </>
  );
}
