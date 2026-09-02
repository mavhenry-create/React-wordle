import { useState, useEffect } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
  };

  return (
    <div className="flex flex-col items-center justify-center max-h-screen">
      <div className="flex flex-col items-center justify-center h-1/2 gap-4 border-2 border-black p-4 rounded-lg">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border-2 border-black rounded-md p-2 text-center"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-2 border-black rounded-md p-2 text-center"
        />
        <button onClick={handleLogin}>Login</button>
        <div>
          <input type="checkbox" id="rememberMe" name="rememberMe" />
          <label htmlFor="rememberMe"> Remember Me</label>
        </div>
        <span className="text-blue-500 cursor-pointer">Forgot Password?</span>
        <span className="text-blue-500 cursor-pointer">
          Don't have an account? Register
        </span>
      </div>
    </div>
  );
}
