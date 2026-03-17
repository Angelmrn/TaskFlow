const BASE_URL = "http://localhost:1234/api";
const getToken = () => localStorage.getItem("accessToken");

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
  const response = await fetch(`${BASE_URL}/project/${projectId}/members`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error getting project members");
  }
  return response.json();
};

export const addProjectMember = async (
  projectId: number,
  member: addMemberData,
): Promise<Member> => {
  const response = await fetch(`${BASE_URL}/project/${projectId}/member/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(member),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Error adding member");
  }
  return response.json();
};
