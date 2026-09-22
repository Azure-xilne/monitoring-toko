import { AlertTriangle, Package, TrendingDown, ArrowRight } from 'lucide-react';

const lowStockItems = [
  { id: 1, name: 'Gula Pasir 1kg', stock: 2, min: 15, status: 'Habis' },
  { id: 2, name: 'Minyak Goreng 1L', stock: 5, min: 10, status: 'Rendah' },
  { id: 3, name: 'Sabun Mandi', stock: 3, min: 10, status: 'Rendah' },
];

export default function Stock() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Overview Stok</h1>
        <p className="text-slate-500">Pantau pergerakan dan peringatan stok barang.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <p className="text-sm font-medium text-slate-500">Total Produk</p>
          <h3 className="text-2xl font-bold text-slate-800 mt-1">156</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-emerald-200 bg-emerald-50/30">
          <p className="text-sm font-medium text-emerald-700">Stok Aman</p>
          <h3 className="text-2xl font-bold text-emerald-700 mt-1">120</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-amber-200 bg-amber-50/30">
          <p className="text-sm font-medium text-amber-700">Stok Rendah</p>
          <h3 className="text-2xl font-bold text-amber-700 mt-1">28</h3>
        </div>
        <div className="bg-white p-5 rounded-xl border border-rose-200 bg-rose-50/30">
          <p className="text-sm font-medium text-rose-700">Stok Habis / Kritis</p>
          <h3 className="text-2xl font-bold text-rose-700 mt-1">8</h3>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-rose-50/50">
          <h2 className="font-bold text-rose-700 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" /> Peringatan Restock
          </h2>
          <button className="text-sm font-medium text-blue-600 hover:underline">Buat PO Baru</button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">Nama Produk</th>
              <th className="p-4 font-semibold">Stok Saat Ini</th>
              <th className="p-4 font-semibold">Batas Minimum</th>
              <th className="p-4 font-semibold">Status</th>
              <th className="p-4 font-semibold text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {lowStockItems.map(item => (
              <tr key={item.id}>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4 font-bold text-rose-600">{item.stock}</td>
                <td className="p-4 text-slate-500">{item.min}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${item.status === 'Habis' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'}`}>
                    {item.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-sm bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg font-medium hover:bg-blue-100">Restock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
