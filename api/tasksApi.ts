// api/tasks-api.ts
import { APIRequestContext, expect } from "@playwright/test";

export type Task = { id: string; title: string; dueDate?: string };

export class TasksApi {
  constructor(private request: APIRequestContext) {}

  async deleteAll(): Promise<number> {
    const res = await this.request.delete("/api/tasks");
    expect(res.ok(), await res.text()).toBeTruthy();
    const body: { deleted: number } = await res.json();
    return body.deleted;
  }
}
