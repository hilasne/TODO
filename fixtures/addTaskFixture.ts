import { test as base } from "@playwright/test";
import { TasksPage } from "../pages/tasksPage";
import { ToolBarPage } from "../pages/toolBarPage";
import { SingleTaskPage } from "../pages/singleTaskPage";
import { createTaskTitle, randomCategory, randomPriority } from "../Helpers/taskDetails";
import { NewTask, TasksApi } from "../api/tasksApi";
import { isoDateFromToday, randomNumber } from "../Helpers/testDataHelpers";

type TestFixtures = {
  tasksApi: TasksApi;
  cleanTasks: void;
  createdTask: string;
  openApp: void;

  // Pages
  tasksPage: TasksPage;
  toolBarPage: ToolBarPage;
  getSingleTaskPageAndName: { singleTaskPage: SingleTaskPage; singleTaskName: string };
};

export const test = base.extend<TestFixtures>({
  tasksApi: async ({ request }, use) => {
    await use(new TasksApi(request));
  },

  cleanTasks: async ({ tasksApi }, use) => {
    await tasksApi.deleteAll();
    await use();
  },

  createdTask: async ({ tasksApi, cleanTasks }, use) => {
    const task: NewTask = {
      name: createTaskTitle(),
      category: randomCategory(),
      priority: randomPriority(),
      dueDate: isoDateFromToday(randomNumber()),
      completed: false,
    };

    await tasksApi.create(task);
    await use(task.name);
  },

  openApp: async ({ page, cleanTasks }, use) => {
    await page.goto("/");
    await use();
  },

  // Page Fixtures

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
