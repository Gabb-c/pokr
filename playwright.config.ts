import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env['CI'];

export default defineConfig({
  testDir: './e2e',

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: isCI,

  /* Retry on CI only — flaky tests get 2 chances */
  retries: isCI ? 2 : 0,

  /* Use multiple workers; CI runners typically have 2-4 cores */
  workers: isCI ? '50%' : undefined,

  /* Global timeouts — be generous on CI where everything is slower */
  timeout: isCI ? 60_000 : 30_000,
  expect: {
    timeout: isCI ? 10_000 : 5_000,
  },

  /* Reporters:
   * - On CI: blob (for sharded merging), github (PR annotations), list (terminal)
   * - Locally: html (auto-open on failure), list
   */
  reporter: isCI ? [['blob'], ['github'], ['list']] : [['html', { open: 'on-failure' }], ['list']],

  /* Shared settings */
  use: {
    baseURL: process.env['PLAYWRIGHT_TEST_BASE_URL'] ?? 'http://localhost:4200',

    /* Collect trace on first retry — small artifacts, only when needed */
    trace: 'on-first-retry',

    /* Capture screenshots and videos only when tests fail */
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    /* Reasonable action/navigation timeouts */
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  /* Auto-start the Angular dev server before tests, reuse if already running locally */
  webServer: {
    command: 'pnpm start',
    url: 'http://localhost:4200',
    reuseExistingServer: !isCI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  /* Run all major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      retries: isCI ? 3 : 0,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
