import { PRODUCTION_URL } from "@/constants/config";
import type { LinkItem } from "@/types/breadcrumbs";
import type { BreadcrumbList, WebSite, WithContext } from "schema-dts";

export const getJsonLdBreadcrumbs = (linksList: LinkItem[]): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: linksList.map(({ path, name }, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@id": `${PRODUCTION_URL}/${path}`,
      name,
    },
  })),
});

export const getJsonLdWebsite = (name: string): WithContext<WebSite> => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name,
  url: PRODUCTION_URL,
});
