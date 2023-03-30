// my-test.ts
import { test as base } from "@playwright/test";
import { SauceDemoPage } from "./pages/sauce-demo.page";
import { userInfo } from "../constants";

type MyFixtures = {
  saucePage: SauceDemoPage;
};

export const test = base.extend<MyFixtures>({
  saucePage: async ({ page }, use) => {
    const saucePage = new SauceDemoPage(page);
    await saucePage.goto("/");
    await saucePage.login(userInfo);

    await use(saucePage);
  },
});
