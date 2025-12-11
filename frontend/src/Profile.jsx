import React, { useState, useEffect } from 'react';
import NavbarAfterLogin from './components/NavbarAfterLogin.jsx';
import Footer from "./components/Footer.jsx";
import { useAuth } from './AuthContext.jsx';
import * as usersService from './services/users.js';

export default function Profile() {
  const { user: authUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Edit form states
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');

  // Fetch profile data
  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const userData = await usersService.getProfile();
        console.log('User data:', userData); // Debug
        
        setProfile(userData);
        setCity(userData.city || '');
        setGender(userData.gender || '');
      } catch (err) {
        console.error('Profile fetch error:', err); // Debug
        setError(err.message || 'Gagal memuat profile');
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  // Handle update profile
  async function handleUpdate(e) {
    e.preventDefault();
    
    try {
      setLoading(true);
      const updatedUser = await usersService.updateProfile(profile.id, { city, gender });
      console.log('Updated user:', updatedUser); // Debug
      
      setProfile(updatedUser);
      setIsEditing(false);
      alert('Profile berhasil diupdate!');
    } catch (err) {
      console.error('Update error:', err); // Debug
      alert(err.message || 'Gagal update profile');
    } finally {
      setLoading(false);
    }
  }

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <NavbarAfterLogin />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <NavbarAfterLogin />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-red-600">{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <NavbarAfterLogin />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-12 py-24">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-5xl font-bold mb-2">Settings</h2>
            <p className="text-xl">Account Information</p>
          </div>
          
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-[#8D8078] text-white rounded-lg hover:bg-[#7a6f68] transition"
            >
              Edit Profile
            </button>
          )}
        </div>

        {/* Data Pribadi Section */}
        <div className="bg-[#9d9189] rounded-lg p-12">
          <h3 className="text-white text-2xl font-bold mb-8 underline">Data Pribadi</h3>
          
          {isEditing ? (
            /* Edit Form */
            <form onSubmit={handleUpdate} className="space-y-6">
              {/* Nama Lengkap (Read-only) */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Nama Lengkap</span>
                  <span className="text-black font-normal">: {profile?.fullname}</span>
                </div>
              </div>

              {/* Email (Read-only) */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Email</span>
                  <span className="text-black font-normal">: {profile?.email}</span>
                </div>
              </div>

              {/* Jenis Kelamin (Editable) */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Jenis Kelamin</span>
                  <span className="text-black font-normal mr-2">:</span>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8D8078]"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-Laki">Laki-Laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>

              {/* Kota (Editable) */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Kota</span>
                  <span className="text-black font-normal mr-2">:</span>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Masukkan kota"
                    className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#8D8078] flex-1"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setCity(profile?.city || '');
                    setGender(profile?.gender || '');
                  }}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[#8D8078] text-white rounded-lg hover:bg-[#7a6f68] transition disabled:opacity-50"
                >
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          ) : (
            /* Display Mode */
            <div className="space-y-6">
              {/* Nama Lengkap */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Nama Lengkap</span>
                  <span className="text-black font-normal">: {profile?.fullname}</span>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Email</span>
                  <span className="text-black font-normal">: {profile?.email}</span>
                </div>
              </div>

              {/* Jenis Kelamin */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Jenis Kelamin</span>
                  <span className="text-black font-normal">: {profile?.gender || '-'}</span>
                </div>
              </div>

              {/* Kota */}
              <div className="bg-white rounded-lg px-8 py-6">
                <div className="flex items-center">
                  <span className="text-black font-normal mr-16 w-40">Kota</span>
                  <span className="text-black font-normal">: {profile?.city || '-'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}