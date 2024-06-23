import { type Language, Languages, type Locale, Locales, type CeoPage, CeoPages } from "../types/router";

export const locales: Locale[] = Object.values(Locales).sort((a, b) => a.localeCompare(b));

export const languages: Language[] = Object.values(Languages).sort((a, b) => a.localeCompare(b));

export const pages: CeoPage[] = Object.values(CeoPages);
