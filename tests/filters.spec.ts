import { test } from "../support/taskFixture";
import { TasksPage } from "../support/pages/tasksPage";

test("reset filters", async ({ createTask, openApp, filtersPage }) => {
  await filtersPage.selectCategory("Finance");
  await filtersPage.selectPriority("high");
  await filtersPage.filterByStatus("Active");
  await filtersPage.sortBy("name");
  await filtersPage.clickDescAscButton();

  await filtersPage.expectResetFiltersToBeVisible();
  await filtersPage.clickResetFilters();
  await filtersPage.expectResetFiltersToBeVisible(false);
  await filtersPage.expectFiltersToBeReset();
});

test("filter by category", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);

  await filtersPage.selectCategory("Work");

  await filtersPage.expectResetFiltersToBeVisible();
  await tasksPage.expectTasksCategoriesToBe(["Work", "Work", "Work"]);
  await tasksPage.expectTasksAmountToBe(1);
});

test("filter by priority", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);

  await filtersPage.selectPriority("high");

  await filtersPage.expectResetFiltersToBeVisible();
  await tasksPage.expectTasksPriorityToBe("high");
  await tasksPage.expectTasksAmountToBe(1);
  await tasksPage.expectEmptyStateAlert(false);
});

test("filter all tasks", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const [firstTask, secondTask, thirdTask] = createThreeTasks;
  const tasksPage: TasksPage = new TasksPage(page);

  await tasksPage.expectTasksCheckToBe([false, false, false]);

  await filtersPage.filterByStatus("All");

  await tasksPage.expectTasksAmountToBe(3);
  await tasksPage.expectTasksCategoriesToBe(["Personal", "Health", "Work"]);
  await tasksPage.expectTasksOrderByNamesToBe([
    thirdTask.getTaskName(),
    secondTask.getTaskName(),
    firstTask.getTaskName(),
  ]);
});

test("filter active tasks", async ({ createThreeTasks, completeAllTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);

  await tasksPage.expectTasksCheckToBe([true, true, true]);

  await filtersPage.filterByStatus("Active");

  await filtersPage.expectResetFiltersToBeVisible();
  await tasksPage.expectTasksAmountToBe(0);
  await tasksPage.expectEmptyStateAlert(true, true);
});

test("filter completed tasks", async ({ createThreeTasks, completeAllTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);

  await tasksPage.expectTasksCheckToBe([true, true, true]);

  await filtersPage.filterByStatus("Completed");

  await filtersPage.expectResetFiltersToBeVisible();
  await tasksPage.expectTasksAmountToBe(3);
  await tasksPage.expectEmptyStateAlert(false);
});

test("sort by", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);
  const [firstTask, secondTask, thirdTask] = createThreeTasks;

  await filtersPage.sortBy("dueDate");

  await tasksPage.expectTasksOrderByNamesToBe([
    thirdTask.getTaskName(),
    secondTask.getTaskName(),
    firstTask.getTaskName(),
  ]);

  await filtersPage.sortBy("name");

  await tasksPage.expectTasksOrderByNamesToBe([
    firstTask.getTaskName(),
    secondTask.getTaskName(),
    thirdTask.getTaskName(),
  ]);
});

test("sort by descending", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);
  const [firstTask, secondTask, thirdTask] = createThreeTasks;

  await tasksPage.expectTasksOrderByNamesToBe([
    thirdTask.getTaskName(),
    secondTask.getTaskName(),
    firstTask.getTaskName(),
  ]);

  await filtersPage.clickDescAscButton();

  await tasksPage.expectTasksOrderByNamesToBe([
    firstTask.getTaskName(),
    secondTask.getTaskName(),
    thirdTask.getTaskName(),
  ]);
});
