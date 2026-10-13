import { test } from "../fixtures/addTaskFixture";
import { AddNewTaskPage } from "../pages/addNewTaskPage";

  test("add new task", async ({ page, singleTaskPage, toolBarPage }) => {
    const addTaskPage = new AddNewTaskPage(page);

    await toolBarPage.clickAddTask();
    await addTaskPage.enterTaskName("hila");
    await addTaskPage.enterDueDate("2026-10-13");
    await addTaskPage.selectCategory("Personal");
    await page.waitForTimeout(3000)
    await addTaskPage.selectPriority("high");
    await addTaskPage.clickSave();
  });
