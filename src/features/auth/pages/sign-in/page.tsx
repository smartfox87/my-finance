"use client";

import { DemoUserAuth, GoogleAuth, SignIn } from "../../components";
import { useTranslation } from "react-i18next";

export default function Page() {
  const { t } = useTranslation();

  return (
    <section className="mx-auto flex max-w-[600px] grow flex-col gap-y-6">
      <header className="sticky top-0 z-20 mb-auto flex flex-col gap-4 bg-white py-5 dark:bg-dark-modal">{t("titles.authorisation")}</header>
      <SignIn />
      <div className="sticky bottom-0 z-20 mt-auto flex flex-col gap-4 bg-white py-5 dark:bg-dark-modal">
        <DemoUserAuth />
        <GoogleAuth />
      </div>
    </section>
  );
}
