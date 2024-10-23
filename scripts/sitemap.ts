import "dotenv/config";
import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { PRODUCTION_URL, LOCALES, PAGES } from "../src/constants/config";
import { type Locale, Locales } from "../src/types/locales";

type Link = {
  lang: Locale;
  url: string;
};

const links = PAGES.map((url): { url: string; changefreq: string; priority: number; links: Link[] } => ({
  url: `${PRODUCTION_URL}/${url}`,
  changefreq: "daily",
  priority: 0.8,
  links: LOCALES.map((lang): Link => ({ lang, url: `${PRODUCTION_URL}${lang === Locales.EN ? "" : `/${lang}`}/${url}` })),
}));

const stream = new SitemapStream({
  hostname: PRODUCTION_URL,
  xmlns: {
    news: false,
    xhtml: true,
    image: false,
    video: false,
  },
});

async function generateSitemap(): Promise<string> {
  const data = await streamToPromise(Readable.from(links).pipe(stream));
  return data.toString();
}

generateSitemap().then((data) => writeFileSync("./public/sitemap.xml", data));
