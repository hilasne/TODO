import { test } from "../support/taskFixture";
import { AddNewTaskPage } from "../support/pages/addNewTaskPage";
import { SingleTaskPage } from "../support/pages/singleTaskPage";
import { randomNumber, isoDateFromToday } from "../support/Helpers/testDataHelpers";
import {
  CategoryOptions,
  createTaskTitle,
  PriorityOptions,
  randomCategory,
  randomPriority,
} from "../support/Helpers/taskDetails";

test("edit task", async ({ createTask, openApp, page, tasksPage }) => {
  const name: string = createTask;
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, name);
  const addTaskPage: AddNewTaskPage = new AddNewTaskPage(page);

  const newName: string = createTaskTitle();
  const date: Date = isoDateFromToday(randomNumber());
  const category: CategoryOptions = randomCategory();
  const priority: PriorityOptions = randomPriority();

  await singleTaskPage.clickEditTask();
  await addTaskPage.enterTaskName(newName);
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickSave();

  const editedTaskPage = new SingleTaskPage(page, newName);

  await editedTaskPage.expectTaskCategoryToBe(category);
  await editedTaskPage.expectTaskNameToBe(newName);
  await editedTaskPage.expectTaskDueDateToBe(date);
  await editedTaskPage.expectTaskPriorityToBe(priority);
  await tasksPage.expectTasksAmountToBe(1);
});

test("delete task", async ({ createTask, openApp, page, tasksPage, toolBarPage }) => {
  const name: string = createTask;
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, name);

  await tasksPage.expectEmptyStateAlert(false);
  await toolBarPage.expectTasksLeftToBe(1);

  await singleTaskPage.clickDeleteTask();

  await tasksPage.expectEmptyStateAlert();
  await tasksPage.expectTasksAmountToBe(0);
  await toolBarPage.expectTasksLeftToBe(0);
});

test("check task", async ({ createTask, openApp, page, toolBarPage }) => {
  const name: string = createTask;
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, name);

  await toolBarPage.expectTasksLeftToBe(1);
  await toolBarPage.expectTasksTotalCountToBe(1);

  await singleTaskPage.checkTask();

  await singleTaskPage.expectTaskIsChecked();
  await toolBarPage.expectTasksLeftToBe(0);
  await toolBarPage.expectTasksTotalCountToBe(1);
});
