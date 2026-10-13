import { Locator, Page, expect } from "@playwright/test";
import { singleTaskSelectors } from "../selectors/singleTaskSelectors";
import { CategoryOptions, DueDateOptions, PriorityOptions } from "../types/task";

export class SingleTaskPage {
  private readonly page: Page;
  private readonly singleTask: Locator;
  private readonly taskName: Locator;
  private readonly taskCategory: Locator;
  private readonly taskPriority: Locator;
  private readonly taskDueDate: Locator;
  private readonly taskCheckbox: Locator;
  private readonly editTaskButton: Locator;
  private readonly deleteTaskButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.singleTask = this.page.locator(singleTaskSelectors.singleTask);
    this.taskName = this.singleTask.locator(singleTaskSelectors.taskName);
    this.taskCategory = this.singleTask.locator(singleTaskSelectors.taskCategory);
    this.taskPriority = this.singleTask.locator(singleTaskSelectors.taskPriority);
    this.taskDueDate = this.singleTask.locator(singleTaskSelectors.taskDueDate);
    this.taskCheckbox = this.singleTask.locator(singleTaskSelectors.taskCheckbox);
    this.editTaskButton = this.singleTask.locator(singleTaskSelectors.editTaskButton);
    this.deleteTaskButton = this.singleTask.locator(singleTaskSelectors.deleteTaskButton);
  }

  async clickEditTask() {
    await this.editTaskButton.click();
  }

  async clickDeleteTask() {
    await this.deleteTaskButton.click();
  }

  // Expect Methods

  async expectTaskNameToBe(expectedName: string) {
    await expect(this.taskName).toHaveText(expectedName);
  }

  async expectTaskCategoryToBe(expectedCategory: CategoryOptions) {
    await expect(this.taskCategory).toHaveText(expectedCategory);
  }

  async expectTaskPriorityToBe(expectedPriority: PriorityOptions) {
    await expect(this.taskPriority).toHaveText(expectedPriority);
  }

  async expectTaskDueDateToBe(expectedDueDate: string | DueDateOptions) {
    await expect(this.taskDueDate).toContainText(expectedDueDate);
  }

  async expectTaskIsChecked(isChecked: boolean = true) {
    await expect(this.taskCheckbox).toBeChecked({ checked: isChecked });
  }
}
