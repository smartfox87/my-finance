import "dotenv/config";
import { writeFileSync } from "fs";
import { PRODUCTION_URL, LOCALES, PAGES } from "../src/constants/config";
import { Locales } from "../src/types/locales";

const urls = PAGES.reduce<string[]>((acc, url) => {
  return acc.concat(LOCALES.map((lang) => `${PRODUCTION_URL}${lang === Locales.EN ? "" : `/${lang}`}/${url}`));
}, []);

console.log(urls);

writeFileSync("urls.txt", urls.join("\n"), "utf8");
