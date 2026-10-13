import { Locator, Page, expect } from "@playwright/test";
import { toolbarSelectors } from "../selectors/toolBarSelectors";

export class ToolBarPage {
<<<<<<< HEAD
  private readonly page: Page;
=======
  protected readonly page: Page;
>>>>>>> 26ee7e6eb0ffbf2e256d8340a924cc3bb5985526
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

  async expectTasksLeftToBe(expectedNumber: number): Promise<void> {
    expect(this.tasksLeftNumber.innerText()).toEqual(expectedNumber);
  }
}
