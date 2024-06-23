"use client";

import { selectProfile } from "@/store/selectors/profile";
import { useSelector } from "react-redux";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth";
import { useTranslation } from "react-i18next";
import { Namespaces } from "@/types/i18n";

export default function HomeContent() {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);

  return (
    <section className="flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-xl font-black lg:text-3xl" data-cy="title">
        {t("page.title", { ns: Namespaces.HOME })}
      </h1>
      <p className="lg:text-xl xl:px-20" data-cy="description">
        {t("page.description", { ns: Namespaces.HOME })}
      </p>
      {!profile && <div className="mt-4">{<DemoUserAuth />}</div>}
    </section>
  );
}
