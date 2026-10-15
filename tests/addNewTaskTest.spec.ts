import { test } from "../fixtures/addTaskFixture";
import { AddNewTaskPage } from "../pages/addNewTaskPage";
import { SingleTaskPage } from "../pages/singleTaskPage";
import { randomNumber, isoDateFromDay } from "../Helpers/testDataHelpers";
import { CategoryOptions, PriorityOptions, randomCategory, randomPriority } from "../Helpers/taskDetails";

const date: string = isoDateFromDay(randomNumber());
const category: CategoryOptions = randomCategory();
const priority: PriorityOptions = randomPriority();

test("add new task", async ({ page, tasksPage, toolBarPage, getSingleTaskPageAndName, cleanTasks }) => {
  const { singleTaskName, singleTaskPage } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickSave();

  toolBarPage.expectTasksLeftToBe(1);
  tasksPage.expectTasksAmountToBe(1);
  singleTaskPage.expectTaskCategoryToBe(category);
  singleTaskPage.expectTaskNameToBe(singleTaskName);
  singleTaskPage.expectTaskDueDateToBe(date);
  singleTaskPage.expectTaskPriorityToBe(priority);
  singleTaskPage.expectTaskIsChecked(false);
});

test("cancel add new task", async ({ page, tasksPage, toolBarPage, getSingleTaskPageAndName, cleanTasks }) => {
  const { singleTaskName } = getSingleTaskPageAndName;
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.enterTaskName(singleTaskName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickCancel();

  toolBarPage.expectTasksLeftToBe(0);
  tasksPage.expectTasksAmountToBe(0);
});

test("negative, add empty task", async ({ page, cleanTasks, tasksPage, toolBarPage }) => {
  const addTaskPage = new AddNewTaskPage(page);

  await toolBarPage.clickAddTask();
  await addTaskPage.clickSave();

  await addTaskPage.expectNameError();
  await addTaskPage.expectCategoryError();
  await addTaskPage.expectDueDateError();

  toolBarPage.expectTasksLeftToBe(0);
  tasksPage.expectTasksAmountToBe(0);
});
