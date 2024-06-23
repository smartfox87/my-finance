import type { Metadata } from "next";
import initTranslations from "@/i18n";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import SettingsModule from "@/app/[locale]/(inner)/settings/content-module";
import { type Locale, Pages } from "@/types/router";
import { Namespaces } from "@/types/i18n";

const i18nNamespaces = [Namespaces.COMMON];

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`settings.title`, { ns: Namespaces.SETTINGS }),
    description: t(`settings.description`, { ns: Namespaces.SETTINGS }),
  };
}

export default function Settings({ params: { locale } }: { params: { locale: Locale } }) {
  return (
    <InnerLayout locale={locale} page={Pages.SETTINGS}>
      <SettingsModule />
    </InnerLayout>
  );
}
