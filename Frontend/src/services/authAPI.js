const API_BASE = '/api/auth';

export async function getCurrentUser() {
  const response = await fetch("http://localhost:3000/api/auth/profile", {
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Failed to load profile");
  }

  return data;
}


export async function updateUserSettings(difficulty, wordLength) {
    const response = await fetch("http://localhost:3000/api/auth/settings", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ difficulty, wordLength }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Failed to update settings");
    }

    return data;
}