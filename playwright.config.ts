import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
  workers: 2,
  retries: 0,
  testDir: './tests',
  reporter: 'html',

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

    baseURL: 'https://www.espn.nl/',

    headless: false,
    viewport: { width: 1920, height: 1080 },
    launchOptions: {
      args: [],
    },
    ignoreHTTPSErrors: true,

    screenshot: 'on',
    video: 'on',
    trace: 'on',
  },

  projects: [
    {
      name: 'chrome',
      use: { browserName: 'chromium', channel: 'chrome' },
    },
  ]
});