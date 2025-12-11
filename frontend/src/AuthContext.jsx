// src/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "./services/auth";

const AuthContext = createContext();

// Provider --------------------------------------------------------------
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if token exists in localStorage
    return authService.isAuthenticated();
  });

  const [user, setUser] = useState(() => {
    // Get user data from localStorage
    return authService.getCurrentUser();
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Update localStorage when login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // Login function with API integration
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      setUser(response);
      setIsLoggedIn(true);
      
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register function with API integration
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.register(userData);
      
      setUser(response);
      setIsLoggedIn(true);
      
      return response;
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    setUser(null);
    setIsLoggedIn(false);
    setError(null);
  };

  // Refresh token
  const refreshToken = async () => {
    try {
      const response = await authService.refreshToken();
      return response;
    } catch (err) {
      // If refresh fails, logout user
      logout();
      throw err;
    }
  };

  const value = {
    isLoggedIn,
    isAuthenticated: isLoggedIn, // Alias untuk compatibility
    user,
    loading,
    error,
    login,
    register,
    logout,
    refreshToken,
    setUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook shortcut ---------------------------------------------------------
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
