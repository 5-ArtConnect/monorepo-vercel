import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function ArtConnectSignup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const { register, loading, error: authError } = useAuth();

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setError('');

    // Validasi input
    if (!email || !fullname || !password) {
      setError('Email, nama lengkap, dan password harus diisi');
      return;
    }

    if (password.length < 6) {
      setError('Password minimal 6 karakter');
      return;
    }

    try {
      // Call API register via AuthContext
      await register({
        email,
        fullname,
        username: username || undefined, // optional
        password
      });

      alert('Akun berhasil dibuat! Anda akan diarahkan ke home.');
      
      // Auto redirect to home after successful registration
      navigate('/', { replace: true });
    } catch (err) {
      setError(err.message || 'Registrasi gagal. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <h1 className="text-4xl md:text-5xl font-playball text-center mb-6 md:mb-8">ArtConnect</h1>

        <div className="bg-amber-50 rounded-3xl shadow-2xl p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 md:mb-3">Selamat Datang!</h2>
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

          <form className="space-y-5 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm md:text-lg font-semibold mb-1 md:mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan Email"
                className="w-full px-4 py-3 rounded-xl bg-white shadow-lg shadow-black/10 border-0 focus:ring-2 focus:ring-gray-400 outline-none placeholder-gray-400"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="fullname" className="block text-sm md:text-lg font-semibold mb-1 md:mb-2">Nama Lengkap</label>
              <input
                type="text"
                id="fullname"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                placeholder="Masukkan Nama Lengkap"
                className="w-full px-4 py-3 rounded-xl bg-white shadow-lg shadow-black/10 border-0 focus:ring-2 focus:ring-gray-400 outline-none placeholder-gray-400"
                required
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm md:text-lg font-semibold mb-1 md:mb-2">Username (Opsional)</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Masukkan Username"
                className="w-full px-4 py-3 rounded-xl bg-white shadow-lg shadow-black/10 border-0 focus:ring-2 focus:ring-gray-400 outline-none placeholder-gray-400"
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm md:text-lg font-semibold mb-1 md:mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan Password"
                className="w-full px-4 py-3 rounded-xl bg-white shadow-lg shadow-black/10 border-0 focus:ring-2 focus:ring-gray-400 outline-none placeholder-gray-400"
                required
                autoComplete="new-password"
              />
            </div>

            <p className="text-xs md:text-sm text-gray-700">
              Dengan membuat akun, Anda menyetujui{' '}
              <a href="#" className="underline hover:text-gray-900">Ketentuan Penggunaan</a>{' '}
              dan{' '}
              <a href="#" className="underline hover:text-gray-900">Kebijakan Privasi</a>.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#8D8078] hover:bg-[#7a6f68] text-white font-bold text-sm md:text-md py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Membuat Akun..." : "Buat Akun"}
            </button>

            <p className="text-center text-gray-700 text-sm md:text-base">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => navigate('/artconnectlogin')}
                className="text-blue-600 underline hover:text-blue-800"
              >
                Login akun
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
