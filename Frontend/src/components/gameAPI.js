const API_BASE = "/api/game";

function authHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guestId");

  if (token) headers.Authorization = `Bearer ${token}`;
  else if (guestId) headers["x-guest-id"] = guestId;

  return headers;
}

function captureGuestId(res) {
  const guestId = res.headers.get("x-guest-id");
  if (guestId) localStorage.setItem("guestId", guestId);
}

export async function startGame() {
  const res = await fetch(`${API_BASE}/start`, {
    method: "POST",
    headers: authHeaders(),
  });
  captureGuestId(res);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Failed to start game");
  }
  
  return res.json();
}

export async function verifyWord(word) {
  const res = await fetch(`${API_BASE}/verify`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ word }),
  });
  captureGuestId(res);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || "Failed to verify word");
  }
  return res.json();
}
