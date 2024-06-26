import { type CeoPage, CeoPages } from "../types/router";
import { type Language, Languages, type Locale, Locales } from "../types/locales";

export const locales: Locale[] = Object.values(Locales).sort((a, b) => a.localeCompare(b));

export const languages: Language[] = Object.values(Languages).sort((a, b) => a.localeCompare(b));

export const pages: CeoPage[] = Object.values(CeoPages);
