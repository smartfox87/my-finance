import { AuthGuard } from "@/components/Auth/AuthGuard.jsx";
import { ReactNodeLike } from "prop-types";
import initTranslations from "@/i18n";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/Common/Breadcrumbs";
import { LinkType } from "@/helpers/jsonLd";

const i18nNamespaces = ["default"];

type LayoutPropsType = {
  locale: string;
  page: string;
  isAuth?: Boolean;
  breadcrumbs: LinkType[];
  children: ReactNodeLike;
};

export const InnerLayout = async ({ locale, page, isAuth = true, breadcrumbs, children }: LayoutPropsType) => {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const title = t(`pages.${page}.title`);
  const description = t(`pages.${page}.description`);

  return (
    <section className="relative flex grow flex-col gap-4 lg:gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="text-2xl font-bold lg:text-3xl">{title}</h1>
          <div id="layout-header" className="flex grow empty:hidden" />
        </div>
        {description && <p className="lg:text-lg">{description}</p>}
      </div>
      <Breadcrumbs list={breadcrumbs} />
      <Suspense fallback={<div />}>{isAuth ? <AuthGuard>{children}</AuthGuard> : children}</Suspense>
    </section>
  );
};
