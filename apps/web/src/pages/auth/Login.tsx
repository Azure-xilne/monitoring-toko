import { useState } from 'react';
import { authClient } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';
import { Store, Loader2, AlertCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('admin@toko.com');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        setError(error.message || 'Login gagal, periksa email & password.');
        setLoading(false);
        return;
      }

      // Login berhasil, arahkan ke dashboard
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Terjadi kesalahan sistem.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 text-center bg-blue-600">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Store className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">MonitorToko</h1>
          <p className="text-blue-100 text-sm">Sistem Manajemen Retail Pintar</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Masuk ke Akun Anda</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-start gap-3 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="admin@toko.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                placeholder="password123"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Login Sekarang'}
            </button>
          </form>

          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-600 text-center">
            <p className="font-semibold mb-1">Data Demo (Akun Admin)</p>
            <p>Email: <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-slate-800">admin@toko.com</span></p>
            <p>Password: <span className="font-mono bg-slate-200 px-1 py-0.5 rounded text-slate-800">password123</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
