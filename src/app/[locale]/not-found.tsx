"use client";

import { useTranslation } from "react-i18next";
import { SimpleButton } from "@/components/simple-button";
import { useRouter } from "next/navigation";
import { ButtonTypes } from "@/types/button";

export default function NotFoundPage() {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <section className="flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-xl font-black xl:text-3xl">404</h1>
      <SimpleButton type={ButtonTypes.PRIMARY} onClick={() => router.push("/")}>
        {t("buttons.go_home")}
      </SimpleButton>
    </section>
  );
}
