import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ContactModule from "@/app/[locale]/(inner)/contact/content-module";
import { getJsonLdBreadcrumbs } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/Breadcrumbs";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.contact.title`),
    description: t(`pages.contact.description`),
    keywords: t(`pages.contact.keywords`),
  };
}

export default async function Contact({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "contact", name: t("navigation.contact_us") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <InnerLayout locale={locale} page="contact" isAuth={false} breadcrumbs={breadcrumbList}>
        <ContactModule />
      </InnerLayout>
    </>
  );
}
