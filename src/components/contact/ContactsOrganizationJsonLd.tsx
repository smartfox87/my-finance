import type { Organization, WithContext } from "schema-dts";
import { languages } from "@/constants/router";
import { useTranslation } from "react-i18next";

export const ContactsOrganizationJsonLd = () => {
  const { t } = useTranslation();
  const jsonLdOrganization: WithContext<Organization> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: `${t("seo.app_name")} & A.D.`,
    legalName: "Andrei Dyminski",
    url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
    logo: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/assets/favicon/maskable-icon-512x512.png`,
    foundingDate: "2023",
    founder: [
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

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }} />;
};
