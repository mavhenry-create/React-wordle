import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getCurrentUser} from "../services/authAPI";

const AuthContext = createContext();

export function AuthProvider({ children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const refrestUser = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCurrentUser();
      setUser(data.user);
      return data;
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    refrestUser();
  }, [refrestUser]);

  const login = () => {
    window.location.href = "http://localhost:3000/auth/login?returnTo=http://localhost:5173/";
  };

  const logout = () => {
    window.location.href = "http://localhost:3000/auth/logout?returnTo=http://localhost:5173/";
  };


  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    refrestUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}



