"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SimpleButton } from "@/components/simple-button/simple-button";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { IS_PRODUCTION } from "@/constants/config";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect((): void => {
    if (IS_PRODUCTION) Sentry.captureException(error);
  }, [error]);

  return (
    <section className="container flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-xl font-black lg:text-3xl">{t("notifications.error.common")}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <SimpleButton type="primary" onClick={router.refresh}>
          {t("buttons.try_again")}
        </SimpleButton>
        <SimpleButton type="primary" onClick={() => router.push("/")}>
          {t("buttons.go_home")}
        </SimpleButton>
      </div>
    </section>
  );
}
