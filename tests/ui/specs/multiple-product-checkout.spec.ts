// @ts-check
import { test } from "@playwright/test";
import { ProductInfo, SauceDemoPage } from "../pages/sauce-demo.page";
import { userInfo } from "../../constants";

const productInfo: ProductInfo = {
  name: ["Sauce Labs Backpack", "Sauce Labs Bike Light"],
};

// Login and checkout with multiple products
test("login", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto("/");
  await SauceDemo.login(userInfo);

  await SauceDemo.addProductsToCart(productInfo.name);
  await SauceDemo.checkout();

  await SauceDemo.matchSnapshot("checkout-success.png");
});
