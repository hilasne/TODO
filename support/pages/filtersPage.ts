import { Locator, expect, Page } from "@playwright/test";
import { filtersSelectors } from "../selectors/filtersBarSelectors";
import {
  CategoryOptions,
  FilterStatusOptions,
  PriorityOptions,
  SortByOptions,
  SortOrderOptions,
} from "../Helpers/taskDetails";

export class FiltersPage {
  private readonly page: Page;
  private readonly categorySelect: Locator;
  private readonly proritySelect: Locator;
  private readonly statusAllTasksButton: Locator;
  private readonly statusActiveTasksButton: Locator;
  private readonly statusCompletedTasksButton: Locator;
  private readonly sortBySelect: Locator;
  private readonly sortButton: Locator;
  private readonly resetFilters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categorySelect = this.page.locator(filtersSelectors.filterCategorySelect);
    this.proritySelect = this.page.locator(filtersSelectors.filterPrioritySelect);
    this.statusAllTasksButton = this.page.locator(filtersSelectors.filterStatusAllTasks);
    this.statusActiveTasksButton = this.page.locator(filtersSelectors.filterStatusActiveTasks);
    this.statusCompletedTasksButton = this.page.locator(filtersSelectors.filterStatusCompletedTasks);
    this.sortBySelect = this.page.locator(filtersSelectors.sortBySelect);
    this.sortButton = this.page.locator(filtersSelectors.sortButton);
    this.resetFilters = this.page.locator(filtersSelectors.resetFiltersButton);
  }

  async selectCategory(category: CategoryOptions) {
    await this.categorySelect.selectOption({ value: category });
  }

  async selectPriority(priority: PriorityOptions) {
    await this.proritySelect.selectOption({ value: priority });
  }

  async filterByStatus(status: FilterStatusOptions) {
    switch (status) {
      case "active":
        await this.statusActiveTasksButton.click();
        break;
      case "all":
        await this.statusAllTasksButton.click();
        break;
      case "completed":
        await this.statusCompletedTasksButton.click();
        break;
      default:
        break;
    }
  }

  async sortBy(sortOption: SortByOptions) {
    await this.sortBySelect.selectOption({ value: sortOption });
  }

  async clickDescAscButton() {
    await this.sortButton.click();
  }

  async clickResetFilters() {
    await this.resetFilters.click();
  }

  // Expect Methods

  async expectResetFiltersToBeVisible(visible: boolean = true) {
    await expect(this.resetFilters).toBeVisible({ visible });
  }

  async expectDescOrAsc(order: SortOrderOptions) {
    await expect(this.sortButton).toHaveAttribute("data-order", order);
  }

  async expectFiltersToBeReset() {
    await expect(this.categorySelect).toHaveValue(""); //All Categories value
    await expect(this.proritySelect).toHaveValue(""); //All Priorities value
    await expect(this.statusAllTasksButton).toContainClass("is-active");
    await expect(this.sortBySelect).toHaveValue("dueDate");
    await this.expectDescOrAsc("asc");
  }
}
