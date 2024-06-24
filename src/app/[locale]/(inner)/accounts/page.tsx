import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import AccountsModule from "@/app/[locale]/(inner)/accounts/content-module";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import type { LinkItem } from "@/types/breadcrumbs";
import { type Locale, Pages } from "@/types/router";
import { ReactElement } from "react";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.accounts.title`),
    description: t(`pages.accounts.description`),
    keywords: t(`pages.accounts.keywords`),
  };
}

export default async function Accounts({ params: { locale } }: { params: { locale: Locale } }): Promise<ReactElement> {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "accounts", name: t("navigation.accounts.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout locale={locale} page={Pages.ACCOUNTS} breadcrumbs={breadcrumbList}>
        <AccountsModule />
      </InnerLayout>
    </>
  );
}
