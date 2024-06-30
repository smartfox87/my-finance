import type { Metadata } from "next";
import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ExpensesModule from "@/app/[locale]/(inner)/expenses/content-module";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/breadcrumbs";
import { Pages } from "@/types/router";
import { type Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.expenses.title`),
    description: t(`pages.expenses.description`),
    keywords: t(`pages.expenses.keywords`),
  };
}

export default async function Expenses({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations({ locale });

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "expenses", name: t("navigation.expenses.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout locale={locale} page={Pages.EXPENSES} breadcrumbs={breadcrumbList}>
        <ExpensesModule />
      </InnerLayout>
    </>
  );
}
