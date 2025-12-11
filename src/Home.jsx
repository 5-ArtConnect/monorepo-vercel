import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import heroImage from "./assets/hero.jpg";

// Featured gallery
import tumpukan from "./assets/tumpukan.jpg";
import matahari from "./assets/matahari.jpg";
import monalisa from "./assets/monalisa.jpg";

// Artists
import mario from "./assets/mario.jpg";
import hanna from "./assets/hanna.jpg";
import sejong from "./assets/sejong.jpg";

// Exhibition
import pameran1 from "./assets/pameran1.jpg";
import pameran2 from "./assets/pameran2.jpg";
import pameran3 from "./assets/pameran3.jpg";

import ctaImage from "./assets/matahari.jpg";
import NavbarAfterLogin from "./components/NavbarAfterLogin.jsx";
import Footer from "./components/Footer.jsx";

const featuredData = [
  { image: tumpukan, caption: "Karya eksplorasi bentuk dan tekstur" },
  { image: matahari, caption: "Visualisasi energi dan cahaya" },
  { image: monalisa, caption: "Interpretasi ulang potret klasik" },
];

function Hero({ imageUrl }) {
    const navigate = useNavigate();   
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
          onClick={() => navigate("/contact")}
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
        <h3 className="text-3xl font-extrabold mb-2">The Artist's Corner</h3>
        <p className="text-sm text-white font-normal mb-8">
          Explore the artistic journey and featured collections.
        </p>

        {/* GRID RESPONSIF */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-center">
          {artists.map((a, i) => (
            <div
              key={i}
              className="rounded-xl p-2 flex flex-col items-center select-none"
            >
              <img
                src={a.image}
                alt={a.name ? `Portrait or work by ${a.name}` : `Artist ${i + 1}`}

                className="
                  w-full 
                  h-48 sm:h-56 md:h-64 
                  object-cover 
                  rounded-lg shadow 
                  transition-transform duration-300 ease-out hover:scale-105 
                  cursor-pointer
                "

                draggable="false"
                onClick={() => setActiveImage(a.image)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveImage(a.image);
                  }
                }}
                loading="lazy"
              />

              <div className="font-bold italic text-sm sm:text-base mt-2">
                {a.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL RESPONSIF */}
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
              className="
                max-w-[90vw] 
                max-h-[70vh]
                sm:max-w-[70vw] 
                sm:max-h-[70vh]
                object-contain 
                rounded 
                transition-transform duration-300
              "
              draggable="false"
              loading="lazy"
            />

            <div className="mt-4 flex justify-center">
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

/* ---------- FeaturedGallery (sama behavior modal seperti ArtistsSection) ---------- */
function FeaturedGallery({ items = [] }) {
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setActiveImage(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-3xl font-extrabold mb-6">Featured Art Gallery</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {items.map((it, idx) => (
          <figure
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-md"
          >
            <button
              type="button"
              onClick={() => setActiveImage(it.image)}
              className="block w-full text-left"
              aria-label={it.caption || `Open image ${idx + 1}`}
            >
              <img
                src={it.image}
                alt={it.caption || `featured-${idx}`}
                className="w-full h-56 md:h-60 object-cover"
                loading="lazy"
                draggable="false"
              />
            </button>

            <figcaption className="p-3 text-sm text-gray-700 text-center">
              {it.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      {activeImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={() => setActiveImage(null)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <div
            className="relative z-10 p-4 bg-white/95 rounded-xl shadow-xl border border-gray-200"
            style={{ maxWidth: "90vw", maxHeight: "80vh" }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Featured image preview"
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

function Exhibition({ exhibitions = [] }) {
  const trackRef = useRef(null);
  const autoplayRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // scroll helper (percentage of track width)
  function scrollByDir(dir = 1) {
    const track = trackRef.current;
    if (!track) return;
    const scrollAmount = Math.round(track.clientWidth * 0.8); // 80% of visible width
    track.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
  }

  // update arrow visibility + active index
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    function update() {
      setCanScrollLeft(t.scrollLeft > 10);
      setCanScrollRight(t.scrollLeft + t.clientWidth < t.scrollWidth - 10);

      // compute approximate active index (centered card)
      let children = Array.from(t.children);
      let center = t.scrollLeft + t.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      children.forEach((ch, i) => {
        const rect = ch.offsetLeft + ch.clientWidth / 2;
        const dist = Math.abs(rect - center);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    }
    update();
    t.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      t.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [exhibitions]);

  // autoplay: scroll to next every n seconds
  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
      autoplayRef.current = setInterval(() => {
        const t = trackRef.current;
        if (!t) return;
        // if near end, go to start
        if (t.scrollLeft + t.clientWidth >= t.scrollWidth - 10) {
          t.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollByDir(1);
        }
      }, 4500);
    };

    if (!isHovering) startAutoplay();
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isHovering, exhibitions]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-24 relative">
      <div className="text-center mb-6">
        <div className="text-sm uppercase font-semibold text-gray-300 mb-2">
          |Exhibition|
        </div>
        <h3 className="text-4xl md:text-5xl font-bold">The Exhibition Practice Of</h3>
        <h3 className="text-4xl md:text-5xl font-bold">The Collaboration</h3>
        <p className="text-gray-400 font-semibold leading-none max-w-2xl mx-auto mt-3">
          Sorotan partisipasi pameran seni yang pernah diikuti oleh sang seniman
          di berbagai galeri.
        </p>
      </div>

      {/* Arrow buttons (SVG) - visible on lg */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByDir(-1)}
        className={`hidden lg:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-md border ${
          canScrollLeft ? "opacity-100" : "opacity-40"
        }`}
      >
        <svg className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M12.707 14.707a1 1 0 01-1.414 0L7.586 11l3.707-3.707a1 1 0 011.414 1.414L10.414 11l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      <button
        aria-label="Scroll right"
        onClick={() => scrollByDir(1)}
        className={`hidden lg:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white shadow-md border ${
          canScrollRight ? "opacity-100" : "opacity-40"
        }`}
      >
        <svg className="w-5 h-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
          <path fillRule="evenodd" d="M7.293 5.293a1 1 0 011.414 0L12.414 9l-3.707 3.707a1 1 0 01-1.414-1.414L9.586 9 7.293 6.707a1 1 0 010-1.414z" clipRule="evenodd"/>
        </svg>
      </button>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="
          -mx-6 px-6
          overflow-x-auto overflow-y-visible
          scroll-smooth
          snap-x snap-mandatory
          flex gap-6 flex-nowrap
          md:px-0
          lg:gap-8
          py-6
            no-scrollbar
        "
        style={{ scrollBehavior: "smooth" }}
      >
        {exhibitions.map((e, idx) => (
          <article
            key={idx}
            className="
              snap-center bg-white rounded-xl shadow-md flex-shrink-0
              w-[80vw] sm:w-[60vw] md:w-[48%] lg:w-[31%] xl:w-[30%]
              p-3
            "
            role="group"
            aria-label={e.title || `Exhibition ${idx + 1}`}
          >
            <div className="rounded-lg overflow-hidden h-[220px] sm:h-[280px] md:h-[360px] lg:h-[420px]">
              <img
                src={e.image}
                alt={e.title || `Exhibition ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable="false"
              />
            </div>

            <div className="mt-3">
              <h4 className="text-lg font-semibold">{e.title || "Untitled Exhibition"}</h4>
              {e.meta && <p className="text-sm text-gray-500 mt-1 line-clamp-2">{e.meta}</p>}
            </div>
          </article>
        ))}
      </div>

      {/* pager dots */}
      <div className="hidden md:flex justify-center gap-2 mt-4">
        {exhibitions.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const t = trackRef.current;
              if (!t) return;
              const target = t.children[i];
              if (target) target.scrollIntoView({ behavior: "smooth", inline: "center" });
            }}
            className={`w-2 h-2 rounded-full ${i === activeIndex ? "bg-gray-800" : "bg-gray-300"}`}
            aria-label={`Go to item ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
/* ---------- CTA ---------- */
function CTA({ image }) {
  const navigate = useNavigate();

  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-12">
      <div className="relative rounded-lg overflow-hidden">

        {/* Background Image */}
        <img
          src={image}
          alt="cta"
          className="w-full h-[260px] sm:h-[330px] md:h-[420px] object-cover"
          loading="lazy"
          draggable="false"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 flex items-center">
          <div className="text-white w-full px-4 sm:px-8 md:px-14">

            {/* Text Section */}
            <div className="max-w-3xl space-y-1">
              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight">
                EXPLORE THE CREATIVE SPACE WHERE
              </h3>

              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight">
                ARTISTS, COMMUNITIES, and ARTWORKS
              </h3>

              <h3 className="text-lg sm:text-2xl md:text-3xl font-extrabold leading-tight">
                CONNECTED.
              </h3>

              <p className="mt-2 text-sm sm:text-base md:text-xl font-medium opacity-90">
                Build meaningful relationships and discover new inspiration.
              </p>
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center md:justify-end">
              <button
                onClick={() => navigate("/contact")}
                className="
                  bg-[#463D38] font-bold
                  text-sm sm:text-md md:text-lg
                  hover:bg-[#7a6f68]
                  text-white
                  w-[160px] h-[45px]
                  sm:w-[190px] sm:h-[52px]
                  md:w-[217px] md:h-[58px]
                  rounded-[10px]
                "
              >
                Explore Now
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}


export default function Home() {
  const featured = featuredData;

  const artists = [
    { image: mario, name: "Mario Silva" },
    { image: hanna, name: "Hanna Kim" },
    { image: sejong, name: "Kim Sejeong" },
    { image: mario, name: "Mario Silva" },
    { image: hanna, name: "Hanna Kim" },
  ];

  const exhibitions = [
    { image: pameran1, title: "Citarasa" },
    { image: pameran2, title: "Arumanis" },
    { image: pameran3, title: "Teh Panas" },
    { image: pameran3, title: "Sambel Terasi" },
  ];

  return (
    <div className="font-poppins bg-[#F7F1EB] text-[#111827] min-h-screen flex flex-col">
      <NavbarAfterLogin />
      <div className="pt-[80px]">
        <Hero imageUrl={heroImage} />
        <FeaturedGallery items={featured} />
        <ArtistsSection artists={artists} />
        <Exhibition exhibitions={exhibitions} />
        <CTA image={ctaImage} onClick={() => alert("Explore clicked")} />
        <div className="pt-[80px]" />
        <Footer />
      </div>
    </div>
  );
}