import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ExpensesModule from "@/app/[locale]/(inner)/expenses/content-module";

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
          "@id": `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/expenses`,
          name: t("navigation.expenses.full"),
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      <InnerLayout locale={locale} page="expenses">
        <ExpensesModule />
      </InnerLayout>
    </>
  );
}
