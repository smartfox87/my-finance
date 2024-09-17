import { initTranslations } from "@/i18n";
import { SignInPageModule } from "@/features/auth";
import type { Metadata } from "next";
import type { Locale } from "@/types/locales";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t("pages.sign-in.title"),
    description: t("pages.sign-in.description"),
  };
}

export default async function SignIn() {
  return <SignInPageModule />;
}
