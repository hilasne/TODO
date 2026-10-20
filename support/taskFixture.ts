import { test as base } from "@playwright/test";
import { TasksPage } from "../pages/tasksPage";
import { ToolBarPage } from "../pages/toolBarPage";
import { SingleTaskPage } from "../pages/singleTaskPage";
import { getTask, createTaskTitle, randomCategory, randomPriority } from "./Helpers/taskDetails";
import { NewTask, TasksApi } from "./api/tasksApi";
import { isoDateFromToday, randomNumber } from "./Helpers/testDataHelpers";

type TestFixtures = {
  tasksApi: TasksApi;
  cleanTasks: void;
  createTask: string;
  createTaskWithTodayDueDate: string;
  createTaskWithOverdueDueDate: string;
  createTwoTasks: string;
  completeTwoTasks: void;
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

  createTask: async ({ tasksApi, cleanTasks }, use) => {
    const task: NewTask = getTask(createTaskTitle(), randomCategory(), randomPriority(), randomNumber());

    await tasksApi.create(task);
    await use(task.name);
  },

  createTaskWithTodayDueDate: async ({ tasksApi, cleanTasks }, use) => {
    const todayTask: NewTask = getTask(createTaskTitle(), randomCategory(), randomPriority(), 0);

    await tasksApi.create(todayTask);
    await use(todayTask.name);
  },

  createTaskWithOverdueDueDate: async ({ tasksApi, cleanTasks }, use) => {
    const overdueTask: NewTask = getTask(createTaskTitle(), randomCategory(), randomPriority(), -1);

    await tasksApi.create(overdueTask);
    await use(overdueTask.name);
  },

  createTwoTasks: async ({ tasksApi, createTask }, use) => {
    const secondtask: NewTask = getTask(createTaskTitle(), randomCategory(), randomPriority(), randomNumber());

    await tasksApi.create(secondtask);
    await use(secondtask.name);
  },

  completeTwoTasks: async ({ tasksApi, createTwoTasks }, use) => {
    await tasksApi.completeAll();
    await use();
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
