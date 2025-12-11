import React from "react";
import { useNavigate } from "react-router-dom";
import { Users, Palette } from "lucide-react";
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
            {cardCenter && (
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
            )}
            {cardLeft && (
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
            )}
            {cardRight && (
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
            )}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-white/5 blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="md:hidden relative max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 justify-center">
          {cardLeft && (
            <div className="w-28 rounded-xl overflow-hidden shadow-md">
              <img src={cardLeft} alt="" className="w-full h-20 object-cover" loading="lazy" />
            </div>
          )}
          {cardCenter && (
            <div className="w-36 rounded-xl overflow-hidden shadow-lg">
              <img src={cardCenter} alt="" className="w-full h-24 object-cover" loading="lazy" />
            </div>
          )}
          {cardRight && (
            <div className="w-28 rounded-xl overflow-hidden shadow-md">
              <img src={cardRight} alt="" className="w-full h-20 object-cover" loading="lazy" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ---------- Main Page ---------- */
export default function ArtConnectHomepage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const communities = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400",
      members: 502,
      collections: 89,
      name: "Canvas Circle",
      desc: "Visual creators showcasing curated work",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400",
      members: 489,
      collections: 2012,
      name: "Studio Collective",
      desc: "Experimental and contemporary visuals",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400",
      members: 561,
      collections: 90,
      name: "Portrait Guild",
      desc: "Portrait and figurative artists",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400",
      members: 560,
      collections: 89,
      name: "Color Labs",
      desc: "Color-focused experiments and studies",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
      <HeroCommunity
        bg={artisImg}
        cardLeft={communities[1]?.image}
        cardCenter={communities[0]?.image}
        cardRight={communities[2]?.image}
        onCta={() => console.log("Join Community clicked")}
      />

      {/* Our Community Team Section */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <p className="text-sm text-gray-600 mb-3">[Community]</p>
          <h3 className="text-4xl font-bold mb-4">OUR COMMUNITY TEAM</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the best work chosen by the community, curated from artists who actively share
            and collaborate.
          </p>
        </div>

       <div className="space-y-6 pb-20">
  {communities.map((community) => (
    <div
      key={community.id}
      className="bg-[#463D38] rounded-3xl p-8 flex items-start gap-8 shadow-2xl relative"
    >
      {/* Gambar */}
      <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
        <img src={community.image} alt={community.name} className="w-full h-full object-cover" />
      </div>

      {/* Konten teks */}
      <div className="flex-grow pr-24">
        <h4 className="text-3xl font-bold text-white mb-2">{community.name}</h4>
        <p className="text-gray-300 mb-4">{community.desc}</p>

        <div className="flex items-center gap-6 text-white mb-4">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-orange-400" />
            <span className="font-semibold">{community.members} Members</span>
          </div>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-orange-400" />
            <span className="font-semibold">{community.collections}+ Art Collections</span>
          </div>
        </div>
      </div>

      {/* Tombol di pojok kanan bawah */}
      <button
        onClick={() => navigate("/communitypage3")}
        className="absolute bottom-8 right-8 bg-[#E9E9DB] text-gray-900 px-8 py-3 rounded-[10px] font-semibold hover:bg-[#8D8079] hover:text-white transition duration-200"
      >
        See Profile
      </button>
    </div>
  ))}
</div>
      </section>

      <Footer />
    </div>
  );
}