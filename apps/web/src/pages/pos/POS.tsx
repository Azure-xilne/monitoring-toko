import { useState } from 'react';
import { Search, Tag, Trash2, CreditCard, Wallet, Banknote, PauseCircle, ShoppingCart } from 'lucide-react';

// Data Dummy Sama Seperti di Produk
const products = [
  { id: '1', name: 'Beras Premium 5kg', sku: 'BRS-005', category: 'Sembako', stock: 50, price: 65000 },
  { id: '2', name: 'Minyak Goreng 1L', sku: 'MNY-001', category: 'Sembako', stock: 5, price: 18000 },
  { id: '3', name: 'Gula Pasir 1kg', sku: 'GLA-001', category: 'Sembako', stock: 2, price: 16000 },
  { id: '4', name: 'Tepung Terigu 1kg', sku: 'TPG-001', category: 'Sembako', stock: 30, price: 12000 },
  { id: '5', name: 'Sabun Mandi 400ml', sku: 'SBN-400', category: 'Toiletry', stock: 15, price: 25000 },
  { id: '6', name: 'Kopi Bubuk 200g', sku: 'KPI-200', category: 'Minuman', stock: 45, price: 15000 },
];

const categories = ['Semua', 'Sembako', 'Minuman', 'Snack', 'Toiletry'];

interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  discount: number;
}

export default function POS() {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', name: 'Beras Premium 5kg', price: 65000, qty: 1, discount: 0 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  // Menambahkan Item ke Cart
  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, qty: 1, discount: 0 }];
    });
  };

  // Mengubah Qty
  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta); // minimal 1
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeCartItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Kalkulasi
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const totalDiscount = cart.reduce((sum, item) => sum + item.discount, 0);
  const grandTotal = subtotal - totalDiscount;

  // Filter Product Grid
  const filteredProducts = products.filter(p => {
    const matchCategory = activeCategory === 'Semua' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex h-full w-full bg-slate-50 relative">
      
      {/* AREA KIRI: Grid Produk (65%) */}
      <div className="w-[65%] h-full flex flex-col border-r border-slate-200">
        
        {/* Topbar Kiri: Search & Filter */}
        <div className="p-4 bg-white border-b border-slate-200 shadow-sm shrink-0">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Cari nama produk, SKU, atau scan barcode... (F2)"
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-blue-500 font-medium text-slate-700"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Produk */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <button 
                key={product.id}
                onClick={() => addToCart(product)}
                className="bg-white p-3 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md hover:-translate-y-1 transition-all text-left flex flex-col h-40"
              >
                <div className="w-full h-16 bg-slate-100 rounded-xl mb-3 flex items-center justify-center text-slate-400">
                  <span className="text-xs font-medium">Gambar</span>
                </div>
                <h3 className="font-semibold text-slate-800 text-sm line-clamp-2 leading-tight flex-1">{product.name}</h3>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-bold text-blue-600">Rp {(product.price / 1000).toFixed(0)}k</span>
                  <span className="text-xs font-medium text-slate-400">Stok: {product.stock}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Shortcut Legend */}
        <div className="p-3 bg-white border-t border-slate-200 text-xs text-slate-500 font-medium flex gap-6 shrink-0 justify-center">
          <span><kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 mr-1">F1</kbd> Batal</span>
          <span><kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 mr-1">F2</kbd> Cari</span>
          <span><kbd className="px-2 py-1 bg-slate-100 rounded border border-slate-200 mr-1">F3</kbd> Hold</span>
          <span><kbd className="px-2 py-1 bg-blue-100 text-blue-700 rounded border border-blue-200 mr-1">F10</kbd> Bayar</span>
        </div>
      </div>


      {/* AREA KANAN: Keranjang / Cart (35%) */}
      <div className="w-[35%] h-full flex flex-col bg-white">
        
        {/* Header Keranjang */}
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
          <h2 className="font-bold text-slate-800 flex items-center">
            Keranjang
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{cart.length}</span>
          </h2>
          <button 
            onClick={() => setCart([])}
            className="text-sm font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 px-3 py-1 rounded-md transition-colors"
          >
            Kosongkan
          </button>
        </div>

        {/* List Item di Keranjang */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400">
              <ShoppingCart className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">Keranjang masih kosong</p>
              <p className="text-sm">Scan atau pilih produk di sebelah kiri</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-xl flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-slate-800 text-sm pr-4 leading-tight">{item.name}</h4>
                  <button onClick={() => removeCartItem(item.id)} className="text-slate-300 hover:text-rose-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex justify-between items-end mt-auto">
                  <div className="font-bold text-slate-800">
                    Rp {(item.price * item.qty).toLocaleString('id-ID')}
                  </div>
                  
                  {/* Qty Controls */}
                  <div className="flex items-center bg-slate-100 rounded-lg border border-slate-200 p-0.5">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-slate-600 shadow-sm hover:text-blue-600 font-bold">-</button>
                    <span className="w-8 text-center text-sm font-bold text-slate-800">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center bg-white rounded-md text-slate-600 shadow-sm hover:text-blue-600 font-bold">+</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Ringkasan Pembayaran & Tombol Aksi */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 shrink-0">
          
          <div className="space-y-2 mb-4 text-sm font-medium">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>Rp {subtotal.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-rose-500">
              <span>Diskon</span>
              <span>- Rp {totalDiscount.toLocaleString('id-ID')}</span>
            </div>
            <div className="border-t border-slate-200 border-dashed my-2"></div>
            <div className="flex justify-between text-xl font-bold text-slate-800">
              <span>Total</span>
              <span>Rp {grandTotal.toLocaleString('id-ID')}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <button className="py-2.5 bg-white border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 flex items-center justify-center shadow-sm">
              <Tag className="w-4 h-4 mr-2" /> Diskon
            </button>
            <button className="py-2.5 bg-white border border-slate-300 text-amber-600 rounded-xl font-semibold hover:bg-amber-50 flex items-center justify-center shadow-sm">
              <PauseCircle className="w-4 h-4 mr-2" /> Hold (3)
            </button>
          </div>

          <button 
            disabled={cart.length === 0}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all flex justify-between items-center px-6"
          >
            <span>Bayar Transaksi</span>
            <div className="flex items-center">
              <span className="text-sm bg-blue-700 px-2 py-1 rounded-lg mr-2 font-mono">F10</span>
              <Banknote className="w-6 h-6" />
            </div>
          </button>
          
        </div>
      </div>
      
    </div>
  );
}
