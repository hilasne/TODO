import { faker } from "@faker-js/faker";
import { NewTask } from "../api/tasksApi";
import { isoDateFromToday, randomNumber } from "./testDataHelpers";

export const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Finance"] as const;
export const PRIORITIES = ["low", "medium", "high"] as const;

// TASK DETAILS TYPES
export type CategoryOptions = (typeof CATEGORIES)[number];
export type PriorityOptions = (typeof PRIORITIES)[number];

// TASK FILTERS TYPES
export type FilterStatusOptions = "all" | "active" | "completed";
export type SortByOptions = "dueDate" | "name";
export type SortOrderOptions = "asc" | "desc";

// GENERATE RANDOM VALUES
export function randomCategory() {
  return faker.helpers.arrayElement(CATEGORIES);
}

export function randomPriority() {
  return faker.helpers.arrayElement(PRIORITIES);
}

export function randomTaskTitle(): string {
  return `${faker.hacker.verb()} ${faker.hacker.noun()} and ${faker.hacker.noun()} for yotam`;
}

export function getTask(daysFromDueDate?: number): NewTask {
  return {
    name: randomTaskTitle(),
    category: randomCategory(),
    priority: randomPriority(),
    dueDate: isoDateFromToday(daysFromDueDate ?? randomNumber()),
    completed: false,
  };
}
