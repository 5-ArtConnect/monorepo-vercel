import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import images with explicit path for Vite
import heroImage from "./assets/hero.jpg?url";
import mario from "./assets/mario.jpg?url";
import hanna from "./assets/hanna.jpg?url";
import sejong from "./assets/sejong.jpg?url";
import ctaImage from "./assets/matahari.jpg?url";
import NavbarAfterLogin from "./components/NavbarAfterLogin.jsx";
import NavbarBeforeLogin from "./components/NavbarBeforeLogin.jsx";
import Footer from "./components/Footer.jsx";
import { useAuth } from "./AuthContext.jsx";
import { getAllArtworks } from "./services/artworks";
import { getAllGalleries } from "./services/galleries";

function Hero({ imageUrl }) {
  return (
    <section className="relative h-[260px] sm:h-[340px] md:h-[420px] lg:h-[500px]">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt="Hero"
        className="w-full h-full object-cover"
        loading="eager"
        draggable="false"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex items-center">
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-8">

          {/* TITLE */}
          <h2
            className="
              text-white font-bold leading-tight
              text-2xl sm:text-4xl md:text-5xl lg:text-6xl
              mb-3 sm:mb-4 px-2 sm:px-10
            "
          >
            A Journey through
            <br />
            the Imagination
          </h2>

          {/* SUBTITLE */}
          <p
            className="
              text-white italic
              text-sm sm:text-lg md:text-xl lg:text-2xl
              px-2 sm:px-10 mb-5 sm:mb-6
            "
          >
            Where art and inspiration
            <br />
            collide
          </p>

          {/* BUTTON */}
          <button
            className="
              bg-[#8D8079] text-white font-bold rounded-lg transition-colors
              ml-2 sm:ml-8
              hover:bg-[#463D38]

              text-xs sm:text-sm md:text-base
              px-5 py-2 sm:px-7 sm:py-3 md:px-8 md:py-3
            "
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------- ArtistsSection: inline image zoom popup ---------- */
function ArtistsSection({ artists = [] }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActiveImage(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="bg-[#5b514c] text-white py-12">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-extrabold mb-2">The Artist's Corner</h3>
        <p className="text-sm text-white font-normal mb-8">
          Explore the artistic journey and featured collections.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 justify-center">
          {artists.map((a, i) => (
            <div
              key={i}
              className="rounded-xl p-4 flex flex-col items-center select-none"
            >
              <img
                src={a.image}
                alt={a.name ? `Portrait or work by ${a.name}` : `Artist ${i + 1}`}
                className="w-60 h-80 object-cover rounded-lg mb-4 shadow transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
                draggable="false"
                onClick={() => setActiveImage(a.image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveImage(a.image);
                  }
                }}
                loading="lazy"
              />
              <div className="font-bold italic text-base">{a.name}</div>
            </div>
          ))}
        </div>
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-auto"
          onClick={() => setActiveImage(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div
            className="relative z-10 p-4 bg-white/95 rounded-xl shadow-xl border border-gray-200"
            style={{ maxWidth: "90vw", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Image preview"
          >
            <img
              src={activeImage}
              alt="preview"
              className="max-w-[80vw] max-h-[70vh] object-contain rounded transition-transform duration-300"
              draggable="false"
              loading="lazy"
            />

            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setActiveImage(null)}
                className="px-4 py-2 bg-[#111827] text-white rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FeaturedGallery({ items = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-3xl font-extrabold mb-6">Featured Art Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
        {items.map((it, idx) => (
          <figure
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-md"
          >
            <img
              src={it.image}
              alt={it.caption || `featured-${idx}`}
              className="w-full h-60 object-cover"
              loading="lazy"
              draggable="false"
            />
            <figcaption className="p-3 text-sm text-gray-700 text-center">
              {it.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- Exhibition ---------- */
function Exhibition({ exhibitions = [] }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-24">
      <div className="text-center mb-8">
        <div className="text-sm uppercase font-semibold text-gray-300 mb-2">
          |Exhibition|
        </div>
        <h3 className="text-5xl font-bold">The Exhibition Practice Of</h3>
        <h3 className="text-5xl font-bold">The Collaboration</h3>
        <p className="text-gray-400 font-semibold leading-none max-w-2xl mx-auto mt-3">
          Sorotan partisipasi pameran seni yang pernah diikuti oleh sang seniman
          di berbagai galeri.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-16 justify-center">
        {exhibitions.map((e, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl overflow-y-auto shadow-md p-4 flex items-center justify-center"
            style={{ height: 526 }}
          >
            <img
              src={e.image}
              alt={e.title || `Exhibition ${idx + 1}`}
              className="w-[431px] h-[526px] object-cover rounded-lg"
              loading="lazy"
              draggable="false"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */
function CTA({ image }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={image}
          alt="cta"
          className="w-[1280px] max-w-full h-[572px] object-cover mx-auto"
          loading="lazy"
          draggable="false"
        />

        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="px-6 text-white max-w-2xl mx-auto w-full">
            <h3 className="text-2xl md:text-4xl font-extrabold leading-[38px]">
              EXPLORE THE CREATIVE SPACE WHERE
            </h3>
            <h3 className="text-2xl md:text-4xl font-extrabold leading-[38px]">
              ARTISTS, COMMUNITIES, and ARTWORKS
            </h3>
            <h3 className="text-2xl md:text-4xl font-extrabold leading-[38px]">
              CONNECTED.
            </h3>

            <p className="mt-3 text-xl font-medium md:text-base">
              Build meaningful relationships and discover new inspiration.
            </p>

            <div className="mt-6 flex justify-end">
              <Link
                to="/contact"
                className="
                  bg-[#463D38] font-bold text-md
                  hover:bg-[#7a6f68]
                  text-white
                  w-[217px] h-[58px]
                  rounded-[10px] flex items-center justify-center
                "
                aria-label="Explore Now"
              >
                Explore Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Home (page) ---------- */
export default function Home() {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  const artists = [
    { image: mario, name: "Mario Silva" },
    { image: hanna, name: "Hanna Kim" },
    { image: sejong, name: "Kim Sejeong" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch featured artworks (3 random artworks)
        const artworksResponse = await getAllArtworks({ limit: 3 });
        console.log("[Home] Artworks response:", artworksResponse);
        if (artworksResponse?.data) {
          const featured = artworksResponse.data.map(artwork => ({
            image: artwork.image_url,
            caption: artwork.title || "Untitled"
          }));
          console.log("[Home] Featured artworks:", featured);
          setFeaturedArtworks(featured);
        }

        // Fetch galleries for exhibition section (3 galleries)
        const galleriesResponse = await getAllGalleries({ limit: 3 });
        console.log("[Home] Galleries response:", galleriesResponse);
        if (galleriesResponse?.data) {
          const exhibitions = galleriesResponse.data.map(gallery => ({
            image: gallery.cover_image_url,
            title: gallery.name
          }));
          console.log("[Home] Exhibitions:", exhibitions);
          setGalleries(exhibitions);
        }
      } catch (error) {
        console.error("[Home] Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="font-poppins bg-[#F7F1EB] min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-[#F7F1EB] text-[#111827] min-h-screen flex flex-col">
      <NavbarAfterLogin />
      <div className="pt-[80px]">
        <Hero imageUrl={heroImage} />
        <FeaturedGallery items={featuredArtworks} />
        <ArtistsSection artists={artists} />
        <Exhibition exhibitions={galleries} />
        <CTA image={ctaImage} />
        <div className="pt-[80px]" />
        <Footer />
      </div>
    </div>
  );
}