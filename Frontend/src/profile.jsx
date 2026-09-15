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
    <div className="profile-container flex justify-center items-center mt-10 ">
      
      <div className="profile-avatar bg-white flex flex-col items-center border border-gray-300 p-4 rounded-lg box-shadow-md shadow-lg">
        <h1 className='font-bold text-2xl mb-4'>Profile</h1>
        <img
          src={profile.user.avatar_url}
          alt={`${profile.user.display_name}'s avatar`}
          className="w-24 h-24 rounded-full"
        />
        <p className="mt-4">{profile.user.display_name}</p>
        <hr className="my-4 w-full border-t border-gray-300" />
        
        <p>Boards Completed: {profile.stats.wins}</p>
        
      </div>
      
      <div className="profile-stats w-90 h-69 pt-4 bg-white border border-gray-300 text-center rounded-lg box-shadow-md shadow-lg">
        <h1 className='font-bold text-2xl mb-4'>Statistics</h1>
        <p>Games played: {profile.stats.games_played}</p>
        <hr className="my-4 w-full border-t border-gray-300" />
        <p>Total guesses: {profile.stats.total_guesses}</p>
        <hr className="my-4 w-full border-t border-gray-300" />
        <p>Current streak: {profile.stats.streak ? profile.stats.streak : 0}</p>
      </div>
      <div className="settings mb-4">
      
      </div>
    </div>
  );
}
