import "dotenv/config";
import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { locales, pages } from "../src/constants/router";
import { type Locale, Locales } from "../src/types/locales";

type Link = {
  lang: Locale;
  url: string;
};

const hostname = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const links = pages.map((url): { url: string; changefreq: string; priority: number; links: Link[] } => ({
  url: `${hostname}/${url}`,
  changefreq: "daily",
  priority: 0.8,
  links: locales.map((lang): Link => ({ lang, url: `${hostname}${lang === Locales.EN ? "" : `/${lang}`}/${url}` })),
}));

const stream = new SitemapStream({
  hostname,
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
