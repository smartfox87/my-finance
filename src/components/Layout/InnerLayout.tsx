import { AuthGuard } from "@/components/Auth/AuthGuard.jsx";
import initTranslations from "@/i18n";
import { ReactNode, Suspense } from "react";
import { Breadcrumbs } from "@/components/Common/Breadcrumbs";
import { LinkItem } from "@/types/breadcrumbs";
import { type Locale, type Page } from "@/types/router";
import { Namespaces } from "@/types/i18n";

interface Props {
  locale: Locale;
  page: Page;
  isAuth?: Boolean;
  breadcrumbs?: LinkItem[];
  children: ReactNode;
}

export const InnerLayout = async ({ locale, page, isAuth = true, breadcrumbs, children }: Props) => {
  const { t } = await initTranslations(locale, [Namespaces.COMMON, page]);
  const title = t(`page.title`, { ns: page });
  const description = t(`page.description`, { ns: page });

  return (
    <section className="relative flex grow flex-col gap-4 lg:gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
          <h1 className="text-2xl font-bold lg:text-3xl" data-cy="title">
            {title}
          </h1>
          <div id="layout-header" className="flex grow empty:hidden" />
        </div>
        {description && (
          <p className="lg:text-lg" data-cy="description">
            {description}
          </p>
        )}
      </div>
      {breadcrumbs?.length && <Breadcrumbs list={breadcrumbs} />}
      <Suspense fallback={<div />}>{isAuth ? <AuthGuard>{children}</AuthGuard> : children}</Suspense>
    </section>
  );
};
