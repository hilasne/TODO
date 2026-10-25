import { Locator, expect, Page } from "@playwright/test";
import { singleTaskSelectors } from "../selectors/singleTaskSelectors";
import { CategoryOptions, PriorityOptions } from "../Helpers/taskDetails";

export class SingleTaskPage {
  private readonly page: Page;
  private readonly name: string;
  private readonly singleTask: Locator;
  private readonly taskName: Locator;
  private readonly taskCategory: Locator;
  private readonly taskPriority: Locator;
  private readonly taskDueDate: Locator;
  private readonly taskCheckbox: Locator;
  private readonly editTaskButton: Locator;
  private readonly deleteTaskButton: Locator;

  constructor(page: Page, name: string) {
    this.page = page;
    this.name = name;
    this.singleTask = this.page.locator(singleTaskSelectors.singleTask).filter({
      has: this.page.locator(singleTaskSelectors.taskName, { hasText: name }),
    });
    this.taskName = this.singleTask.locator(singleTaskSelectors.taskName);
    this.taskCategory = this.singleTask.locator(singleTaskSelectors.taskCategory);
    this.taskPriority = this.singleTask.locator(singleTaskSelectors.taskPriority);
    this.taskDueDate = this.singleTask.locator(singleTaskSelectors.taskDueDate);
    this.taskCheckbox = this.singleTask.locator(singleTaskSelectors.taskCheckbox);
    this.editTaskButton = this.singleTask.locator(singleTaskSelectors.editTaskButton);
    this.deleteTaskButton = this.singleTask.locator(singleTaskSelectors.deleteTaskButton);
  }

  getTaskName(): string {
    return this.name;
  }

  async checkTask() {
    await this.taskCheckbox.click();
  }

  async clickEditTask() {
    await this.editTaskButton.click();
  }

  async clickDeleteTask() {
    await this.deleteTaskButton.click();
  }

  private formatDueDate(date: string): string {
    const [year, month, day] = date.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
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

  async expectTaskDueDateToBe(expectedDueDate: string) {
    if (expectedDueDate === "Today" || expectedDueDate === "Overdue") {
      await expect(this.taskDueDate).toContainText(expectedDueDate);
    } else {
      await expect(this.taskDueDate).toContainText(this.formatDueDate(expectedDueDate));
    }
  }

  async expectTaskIsChecked(isChecked: boolean = true) {
    await expect(this.taskCheckbox).toBeChecked({ checked: isChecked });
  }
}
