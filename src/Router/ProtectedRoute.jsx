// src/Router/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthContext.jsx";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // simpan info dari mana dia datang kalau mau dipakai nanti
    return (
      <Navigate
        to="/artconnectlogin"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return children;
}
