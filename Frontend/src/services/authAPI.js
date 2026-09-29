const API_BASE = '/api/auth';

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


export async function updateUserSettings(difficulty, wordLength) {
    const response = await fetch(`${API_BASE}/settings`, {
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

export async function changeOrUpdateUserName(newUserName, confirmNewUserName) {
    if (newUserName !== confirmNewUserName) {
        throw new Error("Username confirmation does not match");
    }
    const response = await fetch(`${API_BASE}/username`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ newUserName }),
    });

    
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data.message || "Failed to update username");
    }

    return data;
}

export async function deleteAccount() {
  const response = await fetch(`${API_BASE}/account`, {
    method: "DELETE",
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Failed to delete account");
  }

  return data;
}