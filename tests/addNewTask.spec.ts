import { test } from "../support/taskFixture";
import { AddNewTaskPage } from "../support/pages/addNewTaskPage";
import { randomNumber, isoDateFromToday } from "../support/Helpers/testDataHelpers";
import { CategoryOptions, PriorityOptions, randomCategory, randomPriority } from "../support/Helpers/taskDetails";

const date: string = isoDateFromToday(randomNumber());
const category: CategoryOptions = randomCategory();
const priority: PriorityOptions = randomPriority();

test("add new task", async ({ openApp, page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName, singleTaskPage } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.expectTaskModalToBeVisible();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickSave();

  await toolBarPage.expectTasksLeftToBe(1);
  await tasksPage.expectTasksAmountToBe(1);
  await singleTaskPage.expectTaskCategoryToBe(category);
  await singleTaskPage.expectTaskNameToBe(singleTaskName);
  await singleTaskPage.expectTaskDueDateToBe(date);
  await singleTaskPage.expectTaskPriorityToBe(priority);
  await singleTaskPage.expectTaskIsChecked(false);
  await tasksPage.expectEmptyStateAlert(false);
});

test("cancel add new task", async ({ openApp, page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.expectTaskModalToBeVisible();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickCancel();

  await addTaskPage.expectTaskModalToBeVisible(false);
  await toolBarPage.expectTasksLeftToBe(0);
  await tasksPage.expectTasksAmountToBe(0);
  await tasksPage.expectEmptyStateAlert();
});

test("click close new task modal", async ({ openApp, page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.expectTaskModalToBeVisible();

  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.closeModal();

  await addTaskPage.expectTaskModalToBeVisible(false);
  await toolBarPage.expectTasksLeftToBe(0);
  await tasksPage.expectTasksAmountToBe(0);
  await tasksPage.expectEmptyStateAlert();
});

test("negative, add empty task", async ({ openApp, page, toolBarPage }) => {
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.clickSave();

  await addTaskPage.expectNameError();
  await addTaskPage.expectCategoryError();
  await addTaskPage.expectDueDateError();
});
