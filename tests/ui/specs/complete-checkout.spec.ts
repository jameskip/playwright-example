// @ts-check
import { test } from "@playwright/test";
import { userInfo } from "../../constants";
import { ProductInfo, SauceDemoPage } from "../pages/sauce-demo.page";

const productInfo: ProductInfo = {
  name: ["Sauce Labs Backpack"],
};

test("login", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto("/");
  await SauceDemo.login(userInfo);

  await SauceDemo.addProductsToCart(productInfo.name);
  await SauceDemo.checkout();

  await SauceDemo.matchSnapshot("checkout-success.png");
});
