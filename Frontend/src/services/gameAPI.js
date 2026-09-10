const API_BASE = "/api/game";

export async function startGame() {
  const response = await fetch(`${API_BASE}/start`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to start game");
  }

  return data;
}

export async function verifyWord(word) {
  const response = await fetch(`${API_BASE}/verify`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to verify word");
  }

  return data;
}