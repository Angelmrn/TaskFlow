import { apiFetch } from "./fetch";

export interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const register = async (
  username: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`http://localhost:1234/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Register Error.");
  }
  return response.json();
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`http://localhost:1234/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to login");
  }
  return response.json();
};

export const logout = async (): Promise<void> => {
  const refreshToken = localStorage.getItem("refreshToken");
  await fetch(`http://localhost:1234/api/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
    body: JSON.stringify({ refreshToken }),
  });
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

export const getMe = async (): Promise<User> => {
  return apiFetch("/me");
};

export const getUsers = async (): Promise<User[]> => {
  return apiFetch("/users");
};
