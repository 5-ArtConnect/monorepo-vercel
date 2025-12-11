import React from "react";
import { Link } from "react-router-dom";
import {
  LuUser,
  LuGalleryVertical,
  LuImagePlus,
  LuUsers,
  LuPhone,
  LuLogOut
} from "react-icons/lu";

export default function UserPopUp({ open, username, rewardText, icon }) {
  if (!open) return null;

  return (
    <div
      className="
        absolute right-0 mt-2 
        w-64 sm:w-72 
        bg-[#FCF8F4] shadow-lg rounded-2xl py-4 
        animate-fadeIn 
        border border-gray-200
        z-50
      "
    >
      {/* Profile Header */}
      <div className="flex items-center gap-3 px-4 pb-3 border-b border-gray-200">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg sm:text-xl text-white">
          {icon ? icon : "U"}
        </div>
        <div className="truncate">
          <p className="font-semibold text-[#1b1b1b] truncate">{username}</p>
          <p className="text-xs text-gray-500 truncate">{rewardText}</p>
        </div>
      </div>

      {/* Menu */}
      <div className="mt-3 flex flex-col">
        <MenuLink to="/profile" icon={<LuUser />} label="Profile" />
        <MenuLink to="/mygallery" icon={<LuGalleryVertical />} label="My Gallery" />
        <MenuLink to="/mycommunityart" icon={<LuUsers />} label="Community" />
        <MenuLink to="/contact" icon={<LuPhone />} label="Contact Us" />

        {/* LOG OUT */}
        <MenuLink
          to="/comfirmlogout"
          icon={<LuLogOut />}
          label="Log Out"
          isLogout
        />
      </div>
    </div>
  );
}

/* Reusable Menu Item */
function MenuLink({ icon, label, to, isLogout }) {
  return (
    <Link
      to={to}
      className={`
        px-4 py-3 flex gap-3 items-center text-sm 
        transition-all
        ${isLogout ? "text-red-600 hover:bg-red-50" : "text-[#1b1b1b] hover:bg-gray-100"}
      `}
    >
      <span className="text-lg">{icon}</span>
      <span className="truncate">{label}</span>
    </Link>
  );
}
