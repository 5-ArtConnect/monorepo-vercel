import React from "react";
import { useNavigate } from "react-router-dom";

export default function ConfirmLogOut({ onClose, onLogout }) {
  const navigate = useNavigate();

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      navigate(-1); 
    }
  };

  const handleLogout = () => {
    if (typeof onLogout === "function") {
      try {
        onLogout();
      } catch (err) {
        console.warn("onLogout threw:", err);
      }
    } else {
      try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } catch (err) {
        console.warn("Error clearing storage:", err);
      }
    }

    if (typeof onClose === "function") {
      onClose();
    } else {
      // Redirect ke HomeBefore.jsx
      navigate("/homebefore", { replace: true });
    }

    console.log("Logged out");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center p-4 z-50">
      <div className="bg-[#f5f1ed] rounded-2xl shadow-2xl max-w-sm w-full p-8">
        <h2 className="text-2xl font-bold text-center mb-3">
          Are You Sure Want<br />To Log Out
        </h2>
        <p className="text-gray-500 text-center text-sm mb-8">
          Confirm logout to end your current session.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleClose}
            className="w-full bg-white border-2 border-black text-black font-semibold py-3 rounded-xl hover:bg-gray-100 transition-colors"
          >
            Not Now
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-[#3d3935] text-white font-semibold py-3 rounded-xl hover:bg-[#2d2925] transition-colors"
          >
            Yes I'm
          </button>
        </div>
      </div>
    </div>
  );
}
