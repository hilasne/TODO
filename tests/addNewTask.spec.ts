import { test } from "../support/taskFixture";
import { AddNewTaskPage } from "../pages/addNewTaskPage";
import { randomNumber, isoDateFromToday } from "../support/Helpers/testDataHelpers";
import { CategoryOptions, PriorityOptions, randomCategory, randomPriority } from "../support/Helpers/taskDetails";

const date: string = isoDateFromToday(randomNumber());
const category: CategoryOptions = randomCategory();
const priority: PriorityOptions = randomPriority();

test("add new task", async ({ openApp, page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName, singleTaskPage } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
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
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickCancel();

  await toolBarPage.expectTasksLeftToBe(0);
  await tasksPage.expectTasksAmountToBe(0);
  await tasksPage.expectEmptyStateAlert();
});

test("click close new task modal", async ({ openApp, page, tasksPage, toolBarPage, getSingleTaskPageAndName }) => {
  const { singleTaskName } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.closeModal();

  toolBarPage.expectTasksLeftToBe(0);
  tasksPage.expectTasksAmountToBe(0);
  tasksPage.expectEmptyStateAlert();
});

test("negative, add empty task", async ({ openApp, page, tasksPage, toolBarPage }) => {
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.clickSave();

  await addTaskPage.expectNameError();
  await addTaskPage.expectCategoryError();
  await addTaskPage.expectDueDateError();

  toolBarPage.expectTasksLeftToBe(0);
  tasksPage.expectTasksAmountToBe(0);
});
