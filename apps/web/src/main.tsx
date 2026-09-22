import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'

// Layouts
import DashboardLayout from './components/layout/DashboardLayout'
import POSLayout from './components/layout/POSLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Products from './pages/products/Products'
import POS from './pages/pos/POS'
import ProfitLossReport from './pages/reports/ProfitLoss'
import Stock from './pages/stock/Stock'
import PurchaseOrders from './pages/purchase/PurchaseOrders'
import SalesHistory from './pages/sales/SalesHistory'
import Schedule from './pages/schedule/Schedule'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Initialize query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Nanti akan diimport secara proper, ini placeholder sementara
import Login from "./pages/auth/Login";
function NotFound() { return <div className="p-4">404 Not Found</div> }

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
        {/* Auth Route */}
        <Route path="/login" element={<Login />} />

        {/* Dashboard Routes (Bisa diakses Owner/Admin) */}
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="stock" element={<Stock />} />
          <Route path="purchase-orders" element={<PurchaseOrders />} />
          <Route path="sales" element={<SalesHistory />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports/profit-loss" element={<ProfitLossReport />} />
        </Route>

        {/* POS Routes (Bisa diakses Kasir) */}
        <Route path="/pos" element={<POSLayout />}>
          <Route index element={<POS />} />
          <Route path="history" element={<div>Riwayat Shift</div>} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
)
