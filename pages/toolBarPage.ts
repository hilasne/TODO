import { Locator, Page, expect } from "@playwright/test";
import { toolbarSelectors } from "../selectors/toolBarSelectors";

export class ToolBarPage {
  private readonly page: Page;
  private readonly addTaskButton: Locator;
  private readonly completeAllTasksButton: Locator;
  private readonly clearCompletedTasksButton: Locator;
  private readonly tasksLeftNumber: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addTaskButton = this.page.locator(toolbarSelectors.addNewTaskButton);
    this.completeAllTasksButton = this.page.locator(toolbarSelectors.completeAllTasksButton);
    this.clearCompletedTasksButton = this.page.locator(toolbarSelectors.clearCompletedTasksButton);
    this.tasksLeftNumber = this.page.locator(toolbarSelectors.tasksLeftCount);
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
    expect(this.tasksLeftNumber.innerText()).toEqual(expectedNumber);
  }

  async expectCompleteTasksButtonToBeDisabled() {
    expect(this.completeAllTasksButton).toHaveAttribute("disabled");
  }

  async expectClearTasksButtonToBeDisabled() {
    expect(this.clearCompletedTasksButton).toHaveAttribute("disabled");
  }
}
