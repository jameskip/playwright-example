// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export interface LoginInfo {
  username: string;
  password: string;
}

export interface ProductInfo {
  name: string[];
}

export class SauceDemoPage {
  readonly page: Page;
  readonly confirmationText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmationText = page.getByRole("heading", {
      name: "Thank you for your order!",
    });
  }

  async goto(baseUrl: string) {
    await this.page.goto(baseUrl);
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async login(loginInfo: LoginInfo) {
    await this.page.getByPlaceholder("Username").fill(loginInfo.username);
    await this.page.getByPlaceholder("password").fill(loginInfo.password);

    await this.page.getByRole("button", { name: "Login" }).click();
  }

  async invalidLogin(loginInfo: LoginInfo) {
    await this.login(loginInfo);

    await expect(this.page.getByTestId("error")).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  }

  async addProductsToCart(productNames: string[]) {
    await this.page.getByText("Products").click();
    for (const productName of productNames) {
      await this.page.getByText(productName).click();
      await this.page.getByRole("button", { name: "Add to cart" }).click();
      await this.page.goBack();
    }
    await this.page.locator("#shopping_cart_container").click();
  }

  async checkout() {
    await this.page.getByRole("button", { name: "Checkout" }).click();
    await this.page.getByPlaceholder("First Name").fill("John");
    await this.page.getByPlaceholder("Last Name").fill("Doe");
    await this.page.getByPlaceholder("Zip/Postal Code").fill("12345");
    await this.page.getByRole("button", { name: "Continue" }).click();
    await this.page.getByRole("button", { name: "Finish" }).click();

    await expect(this.confirmationText).toBeVisible();
  }

  async sortInventory(sortOption: string) {
    await this.page
      .getByTestId("product_sort_container")
      .selectOption(sortOption);

    const elements = await this.page.$$(".inventory_item_price");

    let lastPrice = 0;

    for (const element of elements) {
      const text = await element.innerText();
      const parsedNumber = parseFloat(text.replace("$", ""));

      expect(parsedNumber).toBeGreaterThanOrEqual(lastPrice);

      lastPrice = parsedNumber;
    }

    await this.page.waitForLoadState("networkidle");
  }

  async matchSnapshot(path: string) {
    expect(await this.page.screenshot()).toMatchSnapshot(path);
  }
}
