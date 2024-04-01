import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import AccountsModule from "@/app/[locale]/(inner)/accounts/content-module";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.accounts.title`),
    description: t(`pages.accounts.description`),
    keywords: t(`pages.accounts.keywords`),
  };
}

export default function Accounts({ params: { locale } }: { params: { locale: string } }) {
  return (
    <InnerLayout locale={locale} page="accounts">
      <AccountsModule />
    </InnerLayout>
  );
}
