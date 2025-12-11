import React from "react";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#3d3935] text-white py-12">
           <div className="max-w-7xl mx-auto px-12">
             <nav className="flex items-center justify-center gap-12 mb-8">
               <a href="#" className="text-white text-sm font-normal">Home</a>
               <a href="#" className="text-white text-sm font-normal">Gallery Art</a>
               <a href="#" className="text-white text-sm font-normal">Artist</a>
               <a href="#" className="text-white text-sm font-normal">Community</a>
               <a href="#" className="text-white text-sm font-normal">About</a>
             </nav>
   
             <div className="flex items-center justify-center gap-8 mb-8">
               <a href="#" className="w-8 h-8 flex items-center justify-center">
                 <FaFacebook className="w-8 h-8 text-white" />
               </a>
               <a href="#" className="w-8 h-8 flex items-center justify-center">
                 <FaInstagram className="w-8 h-8 text-white" />
               </a>
               <a href="#" className="w-8 h-8 flex items-center justify-center">
                 <FaYoutube className="w-8 h-8 text-white" />
               </a>
               <a href="#" className="w-8 h-8 flex items-center justify-center">
                 <FaTwitter className="w-8 h-8 text-white" />
               </a>
             </div>
   
             <p className="text-center text-sm">ArtConnect @ 2025. All rights reserved.</p>
           </div>
         </footer>
  );
}