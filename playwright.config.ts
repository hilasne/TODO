import { defineConfig } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  workers: 2,
  retries: 0,
  testDir: "./tests",
  reporter: "html",

  // Maximum time a single test can run before timing out
  timeout: 50 * 1000,
  expect: {
    // Maximum time for expect() assertions to pass
    timeout: 10 * 1000,
  },

  use: {
    // Maximum time for actions like click(), fill(), check()
    actionTimeout: 10 * 1000,
    // Maximum time for navigation like goto(), goBack()
    navigationTimeout: 30 * 1000,

    baseURL: "http://localhost:3000",

    headless: false,
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
