// @ts-check
import { test } from "../fixtures";

// login and sort inventory by price low to high
test("sort", async ({ saucePage }) => {
  await saucePage.sortInventory("lohi");

  await saucePage.matchSnapshot("sorted-inventory.png");
});
