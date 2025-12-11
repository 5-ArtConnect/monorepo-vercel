import React, { useState, useEffect } from 'react';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import Footer from "./components/Footer";

export default function Profile() {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActiveImage(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const images = [
    { src: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=400&h=400&fit=crop", alt: "Gallery 1", bg: "bg-white" },
    { src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop", alt: "Gallery 2", bg: "bg-black" },
    { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop", alt: "Gallery 3", bg: "bg-white" },
    { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop", alt: "Gallery 4", bg: "bg-black" },
    { src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop", alt: "Gallery 5", bg: "bg-white" },
    { src: "https://images.unsplash.com/photo-1582201957340-005b1c4c0b37?w=400&h=400&fit=crop", alt: "Gallery 6", bg: "bg-white" },
    { src: "https://images.unsplash.com/photo-1579783483458-83d02161294e?w=400&h=400&fit=crop", alt: "Gallery 7", bg: "bg-white" },
    { src: "https://images.unsplash.com/photo-1577083552431-6e5fd01988ec?w=400&h=400&fit=crop", alt: "Gallery 8", bg: "bg-white" },
    { src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&h=400&fit=crop", alt: "Gallery 9", bg: "bg-white" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0]">
      <NavbarAfterLogin />
      
      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-12 py-16 md:py-32">
        <h2 className="text-3xl md:text-5xl font-bold mb-2">My Gallery Art</h2>
        <p className="text-lg md:text-xl mb-12">Gallery Information</p>

        {/* Gallery Collection Section */}
        <div className="bg-[#9d9189] rounded-lg p-6 md:p-12">
          <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 md:mb-12 underline">Gallery Collection</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
            {images.map((img, idx) => (
              <div
                key={idx}
                className={`${img.bg} p-2 md:p-4 cursor-pointer overflow-hidden rounded-md`}
                onClick={() => setActiveImage(img.src)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setActiveImage(img.src); }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />

      {/* Image Modal */}
      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setActiveImage(null)}
        >
          <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="mb-4 px-3 py-1 bg-white rounded shadow"
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
