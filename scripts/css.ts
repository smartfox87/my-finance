import { locales, pages } from "../src/constants/router";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";
import type { Locale, CeoPage } from "../src/types/router";

function getCssPaths(dir: string): string[] {
  const files = fs.readdirSync(dir);
  return files.filter((file) => path.extname(file) === ".css").map((file) => path.join(dir, file));
}

const cssPaths = getCssPaths(".next/static/css");

// const clearCssFiles = () => cssPaths.forEach((cssPath) => fs.writeFileSync(cssPath, ""));

const htmlPaths = pages.reduce((acc: string[], page: CeoPage): string[] => {
  const langPages = locales.map((locale: Locale): string => ".next/server/app/" + (page.length ? `${locale}/${page}.html` : `${locale}.html`));
  return acc.concat(langPages);
}, []);

async function insertCssIntoHtml(cssFilePath: string, htmlFileName: string): Promise<void> {
  const cssContent = fs.readFileSync(cssFilePath, "utf8");
  const styleContent = `<style>${cssContent}</style>`;
  const cssFileName = path.basename(cssFilePath);
  let htmlContent = fs.readFileSync(htmlFileName, "utf8");
  htmlContent = htmlContent.replace("</head>", `${styleContent}</head>`);
  const $ = cheerio.load(htmlContent);
  $(`link[href*="${cssFileName}"]`).remove();
  fs.writeFileSync(htmlFileName, $.html());
}

Promise.all(htmlPaths.map(async (htmlPath) => cssPaths.map(async (cssPath) => insertCssIntoHtml(cssPath, htmlPath))).flat()).finally(() => {
  // clearCssFiles();
  console.log("Inline Styles Done");
});
