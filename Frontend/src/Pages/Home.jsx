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
            <h3 className='text-white'>Never played Clondle before?</h3>
            <details>
              <summary className="text-lg text-white cursor-pointer">How to play Clondle</summary>
              <p className="text-white">
                Clondle is a word guessing game where you try to guess the word of the day.
              </p>
              <ol className="text-white list-decimal list-inside">
                <li>Guess the word by typing your guesses.</li>
                <li>When you make a guess, you'll receive color-coded hints to help you figure out the correct word.</li>
                <li>Green indicates that the letter is in the correct position!</li>
                <li>Yellow indicates that the letter is in the word but in the wrong position.</li>
                <li>Gray indicates that the letter is not in the word at all.</li>
              </ol>
            </details>
            <h2 className="text-lg text-white">Already have an account?</h2>
            <div className="flex gap-3 items-center justify-center mt-5">
              <button
                onClick={() => {
                  

                  window.location.href = `/auth/login?screen_hint=signup&returnTo=${encodeURIComponent(window.location.origin + "/")}`;
                }}
                className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-gray-200 transition duration-300 pointer-fine:cursor-pointer"
              >
                Register
              </button>

              <button
                onClick={() => {
                  

                  window.location.href = `/auth/login?returnTo=${encodeURIComponent(window.location.origin + "/")}`;
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
