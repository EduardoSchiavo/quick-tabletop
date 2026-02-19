import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5173",
    trace: "on-first-retry",
    viewport: { width: 1280, height: 720 },
    video: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { browserName: "chromium" },
    },
  ],
  webServer: [
    {
      command: "cd ../quick-tabletop-engine && go run main.go",
      url: "http://localhost:3000/health",
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "bun run dev",
      url: "http://localhost:5173",
      reuseExistingServer: !process.env.CI,
    },
  ],
});
