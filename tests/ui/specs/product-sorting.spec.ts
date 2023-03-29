// @ts-check
import { test } from "@playwright/test";
import { LoginInfo, SauceDemoPage } from "../pages/sauce-demo.page";

const userInfo: LoginInfo = {
  username: "standard_user",
  password: "secret_sauce",
};

test("sort", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto("/");
  await SauceDemo.login(userInfo);
  await SauceDemo.sortInventory("lohi");

  await SauceDemo.matchSnapshot("sorted-inventory.png");
});
