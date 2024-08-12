import type { Metadata } from "next";
import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/components/layout/inner/InnerLayout";
import BudgetsModule from "@/app/[locale]/(inner)/budgets/content-module";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/breadcrumbs";
import { Pages } from "@/types/router";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.budgets.title`),
    description: t(`pages.budgets.description`),
    keywords: t(`pages.budgets.keywords`),
  };
}

export default async function Budgets({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations({ locale });

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "budgets", name: t("navigation.budgets.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout page={Pages.BUDGETS} breadcrumbs={breadcrumbList}>
        <BudgetsModule />
      </InnerLayout>
    </>
  );
}
