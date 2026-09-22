import { Search, Receipt, Calendar as CalIcon } from 'lucide-react';

const sales = [
  { id: 'INV-001', time: '14:35', total: 191200, items: 3, method: 'Cash', cashier: 'Ahmad' },
  { id: 'INV-002', time: '15:10', total: 45000, items: 1, method: 'QRIS', cashier: 'Ahmad' },
  { id: 'INV-003', time: '16:05', total: 320000, items: 5, method: 'Transfer', cashier: 'Ahmad' },
  { id: 'INV-004', time: '16:45', total: 12500, items: 1, method: 'Cash', cashier: 'Budi' },
];

export default function SalesHistory() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Riwayat Penjualan</h1>
          <p className="text-slate-500">Daftar transaksi kasir hari ini (21 Sep 2026).</p>
        </div>
        <button className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 font-medium bg-white">
          <CalIcon className="w-5 h-5 mr-2 text-slate-400" /> Pilih Tanggal
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex gap-4 bg-slate-50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari No. Invoice..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm bg-white" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">No. Invoice</th>
              <th className="p-4 font-semibold">Waktu</th>
              <th className="p-4 font-semibold">Kasir</th>
              <th className="p-4 font-semibold text-center">Jml Item</th>
              <th className="p-4 font-semibold">Pembayaran</th>
              <th className="p-4 font-semibold text-right">Total Nominal</th>
              <th className="p-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sales.map(sale => (
              <tr key={sale.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-medium text-slate-700">{sale.id}</td>
                <td className="p-4 text-slate-500">{sale.time}</td>
                <td className="p-4 text-slate-600">{sale.cashier}</td>
                <td className="p-4 text-center">{sale.items}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium border
                    ${sale.method === 'Cash' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                      'bg-blue-50 text-blue-700 border-blue-200'}`}>
                    {sale.method}
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-slate-800">Rp {sale.total.toLocaleString('id-ID')}</td>
                <td className="p-4 text-center">
                  <button className="text-slate-400 hover:text-blue-600" title="Lihat Struk"><Receipt className="w-5 h-5 mx-auto" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
