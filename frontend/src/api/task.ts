const BASE_URL = "http://localhost:1234/api";

const getToken = () => localStorage.getItem("accessToken");

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  projectId: number;
  asigneeId: number;
  createdAt: string;
  updatedAt: string;
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
  const response = await fetch(`${BASE_URL}/project/${id}/tasks`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error getting task");
  }
  return response.json();
};

export const postNewTask = async (
  task: CreateTaskData,
  id: number,
): Promise<Task> => {
  const response = await fetch(`${BASE_URL}/project/${id}/task/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error creatig task");
  }
  return response.json();
};

export const updateTask = async (
  task: CreateTaskData,
  projectId: number,
  taskId: number,
): Promise<Task> => {
  const response = await fetch(
    `${BASE_URL}/project/${projectId}/task/update/${taskId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(task),
    },
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error updating task");
  }
  return response.json();
};

export const deleteTask = async (
  projectId: number,
  taskId: number,
): Promise<void> => {
  const response = await fetch(
    `${BASE_URL}/project/${projectId}/task/delete/${taskId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    },
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error deleting task");
  }
};
