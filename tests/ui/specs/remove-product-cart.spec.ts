// @ts-check
import { test } from "../fixtures";
import { ProductInfo } from "../pages/sauce-demo.page";

const productInfo: ProductInfo = {
  name: ["Sauce Labs Backpack"],
};

// Login and checkout with multiple products
test("remove product", async ({ saucePage }) => {
  await saucePage.addProductsToCart(productInfo.name);
  await saucePage.removeProductFromCart();

  await saucePage.matchSnapshot("remove-product.png");
});
