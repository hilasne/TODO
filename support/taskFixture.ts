import { test as base } from "@playwright/test";
import { TasksPage } from "../support/pages/tasksPage";
import { ToolBarPage } from "../support/pages/toolBarPage";
import { SingleTaskPage } from "../support/pages/singleTaskPage";
import { FiltersPage } from "../support/pages/filtersPage";
import { getTask, createTaskTitle, randomCategory, randomPriority } from "./Helpers/taskDetails";
import { NewTask, TasksApi } from "./api/tasksApi";
import { randomNumber } from "./Helpers/testDataHelpers";

type TestFixtures = {
  // API
  tasksApi: TasksApi;
  cleanTasks: void;
  createTask: string;
  createTaskWithTodayDueDate: string;
  createTaskWithOverdueDueDate: string;
  createThreeTasks: [SingleTaskPage, SingleTaskPage, SingleTaskPage];
  completeAllTasks: void;

  // UI
  openApp: void;
  tasksPage: TasksPage;
  toolBarPage: ToolBarPage;
  getSingleTaskPageAndName: { singleTaskPage: SingleTaskPage; singleTaskName: string };
  filtersPage: FiltersPage;
};

export const test = base.extend<TestFixtures>({
  // API fixtures

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

  createThreeTasks: async ({ tasksApi, cleanTasks, page }, use) => {
    const tasks = [
      getTask("first task", "Work", "high", randomNumber(1, 100)),
      getTask("second task", "Health", "medium", 0),
      getTask("third task", "Personal", "low", randomNumber(-100, -1)),
    ] as const;

    for (const task of tasks) {
      await tasksApi.create(task);
    }

    await use([
      new SingleTaskPage(page, "first task"),
      new SingleTaskPage(page, "second task"),
      new SingleTaskPage(page, "third task"),
    ]);
  },

  completeAllTasks: async ({ tasksApi, createThreeTasks }, use) => {
    await tasksApi.completeAll();
    await use();
  },

  // UI fixtures

  openApp: async ({ page, cleanTasks }, use) => {
    await page.goto("/");
    await use();
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

  filtersPage: async ({ page }, use) => {
    const filtersPage = new FiltersPage(page);
    await use(filtersPage);
  },
});
