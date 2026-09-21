import pool from "./db.js";

export async function claimGuestGame(guestId) {
  const result = await pool.query(
    `INSERT INTO guest_games (guest_id)
     VALUES ($1)
     ON CONFLICT (guest_id) DO NOTHING
     RETURNING guest_id`,
    [guestId],
  );

  return result.rowCount === 1;
}

export async function hasGuestPlayed(guestId) {
  const result = await pool.query(
    `SELECT EXISTS (
       SELECT 1
       FROM guest_games
       WHERE guest_id = $1
     ) AS played`,
    [guestId],
  );

  return result.rows[0].played;
}

export async function completeGuestGame(guestId) {
  await pool.query(
    `UPDATE guest_games
     SET completed_at = NOW()
     WHERE guest_id = $1`,
    [guestId],
  );
}

export async function hasCompletedGuestGame(guestId) {
  const result = await pool.query(
    `SELECT EXISTS (
       SELECT 1
       FROM guest_games
       WHERE guest_id = $1
         AND completed_at IS NOT NULL
     ) AS completed`,
    [guestId],
  );

  return result.rows[0].completed;
}