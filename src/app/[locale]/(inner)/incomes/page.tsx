import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import IncomesModule from "@/app/[locale]/(inner)/incomes/content-module";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/breadcrumbs";
import { type Locale, Pages } from "@/types/router";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`incomes.title`, { ns: Namespaces.INCOMES }),
    description: t(`incomes.description`, { ns: Namespaces.INCOMES }),
    keywords: t(`incomes.keywords`, { ns: Namespaces.INCOMES }),
  };
}

export default async function Incomes({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "incomes", name: t("navigation.incomes.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout locale={locale} page={Pages.INCOMES} breadcrumbs={breadcrumbList}>
        <IncomesModule />
      </InnerLayout>
    </>
  );
}
