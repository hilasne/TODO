import { test } from "../fixtures/addTaskFixture";
import { SingleTaskPage } from "../pages/singleTaskPage";

test("validate today due date", async ({ createTaskWithTodayDueDate, openApp, page, toolBarPage }) => {
  const taskName = createTaskWithTodayDueDate;
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, taskName);

  await singleTaskPage.expectTaskDueDateToBe("Today");
});

test("validate overdue due date", async ({ createTaskWithOverdueDueDate, openApp, page, toolBarPage }) => {
  const taskName = createTaskWithOverdueDueDate;
  const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, taskName);

  await singleTaskPage.expectTaskDueDateToBe("Overdue");
});

