import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NavbarBeforeLogin from './NavbarBeforeLogin';
import NavbarAfterLogin from './NavbarAfterLogin';
import Footer from './Footer';

//newest
import imp1 from "../assets/imp1.jpg";
import imp2 from "../assets/imp2.jpg";
import imp3 from "../assets/imp3.jpg";
import abs1 from "../assets/abs1.jpg";
import abs2 from "../assets/abs2.jpg";
import abs3 from "../assets/abs3.jpg";
import abs4 from "../assets/abs4.jpg";
import eks1 from "../assets/eks1.jpg";
import eks2 from "../assets/eks2.jpg";
import eks3 from "../assets/eks3.jpg";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";
import hero5 from "../assets/hero5.png";
import bg from "../assets/bg.png";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [selectedArt, setSelectedArt] = useState(null);

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // Data untuk setiap kategori
  const categoryData = {
    impressionisme: {
      title: "Impresionisme Art Collection",
      description: "Eksplorasi seni impresionisme dengan teknik brushwork yang ekspresif dan permainan cahaya yang dramatis.",
      artworks: [
        {
          id: 1,
          title: "Impression, soleil levant",
          artist: "Claude Monet",
          year: "1872",
          image: imp1,
          description: "Lukisan ini dikenal sebagai lukisan yang menginspirasi nama gerakan impresionis. Lukisan ini menggambarkan pelabuhan Le Havre yang merupakan kampung Claude Monet."
        },
        {
          id: 2,
          title: "The Starry Night",
          artist: "Vincent Van Gogh",
          year: "1889",
          image: imp2,
          description: "Lukisan ini menggambarkan tentang keindahan pemandangan desa saat malam hari yang penuh dengan bintang. "
        },
        {
          id: 3,
          title: "Paris Street ; Rainy Day",
          artist: "Gustave Caillebotte", 
          year: "1877",
          image: imp3,
          description: "Lukisan realis yang menangkap suasana Paris pada hari hujan, menampilkan warga kota berjalan di bawah payung di kawasan Place de Dublin."
        }
      ]
    },
    abstrakt: {
      title: "Abstract Art Collection",
      description: "Koleksi seni abstrak yang mengekspresikan emosi dan konsep melalui bentuk, warna, dan komposisi non-representasional.",
      artworks: [
        {
          id: 4,
          title: "Composition II With Red, Blue and Yellow",
          artist: "Piet Mondrian",
          year: "1930", 
          image: abs1,
          description: "Salah satu karya paling berpengaruh dari Mondrian yang menampilkan estetika neoplastisisme melalui garis-garis hitam tegas dan bidang warna primer."
        },
        {
          id: 5,
          title: "White Relief",
          artist: "Ben Nicholson",
          year: "1935",
          image: abs2,
          description: "Relief abstrak berwarna putih yang menonjolkan permainan bidang, kedalaman, dan bentuk geometris minimalis."
        },
        {
          id: 6,
          title: "Full Fathom Five",
          artist: "Jackson Pollock",
          year: "1947",
          image: abs3,
          description: "Salah satu karya awal teknik drip painting Pollock, memadukan lapisan cat yang menetes, cipratan, serta material non-tradisional seperti pasir, paku, dan puntung rokok."
        },
        {
          id: 7,
          title: "Mountains and Sea",
          artist: "Helen Frankenthaler",
          year: "1952",
          image: abs4,
          description: "Karya perintis yang menandai lahirnya teknik soak-stain, menampilkan hamparan warna lembut yang meresap langsung ke kanvas mentah."
        }
      ]
    },
    ekspressionisme: {
      title: "Ekspressionisme Art Collection", 
      description: "Seni ekspressionisme yang menekankan pada ekspresi emosi dan pengalaman subjektif melalui distorsi bentuk dan warna yang intens.",
      artworks: [
        {
          id: 8,
          title: "The Scream",
          artist: "Edvard Munch",
          year: "1893",
          image: eks1,
          description: "Ikon seni ekspressionisme yang menggambarkan kecemasan dan ketakutan eksistensial modern."
        },
        {
          id: 9,
          title: "The Dessert : Harmony in Red",
          artist: "Henri Matisse", 
          year: "1908",
          image: eks2,
          description: "Lukisan dekoratif yang menonjolkan ekspresi warna merah intens sebagai latar utama, menampilkan interior rumah dengan meja penuh motif dan jendela yang terbuka ke taman."
        },
        {
          id: 10,
          title: "Street Berlin",
          artist: "Ernst Ludwig Kirchner",
          year: "1913",
          image: eks3,
          description: "Lukisan ekspresionis yang menangkap hiruk-pikuk kehidupan urban Berlin awal abad ke-20, menampilkan figur-figur memanjang dengan warna kontras yang tajam."
        }
      ]
    }
  };

  // Debug log untuk melihat categoryName yang diterima
  console.log('Category Name:', categoryName);
  console.log('Available categories:', Object.keys(categoryData));

  // Normalisasi nama kategori untuk mencocokkan key object
  const normalizedCategoryName = categoryName?.toLowerCase();
  const currentCategory = categoryData[normalizedCategoryName] || categoryData.impressionisme;
  const openModal = (artwork) => {
    navigate(`/category/${categoryName}/artwork/${artwork.id}`);
  };

  const closeModal = () => {
    setSelectedArt(null);
  };

  return (
    <>
      {/* Conditional Navbar rendering */}
      {isLoggedIn ? <NavbarAfterLogin /> : <NavbarBeforeLogin />}
      <div className="min-h-screen bg-[#FAF7F0] pt-16">
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

      {/* Header Section */}
      <section className="bg-[#FAF7F0] py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-gray-800">{currentCategory.title}</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Artworks Grid */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-8">
            {currentCategory.artworks.map((artwork) => (
              <div 
                key={artwork.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="h-64 overflow-hidden">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{artwork.title}</h3>
                  <p className="text-[#463b33] font-semibold mb-1">{artwork.artist}</p>
                  <p className="text-gray-600 text-sm mb-3">{artwork.year}</p>
                  <p className="text-gray-700 text-sm line-clamp-2 mb-4">{artwork.description}</p>
                  <button 
                    onClick={() => openModal(artwork)}
                    className="bg-[#463b33] text-white px-6 py-2 rounded hover:bg-[#5a4a42] transition-colors w-full"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Back Button Section */}
          <div className="mt-12 text-center">
            <button 
              onClick={() => navigate('/gallery-section')}
              className="bg-[#463b33] text-white px-8 py-3 rounded hover:bg-[#5a4a42] transition"
            >
              ← Back to Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Modal untuk detail artwork */}
      {selectedArt && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-800">{selectedArt.title}</h2>
                <button 
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedArt.image} 
                    alt={selectedArt.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-[#463b33]">Artist</h3>
                      <p className="text-gray-700">{selectedArt.artist}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-[#463b33]">Year</h3>
                      <p className="text-gray-700">{selectedArt.year}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold text-[#463b33]">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedArt.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
      <Footer />
    </>
  );
}