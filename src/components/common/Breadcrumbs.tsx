import type { LinkItem } from "@/types/breadcrumbs";

export const Breadcrumbs = ({ list = [] }: { list: LinkItem[] }) => {
  return (
    <ol className="hidden-but-indexable" itemScope itemType="https://schema.org/BreadcrumbList">
      {list.map(({ path, name }, index) => (
        <li key={index} itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
          <a itemProp="item" href={`${process.env.NEXT_PUBLIC_PRODUCTION_URL}/${path}`} tabIndex={-1}>
            <span itemProp="name">{name}</span>
          </a>
          <meta itemProp="position" content={String(index + 1)} />
        </li>
      ))}
    </ol>
  );
};
