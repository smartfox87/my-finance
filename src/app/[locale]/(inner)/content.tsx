"use client";
import { selectProfile } from "@/store/selectors/profile";
import { useSelector } from "react-redux";
import { DemoUserAuth } from "@/components/Auth/DemoUserAuth";
import { useTranslation } from "react-i18next";

export default function HomeContent() {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);

  return (
    <main className="flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-3xl font-black">{t("pages.home.title")}</h1>
      <p className="text-xl xl:px-20">{t("pages.home.description")}</p>
      {!profile && (
        <div className="mt-4">
          <DemoUserAuth />
        </div>
      )}
    </main>
  );
}
