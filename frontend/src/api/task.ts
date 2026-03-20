import { apiFetch } from "./fetch";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  projectId: number;
  asigneeId: number;
  createdAt: string;
  updatedAt: string;
  assigneeId?: number;
  assignee?: {
    id: number;
    username: string;
  };
}

export interface CreateTaskData {
  title: string;
  description?: string;
  status?: string;
  assigneeId?: number;
}

export const getTaskByProjectId = async (id: number): Promise<Task[]> => {
  return apiFetch(`/project/${id}/tasks`);
};

export const postNewTask = async (
  task: CreateTaskData,
  id: number,
): Promise<Task> => {
  return apiFetch(`/project/${id}/task/create`, {
    method: "POST",
    body: JSON.stringify(task),
  });
};

export const updateTask = async (
  task: CreateTaskData,
  projectId: number,
  taskId: number,
): Promise<Task> => {
  return apiFetch(`/project/${projectId}/task/update/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(task),
  });
};

export const deleteTask = async (
  projectId: number,
  taskId: number,
): Promise<void> => {
  return apiFetch(`/project/${projectId}/task/delete/${taskId}`, {
    method: "DELETE",
  });
};
