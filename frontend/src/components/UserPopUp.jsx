// src/components/UserPopUp.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  LuUser,
  LuGalleryVertical,
  LuImagePlus,
  LuUsers,
  LuPhone,
  LuLogOut,
} from "react-icons/lu";

export default function UserPopUp({
  open,
  username,
  rewardText,
  icon,
  onClose,
  onLogout,
}) {
  if (!open) return null;

  // fallback kalau onClose / onLogout tidak dikirim
  const handleClose = () => {
    if (onClose) onClose();
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout(); // di NavbarAfterLogin: logout() + navigate("/homebefore")
    }
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-[#FCF8F4] shadow-lg rounded-2xl py-4 animate-fadeIn">
      {/* Profile Header */}
      <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-200">
        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl text-white">
          {icon ? icon : "U"}
        </div>
        <div>
          <p className="font-semibold text-[#1b1b1b]">{username}</p>
          <p className="text-xs text-gray-500">{rewardText}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-3 flex flex-col">
        <MenuLink
          to="/profile"
          icon={<LuUser />}
          label="Profile"
          onClick={handleClose}
        />
        <MenuLink
          to="/my-gallery"
          icon={<LuGalleryVertical />}
          label="My Gallery"
          onClick={handleClose}
        />
        <MenuLink
          to="/exhibition"
          icon={<LuImagePlus />}
          label="Exhibition"
          onClick={handleClose}
        />
        <MenuLink
          to="/community"
          icon={<LuUsers />}
          label="Community"
          onClick={handleClose}
        />
        <MenuLink
          to="/contact"
          icon={<LuPhone />}
          label="Contact Us"
          onClick={handleClose}
        />

        {/* LOG OUT – sekarang panggil onLogout, bukan lagi ke /confirm-logout */}
        <MenuLink
          icon={<LuLogOut />}
          label="Log Out"
          isLogout
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

/* Reusable Menu Item */
function MenuLink({ icon, label, to, isLogout, onClick }) {
  const baseClass =
    "px-4 py-3 flex gap-3 items-center text-sm w-full text-left";
  const normalClass = "text-[#1b1b1b] hover:bg-gray-100";
  const logoutClass = "text-red-600 hover:bg-red-50";

  // Untuk logout (atau item tanpa `to`) kita pakai <button>
  if (isLogout || !to) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClass} ${isLogout ? logoutClass : normalClass}`}
      >
        <span className="text-lg">{icon}</span>
        {label}
      </button>
    );
  }

  // Item biasa pakai <Link> supaya pindah route
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`${baseClass} ${normalClass}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </Link>
  );
}
