"use client";

import { selectProfile } from "@/features/profile";
import { DemoUserAuth } from "@/components/demo-user-auth";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/hooks/store";

export function Page() {
  const { t } = useTranslation();
  const profile = useAppSelector(selectProfile);

  return (
    <section className="flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-xl font-black lg:text-3xl" data-cy="title">
        {t("pages.home.title")}
      </h1>
      <p className="lg:text-xl xl:px-20" data-cy="description">
        {t("pages.home.description")}
      </p>
      {!profile && <div className="mt-4">{<DemoUserAuth />}</div>}
    </section>
  );
}
