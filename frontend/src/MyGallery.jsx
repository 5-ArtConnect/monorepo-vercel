import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import Footer from "./components/Footer";
import * as favoritesService from './services/favorites';

export default function MyGallery() {
  const [activeImage, setActiveImage] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActiveImage(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Fetch favorites
  useEffect(() => {
    async function fetchFavorites() {
      try {
        setLoading(true);
        const response = await favoritesService.getFavorites();
        setFavorites(response.data || response || []);
      } catch (err) {
        setError(err.message || 'Gagal memuat favorit');
      } finally {
        setLoading(false);
      }
    }

    fetchFavorites();
  }, []);

  // Remove from favorites
  async function handleRemoveFavorite(artworkId) {
    if (!confirm('Hapus dari My Gallery?')) return;

    try {
      await favoritesService.removeFromFavorites(artworkId);
      setFavorites(favorites.filter(fav => fav.artwork_id !== artworkId));
      alert('Berhasil dihapus dari My Gallery');
    } catch (err) {
      alert(err.message || 'Gagal menghapus dari favorit');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
        <NavbarAfterLogin />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl">Loading your gallery...</p>
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-12 py-32">
        <h2 className="text-5xl font-bold mb-2">My Gallery Art</h2>
        <p className="text-xl mb-12">Your Favorite Artworks Collection</p>

        {/* Gallery Collection Section */}
        <div className="bg-[#9d9189] rounded-lg p-12">
          <h3 className="text-white text-3xl font-bold mb-12 underline">Gallery Collection</h3>

          {favorites.length === 0 ? (
            <div className="text-center py-12 text-white">
              <p className="text-xl mb-4">Belum ada karya seni di My Gallery</p>
              <Link to="/gallery" className="text-lg underline hover:text-gray-200">
                Mulai tambahkan karya favorit Anda
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((fav) => (
                <div
                  key={fav.id}
                  className="bg-white p-4 rounded-lg shadow-lg overflow-hidden group relative"
                >
                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveFavorite(fav.artwork_id)}
                    className="absolute top-6 right-6 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
                    title="Hapus dari My Gallery"
                  >
                    <Heart className="w-5 h-5 fill-white" />
                  </button>

                  {/* Artwork Image */}
                  <div
                    className="cursor-pointer overflow-hidden rounded-md"
                    onClick={() => setActiveImage(fav.image_url)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setActiveImage(fav.image_url); }}
                  >
                    <img
                      src={fav.image_url}
                      alt={fav.title}
                      className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>

                  {/* Artwork Info */}
                  <div className="mt-4">
                    <h4 className="font-bold text-lg mb-1 line-clamp-1">{fav.title}</h4>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{fav.description}</p>
                    {fav.category && (
                      <span className="inline-block bg-[#8D8078] text-white px-3 py-1 rounded-full text-xs">
                        {fav.category}
                      </span>
                    )}
                  </div>

                  {/* View Detail Link */}
                  <Link
                    to={`/category/${fav.category}/artwork/${fav.artwork_id}`}
                    className="block mt-3 text-center text-sm text-[#8D8078] hover:underline"
                  >
                    Lihat Detail
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Image Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setActiveImage(null)}
        >
          <div className="max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <button
              className="mb-4 px-4 py-2 bg-white rounded shadow hover:bg-gray-100"
              onClick={() => setActiveImage(null)}
            >
              Close
            </button>
            <img src={activeImage} alt="Active" className="w-full h-auto rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
