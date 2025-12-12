// src/ArtistBiography.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "./components/Footer.jsx";

// Data artist untuk biography page
const ARTISTS = {
  "kim-sejeong": {
    id: "kim-sejeong",
    name: "Kim Sejeong",
    role: "Contemporary artist mixing bold colors, culture, and unique character design.",
    years: "6+",
    circleLabel: "CANVAS CIRCLE",
    circleValue: "Color Studio",
    profileImage: "https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469869/artconnect/artists/artist-kim.png",
    heroTitle: "Discover Inspiring Voices in Visual Art",
    heroSubtitle:
      "Explore curated artworks, meet talented artists, and immerse yourself in a world of contemporary visual expression.",
    bestArtTitle: "Best Art From The Artist",
    bestArtSubtitle:
      "A collection of the best works that illustrate the artist's unique visual expression and style.",
  },
  "ayla-reiko": {
    id: "ayla-reiko",
    name: "Ayla Reiko",
    role: "Fine art painter with minimalist & emotional themes.",
    years: "5+",
    circleLabel: "CANVAS CIRCLE",
    circleValue: "Silent Frame Studio",
    profileImage: "https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469869/artconnect/artists/artist-ayla.png",
    heroTitle: "Quiet Emotions on Canvas",
    heroSubtitle:
      "Minimalist brushstrokes, subtle palettes, and soft compositions that communicate deep emotion.",
    bestArtTitle: "Signature Minimalist Pieces",
    bestArtSubtitle:
      "An intimate selection of Ayla’s artworks that capture stillness, emotion, and space.",
  },
  "marco-silva": {
    id: "marco-silva",
    name: "Marco Silva",
    role: "Digital illustrator & concept artist for creative projects.",
    years: "7+",
    circleLabel: "CONCEPT LAB",
    circleValue: "Pixel Path Studio",
    profileImage: "https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469869/artconnect/artists/artist-marco.png",
    heroTitle: "Concepts That Build Worlds",
    heroSubtitle:
      "From character design to full environments, Marco creates visual narratives for modern stories.",
    bestArtTitle: "Concept Art Collections",
    bestArtSubtitle:
      "Exploring various universes, characters, and visual storytelling pieces.",
  },
  "rose-annie": {
    id: "rose-annie",
    name: "Rose Annie M.",
    role: "Specialized in modern surrealism & expressive portrait art.",
    years: "4+",
    circleLabel: "SURREAL SPACE",
    circleValue: "Midnight Canvas",
    profileImage: "https://res.cloudinary.com/dqoit6ruy/image/upload/v1765469869/artconnect/artists/artist-rose.png",
    heroTitle: "Surreal Dreams & Portrait Stories",
    heroSubtitle:
      "Blending reality and imagination through layered compositions and emotional portraiture.",
    bestArtTitle: "Surreal Portrait Series",
    bestArtSubtitle:
      "Portraits that mix dreams, symbolism, and powerful character expressions.",
  },
};

// Beberapa gambar art / pameran (sementara pakai sama untuk semua, bisa kamu custom per-artist nanti)
const BEST_ART_IMAGES = [
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/c5oqjqyi_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/et0m76e5_expires_30_days.png",
];

const EXHIBITION_IMAGES = [
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/dgbtxuy9_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/gd85p897_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/js9rvyfu_expires_30_days.png",
];

const GALLERY_GRID_IMAGES = [
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/gd6cmyot_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/ojqkzdem_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/ymjzses1_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/n68e5irb_expires_30_days.png",
  "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/dcgewpr3_expires_30_days.png",
];

export default function ArtistBiography() {
  const { artistId } = useParams();
  const navigate = useNavigate();

  const artist = ARTISTS[artistId];

  // Jika artistId tidak dikenal
  if (!artist) {
    return (
      <div className="min-h-screen flex flex-col bg-[#f5eee7]">
        <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
          <h1 className="text-3xl font-bold mb-3">Artist not found</h1>
          <p className="text-gray-600 mb-6">
            We couldn&apos;t find the artist you&apos;re looking for.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate("/exhibition")}
              className="px-5 py-2 rounded-full border border-[#4b4038] text-[#4b4038] text-sm font-semibold hover:bg-[#4b4038] hover:text-white transition-colors"
            >
              Back to Exhibition
            </button>
            <button
              onClick={() => navigate("/artists")}
              className="px-5 py-2 rounded-full bg-[#4b4038] text-white text-sm font-semibold hover:bg-[#342b25] transition-colors"
            >
              Browse Artists
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f5eee7]">
      <main className="flex-grow pt-24">
        {/* ========== HERO SECTION ========== */}
        <section className="bg-[#111111] text-white py-16">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <p className="text-xs tracking-[0.35em] uppercase mb-3">
                | Profile |
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
                {artist.heroTitle}
              </h1>
              <p className="text-sm md:text-base text-gray-300 mb-6">
                {artist.heroSubtitle}
              </p>

              <div className="flex flex-wrap gap-3 text-xs text-gray-300">
                <span className="px-3 py-1 rounded-full border border-gray-500">
                  {artist.role}
                </span>
                <span className="px-3 py-1 rounded-full border border-gray-500">
                  {artist.years} years of practice
                </span>
              </div>
            </div>

            {/* Simple collage / image area */}
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden h-40 md:h-52 bg-white/10">
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/thb2d7eb_expires_30_days.png"
                  alt="Artwork 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-40 md:h-52 bg-white/10">
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/d6ix8sbc_expires_30_days.png"
                  alt="Artwork 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-40 md:h-52 bg-white/10">
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/kahtjqsr_expires_30_days.png"
                  alt="Artwork 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-40 md:h-52 bg-white/10">
                <img
                  src="https://storage.googleapis.com/tagjs-prod.appspot.com/v1/fhjXyEVwOI/zymokmg8_expires_30_days.png"
                  alt="Artwork 4"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ========== SHORT PROFILE CARD ========== */}
        <section className="bg-[#f5eee7] py-16">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-10">
              <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#534A45] mb-2">
                | Profile |
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold">
                Short Profile
              </h2>
              <div className="mt-4 flex justify-center">
                <div className="h-[2px] w-52 bg-white shadow-[0_0_10px_rgba(0,0,0,0.2)]" />
              </div>
            </div>

            <div className="bg-[#4A4039] rounded-[30px] shadow-xl px-8 py-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-[#f5eee7]">
                <img
                  src={artist.profileImage}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-white">
                <h3 className="text-3xl md:text-[40px] font-bold mb-3">
                  {artist.name}
                </h3>
                <p className="text-lg mb-8">{artist.role}</p>

                <div className="flex flex-wrap gap-y-3 text-sm md:text-base">
                  <div className="mr-10">
                    <p className="text-base md:text-xl mb-1">YEARS</p>
                    <p className="text-2xl md:text-3xl font-bold">
                      {artist.years}
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-xl mb-1">
                      {artist.circleLabel}
                    </p>
                    <p className="text-sm md:text-base font-bold">
                      {artist.circleValue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== BEST ART SECTION ========== */}
        <section className="bg-[#f5eee7] py-16">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
            {/* Text */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                {artist.bestArtTitle}
              </h2>
              <p className="text-base text-[#534A45] font-medium mb-6">
                {artist.bestArtSubtitle}
              </p>
            </div>

            {/* Images */}
            <div className="flex gap-4 justify-end">
              {BEST_ART_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="w-40 h-44 md:w-52 md:h-60 rounded-3xl overflow-hidden shadow-lg"
                >
                  <img
                    src={src}
                    alt={`Best artwork ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== EXHIBITION SECTION ========== */}
        <section className="bg-[#463D38] text-white py-20">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <p className="text-xl font-bold text-[#C4C4C4] mb-3">
              | Exhibition |
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-[48px] font-extrabold mb-4">
              The Exhibition Participation of the Artist
            </h2>
            <p className="text-base md:text-lg text-[#D9D9D9] max-w-3xl mx-auto mb-16">
              Highlights of art exhibition participation that the artist has
              joined in various galleries and creative spaces.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {EXHIBITION_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className="h-[320px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl"
                >
                  <img
                    src={src}
                    alt={`Exhibition ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========== EXTRA GALLERY + CTA SEE MORE ========== */}
        <section className="bg-[#f5eee7] py-20">
          <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
            {/* Gallery grid mini */}
            <div className="grid grid-cols-2 gap-4">
              {GALLERY_GRID_IMAGES.map((src, idx) => (
                <div
                  key={idx}
                  className={`rounded-3xl overflow-hidden shadow-lg ${
                    idx === 2 ? "col-span-2 h-52 md:h-64" : "h-32 md:h-40"
                  }`}
                >
                  <img
                    src={src}
                    alt={`Gallery piece ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Text + CTA */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-3">
                Our Featured Artists
              </h2>
              <p className="text-base text-gray-700 mb-6">
                Explore a diverse array of talented artists with diverse styles
                and backgrounds in the world of contemporary art.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/artists")}
                  className="flex items-center bg-[#8C7F78] text-white text-sm md:text-base font-bold py-3 px-8 rounded-2xl shadow-lg hover:bg-[#756861] transition-colors"
                >
                  See More Artists
                </button>
                <button
                  onClick={() => navigate("/exhibition")}
                  className="flex items-center border border-[#4b4038] text-[#4b4038] text-sm md:text-base font-semibold py-3 px-6 rounded-2xl hover:bg-[#4b4038] hover:text-white transition-colors"
                >
                  Back to Exhibition
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
