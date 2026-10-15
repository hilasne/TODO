import { faker } from '@faker-js/faker';

export const CATEGORIES = ["Work", "Personal", "Shopping", "Health", "Finance"] as const;
export const PRIORITIES = ["low", "medium", "high"] as const;

// TASK DETAIL TYPES
export type DueDateOptions = "Overdue" | "Today";
export type CategoryOptions = (typeof CATEGORIES)[number];
export type PriorityOptions = (typeof PRIORITIES)[number];

// GENERATE RANDOM VALUES
export function randomCategory() {
  return faker.helpers.arrayElement(CATEGORIES);
}

export function randomPriority() {
  return faker.helpers.arrayElement(PRIORITIES);
}

export function createTaskTitle(): string {
  return `${faker.hacker.verb()} ${faker.hacker.noun()} for yotam`;
}
