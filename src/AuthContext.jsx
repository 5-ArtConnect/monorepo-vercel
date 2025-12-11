// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Provider --------------------------------------------------------------
export function AuthProvider({ children }) {
  // Ambil state login dari localStorage (biar tidak hilang pas refresh)
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedLoginState = localStorage.getItem("isLoggedIn");
    return savedLoginState === "true"; // hasilkan true/false
  });

  // Simpan perubahan login ke localStorage
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Fungsi login
  const login = () => {
    setIsLoggedIn(true);
  };

  // Fungsi logout
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook shortcut ---------------------------------------------------------
export function useAuth() {
  return useContext(AuthContext);
}
