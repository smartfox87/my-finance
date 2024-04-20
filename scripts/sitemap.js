import "dotenv/config";
import { writeFileSync } from "fs";
import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { locales, pages } from "../src/initial-data/router.js";

const hostname = process.env.NEXT_PUBLIC_PRODUCTION_URL;
const links = pages.map((url) => ({
  url: `${hostname}/${url}`,
  changefreq: "daily",
  priority: 0.8,
  links: locales.map((lang) => ({ lang, url: `${hostname}${lang === "en" ? "" : `/${lang}`}/${url}` })),
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

async function generateSitemap() {
  const data = await streamToPromise(Readable.from(links).pipe(stream));
  return data.toString();
}

generateSitemap().then((data) => writeFileSync("./public/sitemap.xml", data));
