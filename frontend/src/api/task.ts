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
  description: string;
  asigneeId: number;
}

export const getTaskByProjectId = async (id: number): Promise<Task[]> => {
  const response = await fetch(`${BASE_URL}/project/${id}/tasks`, {
    headers: {
      Authoeization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error getting task");
  }
  return response.json();
};
