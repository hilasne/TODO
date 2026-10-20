import { faker } from '@faker-js/faker';

export function randomNumber(min = -100, max = 100): number {
  return (faker.number.int({ min, max }));
}

export function isoDateFromToday(daysFromToday: number = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromToday);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");

  return `${y}-${m}-${day}`;
}
