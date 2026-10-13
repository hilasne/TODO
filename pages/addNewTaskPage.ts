import { Locator, Page, expect } from "@playwright/test";
import { addNewTaskSelectors } from "../selectors/addNewTaskSelectors";

export class AddNewTaskPage {
  private readonly page: Page;
  private readonly taskModal: Locator;
  private readonly taskNameInput: Locator;
  private readonly categorySelect: Locator;
  private readonly prioritySelect: Locator;
  private readonly dueDateInput: Locator;
  private readonly cancelButton: Locator;
  private readonly saveButton: Locator;
  private readonly closeModalButton: Locator;
  private readonly errorName: Locator;
  private readonly errorCategory: Locator;
  private readonly errorDueDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskModal = this.page.locator(addNewTaskSelectors.taskModal);
    this.taskNameInput = this.taskModal.locator(addNewTaskSelectors.taskNameInput);
    this.categorySelect = this.taskModal.locator(addNewTaskSelectors.categorySelect);
    this.prioritySelect = this.taskModal.locator(addNewTaskSelectors.prioritySelect);
    this.dueDateInput = this.taskModal.locator(addNewTaskSelectors.dueDateInput);
    this.cancelButton = this.taskModal.locator(addNewTaskSelectors.cancelButton);
    this.saveButton = this.taskModal.locator(addNewTaskSelectors.saveButton);
    this.closeModalButton = this.taskModal.locator(addNewTaskSelectors.closeModalButton);

    this.errorName = this.taskModal.locator(addNewTaskSelectors.errorName);
    this.errorCategory = this.taskModal.locator(addNewTaskSelectors.errorCategory);
    this.errorDueDate = this.taskModal.locator(addNewTaskSelectors.errorDueDate);
  }

  async enterTaskName(taskName: string) {
    await this.taskNameInput.fill(taskName);
  }

  async selectCategory(option: string) {
    await this.categorySelect.selectOption({ value: option });
  }

  async selectPriority(priority: string) {
    await this.prioritySelect.selectOption({ value: priority });
  }

  async enterDueDate(dueDate: string) {
    await this.dueDateInput.fill(dueDate);
  }

  async clickSave() {
    await this.saveButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }

  async closeModal() {
    await this.closeModalButton.click();
  }

  // Expect Methods

  async expectTaskModalToBeVisible(visible: boolean = true) {
    await expect(this.taskModal).toBeVisible({ visible });
  }

  async expectNameError(visible: boolean = true) {
    await expect(this.errorName).toBeVisible({ visible });
  }

  async expectCategoryError(visible: boolean = true) {
    await expect(this.errorCategory).toBeVisible({ visible });
  }

  async expectDueDateError(visible: boolean = true) {
    await expect(this.errorDueDate).toBeVisible({ visible });
  }
}
