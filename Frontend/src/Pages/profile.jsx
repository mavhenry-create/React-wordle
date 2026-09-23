import { useEffect, useState } from "react";
import { getCurrentUser, updateUserSettings } from "../services/authAPI.js";
import Card from "../components/modal/Error/card.jsx";
import Settings from "../components/modal/Profile/settings.jsx";
import Stats from "../components/Profile-stats/stats.jsx";
import { DIFFICULTIES } from "../constants/difficulty.js";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    getCurrentUser()
      .then(setProfile)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  if (error) return <Card message={error} type="error" />;
  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <div className="profile-wrapper">
        {alertMessage && <Card message={alertMessage} type="success" />}
        <div className="profile-container flex justify-center items-center grid-cols-2">
          <div className="profile-avatar bg-white flex flex-col items-center border border-gray-300 p-4 rounded-lg box-shadow-md shadow-lg">
            <h1 className="font-bold text-2xl mb-4">Profile</h1>
            <img
              src={profile.user.avatar_url}
              alt={`${profile.user.display_name}'s avatar`}
              className="w-24 h-24 rounded-full"
            />
            <p className="mt-4">{profile.user.display_name}</p>
            <hr className="my-4 w-full border-t border-gray-300" />

            <p>Boards Completed: {profile.stats.wins}</p>
            <p>Current Difficulty: {DIFFICULTIES[profile.user.difficulty]}</p>
            <p>Word Length: {profile.user.word_length}</p>
          </div>          
            <Stats stats={profile.stats} />
          
        </div>

        <div className="settings mt-10 flex justify-center items-center position-relative">
          <Settings
            difficulty={profile.user.difficulty}
            wordLength={profile.user.word_length}
            onSave={async (newDifficulty, newWordLength) => {
              try {
                await updateUserSettings(newDifficulty, newWordLength);
                setProfile((prev) => ({
                  ...prev,
                  user: {
                    ...prev.user,
                    difficulty: newDifficulty,
                    word_length: newWordLength,
                  },
                }));
              } catch (err) {
                setError(err.message);
              } finally {
                setAlertMessage("Game settings updated successfully.");
              }
            }}
          />
          <button
            onClick={() => setShowUserSettings(!showUserSettings)}
            className="user-setting bg-gray-800 text-white p-2 rounded mt-5 ml-5"
          >
            User Settings
          </button>
        </div>
        {showUserSettings && (
          <div className="user-settings-container flex flex-col justify-center items-center mt-5 w-1/2 mx-auto bg-white border border-gray-300 p-4 rounded-lg box-shadow-md shadow-lg  ">
            <h3 className="font-bold text-xl mb-4">User Settings</h3>
            <form className="flex flex-col items-center">
              <h4 className="font-bold text-lg mb-4">Update Username</h4>
              <label htmlFor="displayName" text="New Username">
                New Display Name
              </label>
              <input
                type="text"
                id="displayName"
                name="displayName"
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="New Display Name"
              />
              <label htmlFor="confirmDisplayName" text="Confirm Display Name">
                Confirm Display Name
              </label>
              <input
                type="text"
                id="confirmDisplayName"
                name="confirmDisplayName"
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="Confirm Display Name"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white p-2 rounded"
              >
                Update Display Name
              </button>
            </form>
            <hr className="my-4 w-1/3 border-t border-gray-300" />
            <h5 className="font-bold text-lg m-4">Delete Account</h5>
            <p>
              <span className="text-red-600 font-bold">Warning</span>: This
              action is irreversible.
            </p>
            <button
              type="button"
              className="bg-red-600 text-white p-2 rounded mt-2"
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    </>
  );
}
