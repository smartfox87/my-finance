import fs from "fs-extra";

fs.copy("./locales", "./cypress/fixtures/locales")
  .then(() => console.log("Localization files have been copied successfully!"))
  .catch((err: Error) => console.error("Error copying localization files:", err));
