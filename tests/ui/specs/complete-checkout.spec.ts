// @ts-check
import { test } from "../fixtures";
import { ProductInfo } from "../pages/sauce-demo.page";

const productInfo: ProductInfo = {
  name: ["Sauce Labs Backpack"],
};

// Login and checkout with a single product
test("login", async ({ saucePage }) => {
  await saucePage.addProductsToCart(productInfo.name);
  await saucePage.checkout();

  await saucePage.matchSnapshot("checkout-success.png");
});
