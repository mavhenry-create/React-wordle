const API_BASE = '/api/profile';

export async function getGamesPlayed(userid, token) {
  const response = await fetch(`${API_BASE}/games-played?userid=${userid}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.games_played;
}

export async function getCurrentStreak(userid, token) {
  const response = await fetch(`${API_BASE}/current-streak?userid=${userid}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.current_streak;
}

export async function getTotalGuesses(userid, token) {
  const response = await fetch(`${API_BASE}/total-guesses?userid=${userid}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  const data = await response.json();
  return data.total_guesses;
}