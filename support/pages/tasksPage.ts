import { Locator, Page, expect } from "@playwright/test";
import { TasksPageSelectors } from "../selectors/tasksSelectors";
import { SingleTaskPage } from "./singleTaskPage";
import { singleTaskSelectors } from "../selectors/singleTaskSelectors";
import { CategoryOptions, PriorityOptions } from "../Helpers/taskDetails";

export class TasksPage {
  private readonly page: Page;
  private readonly emptyStateAlert: Locator;
  private readonly emptyStateTitle: Locator;
  private readonly taskRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emptyStateAlert = this.page.locator(TasksPageSelectors.emptyStatePage);
    this.emptyStateTitle = this.page.locator(TasksPageSelectors.emptyStateTitle);
    this.taskRows = this.page.locator(singleTaskSelectors.singleTask);
  }

  getSingleTaskPageByName(name: string): SingleTaskPage {
    return new SingleTaskPage(this.page, name);
  }

  // Expect Methods

  async expectTasksOrderByNamesToBe(tasksNames: string[]) {
    for (let i: number = 0; i < tasksNames.length; i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskName)).toHaveText(tasksNames[i]);
    }
  }

  async expectTasksCategoryToBe(category: CategoryOptions) {
    for (let i: number = 0; i < (await this.taskRows.count()); i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskCategory)).toHaveText(category);
    }
  }

  async expectTasksPriorityToBe(priority: PriorityOptions) {
    for (let i: number = 0; i < (await this.taskRows.count()); i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskPriority)).toHaveText(priority);
    }
  }

  async expectEmptyStateTitleToBe(hasTasks: boolean) {
    if (hasTasks) {
      expect(this.emptyStateTitle).toHaveText("No matching tasks");
    } else {
      expect(this.emptyStateTitle).toHaveText("No tasks yet");
    }
  }

  async expectEmptyStateAlert(isVisible: boolean = true) {
    await expect(this.emptyStateAlert).toBeVisible({ visible: isVisible });
  }

  async expectTasksAmountToBe(expected: number) {
    await expect(this.taskRows).toHaveCount(expected);
  }
}
