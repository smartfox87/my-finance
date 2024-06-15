import { Languages, Locales, Pages } from "../types/router";

export const locales: Locales[] = Object.values(Locales).sort((a, b) => a.localeCompare(b));

export const languages: Languages[] = Object.values(Languages).sort((a, b) => a.localeCompare(b));

export const pages: Pages[] = Object.values(Pages);
