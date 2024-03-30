import Critters from "critters";
import fs from "fs";
import * as cheerio from "cheerio";
import { locales, pages } from "../i18nConfig.js";

const critters = new Critters({
  path: ".next/static/css",
  publicPath: "/_next/static/css/",
  inlineFonts: true,
  pruneSource: true,
  // reduceInlineStyles: false,
  preloadFonts: false, // next is already preloading them
});

const routes = pages.reduce((acc, page) => {
  const langPages = locales.map((locale) => (page.length ? `${locale}/${page}.html` : `${locale}.html`));
  return acc.concat(langPages);
}, []);

const routesProcess = routes.map(async (route) => {
  const html = await fs.readFileSync(`.next/server/app/${route}`, "utf8");
  const updatedHtml = await critters.process(html);

  // const $ = cheerio.load(updatedHtml);
  // $('link[href$=".css"]').remove();
  // // Найдите все теги script
  // $("script").each(function () {
  //   let scriptContent = $(this).html();
  //
  //   // Используйте регулярное выражение для поиска подстроки
  //   const regex = /\/_next\/static\/css\/\w+\.css/g;
  //   if (regex.test(scriptContent)) {
  //     console.log("111111111111111111111111111", scriptContent);
  //     // Замените подстроку на пустую строку
  //     scriptContent = scriptContent.replace(regex, "/_next/static/css/test.css");
  //     $(this).html(scriptContent);
  //   }
  // });

  // fs.writeFileSync(`.next/server/app/${route}`, $.html());
  fs.writeFileSync(`.next/server/app/${route}`, updatedHtml);
});

Promise.all(routesProcess);
