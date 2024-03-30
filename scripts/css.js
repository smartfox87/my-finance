import Critters from "critters";
import fs from "fs";
import { locales, pages } from "../i18nConfig.js";

const critters = new Critters({
  path: ".next/static/css",
  publicPath: "/_next/static/css/",
  inlineFonts: true,
  pruneSource: true,
  preloadFonts: false, // next is already preloading them
});

const routes = pages.reduce((acc, page) => {
  const langPages = locales.map((locale) => (page.length ? `${locale}/${page}.html` : `${locale}.html`));
  return acc.concat(langPages);
}, []);

const routesProcess = routes.map(async (route) => {
  const html = await fs.readFileSync(`.next/server/app/${route}`, "utf8");
  const updatedHtml = await critters.process(html);
  fs.writeFileSync(`.next/server/app/${route}`, updatedHtml);
});

Promise.all(routesProcess);
