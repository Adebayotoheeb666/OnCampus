'use client';

export default function ResidentHomePage() {
  return (
    <div className="min-h-screen bg-[#f9f9fc] pb-24 md:pb-0">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white flex justify-between items-center px-4 md:px-6 py-2 border-b border-[#bfc9c6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#004b44] flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold">OC</span>
          </div>
          <h1 className="text-lg font-bold text-[#00322d]">OnCampus</h1>
        </div>
        <button className="p-2 hover:bg-[#f3f3f6] transition-colors rounded-full text-[#00322d]">
          <span className="material-symbols-outlined">contactless</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Hero Section: Room Showcase */}
        <section className="relative grid grid-cols-1 md:grid-cols-3 gap-3 md:h-[450px]">
          <div className="md:col-span-2 rounded-xl overflow-hidden relative group cursor-pointer h-64 md:h-full bg-[#e8e8ea]">
            <div className="absolute top-4 left-4 bg-[#00322d] text-white text-xs font-mono font-bold px-3 py-1 rounded-full flex items-center gap-2 z-10">
              <span className="w-2 h-2 rounded-full bg-[#059669]"></span>
              Verified Room
            </div>
            <div className="w-full h-full flex items-center justify-center text-[#3f4947]">
              <span className="material-symbols-outlined text-6xl">image</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 h-full">
            <div className="h-1/2 rounded-xl overflow-hidden bg-[#e8e8ea] flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-[#3f4947]">image</span>
            </div>
            <div className="h-1/2 rounded-xl overflow-hidden relative bg-[#e8e8ea] flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-[#3f4947]">image</span>
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white font-bold cursor-pointer hover:bg-black/50 transition-colors">
                + 4 More Photos
              </div>
            </div>
          </div>
        </section>

        {/* Room ID & Quick Stats */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#bfc9c6] pb-4">
          <div>
            <p className="text-xs font-mono font-bold text-[#1961a1] mb-2 tracking-widest">RESIDENT ACCOMMODATION</p>
            <h2 className="text-4xl font-bold text-[#1a1c1e] md:text-5xl">Block B - 204</h2>
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-[#3f4947]">
                <span className="material-symbols-outlined text-sm">location_on</span> Main Campus West
              </span>
              <span className="w-1 h-1 rounded-full bg-[#707977]"></span>
              <span className="text-[#3f4947]">Single Occupancy</span>
            </div>
          </div>
          <button className="bg-[#00322d] text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity active:scale-95 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined">build</span>
            Request Maintenance
          </button>
        </div>

        {/* Bento Layout for Details */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Features Checklist (Left - 8 Cols) */}
          <div className="md:col-span-8 space-y-6">
            <div className="bg-white border border-[#bfc9c6] rounded-xl p-6">
              <h3 className="text-xl font-bold text-[#00322d] mb-6">Room Features & Amenities</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { icon: 'desk', label: 'Furniture', value: 'Study Desk' },
                  { icon: 'cabinet', label: 'Storage', value: 'Wardrobe' },
                  { icon: 'ac_unit', label: 'Climate', value: 'Full AC' },
                  { icon: 'wifi', label: 'Network', value: 'GigaFiber' },
                  { icon: 'bed', label: 'Bedding', value: 'Queen Size' },
                  { icon: 'shield_moon', label: 'Security', value: 'Smart Lock' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-lg bg-[#f3f3f6] border border-transparent hover:border-[#004b44] transition-all">
                    <span className="material-symbols-outlined text-[#00322d]">{feature.icon}</span>
                    <div>
                      <p className="text-xs font-mono font-bold text-[#3f4947]">{feature.label}</p>
                      <p className="text-sm font-bold text-[#00322d]">{feature.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Housing Rules */}
            <div className="bg-white border border-[#bfc9c6] rounded-xl overflow-hidden">
              <div className="bg-[#d2e4ff]/20 p-6">
                <h3 className="text-xl font-bold text-[#00322d] flex items-center gap-2">
                  <span className="material-symbols-outlined">gavel</span>
                  Housing Rules & Guidelines
                </h3>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#D97706]">info</span>
                    <p className="text-sm text-[#3f4947]"><strong>Quiet Hours:</strong> 10:00 PM – 7:00 AM daily. Please respect fellow residents.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#D97706]">info</span>
                    <p className="text-sm text-[#3f4947]"><strong>Guest Policy:</strong> Day visitors allowed until 11:00 PM. No overnight guests without prior approval.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#D97706]">info</span>
                    <p className="text-sm text-[#3f4947]"><strong>Maintenance:</strong> Report any damages within 24 hours to avoid penalty fees.</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="material-symbols-outlined text-[#D97706]">info</span>
                    <p className="text-sm text-[#3f4947]"><strong>Cleanliness:</strong> Bi-weekly room inspections are conducted on Wednesday afternoons.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Cards (Right - 4 Cols) */}
          <div className="md:col-span-4 space-y-6">
            {/* Roommate Info */}
            <div className="bg-white border border-[#bfc9c6] rounded-xl p-6">
              <h3 className="text-xs font-mono font-bold text-[#3f4947] mb-4 tracking-widest">ROOMMATE PROFILE</h3>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#e8e8ea] overflow-hidden border-2 border-[#b1eee4] flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-[#3f4947]">person</span>
                </div>
                <div>
                  <p className="font-bold text-[#00322d]">Alex Johnson</p>
                  <p className="text-sm text-[#3f4947]">BSc. Computer Science</p>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Early Bird', 'Studious', 'Clean'].map((tag, idx) => (
                  <span key={idx} className="bg-[#e8e8ea] px-3 py-1 rounded-full text-xs font-mono font-bold text-[#3f4947]">
                    {tag}
                  </span>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border border-[#707977] text-[#1a1c1e] font-bold rounded-xl hover:bg-[#f3f3f6] transition-colors active:scale-95">
                Message Roommate
              </button>
            </div>

            {/* Digital ID Quick Access */}
            <div className="bg-[#00322d] text-white rounded-xl p-6 relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xs font-mono font-bold text-[#b1eee4] mb-4 tracking-widest">RESIDENT ACCESS</h3>
                <p className="text-lg font-bold mb-4">Digital ID Key</p>
                <div className="bg-white p-4 rounded-lg w-fit mx-auto mb-4">
                  <div className="w-32 h-32 bg-[#e8e8ea] flex items-center justify-center rounded">
                    <span className="material-symbols-outlined text-4xl text-[#3f4947]">qr_code_2</span>
                  </div>
                </div>
                <p className="text-center text-xs font-mono font-bold text-[#b1eee4]">Scan at Block Entrance</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-white md:hidden shadow-[0_-4px_12px_rgba(0,50,45,0.04)] border-t border-[#bfc9c6]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          {[
            { icon: 'home', label: 'Home', active: true },
            { icon: 'local_laundry_service', label: 'Laundry' },
            { icon: 'badge', label: 'ID' },
            { icon: 'build', label: 'Maint.' },
            { icon: 'account_balance_wallet', label: 'Wallet' },
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center p-2 scale-95 active:scale-90 cursor-pointer ${
              item.active 
                ? 'bg-[#81b9ff] text-[#004980] rounded-xl' 
                : 'text-[#3f4947] hover:text-[#00322d]'
            }`}>
              <span className="material-symbols-outlined text-lg" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              <span className="text-xs font-mono font-bold mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
