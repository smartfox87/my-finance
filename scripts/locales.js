import fs from "fs-extra";

fs.copy("./locales", "./cypress/fixtures/locales")
  .then(() => console.log("Localization files have been copied successfully!"))
  .catch((err) => console.error("Error copying localization files:", err));
