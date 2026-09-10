const API_BASE = '/api/auth';

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


export async function registerUser({ username, email, password}) {
    const res = await fetch(`${API_BASE}/register`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ username, email, password })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(body.message || body.errors?.[0]?.msg || 'Registration failed');
    }
    return body;
}


export async function loginUser({ username, password }) {
    const res = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ username, password })
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(body.message || body.errors?.[0]?.msg || 'Login failed');
    }
    return body;
}


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


export async function logoutUser() {
    const res = await fetch(`${API_BASE}/logout`, {
        method: 'POST',
        headers: authHeaders(),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(body.message || body.errors?.[0]?.msg || 'Logout failed');
    }
    return body;
}

export async function logout() {
    await logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("guestId");
}