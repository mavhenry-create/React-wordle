import pool from "./db.js";

export async function getUserByAuth0Id(auth0Id) {
  const result = await pool.query("SELECT * FROM users WHERE auth0_id = $1", [
    auth0Id,
  ]);
  return result.rows[0];
}

export async function createUser({
  auth0Id,
  username,
  email,
  displayName,
  avatarUrl,
}) {
  const result = await pool.query(
    "INSERT INTO users (auth0_id, username, email, display_name, avatar_url, last_login_at) VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING *",
    [auth0Id, username, email, displayName, avatarUrl],
  );
  return result.rows[0];
}

export async function updateLastLogin(userid) {
  const result = await pool.query(
    "UPDATE users SET last_login_at = NOW(), updated_at = NOW() WHERE id = $1 RETURNING *",
    [userid]
  );
  return result.rows[0];
}


export async function findOrCreateUser(auth0User) {
  const existingUser = await getUserByAuth0Id(auth0User.sub);

  if (existingUser) {
    return updateLastLogin(existingUser.id)
  }

  return createUser({
    auth0Id: auth0User.sub,
    username: auth0User.nickname || null,
    email: auth0User.email || null,
    displayName: auth0User.name || null,
    avatarUrl: auth0User.picture || null,
  });
}