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
  subtitle =
    "A gathering space for creators and art enthusiasts to share insights, support each other's work, and connect in a dynamic digital art exhibition ecosystem.",
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

  const artCollection = [
    { id: 1, image: "https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=400", title: "Blue Art" },
    { id: 2, image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400", title: "Hands Art" },
    { id: 3, image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", title: "Street Scene" },
  ];

  const artists = [
    { id: 1, name: "Jane Philips", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300" },
    { id: 2, name: "Federico Manuel", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300" },
    { id: 3, name: "Arist Rejeuny", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300" },
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=300",
    "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=300",
    "https://images.unsplash.com/photo-1578926314433-e2789279f4aa?w=300",
    "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=300",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300",
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=300",
  ];

  const events = [
    { title: "Next exhibition", desc: "An in-depth closeup theme, held at the creative space (via live booth)" },
    { title: "Quantum chromatics series", desc: "Emulation and painting workshop in the Christmas (via wavent)" },
    { title: "Workshop virtual art", desc: "Echoes tracing Alongside touchofbrieff hybrid" },
    { title: "Flexible Access Pass", desc: "Prex edition - can be stored offline according to available submit)" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}

      <HeroCommunity
        bg={artisImg}
        cardLeft={artCollection[1]?.image}
        cardCenter={artCollection[0]?.image}
        cardRight={artCollection[2]?.image}
        onCta={() => navigate("/community")}
      />

      {/* Community Profile Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-sm text-gray-600 mb-2">Community</p>
          <h3 className="text-4xl font-bold mb-4">COMMUNITY PROFILE</h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover a selection of the best works from the community, curated by active artists who
            regularly share insights, processes, and creative collaborations.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-12">
          <div className="overflow-hidden rounded-2xl shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
              alt="Community workspace"
              className="w-full h-96 object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="bg-neutral-700 text-white p-8 rounded-2xl shadow-lg">
              <h4 className="text-2xl font-bold mb-4">Canvas Circle</h4>
              <p className="text-gray-300">
                A community of visual creators showcasing creative work, both physical and digital in
                painting, illustration, or experimentation.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed">
              A space showcasing curated work from creative & print artists, experimentation with oil,
              acrylic, and visual storytelling.
            </p>

            <button
              onClick={() => navigate("/community/join")}
              className="bg-neutral-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-neutral-700 transition duration-200"
            >
              Join Community
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="border-t-2 border-gray-800 w-full"></div>
          <div className="border-t-2 border-gray-800 w-48 mx-auto"></div>
        </div>
      </section>

      {/* Art Collection Preview */}
      <section className="bg-neutral-700 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-sm text-gray-300 mb-2">Gallery</p>
            <h3 className="text-4xl font-bold text-white mb-4">ART COLLECTION PREVIEW</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {artCollection.map((art) => (
              <div key={art.id} className="group cursor-pointer">
                <div className="overflow-hidden rounded-2xl shadow-2xl">
                  <img
                    src={art.image}
                    alt={art.title}
                    className="w-full h-80 object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artist of Community */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-center mb-12">ARTIST OF COMMUNITY</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {artists.map((artist) => (
            <div key={artist.id} className="text-center">
              <div className="overflow-hidden rounded-2xl shadow-lg mb-4">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-80 object-cover hover:scale-105 transition duration-300"
                />
              </div>
              <h4 className="font-semibold text-lg">{artist.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="max-w-7xl mx-auto px-6 py-20 bg-stone-100 rounded-3xl mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <p className="text-sm text-gray-600 mb-2 uppercase">SCHEDULE</p>
            <h3 className="text-4xl font-bold mb-6">Upcoming Events<br />Exhibition</h3>
            <p className="text-gray-700 leading-relaxed">
              Several projects & festivals related to creation from visual artists and their communities
              through digital exhibitions or collaborations. All exhibitions are presented visually through
              exhibitions and concent content with art works.
            </p>
          </div>

          <div className="space-y-4">
            {events.map((event, idx) => (
              <div key={idx} className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-gray-800 rounded-full mt-1 flex-shrink-0" />
                <div>
                  <h5 className="font-bold mb-1">{event.title}</h5>
                  <p className="text-sm text-gray-600">{event.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid (horizontal scroll) */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {galleryImages.map((img, idx) => (
            <div key={idx} className="flex-shrink-0 w-48 h-48 overflow-hidden rounded-xl shadow-lg">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}