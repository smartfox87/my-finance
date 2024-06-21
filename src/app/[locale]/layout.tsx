import "@/assets/styles/globals.css";
import { i18nConfig } from "../../../i18nConfig";
import { dir } from "i18next";
import Providers from "./providers";
import { ReactNodeLike } from "prop-types";
import initTranslations from "@/i18n";
import type { Metadata, Viewport } from "next";
import { type Locale } from "@/types/router";
import { Namespaces } from "@/types/i18n";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  const APP_NAME = t("seo.app_name");
  const APP_TITLE_TEMPLATE = `%s - ${APP_NAME}`;
  const APP_DEFAULT_TITLE = t("pages.home.title");
  const APP_DESCRIPTION = t("pages.home.description");

  return {
    applicationName: APP_NAME,
    manifest: "/manifest.json",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: APP_DEFAULT_TITLE,
      // startUpImage: [],
    },
    formatDetection: {
      telephone: false,
    },
    openGraph: {
      type: "website",
      siteName: APP_NAME,
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_PRODUCTION_URL}/assets/images/open-graph.jpg`,
          width: 1200,
          height: 630,
          alt: APP_DEFAULT_TITLE,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
      },
      description: APP_DESCRIPTION,
    },
    icons: {
      icon: "/assets/favicon/favicon.ico",
      apple: "/assets/favicon/apple-touch-icon-180x180.png",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

const i18nNamespaces = [Namespaces.COMMON];

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params: { locale } }: { children: ReactNodeLike; params: { locale: Locale } }) {
  const { resources } = await initTranslations(locale, i18nNamespaces);

  return (
    <html lang={locale} dir={dir(locale)} className="flex min-h-screen flex-col">
      <body className="flex w-full grow flex-col dark:bg-dark">
        <Providers locale={locale} resources={resources} i18nNamespaces={i18nNamespaces}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
