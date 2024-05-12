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
