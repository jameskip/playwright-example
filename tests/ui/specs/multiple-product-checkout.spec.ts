// @ts-check
import { test } from "../fixtures";
import { ProductInfo } from "../pages/sauce-demo.page";

const productInfo: ProductInfo = {
  name: ["Sauce Labs Backpack", "Sauce Labs Bike Light"],
};

// Login and checkout with multiple products
test("login", async ({ saucePage }) => {
  await saucePage.addProductsToCart(productInfo.name);
  await saucePage.checkout();

  await saucePage.matchSnapshot("checkout-success.png");
});
