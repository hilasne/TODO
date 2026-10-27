import { test } from "../support/taskFixture";

test("complete all tasks", async ({ createThreeTasks, openApp, toolBarPage }) => {
  await toolBarPage.expectTasksLeftToBe(3);
  await toolBarPage.expectCompleteAllButtonEnabled(true);

  await toolBarPage.clickCompleteAllTasks();

  await toolBarPage.expectCompleteAllButtonEnabled(false);
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectTasksTotalCountToBe(3);
});

test("clear all tasks", async ({ createThreeTasks, completeAllTasks, openApp, tasksPage, toolBarPage }) => {
  await tasksPage.expectTasksAmountToBe(3);
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectClearTasksButtonEnabled(true);

  await toolBarPage.clickClearCompletedTasks();

  await toolBarPage.expectClearTasksButtonEnabled(false);
  await tasksPage.expectEmptyStateAlert();
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectTasksTotalCountToBe(0);
});
