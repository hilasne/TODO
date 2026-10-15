import { test } from "../fixtures/addTaskFixture";

test("complete all tasks", async ({ page, tasksPage, toolBarPage }) => {
  //   await toolBarPage.expectTasksLeftToBe(2);
  await toolBarPage.expectCompleteAllButtonEnabled(true);

  await toolBarPage.clickCompleteAllTasks();

  await toolBarPage.expectCompleteAllButtonEnabled(false);
  await toolBarPage.expectTasksLeftToBe(0);
});

test("clear all tasks", async ({ page, tasksPage, toolBarPage }) => {
//   await tasksPage.expectTasksAmountToBe(3);
//   await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectClearTasksButtonEnabled(true);

  await toolBarPage.clickClearCompletedTasks();

  await toolBarPage.expectClearTasksButtonEnabled(false);
  await toolBarPage.expectTasksLeftToBe(0);
});
