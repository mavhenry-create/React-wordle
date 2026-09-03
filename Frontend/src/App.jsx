import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/nav.jsx";
import Clondle from "./components/clondle.jsx";
import Login from "./login.jsx";
import Register from "./register.jsx";
import Home from "./Home.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <>
              <Navbar />
              <Login />
            </>
          }
        />
        <Route
          path="/register"
          element={
            <>
              <Navbar />
              <Register />
            </>
          }
        />
        <Route
          path="/clondle"
          element={
            <>
              <Navbar />
              <Clondle />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
