import { BreadcrumbList, WithContext } from "schema-dts";
import { LinkItem } from "@/types/Breadcrumbs";

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
