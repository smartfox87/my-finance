// import "dotenv/config";
// import { exec } from "child_process";
//
// const key = process.env.I18NEXUS_KEY;
//
// exec(`i18nexus pull -k ${key}`, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`i18nexus exec error: ${error}`);
//     return;
//   }
//   console.log(`i18nexus stdout: ${stdout}`);
//   console.error(`i18nexus stderr: ${stderr}`);
// });
import fs from "fs-extra";

const sourceDir = "locales"; // Исходная папка с файлами локализации
const destDir = "cypress/fixtures/locales"; // Целевая папка внутри cypress/fixtures

fs.copy(sourceDir, destDir)
  .then(() => console.log("Localization files have been copied successfully!"))
  .catch((err) => console.error("Error copying localization files:", err));
