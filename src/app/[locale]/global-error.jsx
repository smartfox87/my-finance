"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";
import { SimpleButton } from "../../components/Form/SimpleButton.tsx";

export default function GlobalError({ error }) {
  useEffect(() => {
    Sentry.captureException(error);
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
