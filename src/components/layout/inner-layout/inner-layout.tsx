"use client";

import { AuthGuard } from "../auth-guard";
import { ReactNode, Suspense } from "react";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Spinner } from "@/components/loading/spinner";
import { useTranslation } from "react-i18next";
import type { LinkItem } from "@/types/breadcrumbs";
import type { Page } from "@/types/router";

interface Props {
  page: Page;
  isAuth?: boolean;
  breadcrumbs?: LinkItem[];
  children: ReactNode;
}

export const InnerLayout = ({ page, isAuth = true, breadcrumbs, children }: Props) => {
  const { t } = useTranslation();
  const title = t(`pages.${page}.title`);
  const description = t(`pages.${page}.description`);

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
      <Suspense fallback={<Spinner isVisible />}>{isAuth ? <AuthGuard>{children}</AuthGuard> : children}</Suspense>
    </section>
  );
};
