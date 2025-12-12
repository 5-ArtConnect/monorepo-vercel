import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavbarAfterLogin from "./components/NavbarAfterLogin";
import NavbarBeforeLogin from "./components/NavbarBeforeLogin";
import Footer from "./components/Footer.jsx";
import { useAuth } from "./AuthContext.jsx";

import artisImg from "./assets/artis.jpg";

/* ---------- HeroCommunity ---------- */
function HeroCommunity({
  bg = artisImg,
  cardLeft,
  cardCenter,
  cardRight,
  title = "ARTCONNECT\nCOMMUNITY",
  subtitle = "A gathering space for creators and art enthusiasts to share insights, support each other's work, and connect in a dynamic digital art exhibition ecosystem.",
  ctaText = "Join the Community",
  onCta,
}) {
  return (
    <section
      aria-label="ArtConnect community hero"
      className="relative w-full overflow-hidden"
      style={{ minHeight: "520px" }}
    >
      <div
        className="absolute inset-0 bg-center bg-cover filter saturate-110"
        style={{ backgroundImage: `url(${bg})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-24 flex items-end">
        <div className="w-full md:w-6/12 lg:w-5/12 text-white pb-6">
          <h1 className="whitespace-pre-line text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
            {title}
          </h1>
          <p className="mt-4 text-sm sm:text-base md:text-lg text-white/90 max-w-xl">
            {subtitle}
          </p>
          <div className="mt-6">
            <button
              onClick={onCta}
              className="inline-block bg-white text-[#1f2937] font-semibold py-3 px-5 rounded-full shadow-md hover:scale-[1.02] transition-transform"
              aria-label={ctaText}
            >
              {ctaText}
            </button>
          </div>
        </div>

        <div className="hidden md:block md:w-6/12 lg:w-7/12 relative">
          <div className="relative h-[420px]">
            <div
              className="absolute left-1/2 -translate-x-1/2 top-6 w-[220px] md:w-[300px] lg:w-[360px] rounded-2xl shadow-2xl overflow-hidden bg-white"
              style={{ transform: "translate(-50%, 0) rotate(-0.5deg)" }}
            >
              <img
                src={cardCenter}
                alt="Community highlight"
                className="w-full h-[220px] md:h-[260px] lg:h-[320px] object-cover"
                loading="lazy"
                draggable="false"
              />
            </div>

            <div
              className="absolute left-0 top-20 w-[140px] md:w-[180px] lg:w-[220px] rounded-2xl shadow-xl overflow-hidden bg-white"
              style={{ transform: "translateX(-10%) rotate(-6deg)" }}
            >
              <img
                src={cardLeft}
                alt="Artwork left"
                className="w-full h-[120px] md:h-[160px] lg:h-[200px] object-cover"
                loading="lazy"
                draggable="false"
              />
            </div>

            <div
              className="absolute right-0 top-28 w-[140px] md:w-[180px] lg:w-[220px] rounded-2xl shadow-xl overflow-hidden bg-white"
              style={{ transform: "translateX(10%) rotate(6deg)" }}
            >
              <img
                src={cardRight}
                alt="Artwork right"
                className="w-full h-[140px] md:h-[160px] lg:h-[200px] object-cover"
                loading="lazy"
                draggable="false"
              />
            </div>

            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-white/5 blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="md:hidden relative max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 justify-center">
          <div className="w-28 rounded-xl overflow-hidden shadow-md">
            <img src={cardLeft} alt="" className="w-full h-20 object-cover" loading="lazy" />
          </div>
          <div className="w-36 rounded-xl overflow-hidden shadow-lg">
            <img src={cardCenter} alt="" className="w-full h-24 object-cover" loading="lazy" />
          </div>
          <div className="w-28 rounded-xl overflow-hidden shadow-md">
            <img src={cardRight} alt="" className="w-full h-20 object-cover" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- TopArtCarousel ---------- */
function TopArtCarousel({ items = [] }) {
  const listRef = useRef(null);

  const scrollBy = (dir = "next") => {
    const el = listRef.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.75);
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 relative">
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-gray-600 uppercase tracking-wide">From Art</p>
          <h3 className="text-3xl md:text-4xl font-bold">TOP ART COMMUNITY</h3>
        </div>

        <div className="hidden lg:flex gap-2 items-center">
          <button onClick={() => scrollBy("prev")} aria-label="Scroll left" className="p-2 rounded-full bg-white shadow-md hover:scale-105 transition">◀</button>
          <button onClick={() => scrollBy("next")} aria-label="Scroll right" className="p-2 rounded-full bg-white shadow-md hover:scale-105 transition">▶</button>
        </div>
      </div>

      <div
        ref={listRef}
        className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-smooth -mx-2 md:-mx-4 px-2 md:px-4"
        role="list"
      >
        {items.map((it) => (
          <div key={it.id} role="listitem" className="flex-shrink-0 w-[240px] sm:w-[280px] md:w-[320px] lg:w-[28%] xl:w-[22%] snap-start">
            <img 
              src={it.image} 
              alt={it.title} 
              className="w-full h-48 md:h-64 object-cover rounded-lg shadow-lg" 
              draggable="false"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- ArtConnectHomepage ---------- */
export default function ArtConnectHomepage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const topArtworks = [
    { id: 1, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400", title: "Colorful Portrait" },
    { id: 2, image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800", title: "Violin Player" },
    { id: 3, image: "https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=400", title: "Girl with Pearl" },
    { id: 4, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400", title: "Colorful Portrait 2" },
    { id: 5, image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800", title: "Violin Player 2" },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300",
    "https://images.unsplash.com/photo-1576085898323-218337e3e43c?w=300",
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=300",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300"
  ];

  function handleHeroCta() {
    navigate("/community");
  }

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}

      <HeroCommunity
        bg={artisImg}
        cardLeft="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400"
        cardCenter="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800"
        cardRight="https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=400"
        onCta={handleHeroCta}
      />

      <TopArtCarousel items={topArtworks} />

      {/* Community Art Gallery Section */}
      <section className="bg-[#463D38] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              {galleryImages.map((img, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl shadow-xl">
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-48 object-cover hover:scale-105 transition duration-300"
                  />
                </div>
              ))}
            </div>
            <div className="text-white">
              <h3 className="text-4xl font-bold mb-6">Community Art Gallery</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                This gallery showcases a collection of works from members of the ArtConnect community ranging
                from illustrations, expressive paintings, to contemporary art depicting a diversity of visual
                experiences.
              </p>
              <button
                onClick={() => navigate("/communitypage2")}
                className="bg-stone-200 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-white transition duration-200"
              >
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Work Together Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-5xl font-bold mb-6 leading-tight">
              In Community,<br />We Work<br />Together
            </h3>
            <p className="text-gray-700 leading-relaxed">
              At ArtConnect, every artist has space to grow. From sharing their work progress, networking with fellow
              creators, to gaining exposure through digital exhibitions.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=600"
              alt="Community"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}