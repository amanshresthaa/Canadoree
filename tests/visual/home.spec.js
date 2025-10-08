import { test, expect } from "@playwright/test";

const screens = [
  { name: "home", path: "/" },
  { name: "id", path: "/#id" },
];

test.describe("visual regressions", () => {
  for (const screen of screens) {
    test(`${screen.name} screen`, async ({ page }) => {
      await page.goto(screen.path === "/" ? "/" : "/");
      if (screen.name === "id") {
        // Navigate to the ID screen via UI to match actual flow
        await page.getByRole("button", { name: "View ID card" }).click();
      }
      await expect(page).toHaveScreenshot(`${screen.name}-${page.viewportSize()?.width ?? 1280}.png`, {
        fullPage: true,
      });
    });
  }
});
