const BASE_URL = "http://localhost:1234/api";
const getToken = () => localStorage.getItem("accessToken");
import { apiFetch } from "./fetch";

export interface Member {
  id: number;
  userId: number;
  role: string;
  user: {
    id: number;
    username: string;
  };
}

export interface addMemberData {
  userId: number;
  role: string;
}

export const getProjectMembers = async (
  projectId: number,
): Promise<Member[]> => {
  return apiFetch(`/project/${projectId}/members`);
};

export const addProjectMember = async (
  projectId: number,
  member: addMemberData,
): Promise<Member> => {
  return apiFetch(`/project/${projectId}/member/add`, {
    method: "POST",
    body: JSON.stringify(member),
  });
};
