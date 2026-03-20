import { apiFetch } from "./fetch";

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
  return apiFetch(`/project`);
};

export const getProjectById = async (id: number): Promise<Project[]> => {
  return apiFetch(`/project/${id}`);
};

export const getMemberProjects = async (): Promise<Project[]> => {
  return apiFetch("/project/member");
};

export const createProject = async (
  project: CreateProjectData,
): Promise<Project> => {
  return apiFetch(`/project/create`, {
    method: "POST",
    body: JSON.stringify(project),
  });
};

export const updateProject = async (
  project: CreateProjectData,
  id: number,
): Promise<Project> => {
  return apiFetch(`/project/update/${id}`, {
    method: "PUT",
    body: JSON.stringify(project),
  });
};

export const deleteProject = async (id: number): Promise<void> => {
  return apiFetch(`/project/delete/${id}`, {
    method: "DELETE",
  });
};
