import { test as base } from "@playwright/test";
import { TasksPage } from "../pages/tasksPage";
import { ToolBarPage } from "../pages/toolBarPage";
import { SingleTaskPage } from "../pages/singleTaskPage";
import { createTaskTitle } from "../Helpers/faker/taskData";

type TestFixtures = {
  tasksPage: TasksPage;
  toolBarPage: ToolBarPage;
  getSingleTaskPageAndName: { singleTaskPage: SingleTaskPage; singleTaskName: string };
};

export const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    await page.goto("/");
    await use(page);
  },

  tasksPage: async ({ page }, use) => {
    const tasksPage = new TasksPage(page);
    await use(tasksPage);
  },

  toolBarPage: async ({ page }, use) => {
    const toolBarPage = new ToolBarPage(page);
    await use(toolBarPage);
  },

  getSingleTaskPageAndName: async ({ page }, use) => {
    const singleTaskName = createTaskTitle();

    const singleTaskPage = new SingleTaskPage(page, singleTaskName);
    await use({ singleTaskPage, singleTaskName });
  },
});
