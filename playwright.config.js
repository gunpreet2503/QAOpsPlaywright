// @ts-check
const { defineConfig, devices } = require('@playwright/test');

const config = defineConfig({
  testDir: './tests',
  timeout: 40 * 1000,
  expect: {
    timeout: 40 * 1000
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    trace: {
      mode: 'retain-on-failure',
    }
    
  },
});

module.exports = config;