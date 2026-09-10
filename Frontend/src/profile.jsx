import { useEffect, useState } from "react";
import { getCurrentUser } from "./services/profileAPI.js";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <p>{error}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Profile</h1>
      <p>{profile.user.display_name}</p>
      <p>Games played: {profile.stats.games_played}</p>
      <p>Wins: {profile.stats.wins}</p>
      <p>Total guesses: {profile.stats.total_guesses}</p>
    </div>
  );
}
