import type { Metadata } from "next";
import initTranslations from "@/i18n";
import StatisticsModule from "@/app/[locale]/(inner)/statistics/content-module";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/breadcrumbs";
import { type Locale, Pages } from "@/types/router";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`statistics.title`, { ns: Namespaces.STATISTICS }),
    description: t(`statistics.description`, { ns: Namespaces.STATISTICS }),
    keywords: t(`statistics.keywords`, { ns: Namespaces.STATISTICS }),
  };
}

export default async function Statistics({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "statistics", name: t("navigation.statistics.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout locale={locale} page={Pages.STATISTICS} breadcrumbs={breadcrumbList}>
        <StatisticsModule />
      </InnerLayout>
    </>
  );
}
