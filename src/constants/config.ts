import { type CeoPage, CeoPages } from "../types/router";
import { type Language, Languages, I18nNamespaces, type Locale, Locales } from "../types/locales";

export const ALL_I18N_NAMESPACES = Object.values(I18nNamespaces);

export const LOCALES: Locale[] = Object.values(Locales).sort((a, b) => a.localeCompare(b));

export const LANGUAGES: Language[] = Object.values(Languages).sort((a, b) => a.localeCompare(b));

export const PAGES: CeoPage[] = Object.values(CeoPages);

export const API_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const API_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY;
export const RECAPTCHA_API_KEY = process.env.GOOGLE_RECAPTCHA_API_KEY;

export const GMAIL_LOGIN = process.env.GMAIL_LOGIN;
export const GMAIL_PASSWORD = process.env.GMAIL_PASSWORD;

export const DEMO_USER_EMAIL = process.env.NEXT_PUBLIC_DEMO_USER_EMAIL;
export const DEMO_USER_PASSWORD = process.env.NEXT_PUBLIC_DEMO_USER_PASSWORD;

export const PRODUCTION_URL = process.env.NEXT_PUBLIC_PRODUCTION_URL;
export const PUBLIC_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;
export const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
export const IS_DEVELOPMENT = process.env.NODE_ENV === "development";
