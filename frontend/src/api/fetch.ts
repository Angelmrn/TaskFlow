const BASE_URL = "http://localhost:1234/api";

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  const response = await fetch(`${BASE_URL}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
    return null;
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
};

export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
): Promise<any> => {
  const token = localStorage.getItem("accessToken");
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (response.status === 401) {
    const newToken = await refreshAccessToken();
    if (!newToken) return;

    const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${newToken}`,
      },
    });

    if (!retryResponse.ok) {
      const error = await retryResponse.json();
      throw new Error(error.message || "Error in retry Response");
    }
    return retryResponse.json();
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};
