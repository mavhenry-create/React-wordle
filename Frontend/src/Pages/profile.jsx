import { useEffect, useState } from "react";
import { getCurrentUser, updateUserSettings, deleteAccount, changeOrUpdateUserName } from "../services/authAPI.js";
import { useAuth } from "../context/AuthContext.jsx";
import Card from "../components/modal/Error/card.jsx";
import Settings from "../components/modal/Gamesettings/settings.jsx";
import Stats from "../components/Profile-stats/stats.jsx";
import { DIFFICULTIES } from "../constants/difficulty.js";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [newUserName, setNewUserName] = useState("");
  const [confirmUserName, setConfirmUserName] = useState("");
  const { logout } = useAuth();

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

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
  try {
    await changeOrUpdateUserName(newUserName, confirmUserName);
    setProfile((prev) => ({ ...prev, user: { ...prev.user, username: newUserName } }));
    setAlertMessage("Username updated successfully.");
  } catch (err) {
    setError(err.message);
  }
  };

  const handleDeleteAccount = async () => {
  if (!window.confirm("This will permanently delete your account. Continue?")) return;
  try {
    await deleteAccount();
    logout();
  } catch (err) {
    setError(err.message);
  }
};


  return (
    <>
      <div className="profile-wrapper flex flex-col justify-center items-center">
        {alertMessage && <Card message={alertMessage} type="success" role="alert" aria-live='polite' className='sr-only' />}
        <div className="profile-container flex justify-center items-center grid-cols-2 w-full">
          <div className="profile-avatar bg-white flex flex-col items-center border border-gray-300 p-5.5 rounded-lg box-shadow-md shadow-lg">
            <h1 className="font-bold text-2xl mb-4">Profile</h1>
            <img
              src={profile.user.avatar_url}
              alt={`${profile.user.display_name}'s avatar`}
              className="w-24 h-24 rounded-full"
            />
            <p className="mt-4 font-bold">{profile.user.username}</p>
            <hr className="my-4 w-full border-t border-gray-300" />

            <p className="font-semibold">Boards Completed: {profile.stats.wins}</p>
            <p className="font-semibold">Current Difficulty: {DIFFICULTIES[profile.user.difficulty]}</p>
            <p className="font-semibold">Word Length: {profile.user.word_length}</p>
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
            className="user-setting bg-gray-800 text-white p-2 rounded mt-5 ml-5 hover:cursor-pointer hover:bg-gray-700" 
            type="button"
          >
            User Settings
          </button>
        </div>
        {showUserSettings && (
          <div className="user-settings-container flex flex-col justify-center items-center mt-5 w-1/2 mx-auto bg-white border border-gray-300 p-4 rounded-lg box-shadow-md shadow-lg  ">
            <h3 className="font-bold text-xl mb-4">User Settings</h3>
            <hr className="w-1/3 border-t border-gray-300" />
            <form className="flex flex-col items-center" onSubmit={handleUsernameSubmit}>
              <h4 className="font-bold text-lg mb-4">Update Username</h4>
              <input
                type="text"
                id="newUserName"
                name="newUserName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="New Username"
              />
              <input
                type="text"
                id="confirmNewUserName"
                name="confirmNewUserName"
                value={confirmUserName}
                onChange={(e) => setConfirmUserName(e.target.value)}
                className="border border-gray-300 p-2 rounded mb-4"
                placeholder="Confirm Username"
              />
              <button
                type="submit"
                className="bg-gray-800 text-white p-2 rounded hover:cursor-pointer hover:bg-gray-700"
              >
                Update Username
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
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        )}
      </div>
    </>
  );
}
