import type { Metadata } from "next";
import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/features/inner-layout";
import { ContactPageModule } from "@/features/contact";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/utils/jsonld";
import { LinkItem } from "@/types/breadcrumbs";
import { Pages } from "@/types/router";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  // todo add keywords
  return {
    title: t(`pages.contact.title`),
    description: t(`pages.contact.description`),
    // keywords: t(`pages.contact.keywords`),
  };
}

export default async function Contact({ params: { locale } }: { params: { locale: Locale } }) {
  const { t } = await initTranslations({ locale });

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "contact", name: t("navigation.contact_us") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout page={Pages.CONTACT} isAuth={false} breadcrumbs={breadcrumbList}>
        <ContactPageModule />
      </InnerLayout>
    </>
  );
}
