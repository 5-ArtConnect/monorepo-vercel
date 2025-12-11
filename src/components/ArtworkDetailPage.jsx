import { useParams, useNavigate } from 'react-router-dom';
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

// hero section images
import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import hero3 from "../assets/hero3.png";
import hero4 from "../assets/hero4.png";
import hero5 from "../assets/hero5.png";
import bg from "../assets/bg.png";

export default function ArtworkDetailPage() {
  const { categoryName, artworkId } = useParams();
  const navigate = useNavigate();

  // Check if user is logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


  const allArtworks = {
    impressionisme: [
      {
        id: 1,
        title: "Impression, soleil levant",
        artist: "Claude Monet",
        year: "1872",
        image: imp1,
        description: "Lukisan ikonis yang menandai kelahiran aliran Impresionisme, menampilkan suasana pelabuhan Le Havre saat matahari terbit. Dengan sapuan kuas bebas dan permainan cahaya yang lembut, karya ini menangkap kesan sesaat dari warna, kabut, dan refleksi air yang bergetar di pagi hari.",
        medium: "Oil on canvas",
        dimensions: "48 cm × 63 cm",
        location: "Musée Marmottan Monet, Paris"
      },
      {
        id: 2,
        title: "The Starry Night",
        artist: "Vincent Van Gogh",
        year: "1889",
        image: imp2,
        description: "Karya maestro yang menampilkan langit malam bergelombang di atas desa tenang, penuh pusaran cahaya dan kontras dramatis. Dengan sapuan kuas bertekstur dan komposisi emosional, lukisan ini merefleksikan pergolakan batin Van Gogh sekaligus menghadirkan salah satu citra paling ikonis dalam sejarah seni.",
        medium: "Oil on canvas",
        dimensions: "73.7 cm × 92.1 cm",
        location: "Museum of Modern Art, New York"
      },
      {
        id: 3,
        title: "Paris Street ; Rainy Day",
        artist: "Gustave Caillebotte",
        year: "1877",
        image: imp3,
        description: "Lukisan realis yang menangkap suasana Paris pada hari hujan, menampilkan warga kota berjalan di bawah payung di kawasan Place de Dublin. Dengan perspektif tajam, komposisi simetris, dan pencahayaan lembut yang memantul pada jalanan basah, karya ini menghadirkan potret modernitas Paris pada akhir abad ke-19 dengan nuansa tenang namun elegan.",
        medium: "Oil on canvas",
        dimensions: "212.2 cm × 276.2 cm",
        location: "Art Institute of Chicago"
      }
    ],
    abstrakt: [
      {
        id: 4,
        title: "Composition II With Red, Blue and Yellow",
        artist: "Piet Mondrian",
        year: "1930",
        image: abs1,
        description: "Salah satu karya paling berpengaruh dari Mondrian yang menampilkan estetika neoplastisisme melalui garis-garis hitam tegas dan bidang warna primer. Komposisi ini menekankan keseimbangan, ritme, dan kesederhanaan visual, menghadirkan harmoni abstrak yang menjadi ciri khas evolusi seni modern abad ke-20.",
        medium: "Oil on canvas",
        dimensions: "46 cm × 46 cm",
        location: "Kunsthaus Zürich, Switzerland"
      },
      {
        id: 5,
        title: "White Relief",
        artist: "Ben Nicholson",
        year: "1935",
        image: abs2,
        description: "Relief abstrak berwarna putih yang menonjolkan permainan bidang, kedalaman, dan bentuk geometris minimalis. Dengan permukaan yang diukir halus dan komposisi yang bersih, karya ini memadukan ketelitian arsitektural dengan kepekaan puitis, menjadi salah satu pencapaian utama Nicholson dalam eksplorasi ruang dan cahaya.",
        medium: "Oil on carved board",
        dimensions: "50.8 cm × 76.2 cm",
        location: "Tate, London"
      },
      {
        id: 6,
        title: "Full Fathom Five",
        artist: "Jackson Pollock",
        year: "1947",
        image: abs3,
        description: "Salah satu karya awal teknik drip painting Pollock, memadukan lapisan cat yang menetes, cipratan, serta material non-tradisional seperti pasir, paku, dan puntung rokok. Tekstur yang kompleks dan ritme visual yang liar menciptakan kedalaman abstrak yang merepresentasikan energi mentah khas era awal Action Painting.",
        medium: "Oil on canvas with additional materials",
        dimensions: "129.2 cm × 76.5 cm",
        location: "Museum of Modern Art, New York"
      },
      {
        id: 7,
        title: "Mountains and Sea",
        artist: "Helen Frankenthaler",
        year: "1952",
        image: abs4,
        description: "Karya perintis yang menandai lahirnya teknik soak-stain, menampilkan hamparan warna lembut yang meresap langsung ke kanvas mentah. Dengan komposisi organik yang menyerupai lanskap abstrak, lukisan ini memadukan transparansi, fluiditas, dan spontanitas yang menjadi fondasi penting bagi gerakan Color Field Painting.",
        medium: "Oil and charcoal on canvas",
        dimensions: "220.3 cm × 297.8 cm",
        location: "National Gallery of Art, Washington, D.C."
      }
    ],
    ekspressionisme: [
      {
        id: 8,
        title: "The Scream",
        artist: "Edvard Munch",
        year: "1893",
        image: eks1,
        description: "Lukisan ekspresionis yang menggambarkan figur berwajah terdistorsi menjerit di atas jembatan, dengan langit berwarna oranye menyala yang bergelora. Atmosfernya memancarkan kecemasan eksistensial melalui warna intens, garis beriak, dan komposisi yang dramatis, menjadikannya simbol universal dari ketakutan dan kegelisahan manusia.",
        medium: "Oil, tempera, and pastel on cardboard",
        dimensions: "91 cm × 73.5 cm",
        location: "National Gallery, Oslo"
      },
      {
        id: 9,
        title: "The Dessert : Harmony in Red",
        artist: "Henri Matisse",
        year: "1908",
        image: eks2,
        description: "Lukisan dekoratif yang menonjolkan ekspresi warna merah intens sebagai latar utama, menampilkan interior rumah dengan meja penuh motif dan jendela yang terbuka ke taman. Dengan komposisi datar, pola berulang, dan garis yang mengalir bebas, karya ini merayakan suasana nyaman nan hangat sembari menegaskan gaya Fauvisme Matisse yang penuh vitalitas.",
        medium: "Oil on canvas",
        dimensions: "180 cm × 220 cm",
        location: "Hermitage Museum, Saint Petersburg"
      },
      {
        id: 10,
        title: "Street Berlin",
        artist: "Ernst Ludwig Kirchner",
        year: "1913",
        image: eks3,
        description: "Lukisan ekspresionis yang menangkap hiruk-pikuk kehidupan urban Berlin awal abad ke-20, menampilkan figur-figur memanjang dengan warna kontras yang tajam. Sapuan kuas yang agresif, perspektif yang terdistorsi, serta ketegangan visual menghadirkan atmosfer asing dan menekan, mencerminkan kegelisahan modernitas dalam kota besar.",
        medium: "Oil on canvas",
        dimensions: "121 cm × 95 cm",
        location: "Museum of Modern Art, New York"
      }
    ]
  };

  // Cari artwork berdasarkan kategori dan ID
  const categoryArtworks = allArtworks[categoryName] || allArtworks.impresionisme;
  const artwork = categoryArtworks.find(art => art.id === parseInt(artworkId));

  if (!artwork) {
    return (
      <>
        <NavbarBeforeLogin />
        <div className="min-h-screen bg-[#FAF7F0] pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Artwork Not Found</h1>
            <button 
              onClick={() => navigate(-1)}
              className="bg-[#463b33] text-white px-6 py-3 rounded hover:bg-[#5a4a42] transition"
            >
              Go Back
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

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
          <div className="max-w-7xl mx-auto px-6 lg:px-12 h-screen flex items-center relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
              {/* Left: Text Content */}
              <div className="space-y-6 lg:pr-12">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white italic leading-tight">
                  Where Art Speaks Beyond Words
                </h1>
                <p className="text-sm md:text-base text-white/80 max-w-md leading-relaxed">
                  Di antara bayang dan cahaya, seni membuka dunia baru. Setiap karya adalah perjalanan, setiap warna adalah perjalanan, dan setiap garis adalah napas kehidupan.
                </p>
              </div>

              {/* Right: Overlapping Art Cards */}
              <div className="relative h-96 flex items-center justify-center">
                {/* Card 1 - Left rotated */}
                <div className="absolute left-0 z-10 w-48 md:w-60 h-56 md:h-72 bg-white rounded-lg shadow-2xl overflow-hidden transform -rotate-12 -translate-y-8">
                  <img
                    src={hero1}
                    alt="Impressionist Art"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Card 2 - Center (front most) */}
                <div className="absolute z-20 w-56 md:w-72 h-64 md:h-80 bg-white rounded-lg shadow-2xl overflow-hidden">
                  <img 
                    src={hero2} 
                    alt="Starry Night" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Card 3 - Right rotated */}
                <div className="absolute right-0 z-10 w-48 md:w-60 h-56 md:h-72 bg-white rounded-lg shadow-2xl overflow-hidden transform rotate-12 -translate-y-8">
                  <img 
                    src={hero3} 
                    alt="The Great Wave" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Card 4 - Far left positioned */}
                <div className="hidden lg:block absolute -left-40 z-[5] w-44 md:w-52 h-48 md:h-60 bg-white rounded-lg shadow-lg overflow-hidden transform -rotate-3 translate-y-12 opacity-90">
                  <img 
                    src={hero4} 
                    alt="Renaissance Art" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                {/* Card 5 - Far right positioned */}
                <div className="hidden lg:block absolute -right-40 z-[5] w-44 md:w-52 h-48 md:h-60 bg-white rounded-lg shadow-lg overflow-hidden transform rotate-3 translate-y-12 opacity-90">
                  <img 
                    src={hero5} 
                    alt="Modern Abstract" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detail artwork */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Gambar */}
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <img 
                    src={artwork.image} 
                    alt={artwork.title}
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                </div>
              </div>

              {/* Detail informasi */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-800 mb-2">{artwork.title}</h1>
                  <p className="text-2xl text-[#463b33] font-semibold mb-2">{artwork.artist}</p>
                  <p className="text-lg text-gray-600">{artwork.year}</p>
                </div>

                <div className="border-t pt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                  <p className="text-gray-700 leading-relaxed mb-6">{artwork.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t pt-6">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Medium</h3>
                    <p className="text-gray-600">{artwork.medium}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Dimensions</h3>
                    <p className="text-gray-600">{artwork.dimensions}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                    <p className="text-gray-600">{artwork.location}</p>
                  </div>
                </div>

                {/* Comments Section */}
                <div className="border-t pt-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Comments</h3>
                  
                  {/* Comment input */}
                  <div className="mb-6">
                    <textarea 
                      placeholder="Share your thoughts about this artwork..."
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#463b33] focus:border-transparent"
                      rows="3"
                    />
                    <button className="mt-2 bg-[#463b33] text-white px-6 py-2 rounded hover:bg-[#5a4a42] transition">
                      Send
                    </button>
                  </div>

                  {/* Other Comments */}
                  <div>
                    <h4 className="font-medium text-gray-700 mb-3">Other Comments</h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-[#463b33] rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">A</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-gray-800">Anonymous</span>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                          </div>
                          <p className="text-gray-700 text-sm">
                            This is a magnificent piece! The way the artist captures light and shadow creates such depth and emotion. Truly inspiring work.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <button 
                    onClick={() => navigate(`/category/${categoryName}`)}
                    className="bg-[#463b33] text-white px-8 py-3 rounded hover:bg-[#5a4a42] transition mr-4"
                  >
                    View More {categoryName} Art
                  </button>
                  <button 
                    onClick={() => navigate('/gallery-section')}
                    className="border border-[#463b33] text-[#463b33] px-8 py-3 rounded hover:bg-[#463b33] hover:text-white transition"
                  >
                    Back to Gallery
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}