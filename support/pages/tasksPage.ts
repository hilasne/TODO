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

  async expectTasksOrderByNamesToBe(tasksNames: string[]): Promise<void> {
    for (let i: number = 0; i < tasksNames.length; i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskName)).toHaveText(tasksNames[i]);
    }
  }

  async expectTasksCategoriesToBe(categories: CategoryOptions[]): Promise<void> {
    for (let i: number = 0; i < (await this.taskRows.count()); i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskCategory)).toHaveText(categories[i]);
    }
  }

  async expectTasksPriorityToBe(priority: PriorityOptions): Promise<void> {
    for (let i: number = 0; i < (await this.taskRows.count()); i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskPriority)).toHaveText(priority);
    }
  }

  async expectTasksCheckToBe(isChecked: boolean[]): Promise<void> {
    for (let i: number = 0; i < (await this.taskRows.count()); i++) {
      await expect(this.taskRows.nth(i).locator(singleTaskSelectors.taskCheckbox)).toBeChecked({
        checked: isChecked[i],
      });
    }
  }

  async expectEmptyStateAlert(isVisible: boolean = true, hasTasks: boolean = false): Promise<void> {
    await expect(this.emptyStateAlert).toBeVisible({ visible: isVisible });

    if (!isVisible) return;

    await expect(this.emptyStateTitle).toHaveText(hasTasks ? "No matching tasks" : "No tasks yet");
  }

  async expectTasksAmountToBe(expected: number): Promise<void> {
    await expect(this.taskRows).toHaveCount(expected);
  }
}
