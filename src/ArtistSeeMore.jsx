// src/ArtistSeeMore.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";

import aylaImg from "./assets/artist-ayla.png";
import marcoImg from "./assets/artist-marco.png";
import kimImg from "./assets/artist-kim.png";
import roseImg from "./assets/artist-rose.png";

export default function ArtistSeeMore() {
  const navigate = useNavigate();

  // daftar artist (bisa kamu tambah lagi kalau mau)
  const artists = [
    {
      id: "rose-annie",
      name: "Rose Annie M.",
      tagline: "Specialized in modern surrealism & expressive portrait art.",
      image: roseImg,
    },
    {
      id: "marco-silva",
      name: "Marco Silva",
      tagline: "Digital illustrator & concept artist for creative projects.",
      image: marcoImg,
    },
    {
      id: "ayla-reiko",
      name: "Ayla Reiko",
      tagline: "Fine art painter with minimalist & emotional themes.",
      image: aylaImg,
    },
    {
      id: "kim-sejeong",
      name: "Kim Sejeong",
      tagline: "Contemporary artist mixing colors, culture, and character.",
      image: kimImg,
    },
    // kalau mau “see more” beneran, tinggal duplikat / tambah artist baru di bawah ini
    {
      id: "rose-annie-2",
      name: "Rose Annie M.",
      tagline: "Exploring surreal narratives through layered compositions.",
      image: roseImg,
    },
    {
      id: "marco-silva-2",
      name: "Marco Silva",
      tagline: "Focuses on character design and visual storytelling.",
      image: marcoImg,
    },
    {
      id: "ayla-reiko-2",
      name: "Ayla Reiko",
      tagline: "Blending minimalism with emotional color palettes.",
      image: aylaImg,
    },
    {
      id: "kim-sejeong-2",
      name: "Kim Sejeong",
      tagline: "Mixing culture, color and playful composition.",
      image: kimImg,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5eee7]">
      <main className="flex-grow pt-24">

        {/* ============== HERO / JUDUL HALAMAN ============== */}
        <section className="bg-[#111111] text-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="tracking-[0.35em] text-xs uppercase mb-3">
              Visual Artist
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Other Artist of Visual Art
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              Discover more visual artists from the ArtConnect community:
              illustrators, fine art painters, and digital creators who bring
              unique stories to life.
            </p>
          </div>
        </section>

        {/* ============== GRID ARTIST “SEE MORE” ============== */}
        <section className="bg-[#f5eee7] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                More Artists from ArtConnect
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                Browse a wider selection of artists and explore each biography
                to learn about their background, style, and inspirations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {artists.map((artist) => (
                <article
                  key={artist.id}
                  className="bg-[#e4ebff] rounded-3xl shadow-lg px-6 py-5 flex items-center gap-5"
                >
                  <div className="w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">
                      {artist.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {artist.tagline}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(`/artist/${artist.id}`)}
                    className="px-4 py-2 rounded-full bg-[#4b4038] text-white text-xs font-semibold shadow-md hover:bg-[#342b25] transition-colors"
                  >
                    Biography
                  </button>
                </article>
              ))}
            </div>

            {/* tombol back ke halaman Exhibition (opsional) */}
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/exhibition")}
                className="px-6 py-2 rounded-full border border-[#4b4038] text-[#4b4038] text-sm font-semibold hover:bg-[#4b4038] hover:text-white transition-colors"
              >
                Back to Exhibition
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}