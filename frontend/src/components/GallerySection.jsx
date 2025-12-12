import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarAfterLogin from './NavbarAfterLogin';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import Footer from "./Footer";
import { getAllArtworks, getArtworksByCategory } from '../services/artworks';

// hero section
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";
import hero5 from "../assets/hero5.png";
import bg from "../assets/bg.png";

// look
import look1 from "../assets/look.png";

// Category fallback images
import imp1 from "../assets/imp1.jpg";
import abs1 from "../assets/abs1.jpg";
import eks1 from "../assets/eks1.jpg";

// Painting popular fallback images
import st1 from "../assets/st1.jpg";
import st2 from "../assets/st2.jpg";
import st3 from "../assets/st3.jpg";

// Visual art fallback images
import vis1 from "../assets/vis1.png";
import vis2 from "../assets/vis2.png";
import vis3 from "../assets/vis3.png";
import vis4 from "../assets/vis4.png";

export default function GallerySection() {
  const navigate = useNavigate();
  const [paintingIndex, setPaintingIndex] = useState(0);
  const [visualIndex, setVisualIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // State for artworks from API
  const [browseCategories, setBrowseCategories] = useState([]);
  const [popularPaintings, setPopularPaintings] = useState([]);
  const [visualArtworks, setVisualArtworks] = useState([]);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        setLoading(true);
        
        // Fetch artworks for browse categories (1 from each category)
        const impressionismeArt = await getArtworksByCategory('Impressionisme', { limit: 1 });
        const abstraktArt = await getArtworksByCategory('Abstrakt', { limit: 1 });
        const ekspressionismeArt = await getArtworksByCategory('Ekspressionisme', { limit: 1 });
        
        const categories = [
          { 
            name: 'Impressionisme', 
            image: impressionismeArt?.data?.[0]?.image_url || imp1,
            artworkId: impressionismeArt?.data?.[0]?.id 
          },
          { 
            name: 'Abstrakt', 
            image: abstraktArt?.data?.[0]?.image_url || abs1,
            artworkId: abstraktArt?.data?.[0]?.id 
          },
          { 
            name: 'Ekspressionisme', 
            image: ekspressionismeArt?.data?.[0]?.image_url || eks1,
            artworkId: ekspressionismeArt?.data?.[0]?.id 
          }
        ];
        setBrowseCategories(categories);

        // Fetch popular paintings (Street Art)
        const streetArtResponse = await getArtworksByCategory('Street Art', { limit: 3 });
        if (streetArtResponse?.data && streetArtResponse.data.length > 0) {
          setPopularPaintings(streetArtResponse.data);
        } else {
          // Fallback to static images if no data
          setPopularPaintings([
            { id: 'fallback-1', title: 'Street Art 1', category: 'Street Art', image_url: st1, artist_name: 'Local Artist' },
            { id: 'fallback-2', title: 'Street Art 2', category: 'Street Art', image_url: st2, artist_name: 'Local Artist' },
            { id: 'fallback-3', title: 'Street Art 3', category: 'Street Art', image_url: st3, artist_name: 'Local Artist' },
          ]);
        }

        // Fetch visual art
        const visualResponse = await getArtworksByCategory('Digital', { limit: 4 });
        if (visualResponse?.data && visualResponse.data.length > 0) {
          setVisualArtworks(visualResponse.data);
        } else {
          // Fallback to static images if no data
          setVisualArtworks([
            { id: 'fallback-vis-1', title: 'Digital Art 1', category: 'Digital', image_url: vis1, artist_name: 'Digital Artist' },
            { id: 'fallback-vis-2', title: 'Digital Art 2', category: 'Digital', image_url: vis2, artist_name: 'Digital Artist' },
            { id: 'fallback-vis-3', title: 'Digital Art 3', category: 'Digital', image_url: vis3, artist_name: 'Digital Artist' },
            { id: 'fallback-vis-4', title: 'Digital Art 4', category: 'Digital', image_url: vis4, artist_name: 'Digital Artist' },
          ]);
        }
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Handle category click navigation
  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
  };

  const nextPainting = () => setPaintingIndex((prev) => (prev + 1) % popularPaintings.length);
  const prevPainting = () => setPaintingIndex((prev) => (prev - 1 + popularPaintings.length) % popularPaintings.length);
  
  const nextVisual = () => setVisualIndex((prev) => (prev + 1) % visualArtworks.length);
  const prevVisual = () => setVisualIndex((prev) => (prev - 1 + visualArtworks.length) % visualArtworks.length);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading gallery...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Conditional Navbar rendering */}
      {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
      <main className="flex-1 w-full pt-16">
      {/* Hero Section */}
      <section 
        className="w-full text-white py-12 md:py-24 bg-cover bg-center bg-no-repeat relative min-h-[60vh] md:min-h-screen"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 h-full flex flex-col justify-center">
          
          {/* Mobile: Simple Stack */}
          <div className="md:hidden flex flex-col items-center gap-4">
            <div className="w-64 h-80 bg-white rounded-lg shadow-2xl overflow-hidden">
              <img src={hero2} alt="Gallery Art" className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-6">
              <p className="text-xl text-gray-200 italic font-bold px-4">
                Step into a visual journey shaped by imagination and emotion
              </p>
            </div>
          </div>

          {/* Desktop: Overlapping Cards */}
          <div className="hidden md:flex items-center justify-center gap-12 mb-8">
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

          {/* Tagline - Desktop only */}
          <div className="hidden md:block text-center mt-24">
            <p className="text-3xl text-gray-300 italic font-bold max-w-5xl mx-auto">
              Step into a visual journey shaped by imagination and emotion
            </p>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="w-full py-8 md:py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-12 text-center text-black">Browse by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {browseCategories.map((category, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer" 
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="bg-gray-200 h-48 rounded overflow-hidden mb-4 group-hover:shadow-xl transition duration-300">
                {category.image ? (
                  <img 
                    src={category.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                    alt={category.name}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-300">
                    <span className="text-gray-500">No Image</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-black group-hover:text-[#463b33] transition">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Painting Art Section */}
      <section className="w-full">
        {/* Header with brown background */}
        <div className="w-full bg-[#463b33] text-white py-6 md:py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold text-center">Our Popular of Painting Art</h2>
          </div>
        </div>
        {/* Content with white background */}
        <div className="w-full bg-white py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {popularPaintings.map((artwork) => (
                <div 
                  key={artwork.id}
                  className="bg-white text-black rounded overflow-hidden hover:shadow-xl transition cursor-pointer"
                  onClick={() => navigate(`/category/${artwork.category.toLowerCase()}/artwork/${artwork.id}`)}
                >
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={artwork.image_url} 
                      alt={artwork.title}
                      className="w-full h-full object-cover hover:scale-105 transition duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold">{artwork.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{artwork.category}</p>
                    <p className="font-semibold">{artwork.artist_name || 'Unknown Artist'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posted Visual Art Section */}
      <section className="w-full bg-[#463b33] text-white py-8 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4 text-center">Our Latest Posted Visual Art</h2>
          <p className="text-gray-400 text-sm md:text-base mb-6 md:mb-12 text-center px-4">
            The latest work from the newly born creators of inspiring visuals, ready to touch and invite you to rethink about beauty.
          </p>
          
          {visualArtworks.length > 0 && (
            <div className="relative px-2 md:px-0">
              {/* Carousel Container */}
              <div className="flex justify-center items-center">
                <div className="w-full max-w-lg">
                  <div 
                    className="h-64 md:h-96 rounded-lg overflow-hidden shadow-xl cursor-pointer"
                    onClick={() => navigate(`/category/${visualArtworks[visualIndex].category.toLowerCase()}/artwork/${visualArtworks[visualIndex].id}`)}
                  >
                    <img 
                      src={visualArtworks[visualIndex].image_url} 
                      alt={visualArtworks[visualIndex].title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x500?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h3 className="text-lg md:text-xl font-bold">{visualArtworks[visualIndex].title}</h3>
                    <p className="text-gray-300 text-sm md:text-base">{visualArtworks[visualIndex].artist_name || 'Unknown Artist'}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation Buttons */}
              <button 
                onClick={prevVisual}
                className="absolute left-0 md:left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 md:p-3 rounded-full hover:bg-opacity-40 transition text-sm md:text-base"
              >
                ←
              </button>
              <button 
                onClick={nextVisual}
                className="absolute right-0 md:right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 text-white p-2 md:p-3 rounded-full hover:bg-opacity-40 transition text-sm md:text-base"
              >
                →
              </button>
              
              {/* Dots Indicator */}
              <div className="flex justify-center mt-8 space-x-2">
                {visualArtworks.map((_, index) => (
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
          )}
        </div>
      </section>

      {/* Looking for Art Section */}
      <section className="w-full py-8 md:py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center order-2 md:order-1">
              <div className="h-64 w-64 md:h-80 md:w-80 rounded overflow-hidden shadow-xl">
                <img src={look1} alt="Art Collection" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center md:text-left order-1 md:order-2">
              <h2 className="text-2xl md:text-4xl font-bold mb-4 md:mb-8 text-black">Our Looking for Art</h2>
              <p className="text-gray-700 mb-4 md:mb-6 text-sm md:text-base px-4 md:px-0">
                Explore the work of artists with unique characters and styles that enrich the world of contemporary art.
              </p>
              <div className="flex justify-center md:justify-end">
                <button 
                  onClick={() => navigate('/exhibition')}
                  className="bg-[#463b33] text-white px-6 md:px-8 py-3 md:py-4 rounded hover:bg-[#5a4a42] transition text-sm md:text-base"
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