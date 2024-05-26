import { defineConfig } from "cypress";
import webpack from "@cypress/webpack-preprocessor";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on(
        "file:preprocessor",
        webpack({
          webpackOptions: {
            resolve: {
              extensions: [".ts", ".tsx", ".js"],
              alias: {
                "@": path.resolve(__dirname, "./src"),
              },
            },
            module: {
              rules: [
                {
                  test: /\.tsx?$/,
                  loader: "ts-loader",
                  options: { transpileOnly: true },
                },
              ],
            },
          },
          watchOptions: {},
        }),
      );
      config.env.NEXT_PUBLIC_PUBLIC_URL = process.env.NEXT_PUBLIC_PUBLIC_URL;
      config.env.E2E_LOGIN = process.env.E2E_LOGIN;
      config.env.E2E_PASSWORD = process.env.E2E_PASSWORD;
      config.env.NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
      config.env.NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY;
      config.env.SUPABASE_KEY_SERVICE = process.env.SUPABASE_KEY_SERVICE;
      return config;
    },
    baseUrl: process.env.NEXT_PUBLIC_PUBLIC_URL,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
