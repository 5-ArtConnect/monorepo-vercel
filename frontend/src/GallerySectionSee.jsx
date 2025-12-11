import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAfterLogin from './components/NavbarAfterLogin';
import NavbarBeforeLogin from './components/NavbarBeforeLogin';
import Footer from "./components/Footer";
import { getAllArtworks } from './services/artworks';
import { useAuth } from './AuthContext';

import artcollect from "./assets/artcollect.png";
import gallerysee from "./assets/gallerysee.png";


// hero section
import hero1 from "./assets/hero1.png";
import hero2 from "./assets/hero2.png";
import hero3 from "./assets/hero3.png";
import hero4 from "./assets/hero4.png";
import hero5 from "./assets/hero5.png";
import bg from "./assets/bg.png";

//painting poupler
import st1 from "./assets/st1.jpg";
import st2 from "./assets/st2.jpg";
import st3 from "./assets/st3.jpg";

//visual
import vis1 from "./assets/vis1.png";
import vis2 from "./assets/vis2.png";
import vis3 from "./assets/vis3.png";
import vis4 from "./assets/vis4.png";

// look
import look1 from "./assets/look.png";

export default function GallerySection() {
  const navigate = useNavigate();
  const [browseIndex, setBrowseIndex] = useState(0);
  const [paintingIndex, setPaintingIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);
  
  // State for API data
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isAuthenticated } = useAuth();

  const browseLabels = ['Impresionisme', 'Abstrakt', 'Ekspressionisme'];
  
  // Fallback images
  const paintingImages = [st1, st2, st3];
  const visualImages = [vis1, vis2, vis3, vis4];
  
  // Fetch artworks from API
  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        const artworksList = await getAllArtworks();
        console.log('Artworks list:', artworksList); // Debug
        
        setArtworks(Array.isArray(artworksList) ? artworksList : []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch artworks:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);
  
  // Get artworks by category for carousel
  const paintingArtworks = artworks.filter(art => art.category === 'Painting' || art.category === 'Street Art');
  const visualArtworks = artworks.filter(art => art.category === 'Visual Art' || art.category === 'Digital');
  
  // Use API data if available, otherwise fallback to static images
  const displayPaintings = paintingArtworks.length > 0 
    ? paintingArtworks.map(art => art.image_url) 
    : paintingImages;
    
  const displayVisuals = visualArtworks.length > 0 
    ? visualArtworks.map(art => art.image_url) 
    : visualImages;

  // Handle category click navigation
  const handleCategoryClick = (category) => {
    // Navigate to category page 
    navigate(`/category/${category.toLowerCase()}`);
  };

  const nextPainting = () => setPaintingIndex((prev) => (prev + 1) % displayPaintings.length);
  const prevPainting = () => setPaintingIndex((prev) => (prev - 1 + displayPaintings.length) % displayPaintings.length);
  
  const nextVisual = () => setVisualIndex((prev) => (prev + 1) % displayVisuals.length);
  const prevVisual = () => setVisualIndex((prev) => (prev - 1 + displayVisuals.length) % displayVisuals.length);

  return (
    <div>
      {/* Conditional Navbar rendering */}
      {isAuthenticated ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
      <main className="flex-1 w-full pt-16">
      
      {/* Loading State */}
      {loading && (
        <div className="w-full py-16 text-center">
          <p className="text-gray-600">Loading artworks...</p>
        </div>
      )}
      
      {/* Error State */}
      {error && (
        <div className="w-full py-16 px-4">
          <div className="max-w-2xl mx-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <p>Failed to load artworks: {error}</p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section 
        className="w-full text-white py-24 bg-cover bg-center bg-no-repeat relative min-h-screen"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          <div className="flex items-center justify-center gap-12 mb-8">

            {/* Center: Overlapping Art Cards */}
            <div className="w-3/4 relative h-96 flex items-center justify-center">
              {/* Card 1 - Left rotated */}
              <div className="absolute left-0 z-10 w-60 h-72 bg-white rounded-lg shadow-2xl overflow-hidden transform -rotate-12 -translate-y-8">
                <img
                  src={hero1}
                  alt="Impressionist Art"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Card 2 - Center (front most) */}
              <div className="absolute z-20 w-72 h-80 bg-white rounded-lg shadow-2xl overflow-hidden">
                <img src={hero2} alt="Starry Night" className="w-full h-full object-cover" />
              </div>

              {/* Card 3 - Right rotated */}
              <div className="absolute right-0 z-10 w-60 h-72 bg-white rounded-lg shadow-2xl overflow-hidden transform rotate-12 -translate-y-8">
                <img src={hero3} alt="The Great Wave" className="w-full h-full object-cover" />
              </div>
    
            {/* Card 4 - Far left positioned */}
              <div className="absolute -left-40 z-5 w-52 h-60 bg-white rounded-lg shadow-lg overflow-hidden transform -rotate-3 translate-y-12 opacity-90">
                <img src={hero4} alt="Renaissance Art" className="w-full h-full object-cover" />
              </div>

              {/* Card 5 - Far right positioned */}
              <div className="absolute -right-40 z-5 w-52 h-60 bg-white rounded-lg shadow-lg overflow-hidden transform rotate-3 translate-y-12 opacity-90">
                <img src={hero5} alt="Modern Abstract" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="text-center mt-24">
            <p className="text-3xl text-gray-300 italic font-bold max-w-5xl mx-auto">
              Step into a visual journey shaped by imagination and emotion
            </p>
          </div>
        </div>
      </section>
      {/* Art Collection Section */}
      <section className="w-full bg-[#f5f0e8] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-[#2d2420]">Art Collection</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300">
            <img src={artcollect} alt="Art Collection Bento Grid" className="w-full h-auto rounded-lg hover:scale-105 transition duration-300" />
          </div>
        </div>
      </section>

      {/* Latest Posted Visual Art Section */}
      <section className="w-full bg-[#463b33] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Popular of Painting Art</h2>
          
          <div className="relative">
            {/* Carousel Container */}
            <div className="flex justify-center items-center">
              <div className="w-full max-w-lg">
                <div className="h-96 rounded-lg overflow-hidden shadow-xl">
                  <img 
                    src={displayVisuals[visualIndex]} 
                    alt={`Visual Art ${visualIndex + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = vis1; // Fallback image
                    }}
                  />
                </div>
              </div>
            </div>
            
            {/* Navigation Buttons */}
            <button 
              onClick={prevVisual}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition"
            >
              ←
            </button>
            <button 
              onClick={nextVisual}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-3 rounded-full hover:bg-opacity-40 transition"
            >
              →
            </button>
            
            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {displayVisuals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setVisualIndex(index)}
                  className={`w-3 h-3 rounded-full transition ${
                    index === visualIndex ? 'bg-white' : 'bg-white bg-opacity-40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

     {/* Gallery Art Collections Card Section */}
      <section className="w-full bg-[#f5f0e8] py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-start gap-6">
              {/* Icon and Text */}
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  {/* Circle Icon */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4a4035] to-[#2d2420] flex-shrink-0"></div>
                  <h3 className="text-xl font-bold text-[#2d2420]">Gallery Art Collections</h3>
                </div>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  A collection of visual works that combine colors, shapes, and emotions in one space that invites you
                  to experience beauty from various perspectives.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0 mb-3">
                  <img src={gallerysee} alt="Gallery Preview" className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={() => navigate('/gallery-section')}
                  className="bg-[#2d2420] text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-[#3d342a] transition"
                >
                  See More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
     
    </main>
    <Footer />
    </div>
  )
}