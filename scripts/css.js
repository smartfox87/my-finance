import { locales, pages } from "../src/initial-data/router.js";
import fs from "fs";
import path from "path";
import * as cheerio from "cheerio";

function getCssPaths(dir) {
  const files = fs.readdirSync(dir);
  return files.filter((file) => path.extname(file) === ".css").map((file) => path.join(dir, file));
}

const cssPaths = getCssPaths(".next/static/css");

// const clearCssFiles = () => cssPaths.forEach((cssPath) => fs.writeFileSync(cssPath, ""));

const htmlPaths = pages.reduce((acc, page) => {
  const langPages = locales.map((locale) => ".next/server/app/" + (page.length ? `${locale}/${page}.html` : `${locale}.html`));
  return acc.concat(langPages);
}, []);

async function insertCssIntoHtml(cssFilePath, htmlFileName) {
  const cssContent = fs.readFileSync(cssFilePath, "utf8");
  const styleContent = `<style>${cssContent}</style>`;
  const cssFileName = path.basename(cssFilePath);
  let htmlContent = fs.readFileSync(htmlFileName, "utf8");
  htmlContent = htmlContent.replace("</head>", `${styleContent}</head>`);
  const $ = cheerio.load(htmlContent);
  $(`link[href="${cssFileName}"]`).remove();
  // $("script")
  //   .filter((i, el) => $(el).text().includes(cssFileName))
  //   .map((i, el) => console.log("111111111111111111111111111111111111", htmlFileName, $(el).text()));
  // .remove();
  fs.writeFileSync(htmlFileName, $.html());
}

Promise.all(htmlPaths.map(async (htmlPath) => cssPaths.map(async (cssPath) => insertCssIntoHtml(cssPath, htmlPath))).flat()).finally(() => {
  // clearCssFiles();
  console.log("Inline Styles Done");
});
