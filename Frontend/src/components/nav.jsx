import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../services/authAPI";
import Dropdown from "./Dropdown/Dropdown.jsx";
import Card from "./modal/card.jsx";


function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null));
  }, []);

  const handleLogin = () => {
    window.location.href =
      "http://localhost:3000/auth/login?returnTo=http://localhost:5173/";
  };

  const handleSignup = () => {
    window.location.href =
      "http://localhost:3000/auth/login?screen_hint=signup&returnTo=http://localhost:5173/";
  };

  const handleLogout = () => {
    window.location.href =
      "http://localhost:3000/auth/logout?returnTo=http://localhost:5173/";
  };

  return (
    <nav className="bg-gray-800 p-4 min-w-screen flex justify-between items-center">
      <button
        onClick={() => navigate("/clondle")}
        className="text-white text-2xl font-bold"
      >
        Clondle!
      </button>

      {user ? (
        <Dropdown
          buttonText={`Welcome, ${user.username || user.display_name}`}
          content={
            <>
              <button
                onClick={() => navigate("/profile")}
                className="hover:bg-blue-100 p-2"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="hover:bg-blue-100 p-2"
              >
                Logout
              </button>
            </>
          }
        />
      ) : (
        <Dropdown
          buttonText="Login"
          content={
            <>
              <button
                onClick={handleLogin}
                className="hover:bg-blue-100 p-2"
              >
                Login
              </button>

              <button
                onClick={handleSignup}
                className="hover:bg-blue-100 p-2"
              >
                Register
              </button>
            </>
          }
        />
      )}
    </nav>
  );
}

export default Navbar;
