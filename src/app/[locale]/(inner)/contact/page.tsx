import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ContactModule from "@/app/[locale]/(inner)/contact/content-module";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.contact.title`),
    description: t(`pages.contact.description`),
    keywords: t(`pages.contact.keywords`),
  };
}

export default function Contact({ params: { locale } }: { params: { locale: string } }) {
  return (
    <InnerLayout locale={locale} page="contact" isAuth={false}>
      <ContactModule />
    </InnerLayout>
  );
}
