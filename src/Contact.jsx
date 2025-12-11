import React from 'react';
import NavbarAfterLogin from "./components/NavbarAfterLogin";
import Footer from "./components/Footer.jsx";
import pelukisImage from "./assets/pelukis.jpg";


export default function LandingPage() {
  const coreValues = [
    {
      title: "Creativity",
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=400&fit=crop"
    },
    {
      title: "Relation",
      image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=400&h=400&fit=crop"
    },
    {
      title: "Inclusivity",
      image: pelukisImage 
    },
    {
      title: "Innovation",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop"
    },
    {
      title: "Appreciation",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col pt-20 bg-[#f5f1ed]">
      {/* Header */}
      <NavbarAfterLogin />

      {/* Main content grows to push Footer to bottom */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-96 ">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&h=400&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
            <div className="max-w-7xl mx-auto px-8 w-full">
              <h2 className="text-white text-[40px] md:text-5xl font-bold mb-4 leading-tight">
                A Journey through<br />the Imagination
              </h2>
              <p className="text-white text-xl italic mb-6">
                Where art and inspiration<br />collide
              </p>
            </div>
          </div>
        </section>

        {/* Connecting Section */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-4xl font-bold text-center mb-8">
            Connecting Art, Creativity, and People
          </h2>
          <p className="text-center text-gray-700 max-w-4xl mx-auto mb-12">
            ArtConnect is a digital art gallery platform created to provide a space for artists and art enthusiasts within a single creative ecosystem. We connect visual works with a wider audience through curation, digital exhibitions, and collaborative communities.
          </p>

          {/* Vision and Mission */}
          <div className="bg-[#3d3935] rounded-2xl py-6 mb-12">
            <h3 className="text-white text-3xl font-bold text-center flex items-center justify-center gap-4">
              <span className="w-8 h-8 bg-gray-400 rounded-full" />
              Vision and Mission
              <span className="w-8 h-8 bg-gray-400 rounded-full" />
            </h3>
          </div>

          {/* Vision Box */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <p className="text-center text-gray-700">
              Our vision to be the main bridge between modern artists and the world, through inspiring and accessible art experiences.
            </p>
          </div>

          {/* Mission Box */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <ul className="space-y-3 text-gray-700">
              <li>• Supporting the development of local artists in showcasing their best work.</li>
              <li>• Creating an inclusive and sustainable space for art appreciation.</li>
              <li>• Providing digital experiences that make it easier for people to explore, find references, and more.</li>
              <li>• Strengthening the creative community through collaborations, events, and digital visual exhibitions.</li>
            </ul>
          </div>
        </section>

        {/* Platform Section */}
        <section className="max-w-7xl mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-sm text-gray-600 mb-2">PLATFORM</p>
            <h2 className="text-4xl font-bold mb-6">
              About ArtConnect<br />Platform
            </h2>
            <p className="text-gray-700">
              ArtConnect is not just a gallery, but also an innovation within a visual art gallery packaged in the form of digital.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Digital Gallery</h4>
                <p className="text-sm text-gray-600">(in a modern classical theme held at the Jakarta Global Art Museum)</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Artist Profile</h4>
                <p className="text-sm text-gray-600">(exhibition and painting workshops in the ceramics fair series)</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Online Visual Exhibition</h4>
                <p className="text-sm text-gray-600">(Artwork training in modern digital/visual form)</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6 flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-800 rounded-full flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Arts Community</h4>
                <p className="text-sm text-gray-600">(flexible and cooperative arts community)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-[#3d3935] py-16">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-white text-4xl font-bold text-center mb-4">Core Values</h2>
            <p className="text-gray-400 text-center mb-12">
              we believe every visual work of art has the power,<br />
              not hesitate joint support tell to us them
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {coreValues.map((value, index) => (
                <div key={index} className="text-center">
                  <div className="aspect-square mb-4 rounded-lg overflow-hidden">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-white font-bold">{value.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Join Flow */}
        <section className="max-w-7xl mx-auto px-8 py-16">
          <h2 className="text-4xl font-bold mb-4">Community Join Flow</h2>
          <p className="text-gray-600 mb-12">Join, informed and become part of a wider arts ecosystem</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#463D38] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1.
                </div>
                <div>
                  <h4 className="font-bold">Login Account</h4>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#463D38] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2.
                </div>
                <div>
                  <h4 className="font-bold">To the Community Page</h4>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#463D38] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3.
                </div>
                <div>
                  <h4 className="font-bold">Press the Join Community Button</h4>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#463D38] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4.
                </div>
                <div>
                  <h4 className="font-bold">Press the Join Community Button</h4>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#463D38] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  5.
                </div>
                <div>
                  <h4 className="font-bold">Fill in the Form Provided</h4>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#463D38] text-white rounded-full flex items-center justify-center text-xl font-bold">
                  6.
                </div>
                <div>
                  <h4 className="font-bold">Wait for Email From Platform</h4>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
