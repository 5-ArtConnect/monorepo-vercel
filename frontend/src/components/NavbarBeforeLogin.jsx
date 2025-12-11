// src/components/NavbarBeforeLogin.jsx
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function NavbarBeforeLogin() {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isHomeActive = location.pathname === "/homebefore";

  // semua menu selain Home diarahkan ke halaman login
  const goToLogin = () => {
    navigate("/artconnectlogin");
    setOpenMenu(false); // tutup menu mobile kalau lagi kebuka
  };

  return (
    <header className="bg-[#F7F1EB] shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="relative max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">

        {/* LEFT MENU */}
        <nav className="flex gap-8 text-[#1b1b1b]">
          <Link
            to="/homebefore"
            className={`text-sm hover:text-black ${
              isHomeActive ? "text-black font-semibold" : ""
            }`}
          >
            Home
          </Link>

          {/* sebelum login, klik ini → ke login */}
          <button
            type="button"
            onClick={goToLogin}
            className="text-sm hover:text-black"
          >
            Gallery Art
          </button>

          <button
            type="button"
            onClick={goToLogin}
            className="text-sm hover:text-black"
          >
            Artist
          </button>

          <button
            type="button"
            onClick={goToLogin}
            className="text-sm hover:text-black"
          >
            Community
          </button>
        </nav>

        {/* CENTER LOGO */}
        <div className="absolute left-1/2 -translate-x-1/2 font-playball text-4xl text-[#1b1b1b] pointer-events-none">
          ArtConnect
        </div>

        {/* RIGHT AUTH BUTTONS */}
        <div className="hidden md:flex gap-3">
          <Link
            to="/artconnectlogin"
            className="px-4 py-1 rounded-xl border-2 border-black text-sm
                       hover:bg-black hover:text-white transition-all duration-200"
          >
            Sign In
          </Link>

          <Link
            to="/artconnectsignup"
            className="px-4 py-1 rounded-xl bg-gray-900 text-white text-sm 
                       hover:bg-black transition-all duration-200"
          >
            Sign Up
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden">
          <button
            aria-label="open menu"
            className="text-2xl"
            onClick={() => setOpenMenu(!openMenu)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {openMenu && (
        <div className="md:hidden bg-white border-t shadow-sm p-5 flex flex-col gap-4 text-sm">
          <Link
            to="/homebefore"
            className="hover:underline"
            onClick={() => setOpenMenu(false)}
          >
            Home
          </Link>

          {/* semua menu lain → login */}
          <button
            type="button"
            onClick={goToLogin}
            className="text-left hover:underline"
          >
            Gallery Art
          </button>

          <button
            type="button"
            onClick={goToLogin}
            className="text-left hover:underline"
          >
            Artist
          </button>

          <button
            type="button"
            onClick={goToLogin}
            className="text-left hover:underline"
          >
            Community
          </button>

          {/* optional: kalau About juga mau diproteksi, pakai goToLogin juga */}
          <button
            type="button"
            onClick={goToLogin}
            className="text-left hover:underline"
          >
            About
          </button>

          {/* MOBILE AUTH BUTTONS */}
          <div className="mt-3 flex flex-col gap-2">
            <Link
              to="/artconnectlogin"
              onClick={() => setOpenMenu(false)}
              className="px-4 py-2 border-2 border-black text-base
                         hover:bg-black hover:text-white transition-all duration-200 rounded-[10px]"
            >
              Sign In
            </Link>

            <Link
              to="/artconnectsignup"
              onClick={() => setOpenMenu(false)}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm 
                         hover:bg-white hover:text-black border border-gray-900 transition-all duration-200"
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
