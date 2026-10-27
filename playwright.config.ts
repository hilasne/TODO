import { defineConfig } from "@playwright/test";
import { env } from "./config/env";

export default defineConfig({
  fullyParallel: true,
  workers: 1,
  retries: 0,
  testDir: "./tests",
  reporter: "html",

  timeout: 50 * 1000,
  expect: {
    timeout: 10 * 1000,
  },

  use: {
    actionTimeout: 10 * 1000,
    navigationTimeout: 30 * 1000,
    baseURL: env.BASE_URL,
    extraHTTPHeaders: { Accept: 'application/json' },
    headless: true,
    viewport: null,
    launchOptions: {
      args: [""],
    },
    ignoreHTTPSErrors: true,
    screenshot: "off",
    video: "off",
    trace: "on",
  },

  projects: [
    {
      name: "chrome",
      use: { browserName: "chromium", channel: "chrome" },
    },
  ],
});
