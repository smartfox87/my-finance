import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import BudgetsModule from "@/app/[locale]/(inner)/budgets/content-module";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/Breadcrumbs";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.budgets.title`),
    description: t(`pages.budgets.description`),
    keywords: t(`pages.budgets.keywords`),
  };
}

export default async function Budgets({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "budgets", name: t("navigation.budgets.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout locale={locale} page="budgets" breadcrumbs={breadcrumbList}>
        <BudgetsModule />
      </InnerLayout>
    </>
  );
}