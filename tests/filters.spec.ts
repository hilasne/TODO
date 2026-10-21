import { test } from "../support/taskFixture";
import { SingleTaskPage } from "../support/pages/singleTaskPage";
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
  await tasksPage.expectTasksCategoryToBe("Work");
  await tasksPage.expectTasksAmountToBe(1);
});

test("filter by priority", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const tasksPage: TasksPage = new TasksPage(page);

  await filtersPage.selectPriority("high");

  await filtersPage.expectResetFiltersToBeVisible();
  await tasksPage.expectTasksPriorityToBe("high");
  await tasksPage.expectTasksAmountToBe(1);
});

test("filter active tasks", async ({ createThreeTasks, openApp, page, filtersPage }) => {
  const [firstTask] = createThreeTasks;
  const tasksPage: TasksPage = new TasksPage(page);

  await filtersPage.filterByStatus("Active");

  await firstTask.expectTaskIsChecked(false);

  await filtersPage.expectResetFiltersToBeVisible();
  await tasksPage.expectTasksAmountToBe(3);
});
