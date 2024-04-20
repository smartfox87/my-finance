import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import IncomesModule from "@/app/[locale]/(inner)/incomes/content-module";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.incomes.title`),
    description: t(`pages.incomes.description`),
    keywords: t(`pages.incomes.keywords`),
  };
}

export default async function Incomes({ params: { locale } }: { params: { locale: string } }) {
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
          "@id": `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/incomes`,
          name: t("navigation.incomes.full"),
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      <InnerLayout locale={locale} page="incomes">
        <IncomesModule />
      </InnerLayout>
    </>
  );
}
