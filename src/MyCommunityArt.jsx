import React from 'react';
import { Users, Palette } from 'lucide-react';
import NavbarAfterLogin from './components/NavbarAfterLogin.jsx';
import Footer from "./components/Footer.jsx";

export default function MyCommunityArt() {
  const communities = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop&q=80",
      title: "Canvas Circle",
      description: "Kreator visual yang menampilkan karya terkurasi",
      members: "300 Anggota",
      artworks: "50++ Koleksi Seni"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1565183997392-2f6f122e5912?w=400&h=400&fit=crop&q=80",
      title: "Creative Hub",
      description: "Komunitas seni digital & tradisional",
      members: "150 Anggota",
      artworks: "80++ Koleksi Seni"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=80",
      title: "Art Society",
      description: "Eksplorasi ide dan visual eksperimental",
      members: "210 Anggota",
      artworks: "100++ Koleksi Seni"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f1ed]">
      <NavbarAfterLogin />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-12 py-16 md:py-28">
        <h2 className="text-2xl md:text-4xl font-bold mb-2">My Community Art</h2>
        <p className="text-sm md:text-lg mb-8 text-gray-700">Community Information</p>

        <div className="bg-[#9d9189] rounded-lg p-4 md:p-10">
          <h3 className="text-white text-lg md:text-2xl font-bold mb-6 md:mb-10 underline">
            Community Redaction
          </h3>

          <div className="space-y-6">
            {communities.map((community) => (
              <article
                key={community.id}
                className="bg-white rounded-2xl p-4 md:p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 shadow-sm hover:shadow-lg transition"
              >
                {/* Image */}
                <img
                  src={community.image}
                  alt={community.title}
                  className="w-full md:w-36 h-48 md:h-36 object-cover rounded-lg"
                />

                {/* Text */}
                <div className="flex-1 mt-4 md:mt-0">
                  <h4 className="text-xl md:text-2xl font-semibold">{community.title}</h4>
                  <p className="text-gray-700 text-sm md:text-base mt-1 mb-3">
                    {community.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{community.members}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-gray-800 rounded-full flex items-center justify-center">
                        <Palette className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium">{community.artworks}</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="w-full md:w-auto md:ml-auto mt-4 md:mt-0">
                  <button
                    onClick={() => alert(`See Profile: ${community.title}`)}
                    className="w-full md:w-[140px] px-4 py-2 bg-[#463D38] text-white font-bold rounded-lg shadow-xl hover:bg-[#8D8079] transition"
                  >
                    See Profile
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
