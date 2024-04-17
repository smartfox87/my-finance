import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import ContactModule from "@/app/[locale]/(inner)/contact/content-module";
import Script from "next/script";
import { languages } from "@/initial-data/router";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.contact.title`),
    description: t(`pages.contact.description`),
    keywords: t(`pages.contact.keywords`),
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "My Finance & A.D.",
  legalName: "Andrei Dyminski",
  url: process.env.NEXT_PRODUCTION_URL,
  logo: `${process.env.NEXT_PRODUCTION_URL}/assets/favicon/maskable-icon-512x512.png`,
  foundingDate: "2023",
  founders: [
    {
      "@type": "Person",
      name: "Andrei Dyminski",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+48-573-098-898",
      contactType: "customer service",
      availableLanguage: ["English", "Russian"],
      areaServed: "PL",
    },
    {
      "@type": "ContactPoint",
      email: "contact@myfinance.day",
      contactType: "customer service",
      availableLanguage: languages,
      areaServed: "PL",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Waska 15",
    addressLocality: "Bialystok",
    postalCode: "15481",
    addressCountry: "PL",
  },
};

export default function Contact({ params: { locale } }: { params: { locale: string } }) {
  return (
    <>
      <Script id="schema-contact" type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </Script>
      <InnerLayout locale={locale} page="contact" isAuth={false}>
        <ContactModule />
      </InnerLayout>
    </>
  );
}
