import { type CeoPage, CeoPages } from "../types/router";
import { type Language, Languages, type Locale, Locales } from "../types/locales";

export const LOCALES: Locale[] = Object.values(Locales).sort((a, b) => a.localeCompare(b));

export const LANGUAGES: Language[] = Object.values(Languages).sort((a, b) => a.localeCompare(b));

export const PAGES: CeoPage[] = Object.values(CeoPages);
