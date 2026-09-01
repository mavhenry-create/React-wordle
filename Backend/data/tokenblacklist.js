import pool from '../db.js';


export async function addTokenToBlacklist(hashedToken, expireAt) {
    const result = await pool.query(
      'INSERT INTO jwt_blacklist (token_hash, expires_at) VALUES ($1, $2)',
      [hashedToken, expireAt]
    );
    return result.rows[0];
}

export async function isTokenBlacklisted(hashedToken) {
    const result = await pool.query(
      'SELECT * FROM jwt_blacklist WHERE token_hash = $1 LIMIT 1',
      [hashedToken]
    );
    return result.rows.length > 0;
}