import { Outlet, Link } from 'react-router-dom';
import { ArrowLeft, Lock } from 'lucide-react';

export default function POSLayout() {
  return (
    <div className="flex flex-col h-screen bg-slate-100 overflow-hidden">
      {/* POS Topbar Minimalist */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center">
          <Link to="/dashboard" className="mr-4 text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="font-bold text-lg text-blue-600 mr-4">MonitorToko POS</span>
          <span className="text-sm font-medium text-slate-500 px-3 py-1 bg-slate-100 rounded-full">
            Kasir: Ahmad | Shift: 08:00
          </span>
        </div>
        
        <div className="flex items-center">
          <div className="text-sm font-mono font-medium text-slate-600 mr-4">
            {new Date().toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
          </div>
          <button className="flex items-center px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
            <Lock className="w-4 h-4 mr-2" /> Tutup Kasir
          </button>
        </div>
      </header>

      {/* POS Content Outlet (Fullscreen tanpa scrollbar global) */}
      <main className="flex-1 overflow-hidden relative">
        <Outlet />
      </main>
    </div>
  );
}
