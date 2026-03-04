import api from "../api/axios";

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
    tasks: number;
    members: number;
  };
}

export interface CreateProjectData {
  name: string;
  description?: string;
  color?: string;
}

export const getMyProjects = async (): Promise<Project[]> => {
  const { data } = await api.get("/projects");
  return data;
};

export const getProjectById = async (id: number): Promise<Project> => {
  const { data } = await api.get(`/projects/${id}`);
  return data;
};

export const createProject = async (
  project: CreateProjectData,
): Promise<Project> => {
  const { data } = await api.post("/projects", project);
  return data;
};

export const updateProject = async (
  id: number,
  project: Partial<CreateProjectData>,
): Promise<Project> => {
  const { data } = await api.put(`/projects/${id}`, project);
  return data;
};

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`);
};
