import { Outlet, Link } from 'react-router-dom';
import { Store, Package, ShoppingCart, CalendarDays, LineChart, Settings } from 'lucide-react';

export default function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <Store className="w-6 h-6 text-blue-600 mr-2" />
          <span className="font-bold text-lg">MonitorToko</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/dashboard" className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <LineChart className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/products" className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <Package className="w-5 h-5 mr-3" /> Produk
          </Link>
          <Link to="/stock" className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <ShoppingCart className="w-5 h-5 mr-3" /> Stok & Restock
          </Link>
          <Link to="/schedule" className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <CalendarDays className="w-5 h-5 mr-3" /> Jadwal Sales
          </Link>
          <Link to="/reports/profit-loss" className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <LineChart className="w-5 h-5 mr-3" /> Untung / Rugi
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link to="/settings" className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <Settings className="w-5 h-5 mr-3" /> Pengaturan
          </Link>
          <Link to="/pos" className="flex items-center px-3 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium justify-center">
            Buka Kasir POS
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="text-slate-500">Search... (Placeholder)</div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">A</div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
