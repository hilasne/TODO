// api/tasks-api.ts
import { APIRequestContext, expect } from "@playwright/test";
import { CategoryOptions, PriorityOptions } from "../Helpers/taskDetails";

export type NewTask = {
  name: string;
  category: CategoryOptions;
  priority: PriorityOptions;
  dueDate: string;
  completed?: boolean;
};

export class TasksApi {
  constructor(private request: APIRequestContext) {}

   async create(task: NewTask): Promise<void> {
    const res = await this.request.post("/api/tasks", {
      data: { completed: false, ...task },
    });
    expect(res.status(), await res.text()).toBe(201);
  }

  async deleteAll(): Promise<void> {
    const res = await this.request.delete("/api/tasks");
    expect(res.status(), await res.text()).toBe(200);
    const body: { deleted: number } = await res.json();
  }
}
