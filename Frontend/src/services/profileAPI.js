const API_BASE = "/api/auth";

export async function getCurrentUser() {
  const response = await fetch(`${API_BASE}/profile`, {
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Failed to load profile");
  }

  return data;
}