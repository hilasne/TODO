import { test as base } from "@playwright/test";
import { TasksPage } from "../pages/tasksPage";
import { ToolBarPage } from "../pages/toolBarPage";

type TestFixtures = {
  singleTaskPage: TasksPage;
  tasksPage: TasksPage;
  toolBarPage: ToolBarPage;
};

export const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },

  singleTaskPage: async ({ page }, use) => {
    const tasksPage = new TasksPage(page);
    await use(tasksPage);
  },

  toolBarPage: async ({ page }, use) => {
    const toolBarPage = new ToolBarPage(page);
    await use(toolBarPage);
  },
});
