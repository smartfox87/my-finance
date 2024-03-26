import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { ContactContent } from "@/app/[locale]/(inner)/contact/content";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.contact.title`),
    description: t(`pages.contact.description`),
    keywords: t(`pages.contact.keywords`),
  };
}

export default function Contact() {
  return <ContactContent />;
}
