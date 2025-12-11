// src/Exhibition.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";

import aylaImg from "./assets/artist-ayla.png";
import marcoImg from "./assets/artist-marco.png";
import kimImg from "./assets/artist-kim.png";
import roseImg from "./assets/artist-rose.png";

// Artist Community category images
import illustrationImg from "./assets/artist-illustration.png";
import fineArtImg from "./assets/artist-fineart.png";
import digitalArtImg from "./assets/artist-digital.png";

export default function Exhibition() {
  const navigate = useNavigate();
  
  // Artist Community categories
  const categories = [
    { title: "Illustration", image: illustrationImg },
    { title: "Fine Art", image: fineArtImg },
    { title: "Digital Art", image: digitalArtImg },
  ];

  const artistsCircle = [
    {
      name: "Ayla Reiko",
      role: "Fine art & portrait artist",
      image: aylaImg,
    },
    {
      name: "Marco Silva",
      role: "Digital illustrator & concept artist",
      image: marcoImg,
    },
    {
      name: "Kim Sejeong",
      role: "Contemporary visual artist",
      image: kimImg,
    },
    {
      name: "Rose Annie M.",
      role: "Surrealism painter & storyteller",
      image: roseImg,
    },
  ];

  // IMPORTANT: id di sini harus sama dengan key di ArtistBiography.jsx
  const artistsCards = [
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
  ];

  const featuredImages = [
    "https://images.pexels.com/photos/460736/pexels-photo-460736.jpeg?w=600&h=600&fit=crop",
    "https://images.pexels.com/photos/208636/pexels-photo-208636.jpeg?w=600&h=600&fit=crop",
    "https://images.pexels.com/photos/167404/pexels-photo-167404.jpeg?w=600&h=600&fit=crop",
    "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?w=600&h=600&fit=crop",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5eee7]">
      <main className="flex-grow pt-24">
        {/* ================= TOP HERO ================= */}
        <section className="bg-[#111111] text-white py-16">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="tracking-[0.35em] text-xs uppercase mb-3">
              Visual Artist
            </p>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our Artist Visual Art
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              Discover inspiring visual artists, explore their portfolios,
              and learn more about their stories behind each artwork.
            </p>
          </div>
        </section>

        {/* ================= ARTIST COMMUNITY ================= */}
        <section className="bg-[#f5eee7] text-[#222] py-24">
          <div className="max-w-6xl mx-auto px-8">
            {/* Heading */}
            <div className="mb-16">
              <div className="h-[2px] w-48 bg-[#222] mb-6" />
              <h2 className="text-4xl font-extrabold mb-3">
                Meet the Artist Community Now!
              </h2>
              <p className="text-[#555] max-w-2xl leading-relaxed">
                A platform to connect, discover, and support the work of talented artists across various visual art categories.
              </p>
            </div>

            {/* CARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 place-items-center">
              {categories.map((item) => (
                <div key={item.title} className="flex flex-col items-center">
                  {/* Card */}
                  <div className="w-[260px] h-[230px] rounded-2xl overflow-hidden shadow-xl mb-[-60px] z-20 bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Circle */}
                  <div className="w-[300px] h-[300px] bg-[#d8d8dd] rounded-full shadow-md flex items-center justify-center z-10">
                    <p className="text-gray-700 italic">{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CIRCLE ARTISTS ================= */}
        <section className="bg-[#4b4038] text-white py-16">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center tracking-[0.3em] text-xs uppercase mb-4">
              |Visual Artist|
            </p>
            <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-10">
              OUR ARTIST VISUAL ART
            </h2>

            <div className="flex flex-wrap justify-center gap-10">
              {artistsCircle.map((artist) => (
                <div
                  key={artist.name}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-40 h-40 rounded-full overflow-hidden shadow-2xl">
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold">{artist.name}</p>
                  <p className="text-xs text-gray-300 text-center max-w-[180px]">
                    {artist.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= MEET THE ARTIST CARDS ================= */}
        <section className="bg-[#f5eee7] py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Meet the Artist ArtConnect
              </h2>
              <p className="text-sm md:text-base text-gray-600 max-w-3xl mx-auto">
                A platform to connect, discover, and support the work of
                talented artists across various visual art categories.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {artistsCards.map((artist) => (
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

                  {/* ✅ BUTTON BIOGRAPHY MENUJU /artist/:artistId */}
                  <button 
                    onClick={() => navigate(`/artist/${artist.id}`)}
                    className="px-4 py-2 rounded-full bg-[#4b4038] text-white text-xs font-semibold shadow-md hover:bg-[#342b25] transition-colors"
                  >
                    Biography
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ================= OUR FEATURED ARTISTS GRID ================= */}
        <section className="bg-[#f5eee7] pb-20">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            {/* grid gambar */}
            <div className="grid grid-cols-2 gap-6">
              {featuredImages.map((src, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl overflow-hidden shadow-xl"
                >
                  <img
                    src={src}
                    alt={`Featured artist ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Our Featured Artists
              </h2>
              <p className="text-sm md:text-base text-gray-700 mb-6">
                Explore a diverse array of talented artists with various
                styles and backgrounds in the world of contemporary art.
              </p>
              <button
                onClick={() => navigate("/artists")}
                className="px-6 py-2 rounded-full bg-[#4b4038] text-white font-semibold shadow-md hover:bg-[#342b25]"
              >
                See More
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
