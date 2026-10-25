import { Locator, Page, expect } from "@playwright/test";
import { toolbarSelectors } from "../selectors/toolBarSelectors";

export class ToolBarPage {
  private readonly page: Page;
  private readonly addTaskButton: Locator;
  private readonly completeAllTasksButton: Locator;
  private readonly clearCompletedTasksButton: Locator;
  private readonly tasksLeftNumber: Locator;
  private readonly tasksTotalCounter: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addTaskButton = this.page.locator(toolbarSelectors.addNewTaskButton);
    this.completeAllTasksButton = this.page.locator(toolbarSelectors.completeAllTasksButton);
    this.clearCompletedTasksButton = this.page.locator(toolbarSelectors.clearCompletedTasksButton);
    this.tasksLeftNumber = this.page.locator(toolbarSelectors.tasksLeftCount);
    this.tasksTotalCounter = this.page.locator(toolbarSelectors.tasksCounterTotal);
  }

  async clickAddTask(): Promise<void> {
    await this.addTaskButton.click();
  }

  async clickCompleteAllTasks(): Promise<void> {
    await this.completeAllTasksButton.click();
  }

  async clickClearCompletedTasks(): Promise<void> {
    await this.clearCompletedTasksButton.click();
  }

  // Expect Methods

  async expectTasksLeftToBe(expectedNumber: number): Promise<void> {
    await expect(this.tasksLeftNumber).toHaveText(expectedNumber.toString());
  }

  async expectTasksTotalCountToBe(expectedNumber: number) {
    await expect(this.tasksTotalCounter).toContainText(expectedNumber.toString());
  }

  async expectCompleteAllButtonEnabled(isEnabled: boolean): Promise<void> {
    await expect(this.completeAllTasksButton).toBeEnabled({ enabled: isEnabled });
  }

  async expectClearTasksButtonEnabled(isEnabled: boolean): Promise<void> {
    await expect(this.clearCompletedTasksButton).toBeEnabled({ enabled: isEnabled });
  }
}
