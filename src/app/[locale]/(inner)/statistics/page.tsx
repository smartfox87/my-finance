import type { Metadata } from "next";
import initTranslations from "@/i18n";
import StatisticsModule from "@/app/[locale]/(inner)/statistics/content-module";
import { InnerLayout } from "@/components/Layout/InnerLayout";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.statistics.title`),
    description: t(`pages.statistics.description`),
    keywords: t(`pages.statistics.keywords`),
  };
}

export default async function Statistics({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const jsonLdBreadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/`,
          name: t("navigation.home"),
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/statistics`,
          name: t("navigation.statistics.full"),
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      <InnerLayout locale={locale} page="statistics">
        <StatisticsModule />
      </InnerLayout>
    </>
  );
}
