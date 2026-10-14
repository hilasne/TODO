import { faker } from '@faker-js/faker';

export function createTaskTitle(): string {
  return `${faker.hacker.verb()} ${faker.hacker.noun()} for yotam`;
}