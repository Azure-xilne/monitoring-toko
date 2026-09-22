import { Store, Palette, Receipt, Bell, Shield, Smartphone } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Pengaturan</h1>
        <p className="text-slate-500">Kelola preferensi toko dan aplikasi Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Sidebar Navigasi Pengaturan */}
        <div className="col-span-1 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-700 rounded-lg font-medium">
            <Store className="w-5 h-5" />
            Profil Toko
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Palette className="w-5 h-5" />
            Tampilan & Tema
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Receipt className="w-5 h-5" />
            Struk & Pajak
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Bell className="w-5 h-5" />
            Notifikasi
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Shield className="w-5 h-5" />
            Keamanan Akun
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-lg font-medium transition-colors">
            <Smartphone className="w-5 h-5" />
            Perangkat POS
          </button>
        </div>

        {/* Konten Pengaturan */}
        <div className="col-span-1 md:col-span-3">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Informasi Toko</h2>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Toko</label>
                <input 
                  type="text" 
                  defaultValue="MonitorToko Retail"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Lengkap</label>
                <textarea 
                  rows={3}
                  defaultValue="Jl. Jend. Sudirman No. 45, Jakarta Selatan"
                  className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nomor Telepon</label>
                  <input 
                    type="text" 
                    defaultValue="0812-3456-7890"
                    className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Mata Uang Default</label>
                  <select className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none bg-white">
                    <option>Rupiah (IDR)</option>
                    <option>US Dollar (USD)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end">
                <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mt-6">
            <h2 className="text-lg font-bold text-slate-800 mb-1">Tampilan (Segera Hadir)</h2>
            <p className="text-sm text-slate-500 mb-4">Fitur ganti tema Terang/Gelap akan segera tersedia di pembaruan berikutnya.</p>
            <div className="flex gap-4">
              <div className="h-20 w-32 bg-slate-100 rounded-lg border-2 border-blue-500 flex items-center justify-center cursor-pointer">
                <span className="text-sm font-medium text-slate-700">Light Mode</span>
              </div>
              <div className="h-20 w-32 bg-slate-800 rounded-lg border border-slate-200 flex items-center justify-center opacity-50 cursor-not-allowed">
                <span className="text-sm font-medium text-white">Dark Mode</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
