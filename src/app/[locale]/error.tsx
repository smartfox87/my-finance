"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SimpleButton } from "@/components/Form/SimpleButton";
import * as Sentry from "@sentry/nextjs";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useTranslation();

  useEffect(() => {
    console.error(error);
    if (process.env.NODE_ENV === "production") Sentry.captureException(error);
  }, [error]);

  return (
    <section className="flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-xl font-black lg:text-3xl">{t("common.error")}</h1>
      <SimpleButton type="primary" onClick={() => reset()}>
        {t("buttons.try_again")}
      </SimpleButton>
    </section>
  );
}
