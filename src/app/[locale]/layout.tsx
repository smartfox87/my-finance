import "@/assets/styles/globals.css";
import { Inter } from "next/font/google";
import { i18nConfig } from "../../../i18nConfig";
import { dir } from "i18next";
import Providers from "./providers";
import { ReactNodeLike } from "prop-types";
import initTranslations from "@/i18n";

const inter = Inter({ subsets: ["latin", "cyrillic"], style: ["normal"], weight: ["400", "700", "900"] });
const i18nNamespaces = ["default"];

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params: { locale } }: { children: ReactNodeLike; params: { locale: string } }) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)}>
      <body className={inter.className + " fixed left-0 top-0 flex h-full w-full flex-col overflow-auto dark:bg-dark"}>
        <Providers locale={locale} resources={resources} i18nNamespaces={i18nNamespaces}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
