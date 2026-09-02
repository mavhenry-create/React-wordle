import pool from "./db.js";

export async function getGamesPlayed(userid) {
  const result = await pool.query(
    "SELECT COUNT(game_id) AS games_played FROM games WHERE userid = $1",
    [userid],
  );
  return result.rows[0].games_played;
}
