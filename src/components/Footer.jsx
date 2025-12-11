import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#3d3935] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Navigation */}
        <nav className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 mb-8">
          <a href="#" className="text-white text-sm font-normal">Home</a>
          <a href="#" className="text-white text-sm font-normal">Gallery Art</a>
          <a href="#" className="text-white text-sm font-normal">Artist</a>
          <a href="#" className="text-white text-sm font-normal">Community</a>
          <a href="#" className="text-white text-sm font-normal">About</a>
        </nav>

        {/* Social Icons */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-8">
          <a href="#" className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            <FaFacebook className="w-full h-full text-white" />
          </a>
          <a href="#" className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            <FaInstagram className="w-full h-full text-white" />
          </a>
          <a href="#" className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            <FaYoutube className="w-full h-full text-white" />
          </a>
          <a href="#" className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
            <FaTwitter className="w-full h-full text-white" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-center text-sm">
          ArtConnect © 2025. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
