const BASE_URL = "http://localhost:1234/api";
const getToken = () => localStorage.getItem("accessToken");

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
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to register");
  }

  return response.json();
};

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  return response.json();
};

export const logout = async (): Promise<void> => {};

export const getMe = async (): Promise<User> => {
  const response = await fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fethc user");
  }
  return response.json();
};

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fethc users");
  }
  return response.json();
};
