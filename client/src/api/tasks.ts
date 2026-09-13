import { apiRequest } from "./api";

export type Task = {
  id: number;
  household_id: number;
  assigned_to: number;
  assigned_to_email: string;
  title: string;
  time: string;
  completed: boolean;
  created_at: string;
};

export async function getTasks(): Promise<Task[]> {
  return apiRequest("/tasks");
}

export async function createTask(
  title: string,
  time: string,
  assignedTo: number
): Promise<Task> {
  return apiRequest("/tasks", {
    method: "POST",
    body: JSON.stringify({
      title,
      time,
      assignedTo,
    }),
  });
}

export async function updateTask(
  id: number,
  completed: boolean
): Promise<Task> {
  return apiRequest(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed,
    }),
  });
}

export async function deleteTask(id: number): Promise<Task> {
  return apiRequest(`/tasks/${id}`, {
    method: "DELETE",
  });
}