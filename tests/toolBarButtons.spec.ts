import { test } from "../support/taskFixture";

test("complete all tasks", async ({ createTwoTasks, openApp, toolBarPage }) => {
  await toolBarPage.expectTasksLeftToBe(2);
  await toolBarPage.expectCompleteAllButtonEnabled(true);

  await toolBarPage.clickCompleteAllTasks();

  await toolBarPage.expectCompleteAllButtonEnabled(false);
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectTasksTotalCountToBe(2);
});

test("clear all tasks", async ({ completeTwoTasks, openApp, tasksPage, toolBarPage }) => {
  await tasksPage.expectTasksAmountToBe(2);
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectClearTasksButtonEnabled(true);

  await toolBarPage.clickClearCompletedTasks();

  await toolBarPage.expectClearTasksButtonEnabled(false);
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectTasksTotalCountToBe(0);
});
