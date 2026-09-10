import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser, logoutUser, loginUser } from "../services/authAPI";
import Dropdown from "./Dropdown/Dropdown.jsx";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const checkLoginStatus = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      setUsername("");
      return;
    }

    try {
      const { user } = await getCurrentUser();

      if (user?.username) {
        setUsername(user.username);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setUsername("");
    }
  };

  const handleLogin = async () => {
    try {
      const data = await loginUser({ username, password });

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      await checkLoginStatus();
      setError("");
      setPassword("");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleKeyDown = ({key}) => {
    if (key === "Enter") {
      handleLogin()
    }
  }

  useEffect(() => {
    checkLoginStatus();
  }, []);


  return (
    <>
      <nav className="bg-gray-800 p-4 min-w-screen flex justify-between items-center">
        <button
          onClick={() => navigate("/clondle")}
          className="text-white text-2xl font-bold"
        >
          Clondle!
        </button>

        {isLoggedIn ? (
          <Dropdown
            onClick={async () => {
              try {
                await checkLoginStatus();
              } catch (err) {
                console.error(err);
              }
            }}
            buttonText={`Welcome, ${username}`}
            content={
              <>
                <button
                onClick={() => navigate("/profile")}
                className='hover:pointer-fine:hover:cursor-pointer hover:bg-blue-100 p-2'
                >
                  Profile
                </button>
                <button onClick={() => navigate("/settings")}>Settings</button>
                <button
                  onClick={async () => {
                    try {
                      await logoutUser();
                      localStorage.removeItem("token");
                      setIsLoggedIn(false);
                      setUsername("");
                      setPassword("");
                      setError("");
                    } catch (err) {
                      console.error(err);
                    }
                  }}
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
                <input
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-2 border-black rounded-md p-2 text-center mb-2"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="border-2 border-black rounded-md p-2 text-center"
                />
                <button
                  onClick={handleLogin}
                  className="border-2 border-black rounded-md p-1 text-center mt-2"
                >
                  Login
                </button>

                {error && <div className="text-red-500">{error}</div>}

                <div className="m-0.5">
                  <input type="checkbox" id="rememberMe" name="rememberMe" />
                  <label htmlFor="rememberMe"> Remember Me</label>
                </div>

                <span className="text-blue-500 cursor-pointer">
                  Forgot Password?
                </span>

                <span className="text-center block">
                  Don't have an account?
                  <span
                    className="text-blue-500 cursor-pointer p-1"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </span>
                </span>
              </>
            }
          />
        )}
      </nav>
    </>
  );
}

export default Navbar;
