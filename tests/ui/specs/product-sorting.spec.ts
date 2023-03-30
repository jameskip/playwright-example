// @ts-check
import { test } from "@playwright/test";
import { SauceDemoPage } from "../pages/sauce-demo.page";
import { userInfo } from "../../constants";

// login and sort inventory by price low to high
test("sort", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto("/");
  await SauceDemo.login(userInfo);
  await SauceDemo.sortInventory("lohi");

  await SauceDemo.matchSnapshot("sorted-inventory.png");
});
