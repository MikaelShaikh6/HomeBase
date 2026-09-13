import { apiRequest } from "./api";

type AuthResponse = {
  token: string;
  user: {
    id: number;
    email: string;
    householdId: number | null;
  };
};

export async function register(
  email: string,
  password: string
) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function login(
  email: string,
  password: string
): Promise<AuthResponse> {
  const data = await apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  localStorage.setItem("token", data.token);

  return data;
}

export function logout() {
  localStorage.removeItem("token");
}

export type CurrentUser = {
  id: number;
  email: string;
  household_id: number | null;
};

export async function getCurrentUser(): Promise<CurrentUser> {
  return apiRequest("/auth/me");
}