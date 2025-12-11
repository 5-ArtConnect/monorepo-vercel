import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ArtConnectSignup({ onSignup }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!email || !name || !password) {
      alert('Mohon lengkapi semua field');
      return;
    }

    // Simulasi signup sukses
    const signupSuccess = true; // ganti sesuai logika backend
    if (signupSuccess) {
      alert('Akun berhasil dibuat!');
      onSignup?.({ email, name, password }); // kirim data ke parent
      navigate('/artconnectlogin'); // navigasi ke ArtConnectLogin.jsx
    } else {
      alert('Signup gagal, coba lagi!');
    }
  };

  return (
    <div className="min-h-screen bg-[#EDEDED] flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-5xl font-playball text-center mb-8">ArtConnect</h1>

        <div className="bg-amber-50 rounded-3xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Selamat Datang!</h2>
            <p className="text-gray-700">
              Kamu mencari inspirasi dan ekspresi? Mari bergabung dengan komunitas seni kami!
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-lg font-semibold mb-2">Email</label>
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
              <label htmlFor="name" className="block text-lg font-semibold mb-2">Nama Lengkap</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Masukkan Nama"
                className="w-full px-4 py-3 rounded-xl bg-white shadow-lg shadow-black/10 border-0 focus:ring-2 focus:ring-gray-400 outline-none placeholder-gray-400"
                autoComplete="name"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-lg font-semibold mb-2">Password</label>
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

            <p className="text-sm text-gray-700">
              Dengan membuat akun, Anda menyetujui{' '}
              <a href="#" className="underline hover:text-gray-900">Ketentuan Penggunaan</a>{' '}
              dan{' '}
              <a href="#" className="underline hover:text-gray-900">Kebijakan Privasi</a>.
            </p>

            <button
              type="submit"
              className="w-full bg-[#8D8078] hover:bg-[#7a6f68] text-white font-bold text-md py-3 rounded-xl transition-colors"
            >
              Buat Akun
            </button>

            <p className="text-center text-gray-700">
              Sudah punya akun?{' '}
              <button
                type="button"
                onClick={() => navigate('/artconnectlogin')} // navigasi ke ArtConnectLogin.jsx
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
