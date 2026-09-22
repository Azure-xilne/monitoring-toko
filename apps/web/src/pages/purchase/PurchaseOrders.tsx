import { Plus, Search, FileText } from 'lucide-react';

const pos = [
  { id: 'PO-0042', supplier: 'PT Sumber Berkah', date: '21 Sep 2026', total: 2500000, status: 'Dikirim' },
  { id: 'PO-0041', supplier: 'CV Makmur Jaya', date: '18 Sep 2026', total: 1800000, status: 'Selesai' },
  { id: 'PO-0040', supplier: 'UD Harapan', date: '15 Sep 2026', total: 950000, status: 'Selesai' },
  { id: 'PO-0039', supplier: 'PT Indo Grosir', date: '12 Sep 2026', total: 4200000, status: 'Draft' },
];

export default function PurchaseOrders() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Purchase Orders (PO)</h1>
          <p className="text-slate-500">Kelola pembelian barang ke supplier.</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
          <Plus className="w-5 h-5 mr-2" /> Buat PO Baru
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-200 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Cari No. PO atau Supplier..." className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm" />
          </div>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">Nomor PO</th>
              <th className="p-4 font-semibold">Supplier</th>
              <th className="p-4 font-semibold">Tanggal</th>
              <th className="p-4 font-semibold text-right">Total Nominal</th>
              <th className="p-4 font-semibold text-center">Status</th>
              <th className="p-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {pos.map(po => (
              <tr key={po.id} className="hover:bg-slate-50">
                <td className="p-4 font-mono font-medium text-blue-600">{po.id}</td>
                <td className="p-4 font-medium">{po.supplier}</td>
                <td className="p-4 text-slate-500">{po.date}</td>
                <td className="p-4 text-right font-medium">Rp {po.total.toLocaleString('id-ID')}</td>
                <td className="p-4 text-center">
                  <span className={`px-2 py-1 rounded-md text-xs font-medium 
                    ${po.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' : 
                      po.status === 'Dikirim' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-700'}`}>
                    {po.status}
                  </span>
                </td>
                <td className="p-4 text-center">
                  <button className="text-slate-400 hover:text-blue-600"><FileText className="w-5 h-5 mx-auto" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
