import { Plus, RefreshCcw, MapPin, Clock } from 'lucide-react';

const events = [
  { id: 1, title: 'Visit Toko Maju', type: 'Visit', time: '09:00 - 11:00', location: 'Bandung Tengah', pic: 'Ahmad' },
  { id: 2, title: 'Meeting Supplier Gula', type: 'Meeting', time: '13:00 - 14:00', location: 'Kantor Pusat', pic: 'Budi' },
  { id: 3, title: 'Follow Up CV Makmur', type: 'Follow Up', time: '15:30 - 16:30', location: 'Online / Zoom', pic: 'Citra' },
];

export default function Schedule() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Jadwal Sales</h1>
          <p className="text-slate-500">Terintegrasi dengan Google Calendar.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center px-4 py-2 border border-slate-300 text-slate-700 bg-white rounded-lg hover:bg-slate-50 font-medium">
            <RefreshCcw className="w-4 h-4 mr-2" /> Sync Google Calendar
          </button>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
            <Plus className="w-5 h-5 mr-2" /> Jadwal Baru
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Kolom Kiri: Mini Calendar (Placeholder) */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm text-center">
            <h3 className="font-bold text-lg mb-4">September 2026</h3>
            <div className="grid grid-cols-7 gap-2 text-sm text-slate-500 font-medium mb-2">
              <div>S</div><div>S</div><div>R</div><div>K</div><div>J</div><div>S</div><div>M</div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-sm">
              <div className="p-2 text-slate-300">30</div><div className="p-2 text-slate-300">31</div>
              <div className="p-2">1</div><div className="p-2">2</div><div className="p-2">3</div>
              <div className="p-2">4</div><div className="p-2">5</div><div className="p-2">6</div>
              <div className="p-2">7</div><div className="p-2">8</div><div className="p-2">9</div>
              <div className="p-2">10</div><div className="p-2">11</div><div className="p-2">12</div>
              <div className="p-2">13</div><div className="p-2">14</div><div className="p-2">15</div>
              <div className="p-2">16</div><div className="p-2">17</div><div className="p-2">18</div>
              <div className="p-2">19</div><div className="p-2">20</div>
              <div className="p-2 bg-blue-600 text-white rounded-full font-bold">21</div>
              <div className="p-2">22</div><div className="p-2">23</div><div className="p-2">24</div>
              <div className="p-2">25</div><div className="p-2">26</div><div className="p-2">27</div>
              <div className="p-2">28</div><div className="p-2">29</div><div className="p-2">30</div>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Event List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-2">
            <div className="p-4 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-800">Senin, 21 September 2026</h2>
            </div>
            <div className="p-2 space-y-2">
              {events.map(event => (
                <div key={event.id} className="flex bg-slate-50 rounded-lg p-4 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className={`w-2 h-full min-h-[4rem] rounded-full mr-4 shrink-0
                    ${event.type === 'Visit' ? 'bg-blue-500' : event.type === 'Meeting' ? 'bg-emerald-500' : 'bg-amber-500'}
                  `}></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-lg">{event.title}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-2 space-x-4">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> {event.time}</span>
                      <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {event.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="px-2 py-1 bg-white border border-slate-200 text-xs font-bold rounded-md text-slate-600">
                      PIC: {event.pic}
                    </span>
                    <button className="text-sm font-medium text-blue-600 hover:underline">Detail</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
