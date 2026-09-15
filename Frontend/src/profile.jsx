import { useEffect, useState } from "react";
import { getCurrentUser } from "./services/authAPI.js";
import Card from "./components/modal/Error/card.jsx";
import Settings from "./components/modal/Profile/settings.jsx";


export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(null);

  const toggleSettings = () =>{  
    setIsOpen((prev) => !prev);
  }


  useEffect(() => {
    getCurrentUser()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <Card message={error} type="error" />;
  if (!profile) return <p>Loading...</p>;

  return (
    <>
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
    </div>

      <div className="settings mt-10 flex flex-col justify-center items-center">
        <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={toggleSettings}
        >
          Open Settings
        </button>
      {isOpen && <Settings />}
      </div>
    
  </>
  );
}
