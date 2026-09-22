import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Store, Package, ShoppingCart, CalendarDays, LineChart, Settings, Menu, X } from 'lucide-react';

export default function DashboardLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30
        w-64 bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-200 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-slate-200 justify-between md:justify-start">
          <div className="flex items-center">
            <Store className="w-6 h-6 text-blue-600 mr-2" />
            <span className="font-bold text-lg">MonitorToko</span>
          </div>
          <button className="md:hidden text-slate-500" onClick={() => setIsMobileMenuOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <LineChart className="w-5 h-5 mr-3" /> Dashboard
          </Link>
          <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <Package className="w-5 h-5 mr-3" /> Produk
          </Link>
          <Link to="/stock" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <ShoppingCart className="w-5 h-5 mr-3" /> Stok & Restock
          </Link>
          <Link to="/schedule" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <CalendarDays className="w-5 h-5 mr-3" /> Jadwal Sales
          </Link>
          <Link to="/reports/profit-loss" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <LineChart className="w-5 h-5 mr-3" /> Untung / Rugi
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200">
          <Link to="/settings" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 text-slate-700 rounded-md hover:bg-slate-100 font-medium">
            <Settings className="w-5 h-5 mr-3" /> Pengaturan
          </Link>
          <Link to="/pos" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center px-3 py-2 mt-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 font-medium justify-center">
            Buka Kasir POS
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <button 
              className="mr-4 md:hidden text-slate-600"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="text-slate-500 hidden sm:block">Search... (Placeholder)</div>
          </div>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-medium">A</div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
