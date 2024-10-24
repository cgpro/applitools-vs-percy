import { PlaywrightTestConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const config: PlaywrightTestConfig = {
  testDir: './tests',
  timeout: 60000, // Erhöht auf 60 Sekunden
  expect: {
    timeout: 10000, // Erhöht auf 10 Sekunden
  },
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
      },
    },
  ],
  reporter: [['html'], ['list']],
};

export default config;
