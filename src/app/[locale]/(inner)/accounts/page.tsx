import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import AccountsModule from "@/app/[locale]/(inner)/accounts/content-module";
import { getJsonLdBreadcrumbs, LinkType } from "@/helpers/jsonLd";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.accounts.title`),
    description: t(`pages.accounts.description`),
    keywords: t(`pages.accounts.keywords`),
  };
}

export default async function Accounts({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkType[] = [
    { path: "", name: t("navigation.home") },
    { path: "accounts", name: t("navigation.accounts.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <InnerLayout locale={locale} page="accounts">
        <AccountsModule />
      </InnerLayout>
    </>
  );
}
