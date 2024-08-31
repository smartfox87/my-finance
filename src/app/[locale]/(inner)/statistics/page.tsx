import { initTranslations } from "@/i18n";
import { StatisticsPageModule } from "@/features/statistics";
import { InnerLayout } from "@/components/layout/inner-layout";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/utils/jsonld";
import { Pages } from "@/types/router";
import type { Locale } from "@/types/locales";
import type { LinkItem } from "@/types/breadcrumbs";
import type { Metadata } from "next";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.statistics.title`),
    description: t(`pages.statistics.description`),
    keywords: t(`pages.statistics.keywords`),
  };
}

export default async function Statistics({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations({ locale });

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "statistics", name: t("navigation.statistics.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout page={Pages.STATISTICS} breadcrumbs={breadcrumbList}>
        <StatisticsPageModule />
      </InnerLayout>
    </>
  );
}
