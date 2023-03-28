// @ts-check
const { test } = require("@playwright/test");

import {
  LoginInfo,
  ProductInfo,
  SauceDemoPage,
} from "../pages/sauce-demo.page";

const baseUrl = "https://www.saucedemo.com/";

const userInfo: LoginInfo = {
  username: "standard_user",
  password: "secret_sauce",
};

const productInfo: ProductInfo = {
  name: "Sauce Labs Backpack",
};

test("login", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto(baseUrl);
  await SauceDemo.login(userInfo);

  await SauceDemo.addProductToCart(productInfo.name);
  await SauceDemo.checkout();

  await SauceDemo.matchSnapshot("checkout-success.png");
});
