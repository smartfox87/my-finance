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

export default function Statistics({ params: { locale } }: { params: { locale: string } }) {
  return (
    <InnerLayout locale={locale} page="statistics">
      <StatisticsModule />;
    </InnerLayout>
  );
}
