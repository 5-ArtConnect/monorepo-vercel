import React from 'react';
import NavbarAfterLogin from './components/NavbarAfterLogin.jsx';
import Footer from "./components/Footer.jsx";

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <NavbarAfterLogin />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-12 py-16 md:py-24">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">Settings</h2>
        <p className="text-lg md:text-xl mb-12">Account Information</p>

        {/* Data Pribadi Section */}
        <div className="bg-[#9d9189] rounded-lg p-6 md:p-12">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-6 md:mb-8 underline">Data Pribadi</h3>
          
          <div className="space-y-4 md:space-y-6">
            {/* Nama Lengkap */}
            <div className="bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center">
              <span className="text-black font-medium md:w-48">Nama Lengkap</span>
              <span className="text-black font-normal md:flex-1">: ALEXANDRE MAXWELLER</span>
            </div>

            {/* Gmail */}
            <div className="bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center">
              <span className="text-black font-medium md:w-48">Gmail</span>
              <span className="text-black font-normal md:flex-1">: alexandremax12@gmail.com</span>
            </div>

            {/* Jenis Kelamin */}
            <div className="bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center">
              <span className="text-black font-medium md:w-48">Jenis Kelamin</span>
              <span className="text-black font-normal md:flex-1">: Laki-Laki</span>
            </div>

            {/* Kota */}
            <div className="bg-white rounded-lg px-4 md:px-8 py-4 md:py-6 flex flex-col md:flex-row md:items-center">
              <span className="text-black font-medium md:w-48">Kota</span>
              <span className="text-black font-normal md:flex-1">: Palembang</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
