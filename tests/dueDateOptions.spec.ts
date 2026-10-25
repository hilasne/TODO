import { test } from "../support/taskFixture";
import { SingleTaskPage } from "../support/pages/singleTaskPage";

test.describe(() => {
  test.use({
    createdTaskDaysFromDueDate: 0,
  });

  test("validate today due date", async ({ createTask, openApp, page, toolBarPage }) => {
    const taskName = createTask;
    const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, taskName);

    await singleTaskPage.expectTaskDueDateToBe("Today");
  });
});

test.describe(() => {
  test.use({
    createdTaskDaysFromDueDate: -1,
  });

  test("validate overdue due date", async ({ createTask, openApp, page, toolBarPage }) => {
    const taskName = createTask;
    const singleTaskPage: SingleTaskPage = new SingleTaskPage(page, taskName);

    await singleTaskPage.expectTaskDueDateToBe("Overdue");
  });
});
