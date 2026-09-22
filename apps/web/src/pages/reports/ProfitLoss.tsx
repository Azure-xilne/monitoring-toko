import { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Dummy Data untuk Chart
const profitData = [
  { date: '1 Sep', revenue: 4200000, cogs: 2800000, profit: 1400000 },
  { date: '5 Sep', revenue: 3800000, cogs: 2600000, profit: 1200000 },
  { date: '10 Sep', revenue: 5100000, cogs: 3300000, profit: 1800000 },
  { date: '15 Sep', revenue: 4600000, cogs: 3000000, profit: 1600000 },
  { date: '20 Sep', revenue: 5500000, cogs: 3500000, profit: 2000000 },
  { date: '25 Sep', revenue: 6200000, cogs: 4000000, profit: 2200000 },
  { date: '30 Sep', revenue: 5800000, cogs: 3700000, profit: 2100000 },
];

const categoryData = [
  { name: 'Sembako', value: 45 },
  { name: 'Minuman', value: 20 },
  { name: 'Snack', value: 15 },
  { name: 'Toiletry', value: 12 },
  { name: 'Lainnya', value: 8 },
];
const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#8B5CF6', '#64748B'];

export default function ProfitLossReport() {
  const [period, setPeriod] = useState('September 2026');

  // Custom format harga untuk chart Y-Axis
  const formatYAxis = (tickItem: number) => `Rp ${tickItem / 1000000}M`;

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Laporan Untung / Rugi</h1>
          <p className="text-slate-500">Analisis pendapatan, Harga Pokok Penjualan (HPP), dan Laba Bersih.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden text-sm font-medium">
            <button className="px-4 py-2 bg-slate-100 text-slate-700">Harian</button>
            <button className="px-4 py-2 hover:bg-slate-50 text-slate-600 border-l border-slate-200">Bulanan</button>
          </div>
          <button className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium">
            <Calendar className="w-4 h-4 mr-2 text-slate-500" /> {period}
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-sm">
            <Download className="w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1 flex items-center">
            <DollarSign className="w-4 h-4 mr-1 text-slate-400" /> Revenue (Pendapatan)
          </p>
          <h3 className="text-2xl font-bold text-slate-800">Rp 45.2M</h3>
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +12% dari bulan lalu
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1 flex items-center">
            <Wallet className="w-4 h-4 mr-1 text-slate-400" /> HPP (Modal)
          </p>
          <h3 className="text-2xl font-bold text-slate-800">Rp 32.1M</h3>
          <p className="text-xs font-medium text-rose-600 mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +8% dari bulan lalu
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-sm font-medium text-slate-500 mb-1">Laba Bersih</p>
          <h3 className="text-2xl font-bold text-emerald-600">Rp 13.1M</h3>
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +18% dari bulan lalu
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Profit Margin</p>
          <h3 className="text-2xl font-bold text-slate-800">29.0%</h3>
          <p className="text-xs font-medium text-emerald-600 mt-2 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> +2.5% dari bulan lalu
          </p>
        </div>
      </div>

      {/* Main Chart: Tren Untung Rugi */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-800">Tren Pendapatan, Modal, & Laba</h2>
          <p className="text-sm text-slate-500">Pergerakan finansial sepanjang bulan ini.</p>
        </div>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitData} margin={{ top: 5, right: 30, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#64748B', fontSize: 12 }} dy={10} />
              <YAxis tickLine={false} axisLine={false} tickFormatter={formatYAxis} tick={{ fill: '#64748B', fontSize: 12 }} />
              <Tooltip 
                formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`}
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Legend verticalAlign="top" height={36} iconType="circle" />
              <Line type="monotone" dataKey="revenue" name="Revenue (Pendapatan)" stroke="#2563EB" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="cogs" name="HPP (Modal)" stroke="#F43F5E" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              <Line type="monotone" dataKey="profit" name="Laba Bersih" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid Bawah: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Revenue vs HPP Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Perbandingan Revenue vs Modal</h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitData.slice(0, 4)} margin={{ top: 0, right: 0, bottom: 0, left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#64748B' }} dy={10} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={formatYAxis} tick={{ fontSize: 12, fill: '#64748B' }} />
                <Tooltip formatter={(value: number) => `Rp ${value.toLocaleString('id-ID')}`} cursor={{ fill: '#F1F5F9' }} />
                <Legend iconType="circle" />
                <Bar dataKey="revenue" name="Revenue" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="cogs" name="Modal (HPP)" fill="#94A3B8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart Komposisi Kategori */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <h2 className="text-lg font-bold text-slate-800 mb-2">Komposisi Penjualan</h2>
          <p className="text-sm text-slate-500 mb-4">Penyumbang revenue terbesar berdasarkan kategori produk.</p>
          <div className="h-56 w-full flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
