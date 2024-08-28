import "@/assets/styles/globals.css";
import { i18nConfig } from "../../../i18nConfig";
import { dir } from "i18next";
import { AppProvider } from "@/providers/app";
import { initTranslations } from "@/i18n";
import { getAppMetadata } from "@/helpers/metadata";
import type { Metadata, Viewport } from "next";
import type { Locale } from "@/types/locales";
import type { ReactNode } from "react";
// todo speed-insights
// import { SpeedInsights } from "@vercel/speed-insights/next";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });

  return getAppMetadata({ t });
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNode; params: { locale: Locale } }) {
  const { resources } = await initTranslations({ locale });
  return (
    <html lang={locale} dir={dir(locale)} className="flex h-[calc(100_*_var(--vh))] w-[calc(100_*_var(--vw))] flex-col">
      <body className="flex w-full grow flex-col dark:bg-dark">
        {/*<SpeedInsights />*/}
        <AppProvider i18nResources={resources}>{children}</AppProvider>
      </body>
    </html>
  );
}
