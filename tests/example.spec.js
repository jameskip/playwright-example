// @ts-check
const { test, expect } = require("@playwright/test");

const baseUrl = "https://www.saucedemo.com/";

test("has title", async ({ page }) => {
  await page.goto(baseUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});
