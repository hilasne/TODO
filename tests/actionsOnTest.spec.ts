import { test } from "../fixtures/addTaskFixture";
import { AddNewTaskPage } from "../pages/addNewTaskPage";
import { SingleTaskPage } from "../pages/singleTaskPage";
import { randomNumber, isoDateFromDay } from "../Helpers/testDataHelpers";
import { CategoryOptions, PriorityOptions, randomCategory, randomPriority } from "../Helpers/taskDetails";

test("edit task", async ({ page, tasksPage, toolBarPage }) => {
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, "Pay electricity bill");
  const addTaskPage = new AddNewTaskPage(page);
  const date: string = isoDateFromDay(randomNumber());
  const category: CategoryOptions = randomCategory();
  const priority: PriorityOptions = randomPriority();

  await singleTaskPage.clickEditTask();
  await addTaskPage.enterTaskName("Pay electricity bill");
  await addTaskPage.enterDueDate(date);
  await addTaskPage.selectCategory(category);
  await addTaskPage.selectPriority(priority);
  await addTaskPage.clickSave();

  singleTaskPage.expectTaskCategoryToBe(category);
  singleTaskPage.expectTaskNameToBe("Pay electricity bill");
  singleTaskPage.expectTaskDueDateToBe(date);
  singleTaskPage.expectTaskPriorityToBe(priority);
});

test("delete task", async ({ page, tasksPage, toolBarPage }) => {
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, "Pay electricity bill");

  await toolBarPage.expectTasksLeftToBe(1);

  await singleTaskPage.clickDeleteTask();

  await tasksPage.expectTasksAmountToBe(0);
  await toolBarPage.expectTasksLeftToBe(0);
});

test("check task", async ({ page, tasksPage, toolBarPage }) => {
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, "Pay electricity bill");

  await toolBarPage.expectTasksLeftToBe(1);

  await singleTaskPage.checkTask();

  await singleTaskPage.expectTaskIsChecked();
  await tasksPage.expectTasksAmountToBe(1);
  await toolBarPage.expectTasksLeftToBe(0);
});
