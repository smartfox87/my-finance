import { BreadcrumbList, WithContext } from "schema-dts";

export type LinkType = {
  path: string;
  name: string;
};

export const getJsonLdBreadcrumbs = (linksList: LinkType[]): WithContext<BreadcrumbList> => ({
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
