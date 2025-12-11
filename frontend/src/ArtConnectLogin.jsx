// src/ArtConnectLogin.jsx
import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext.jsx";

export default function ArtConnectLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loading, error: authError } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validasi input
    if (!email || !password) {
      setError("Email dan password harus diisi");
      return;
    }

    try {
      // Call API login via AuthContext
      await login({ email, password });

      // Redirect after successful login
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err.message || "Login gagal. Periksa email dan password Anda.");
    }
  }

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center font-poppins px-4">
      <div className="w-full max-w-sm">
        {/* Logo / Title */}
        <h1 className="text-4xl md:text-5xl font-playball text-center mb-6">
          ArtConnect
        </h1>

        {/* Card */}
        <div className="bg-amber-50 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Selamat Datang!</h2>
            <p className="text-gray-700 text-sm md:text-base">
              Kamu mencari inspirasi dan ekspresi? Mari bergabung dengan komunitas seni kami!
            </p>
          </div>

          {/* Error Message */}
          {(error || authError) && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
              {error || authError}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm md:text-lg font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email"
                className="w-full px-4 py-3 rounded-xl bg-white 
                           shadow-lg shadow-black/10 
                           focus:ring-2 focus:ring-gray-400 
                           outline-none placeholder-gray-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm md:text-lg font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan Password"
                  className="w-full px-4 py-3 rounded-xl bg-white 
                             shadow-lg shadow-black/10 
                             focus:ring-2 focus:ring-gray-400 
                             outline-none placeholder-gray-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm"
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8D8078] hover:bg-[#7a6f68] text-white font-semibold text-lg py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            {/* Switch to sign up */}
            <p className="text-center text-gray-700 text-sm md:text-base">
              Belum punya akun?{" "}
              <Link
                to="/artconnectsignup"
                className="text-blue-600 underline hover:text-blue-800"
              >
                Buat akun
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
