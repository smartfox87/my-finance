import Critters from "critters";
import fs from "fs";
import { locales, pages } from "../i18nConfig.js";

const critters = new Critters({
  path: ".next/static/css",
  publicPath: "/_next/static/css/",
  inlineFonts: true,
  preloadFonts: false, // next is already preloading them
});

const routes = pages.reduce((acc, page) => {
  const langPages = locales.map((locale) => (page.length ? `${locale}/${page}.html` : `${locale}.html`));
  return acc.concat(langPages);
}, []);

const routesProcess = routes.map((route) => critters.process(fs.readFileSync(`.next/server/app/${route}`, "utf8")).then((inlined) => fs.writeFileSync(`.next/server/app/${route}`, inlined)));

Promise.all(routesProcess);
