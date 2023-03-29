// @ts-check
import { test } from "@playwright/test";
import { userInfo } from "../../constants";
import { SauceDemoPage } from "../pages/sauce-demo.page";

test("login - locked out", async ({ page }) => {
  const SauceDemo = new SauceDemoPage(page);

  await SauceDemo.goto("/");
  await SauceDemo.invalidLogin(userInfo);

  await SauceDemo.matchSnapshot("login-locked-out.png");
});
