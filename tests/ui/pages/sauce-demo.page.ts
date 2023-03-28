// playwright-dev-page.ts
import { expect, Locator, Page } from "@playwright/test";

export interface LoginInfo {
  username: string;
  password: string;
}

export interface ProductInfo {
  name: string;
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

    await this.matchSnapshot("invalid-login.png");
  }

  async addProductToCart(productName: string) {
    await this.page.getByText("Products").click();
    await this.page.getByText(productName).click();
    await this.page.getByRole("button", { name: "Add to cart" }).click();
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

  async matchSnapshot(path: string) {
    expect(await this.page.screenshot()).toMatchSnapshot(path);
  }
}
