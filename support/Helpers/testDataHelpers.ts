import { faker } from "@faker-js/faker";

export function randomNumber(min = -100, max = 100): number {
  return faker.number.int({ min, max });
}

export function isoDateFromToday(daysFromToday: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);

  return d;
}

export function formatDateForNewTask(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
}

export function formatDateForValidation(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
