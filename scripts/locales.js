import "dotenv/config";
import { exec } from "child_process";

const key = process.env.I18NEXUS_KEY;

exec(`i18nexus pull -k ${key}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`i18nexus exec error: ${error}`);
    return;
  }
  console.log(`i18nexus stdout: ${stdout}`);
  console.error(`i18nexus stderr: ${stderr}`);
});
