import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);

  async function loadCurrentUser() {
    const token = localStorage.getItem("access");

    if (!token) return;

    try {
      const response = await api.get("auth/me/");
      setUser(response.data);
    } catch (error) {
      console.error("Unable to load current user:", error);
      logout();
    }
  }

  const login = async (email, password) => {
    const response = await api.post("auth/login/", {
      email,
      password,
    });

    localStorage.setItem("access", response.data.access);
    localStorage.setItem("refresh", response.data.refresh);

    const me = await api.get("auth/me/");

    setUser(me.data);

    return me.data;
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);