import { APIRequestContext, APIResponse, expect } from "@playwright/test";
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

  async create(task: NewTask): Promise<NewTask> {
    const res: APIResponse = await this.request.post("/api/tasks", {
      data: { completed: false, ...task },
    });
    expect(res.status(), await res.text()).toBe(201);
    
    return task;
  }

  async deleteAll(): Promise<void> {
    const res: APIResponse = await this.request.delete("/api/tasks");
    expect(res.status(), await res.text()).toBe(200);
  }

  async completeAll(): Promise<void> {
    const res: APIResponse = await this.request.post("/api/tasks/complete-all");
    expect(res.status(), await res.text()).toBe(200);
  }
}
