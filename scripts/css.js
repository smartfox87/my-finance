import { locales, pages } from "../src/initial-data/router.js";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

function getCssPaths(dir) {
  const files = fs.readdirSync(dir);
  return files.filter((file) => path.extname(file) === ".css").map((file) => path.join(dir, file));
}

const cssPaths = getCssPaths(".next/static/css");

const htmlPaths = pages.reduce((acc, page) => {
  const langPages = locales.map((locale) => ".next/server/app/" + (page.length ? `${locale}/${page}.html` : `${locale}.html`));
  return acc.concat(langPages);
}, []);

async function insertCssIntoHtml(cssFileName, htmlFileName) {
  const cssContent = fs.readFileSync(cssFileName, "utf8");
  const styleContent = `<style>${cssContent}</style>`;
  const htmlContent = fs.readFileSync(htmlFileName, "utf8");
  const $ = cheerio.load(htmlContent);
  $('link[href$=".css"]').remove();
  $("head").append(styleContent);
  fs.writeFileSync(htmlFileName, $.html());
}

Promise.all(htmlPaths.map(async (htmlPath) => cssPaths.map(async (cssPath) => insertCssIntoHtml(cssPath, htmlPath))).flat()).finally(() => console.log("Inline Styles Done"));
