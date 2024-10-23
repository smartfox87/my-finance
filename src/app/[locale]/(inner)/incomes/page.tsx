import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/features/inner-layout";
import { IncomesPageModule } from "@/features/incomes";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/utils/get-jsonld";
import { Pages } from "@/types/router";
import type { Metadata } from "next";
import type { LinkItem } from "@/types/breadcrumbs";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.incomes.title`),
    description: t(`pages.incomes.description`),
    keywords: t(`pages.incomes.keywords`),
  };
}

export default async function Incomes({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations({ locale });

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "incomes", name: t("navigation.incomes.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout page={Pages.INCOMES} breadcrumbs={breadcrumbList}>
        <IncomesPageModule />
      </InnerLayout>
    </>
  );
}
