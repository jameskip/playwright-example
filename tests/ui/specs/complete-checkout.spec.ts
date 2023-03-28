// @ts-check
import { test } from "@playwright/test";
import {
  LoginInfo,
  ProductInfo,
  SauceDemoPage,
} from "../pages/sauce-demo.page";

const userInfo: LoginInfo = {
  username: "standard_user",
  password: "secret_sauce",
};

const productInfo: ProductInfo = {
  name: "Sauce Labs Backpack",
};

test("checkout", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  test.step("login", async () => {
    await SauceDemo.goto("/");
    await SauceDemo.login(userInfo);
  });

  test.step("add product to cart and checkout", async () => {
    await SauceDemo.addProductToCart(productInfo.name);
    await SauceDemo.checkout();
  });

  await SauceDemo.matchSnapshot("checkout-success.png");
});
