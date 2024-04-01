import { AuthGuard } from "@/components/Auth/AuthGuard.jsx";
import { ReactNodeLike } from "prop-types";
import initTranslations from "@/i18n";
import { Suspense } from "react";

const i18nNamespaces = ["default"];

export const InnerLayout = async ({ locale, page, isAuth = true, children }: { locale: string; page: string; isAuth?: Boolean; children: ReactNodeLike }) => {
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
      <Suspense fallback={<div />}>{isAuth ? <AuthGuard>{children}</AuthGuard> : children}</Suspense>
    </section>
  );
};
