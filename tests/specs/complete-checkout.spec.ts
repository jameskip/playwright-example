// @ts-check
const { test } = require("@playwright/test");

import { LoginInfo, SauceDemoPage } from "../pages/sauce-demo.page";

const baseUrl = "https://www.saucedemo.com/";

const userInfo: LoginInfo = {
  username: "standard_user",
  password: "secret_sauce",
};

test("login", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto(baseUrl);
  await SauceDemo.login(userInfo);

  await SauceDemo.addProductToCart("Sauce Labs Backpack");
  await SauceDemo.checkout();
});
