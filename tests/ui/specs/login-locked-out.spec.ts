// @ts-check
import { test } from "@playwright/test";
import { LoginInfo, SauceDemoPage } from "../pages/sauce-demo.page";

const userInfo: LoginInfo = {
  username: "locked_out_user",
  password: "secret_sauce",
};

test("login - locked out", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto("/");
  await SauceDemo.invalidLogin(userInfo);

  await SauceDemo.matchSnapshot("login-locked-out.png");
});
