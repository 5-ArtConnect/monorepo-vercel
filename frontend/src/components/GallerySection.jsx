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
            image: impressionismeArt?.data?.[0]?.image_url || '',
            artworkId: impressionismeArt?.data?.[0]?.id 
          },
          { 
            name: 'Abstrakt', 
            image: abstraktArt?.data?.[0]?.image_url || '',
            artworkId: abstraktArt?.data?.[0]?.id 
          },
          { 
            name: 'Ekspressionisme', 
            image: ekspressionismeArt?.data?.[0]?.image_url || '',
            artworkId: ekspressionismeArt?.data?.[0]?.id 
          }
        ];
        setBrowseCategories(categories);

        // Fetch popular paintings (Street Art)
        const streetArtResponse = await getArtworksByCategory('Street Art', { limit: 3 });
        if (streetArtResponse?.data) {
          setPopularPaintings(streetArtResponse.data);
        }

        // Fetch visual art
        const visualResponse = await getArtworksByCategory('Digital', { limit: 4 });
        if (visualResponse?.data) {
          setVisualArtworks(visualResponse.data);
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

      {/* Browse by Category Section */}
      <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-black">Browse by Category</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {browseCategories.map((category, index) => (
            <div 
              key={index}
              className="text-center group cursor-pointer" 
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="bg-gray-200 h-48 rounded overflow-hidden mb-4 group-hover:shadow-xl transition duration-300">
                <img 
                  src={category.image} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300" 
                  alt={category.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
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
        <div className="w-full bg-[#463b33] text-white py-8 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center">Our Popular of Painting Art</h2>
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
      <section className="w-full bg-[#463b33] text-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Our Latest Posted Visual Art</h2>
          <p className="text-gray-400 mb-12 text-center">
            The latest work from the newly born creators of inspiring visuals, ready to touch and invite you to rethink about beauty.
          </p>
          
          {visualArtworks.length > 0 && (
            <div className="relative">
              {/* Carousel Container */}
              <div className="flex justify-center items-center">
                <div className="w-full max-w-lg">
                  <div 
                    className="h-96 rounded-lg overflow-hidden shadow-xl cursor-pointer"
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
                    <h3 className="text-xl font-bold">{visualArtworks[visualIndex].title}</h3>
                    <p className="text-gray-300">{visualArtworks[visualIndex].artist_name || 'Unknown Artist'}</p>
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
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="h-80 w-80 rounded overflow-hidden shadow-xl">
                <img src={look1} alt="Art Collection" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-left">
              <h2 className="text-4xl font-bold mb-8 text-center text-black">Our Looking for Art</h2>
              <p className="text-white-700 mb-6 text-black">
                Explore the work of artists with unique characters and styles that enrich the world of contemporary art.
              </p>
              <div className="flex justify-end">
                <button 
                  onClick={() => navigate('/exhibition')}
                  className="bg-[#463b33] text-white px-8 py-4 rounded hover:bg-[#5a4a42] transition"
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