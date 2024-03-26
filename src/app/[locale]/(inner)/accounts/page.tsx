import type { Metadata } from "next";
import initTranslations from "@/i18n";
import AccountsContent from "@/app/[locale]/(inner)/accounts/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.accounts.title`),
    description: t(`pages.accounts.description`),
    keywords: t(`pages.accounts.keywords`),
  };
}

export default function Accounts() {
  return <AccountsContent />;
}
