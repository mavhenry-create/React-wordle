import pool from "../db.js";
import cron from "node-cron";

cron.schedule("0 0 * * *", async () => {
  try {
    await pool.query("DELETE FROM jwt_blacklist WHERE expires_at < NOW()");
    console.log("Cleanup task completed successfully.");
  } catch (err) {
    console.error("Error executing cleanup task:", err);
  }
});
