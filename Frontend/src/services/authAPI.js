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
    const res = await fetch(`${API_BASE}/profile`, {
        method: 'GET',
        headers: authHeaders(),
    });
    const body = await res.json().catch(() => ({}));
    if (!res.ok) {
        throw new Error(body.message || body.errors?.[0]?.msg || 'Failed to fetch current user');
    }
    return body;
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
    
}