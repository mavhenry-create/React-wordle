import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.API_KEY;
const BASE_URL =
  process.env.BASE_URL || "https://wordle-api.p.rapidapi.com/api/match";

if (!API_KEY) {
  console.error("API_KEY is not defined in the environment variables.");
  process.exit(1);
}

function getOptions(method, body) {
  const options = {
    method: method,
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "wordle-api.p.rapidapi.com",
    },
    body: body ? JSON.stringify(body) : undefined,
  };
  if (body !== undefined) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  return options;
}

async function request(path, method, body, token) {
  const options = getOptions(method, body);
  if (token) {
    options.headers["Authorization"] = `Bearer ${token}`;
  }
  const response = await fetch(`${BASE_URL}${path}`, options);

  if (!response.ok) {
    throw new Error(
      `API request failed with status ${response.status}: ${response.statusText}`,
    );
  }
  return await response.json();
}

export function authenticate() {
  return request("/authenticate", "POST");
}

export function createMatch(matchData, token) {
  return request("", "POST", matchData, token);
}

export function verifyMatch(word, token) {
  return request(
    `/verify?word=${encodeURIComponent(word)}`,
    "PATCH",
    null,
    token,
  );
}

export function deleteMatch() {
  return request("", "DELETE");
}
