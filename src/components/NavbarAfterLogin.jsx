// src/components/NavbarAfterLogin.jsx
import React, { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import UserPopUp from "./UserPopUp";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // pastikan path ini sesuai (../AuthContext.jsx)

export default function NavbarAfterLogin({
  username = "Username",
  rewardText = "Your Reward",
}) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  // class untuk NavLink biar ada indikasi active
  const navLinkClass = ({ isActive }) =>
    `text-sm transition-colors ${isActive ? "text-black font-semibold" : "text-[#1b1b1b] hover:text-black"}`;

  // Special function for Gallery Art untuk handle beberapa route gallery
  const galleryLinkClass = () => {
    const isGalleryActive =
      location.pathname === "/gallery" ||
      location.pathname === "/gallery-section" ||
      location.pathname.startsWith("/category/");

    return `text-sm transition-colors ${isGalleryActive ? "text-black font-semibold" : "text-[#1b1b1b] hover:text-black"}`;
  };

  // Special function for Community untuk handle beberapa route community
  const communityLinkClass = () => {
    const isCommunityActive =
      location.pathname === "/community" ||
      location.pathname === "/communitypage2" ||
      location.pathname === "/communitypage3" ||
      location.pathname === "/communitypage1";

    return `text-sm transition-colors ${isCommunityActive ? "text-black font-semibold" : "text-[#1b1b1b] hover:text-black"}`;
  };

  const handleLogout = () => {
    // update state auth
    logout?.();
    // tutup popup profile
    setOpenProfile(false);
    // arahkan ke halaman sebelum login
    navigate("/homebefore");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#F7F1EB] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 py-3 flex items-center justify-between">

        {/* ===== LEFT MENU (Desktop Only) ===== */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-[#1b1b1b] text-sm lg:text-base">
          <NavLink to="/home" className={navLinkClass}>
            Home
          </NavLink>

          {/* Gallery Art - gunakan galleryLinkClass untuk highlight pada beberapa route */}
          <Link to="/gallery" className={galleryLinkClass()}>
            Gallery Art
          </Link>

          <NavLink to="/exhibition" className={navLinkClass}>
            Artist
          </NavLink>

          {/* Community - gunakan communityLinkClass */}
          <Link to="/community" className={communityLinkClass()}>
            Community
          </Link>
        </nav>

        {/* ===== CENTER LOGO ===== */}
        <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none">
          <span className="font-playball text-3xl sm:text-3xl md:text-4xl text-[#1b1b1b]">
            ArtConnect
          </span>
        </div>

        {/* ===== RIGHT SECTION (User + Menu) ===== */}
        <div className="flex items-center gap-3 ml-auto pr-2 sm:pr-4">

          {/* MOBILE MENU BUTTON */}
          <button
            className="text-2xl sm:text-3xl md:hidden"
            onClick={() => setOpenMenu((s) => !s)}
            aria-label="Toggle menu"
          >
            {openMenu ? "✕" : "☰"}
          </button>

          {/* USER ICON */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenProfile((s) => !s)}
              className="flex items-center rounded-full p-1"
              aria-haspopup="true"
              aria-expanded={openProfile}
            >
              <FaRegUserCircle className="text-3xl sm:text-4xl text-[#1b1b1b]" />
            </button>

            {/* POPUP */}
            {openProfile && (
              <div className="absolute right-0 top-full mt-2 z-50">
                <UserPopUp
                  open={openProfile}
                  onClose={() => setOpenProfile(false)}
                  username={username}
                  rewardText={rewardText}
                  inline={true}
                  onLogout={handleLogout} // dipakai tombol Log Out di popup
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU DROPDOWN ===== */}
      <div
        className={`
          md:hidden bg-white border-t shadow-sm overflow-hidden
          transition-all duration-300
          ${openMenu ? "max-h-96 py-5" : "max-h-0"}
        `}
      >
        <div className="flex flex-col gap-4 px-6 text-[#1b1b1b] text-sm sm:text-base">
          {/* gunakan same route paths & highlight logic jika perlu */}
          <NavLink to="/home" className={({ isActive }) => isActive ? "font-semibold" : ""}>
            Home
          </NavLink>

          <Link to="/gallery" className={galleryLinkClass()}>
            Gallery Art
          </Link>

          <NavLink to="/exhibition" className={({ isActive }) => isActive ? "font-semibold" : ""}>
            Artist
          </NavLink>

          <Link to="/community" className={communityLinkClass()}>
            Community
          </Link>
        </div>
      </div>
    </header>
  );
}
