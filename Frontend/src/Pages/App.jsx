import { Routes, Route } from "react-router-dom";
import "./App.css";
import Card from "../components/modal/Error/card.jsx";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import Navbar from "../components/nav.jsx";
import Clondle from "./clondle.jsx";
import Home from "./Home.jsx";
import Profile from "./profile.jsx";

function App() {
  const [alertMessage, setAlertMessage] = useState(null);
  const { user, refrestUser } = useAuth();

  useEffect(() => {
    const authAction = sessionStorage.getItem("authAction");
    sessionStorage.removeItem("authAction");

    if (authAction === "logout") {
      setAlertMessage({ type: "info", message: "You have been logged out." });
    }

    refrestUser()
      .then(({ user }) => {
        if (authAction === "login") {
          setAlertMessage({
            type: "success",
            message: `Welcome, ${user.username || user.display_name}!`,
          });
        }
      })
      .catch(() => {
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
      <div className="app-container h-svh flex flex-col overflow-x-hidden my-0">

        
        <main className="main-content flex-1 mx-auto position-relative z-0">
          <Navbar />
          {alertMessage && (
            <Card message={alertMessage.message} type={alertMessage.type} />
          )}
          <Routes>
            <Route path="/" element={<Home />} />
            
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
        </main>
      
        <footer className="app-footer bg-gray-800 text-white p-0.5 text-center">
        &copy; {new Date().getFullYear()} Clondle. All rights reserved.
        </footer>
      </div>  
    </>
  );
}

export default App;
