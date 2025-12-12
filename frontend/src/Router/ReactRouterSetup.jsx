// src/Router/ReactRouterSetup.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../Home.jsx";
import HomeBefore from "../HomeBefore.jsx";
import MyGallery from "../MyGallery.jsx";
import Profile from "../Profile.jsx";
import MyCommunityArt from "../MyCommunityArt.jsx";
import Exhibition from "../Exhibition.jsx";
import Contact from "../Contact.jsx";
import CommunityPage1 from "../CommunityPage1.jsx";
import CommunityPage2 from "../CommunityPage2.jsx";
import CommunityPage3 from "../CommunityPage3.jsx";

import ArtConnectLogin from "../ArtConnectLogin.jsx";
import ArtConnectSignup from "../ArtConnectSignup.jsx";

// Gallery Components
import GallerySection from "../components/GallerySection";
import CategoryPage from "../components/CategoryPage";
import ArtworkDetailPage from "../components/ArtworkDetailPage";
import GallerySectionSee from "../GallerySectionSee";

// ✅ HALAMAN SEE MORE ARTIST
import ArtistSeeMore from "../ArtistSeeMore.jsx";

// ✅ HALAMAN BIOGRAPHY ARTIST
import ArtistBiography from "../ArtistBiography.jsx";

import ProtectedRoute from "./ProtectedRoute.jsx";
import { useAuth } from "../AuthContext.jsx";

export default function AppRouter() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* PUBLIC ROUTES (tidak butuh login) */}
      <Route path="/homebefore" element={<HomeBefore />} />
      <Route path="/artconnectlogin" element={<ArtConnectLogin />} />
      <Route path="/artconnectsignup" element={<ArtConnectSignup />} />

      {/* ROOT: kalau belum login → ke homebefore, kalau sudah → Home */}
      <Route
        path="/"
        element={
          isLoggedIn ? <Home /> : <Navigate to="/homebefore" replace />
        }
      />

      {/* PROTECTED ROUTES (wajib login) */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <GallerySectionSee />
          </ProtectedRoute>
        }
      />

      {/* Original Gallery Section */}
      <Route
        path="/gallery-section"
        element={
          <ProtectedRoute>
            <GallerySection />
          </ProtectedRoute>
        }
      />

      {/* Category and Artwork Detail Routes */}
      <Route
        path="/category/:categoryName"
        element={
          <ProtectedRoute>
            <CategoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/category/:categoryName/artwork/:artworkId"
        element={
          <ProtectedRoute>
            <ArtworkDetailPage />
          </ProtectedRoute>
        }
      />

      {/* My Gallery - User's favorite artworks */}
      <Route 
        path="/my-gallery" 
        element={
          <ProtectedRoute>
            <MyGallery />
          </ProtectedRoute>
        } 
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/community"
        element={
          <ProtectedRoute>
            <CommunityPage1 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/communitypage2"
        element={
          <ProtectedRoute>
            <CommunityPage2 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/communitypage3"
        element={
          <ProtectedRoute>
            <CommunityPage3 />
          </ProtectedRoute>
        }
      />

      <Route
        path="/exhibition"
        element={
          <ProtectedRoute>
            <Exhibition />
          </ProtectedRoute>
        }
      />

      {/* ✅ ROUTE SEE MORE ARTISTS */}
      <Route
        path="/artists"
        element={
          <ProtectedRoute>
            <ArtistSeeMore />
          </ProtectedRoute>
        }
      />

      {/* ✅ ROUTE BIOGRAPHY PER ARTIST */}
      <Route
        path="/artist/:artistId"
        element={
          <ProtectedRoute>
            <ArtistBiography />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        }
      />

      {/* FALLBACK: kalau path nggak dikenal */}
      <Route
        path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Navigate to="/homebefore" replace />
          )
        }
      />
    </Routes>
  );
}
