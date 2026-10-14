import { test } from "../fixtures/addTaskFixture";
import { AddNewTaskPage } from "../pages/addNewTaskPage";
import { SingleTaskPage } from "../pages/singleTaskPage";

test("add new task", async ({ page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName, singleTaskPage } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate("2026-10-13");
  await addTaskPage.selectCategory("Personal");
  await addTaskPage.selectPriority("high");
  await addTaskPage.clickSave();

  // tasksPage.expectTasksAmountToBe(1);
  singleTaskPage.expectTaskCategoryToBe("Personal");
  singleTaskPage.expectTaskNameToBe(singleTaskName);
  singleTaskPage.expectTaskDueDateToBe("2026-10-13");
  singleTaskPage.expectTaskPriorityToBe("high");
  singleTaskPage.expectTaskIsChecked(false);
});

test("cancel add new task", async ({ page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate("2026-10-13");
  await addTaskPage.selectCategory("Personal");
  await addTaskPage.selectPriority("high");
  await addTaskPage.clickCancel();

  // tasksPage.expectTasksAmountToBe(0);
});

test("negative, add empty task", async ({ page, tasksPage, toolBarPage }) => {
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.clickSave();

  await addTaskPage.expectNameError();
  await addTaskPage.expectCategoryError();
  await addTaskPage.expectDueDateError();

  // tasksPage.expectTasksAmountToBe(0);
});
