const BASE_URL = import.meta.env.VITE_BASE_URL;

const getToken = () => localStorage.getItem("accessToken");

export interface Project {
  id: number;
  name: string;
  description: string | null;
  color: string | null;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
  owner?: {
    id: number;
    username: string;
  };
  _count?: {
    task: number;
    members: number;
  };
}

export interface CreateProjectData {
  name: string;
  description?: string;
  color?: string;
}

export const getMyProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${BASE_URL}/project`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error getting my projects");
  }
  return response.json();
};

export const getProjectById = async (id: number): Promise<Project[]> => {
  const response = await fetch(`${BASE_URL}/project/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error getting project");
  }
  return response.json();
};

export const createProject = async (
  project: CreateProjectData,
): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/project/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error creating a project");
  }
  return response.json();
};

export const updateProject = async (
  project: CreateProjectData,
  id: number,
): Promise<Project> => {
  const response = await fetch(`${BASE_URL}/project/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(project),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error updating a project");
  }
  return response.json();
};

export const deleteProject = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/project/delete/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error deleting a project");
  }
};
