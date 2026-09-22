import { 
  DollarSign, 
  ShoppingCart, 
  Package, 
  AlertTriangle,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Dummy data untuk chart penjualan 7 hari terakhir
const salesData = [
  { name: 'Senin', total: 1200000 },
  { name: 'Selasa', total: 1800000 },
  { name: 'Rabu', total: 1500000 },
  { name: 'Kamis', total: 2100000 },
  { name: 'Jumat', total: 2800000 },
  { name: 'Sabtu', total: 3200000 },
  { name: 'Minggu', total: 2900000 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Selamat Pagi, Ahmad 👋</h1>
        <p className="text-slate-500">Berikut adalah ringkasan toko Anda hari ini, 21 Sep 2026.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Revenue */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Revenue Hari Ini</p>
            <h3 className="text-xl font-bold text-slate-800">Rp 3.200.000</h3>
          </div>
        </div>
        
        {/* Card 2: Transaksi */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-100 text-emerald-600 rounded-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Transaksi Hari Ini</p>
            <h3 className="text-xl font-bold text-slate-800">24</h3>
          </div>
        </div>

        {/* Card 3: Total Produk */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Produk</p>
            <h3 className="text-xl font-bold text-slate-800">156</h3>
          </div>
        </div>

        {/* Card 4: Peringatan Stok */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-100 text-rose-600 rounded-lg">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Stok Rendah</p>
            <h3 className="text-xl font-bold text-rose-600">8 Item</h3>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Kolom Kiri: Chart (2/3 lebar) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Tren Penjualan (7 Hari Terakhir)</h2>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  tickFormatter={(value) => `Rp${value / 1000000}M`}
                />
                <Tooltip 
                  formatter={(value: number) => [`Rp ${value.toLocaleString('id-ID')}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#2563EB" 
                  strokeWidth={3} 
                  dot={{ r: 4, strokeWidth: 2, fill: '#FFFFFF' }} 
                  activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2, fill: '#FFFFFF' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Kolom Kanan: Jadwal & Peringatan Stok (1/3 lebar) */}
        <div className="space-y-6">
          
          {/* Jadwal Hari Ini */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-bold text-slate-800">Jadwal Hari Ini</h2>
              <button className="text-blue-600 text-sm font-medium hover:underline">Lihat Semua</button>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Visit Toko Maju</h4>
                  <p className="text-xs text-slate-500">09:00 - 11:00 • Oleh Ahmad</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center shrink-0 mr-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Meeting Supplier Gula</h4>
                  <p className="text-xs text-slate-500">13:00 - 14:00 • Oleh Budi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stok Rendah */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-md font-bold text-slate-800">Stok Perlu Restock</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Beras Premium 5kg</h4>
                  <p className="text-xs text-rose-600 font-medium mt-1">Sisa: 3 pcs (Min: 10)</p>
                </div>
                <button className="p-1 text-slate-400 hover:text-blue-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Minyak Goreng 1L</h4>
                  <p className="text-xs text-amber-600 font-medium mt-1">Sisa: 5 pcs (Min: 10)</p>
                </div>
                <button className="p-1 text-slate-400 hover:text-blue-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div>
                  <h4 className="text-sm font-semibold text-slate-800">Gula Pasir 1kg</h4>
                  <p className="text-xs text-rose-600 font-medium mt-1">Sisa: 2 pcs (Min: 15)</p>
                </div>
                <button className="p-1 text-slate-400 hover:text-blue-600">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            <button className="w-full mt-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
              Lihat Semua Restock
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
