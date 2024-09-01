"use client";

import { useEffect } from "react";
import { SimpleButton } from "@/components/simple-button/simple-button";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";
import { IS_PRODUCTION } from "@/constants/config";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  const router = useRouter();

  useEffect(() => {
    console.error("global error:", error);
    if (IS_PRODUCTION) Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="fixed left-0 top-0 flex h-full w-full flex-col overflow-auto dark:bg-dark">
        <section className="container flex grow flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-xl font-black lg:text-3xl">Something went wrong!</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <SimpleButton type="primary" onClick={router.refresh}>
              Try again
            </SimpleButton>
            <SimpleButton type="primary" onClick={() => router.push("/")}>
              Go home
            </SimpleButton>
          </div>
        </section>
      </body>
    </html>
  );
}
