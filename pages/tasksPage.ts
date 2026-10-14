import { Locator, Page, expect } from "@playwright/test";
import { TasksPageSelectors } from "../selectors/tasksSelectors";
import { SingleTaskPage } from "./singleTaskPage";
import { singleTaskSelectors } from "../selectors/singleTaskSelectors";

export class TasksPage {
  private readonly page: Page;
  private readonly emptyStateAlert: Locator;
  private readonly taskRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyStateAlert = this.page.locator(TasksPageSelectors.emptyStatePage);
    this.taskRows = this.page.locator(singleTaskSelectors.singleTask);
  }

  getSingleTaskPageByName(name: string): SingleTaskPage {
    return new SingleTaskPage(this.page, name);
  }

  // Expect Methods

  async expectTasksOrderToBe(tasksNames: string[]) {
    for (let i: number = 0; i < tasksNames.length; i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskName)).toHaveText(tasksNames[i]);
    }
  }

  async expectEmptyStateAlert() {
    await expect(this.emptyStateAlert).toBeVisible();
  }

  async expectTasksAmountToBe(expected: number) {
    await expect(this.taskRows).toHaveCount(expected);
  }
}
