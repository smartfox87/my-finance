import type { Metadata } from "next";

export const getAppMetadata = ({ t }: { t: (name: string) => string }): Metadata => {
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
};
