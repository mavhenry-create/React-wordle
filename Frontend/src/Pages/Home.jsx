import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  

  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center bg-gray-800">
      {user ? (
        <>
          <h1 className="text-3xl font-bold text-white">
            Welcome back <span className="font-bold">{user.username}</span> to
            Clondle!
          </h1>
          <h2 className="text-xl text-white">Ready for Today's word?</h2>
          <button
            onClick={() => navigate("/clondle")}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300 pointer-fine:cursor-pointer"
          >
            Play Today!
          </button>
          <hr className="my-4 w-1/4 border-t border-gray-300" />
          <h2 className="text-xl text-white">
            Check your profile for statistics and streaks!
          </h2>
          <button
            onClick={() => navigate("/profile")}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300 pointer-fine:cursor-pointer"
          >
            View Profile
          </button>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-bold text-white">Welcome to Clondle!</h1>
          <h2 className="text-xl text-white">Ready for Today's word?</h2>
          <button
            onClick={() => navigate("/clondle")}
            className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300 pointer-fine:cursor-pointer"
          >
            Play Today!
          </button>
          <hr className="my-4 w-1/4 border-t border-gray-300" />
          <div className="flex flex-col gap-3 items-center justify-center mt-5 ">
            <h2 className="text-xl text-white font-bold">New here?</h2>
            <h2 className="text-lg text-white">
              Create an account to track your streak and statistics!
            </h2>
            <p className="text-white">
              Perks of having an account you can change your difficulty, word
              length And Play as much as you want!
            </p>
            <h2 className="text-lg text-white">Already have an account?</h2>
            <div className="flex gap-3 items-center justify-center mt-5">
              <button
                onClick={() => {
                  const returnTo = encodeURIComponent("http://localhost:5173/");

                  window.location.href = `http://localhost:3000/auth/login?screen_hint=signup&returnTo=${returnTo}`;
                }}
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300 pointer-fine:cursor-pointer"
              >
                Register
              </button>

              <button
                onClick={() => {
                  const returnTo = encodeURIComponent("http://localhost:5173/");

                  window.location.href = `http://localhost:3000/auth/login?returnTo=${returnTo}`;
                }}
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300 pointer-fine:cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
