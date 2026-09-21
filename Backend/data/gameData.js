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


export async function getStreak(userId) {
  const result = await pool.query(
    `WITH play_days AS (
       SELECT DISTINCT played_at::date AS play_date
       FROM games
       WHERE user_id = $1
     ),
     grouped AS (
       SELECT play_date,
              play_date - (ROW_NUMBER() OVER (ORDER BY play_date DESC))::int
                * INTERVAL '1 day' AS grp
       FROM play_days
       WHERE play_date <= CURRENT_DATE
     )
     SELECT COUNT(*)::int AS streak
     FROM grouped
     WHERE grp = (SELECT grp FROM grouped ORDER BY play_date DESC LIMIT 1)
       AND EXISTS (
         SELECT 1 FROM play_days
         WHERE play_date IN (CURRENT_DATE, CURRENT_DATE - INTERVAL '1 day')
       )`,
    [userId],
  );

  return result.rows[0]?.streak ?? 0;
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

  const streak = await getStreak(userId);

  return { ...result.rows[0], streak };
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

