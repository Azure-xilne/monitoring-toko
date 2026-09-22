import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Image as ImageIcon } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Ambil data asli dari backend menggunakan hook Tanstack Query
  const { data: response, isLoading, error } = useProducts({ search: searchTerm });
  
  // Karena struktur Drizzle join: data = [{ products: {...}, categories: {...} }, ...]
  const products = response?.data || [];

  // Fungsi helper untuk menentukan warna badge stok
  const getStockBadge = (stock: number = 0, minStock: number = 10) => {
    if (stock <= minStock) {
      return <span className="px-2 py-1 bg-rose-100 text-rose-700 rounded-md text-xs font-medium">Habis / Kritis ({stock})</span>;
    }
    if (stock <= minStock * 2) {
      return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium">Rendah ({stock})</span>;
    }
    return <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-medium">Aman ({stock})</span>;
  };

  return (
    <div className="space-y-6 flex flex-col h-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Daftar Produk</h1>
          <p className="text-slate-500">Kelola semua inventaris produk toko Anda.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors">
          <Plus className="w-5 h-5 mr-2" /> Tambah Produk
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col flex-1 overflow-hidden">
        
        {/* Toolbar: Search & Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-3 justify-between items-center bg-slate-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Cari nama produk atau SKU..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center px-3 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium w-full sm:w-auto justify-center">
              <Filter className="w-4 h-4 mr-2" /> Kategori
            </button>
            <button className="flex items-center px-3 py-2 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 text-sm font-medium w-full sm:w-auto justify-center">
              <Filter className="w-4 h-4 mr-2" /> Status Stok
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
                <th className="p-4 font-semibold w-12 text-center">
                  <input type="checkbox" className="rounded border-slate-300" />
                </th>
                <th className="p-4 font-semibold w-16">Foto</th>
                <th className="p-4 font-semibold">Nama Produk</th>
                <th className="p-4 font-semibold">SKU</th>
                <th className="p-4 font-semibold">Kategori</th>
                <th className="p-4 font-semibold">Status Stok</th>
                <th className="p-4 font-semibold text-right">Harga Jual</th>
                <th className="p-4 font-semibold text-center w-16">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && <tr><td colSpan={8} className="p-8 text-center text-slate-500">Memuat data...</td></tr>}
              {error && <tr><td colSpan={8} className="p-8 text-center text-rose-500">Gagal memuat produk.</td></tr>}
              {!isLoading && products.map((item: any) => (
                <tr key={item.products.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 text-center">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </td>
                  <td className="p-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-slate-800">{item.products.name}</td>
                  <td className="p-4 text-slate-500 font-mono text-sm">{item.products.sku}</td>
                  <td className="p-4 text-slate-600">{item.categories?.name || '-'}</td>
                  <td className="p-4">{getStockBadge(0, 10)} {/* Ganti dengan data stok asli dari API inventory nanti */}</td>
                  <td className="p-4 text-right font-medium text-slate-800">
                    Rp {item.products.price.toLocaleString('id-ID')}
                  </td>
                  <td className="p-4 text-center">
                    <button className="p-2 text-slate-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
              
              {!isLoading && products.length === 0 && (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-500">
                    Produk tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 mt-auto bg-slate-50/50">
          <div>Menampilkan {products.length} dari {response?.pagination?.total || 0} produk</div>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-white disabled:opacity-50" disabled>Sebelumnya</button>
            <button className="px-3 py-1 border border-slate-300 rounded-md bg-blue-600 text-white font-medium">1</button>
            <button className="px-3 py-1 border border-slate-300 rounded-md hover:bg-white disabled:opacity-50" disabled>Selanjutnya</button>
          </div>
        </div>
        
      </div>
    </div>
  );
}
