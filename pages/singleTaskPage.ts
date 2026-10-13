import { Locator, expect } from "@playwright/test";
import { singleTaskSelectors } from "../selectors/singleTaskSelectors";
import { CategoryOptions, DueDateOptions, PriorityOptions } from "../types/task";

export class SingleTaskPage {
  private readonly taskName: Locator;
  private readonly taskCategory: Locator;
  private readonly taskPriority: Locator;
  private readonly taskDueDate: Locator;
  private readonly taskCheckbox: Locator;
  private readonly editTaskButton: Locator;
  private readonly deleteTaskButton: Locator;

  constructor(protected readonly singleTask: Locator) {
    this.taskName = singleTask.locator(singleTaskSelectors.taskName);
    this.taskCategory = singleTask.locator(singleTaskSelectors.taskCategory);
    this.taskPriority = singleTask.locator(singleTaskSelectors.taskPriority);
    this.taskDueDate = singleTask.locator(singleTaskSelectors.taskDueDate);
    this.taskCheckbox = singleTask.locator(singleTaskSelectors.taskCheckbox);
    this.editTaskButton = singleTask.locator(singleTaskSelectors.editTaskButton);
    this.deleteTaskButton = singleTask.locator(singleTaskSelectors.deleteTaskButton);
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
