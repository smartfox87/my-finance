import { BreadcrumbList, WebSite, WithContext } from "schema-dts";
import { LinkItem } from "@/types/breadcrumbs";

export const getJsonLdBreadcrumbs = (linksList: LinkItem[]): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: linksList.map(({ path, name }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${path}`,
      name,
    },
  })),
});

export const getJsonLdWebsite = (name: string): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url: process.env.NEXT_PUBLIC_PRODUCTION_URL,
});
