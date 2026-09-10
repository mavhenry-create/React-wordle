import pool from "./db.js";

export async function getGamesPlayed(userId) {
  const result = await pool.query(
    `SELECT COUNT(*)::int AS games_played
     FROM games
     WHERE user_id = $1`,
    [userId],
  );

  return result.rows[0].games_played;
}

export async function getWins(userId) {
  const result = await pool.query(
    `SELECT COUNT(*)::int AS wins
     FROM games
     WHERE user_id = $1
       AND won = TRUE`,
    [userId],
  );

  return result.rows[0].wins;
}

export async function getTotalGuesses(userId) {
  const result = await pool.query(
    `SELECT COALESCE(SUM(guesses_used), 0)::int AS total_guesses
     FROM games
     WHERE user_id = $1`,
    [userId],
  );

  return result.rows[0].total_guesses;
}


export async function getUserStats(userId) {
  const result = await pool.query(
    `SELECT
       COUNT(*)::int AS games_played,
       COUNT(*) FILTER (WHERE won = TRUE)::int AS wins,
       COALESCE(SUM(guesses_used), 0)::int AS total_guesses
     FROM games
     WHERE user_id = $1`,
    [userId],
  );

  return result.rows[0];
}

export async function saveGame({
  userId,
  solution,
  won,
  guessesUsed,
}) {
  const result = await pool.query(
    `INSERT INTO games
      (user_id, solution, won, guesses_used)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [userId, solution, won, guessesUsed],
  );

  return result.rows[0];
}