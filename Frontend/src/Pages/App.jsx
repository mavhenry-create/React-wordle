import { Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "../components/modal/Error/card.jsx";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/authAPI.js";
import Navbar from "../components/nav.jsx";
import Clondle from "./clondle.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Home from "./Home.jsx";
import Profile from "./profile.jsx";

function App() {
  const [alertMessage, setAlertMessage] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authAction = sessionStorage.getItem("authAction");
    sessionStorage.removeItem("authAction");

    if (authAction === "logout") {
      setAlertMessage({ type: "info", message: "You have been logged out." });
    }

    getCurrentUser()
      .then(({ user }) => {
        setUser(user);
        if (authAction === "login") {
          setAlertMessage({
            type: "success",
            message: `Welcome, ${user.username || user.display_name}!`,
          });
        }
      })
      .catch(() => {
        setUser(null);
        if (authAction === "login") {
          setAlertMessage({
            type: "error",
            message: "Something went wrong while logging in.",
          });
        }
      });
  }, []);

  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => setAlertMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);
  return (
    <>
      <div className="app-container min-h-screen max-w-screen overflow-x-hidden">
        <Navbar />
        <div className="main-content w-11/12 align-center mx-auto">
          {alertMessage && (
            <Card message={alertMessage.message} type={alertMessage.type} />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <>
                  <Login />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Register />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                  <Profile />
                </>
              }
            />
            <Route
              path="/clondle"
              element={
                <>
                  <Clondle />
                </>
              }
            />
          </Routes>
        </div>
      </div>
      <footer className="app-footer bg-gray-800 text-white p-4 text-center">
        &copy; {new Date().getFullYear()} Clondle. All rights reserved.
      </footer>
    </>
  );
}

export default App;
