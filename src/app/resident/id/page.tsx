'use client';

import { useState } from 'react';

export default function ResidentIdPage() {
  const [isBoosted, setIsBoosted] = useState(false);

  return (
    <div className="min-h-screen bg-[#f9f9fc] flex flex-col pb-32 md:pb-0">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white flex justify-between items-center px-4 py-2 border-b border-[#bfc9c6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#b1eee4] flex items-center justify-center overflow-hidden">
            <span className="text-[#00322d] font-bold text-lg">OC</span>
          </div>
          <h1 className="text-lg font-bold text-[#00322d]">OnCampus</h1>
        </div>
        <button className="p-2 hover:bg-[#f3f3f6] transition-colors rounded-full text-[#00322d]">
          <span className="material-symbols-outlined">contactless</span>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
        {/* ID Card Shell */}
        <div className="w-full max-w-sm bg-white border border-[#bfc9c6] rounded-xl overflow-hidden relative">
          {/* Security Header */}
          <div className="px-6 py-4 flex justify-between items-center bg-[#f3f3f6] border-b border-[#bfc9c6]">
            <span className="text-xs font-mono font-bold text-[#3f4947] flex items-center gap-2 tracking-widest">
              <span className="material-symbols-outlined text-base">verified_user</span>
              SECURE ACCESS ID
            </span>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
              <span className="text-xs font-mono font-bold text-[#059669]">ACTIVE</span>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="p-8 flex flex-col items-center justify-center bg-white">
            <div className="bg-gradient-to-br from-[#00322d] to-[#2563EB] p-px rounded-xl">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="w-48 h-48 bg-white border-2 border-[#00322d] flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg width="192" height="192" viewBox="0 0 192 192" className="w-full h-full">
                      <rect width="192" height="192" fill="white" />
                      <rect x="20" y="20" width="52" height="52" fill="black" />
                      <rect x="120" y="20" width="52" height="52" fill="black" />
                      <rect x="20" y="120" width="52" height="52" fill="black" />
                      <rect x="60" y="60" width="72" height="72" fill="black" opacity="0.3" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs font-mono font-bold text-[#3f4947] opacity-60">SCAN AT GATE READER</p>
          </div>

          {/* Resident Details */}
          <div className="px-6 pb-8 bg-white grid grid-cols-3 gap-4">
            {/* Photo */}
            <div className="col-span-1">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#e8e8ea] border border-[#bfc9c6] flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-[#3f4947]">person</span>
              </div>
            </div>
            {/* Info */}
            <div className="col-span-2 flex flex-col justify-center">
              <h2 className="text-lg font-bold text-[#00322d] truncate">--</h2>
              <p className="text-xs text-[#3f4947] mt-0.5 font-mono font-bold">--</p>
            </div>
            {/* Secondary Meta Grid */}
            <div className="col-span-3 grid grid-cols-2 gap-4 mt-2">
              <div className="p-3 bg-[#f3f3f6] rounded-lg border border-[#bfc9c6]">
                <p className="text-xs font-mono font-bold text-[#3f4947] mb-1 uppercase">Assignment</p>
                <p className="text-sm font-bold text-[#00322d]">--</p>
              </div>
              <div className="p-3 bg-[#f3f3f6] rounded-lg border border-[#bfc9c6]">
                <p className="text-xs font-mono font-bold text-[#3f4947] mb-1 uppercase">Validity</p>
                <p className="text-sm font-bold text-[#2563EB]">--</p>
              </div>
            </div>
          </div>

          {/* Footer Security String */}
          <div className="px-6 py-3 bg-[#00322d] text-white text-center">
            <span className="text-xs font-mono font-bold tracking-widest opacity-80">TOKEN: --</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="w-full max-w-sm mt-8 flex flex-col gap-4">
          <button 
            onClick={() => setIsBoosted(!isBoosted)}
            className="w-full bg-[#1961a1] text-white py-4 px-6 rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg hover:bg-opacity-90"
          >
            <span className="material-symbols-outlined">{isBoosted ? 'brightness_low' : 'brightness_high'}</span>
            <span className="font-bold">{isBoosted ? 'Dim Screen' : 'Brightness Boost'}</span>
          </button>
          <button className="w-full bg-white border border-[#707977] text-[#3f4947] py-3 px-6 rounded-full flex items-center justify-center gap-3 transition-all active:scale-95">
            <span className="material-symbols-outlined">refresh</span>
            <span className="text-sm font-bold">Refresh Access Token</span>
          </button>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-white md:hidden shadow-[0_-4px_12px_rgba(0,50,45,0.04)] border-t border-[#bfc9c6]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'local_laundry_service', label: 'Laundry' },
            { icon: 'badge', label: 'My ID', active: true },
            { icon: 'build', label: 'Maintenance' },
            { icon: 'account_balance_wallet', label: 'Wallet' },
          ].map((item, idx) => (
            <div key={idx} className={`flex flex-col items-center justify-center p-2 scale-95 active:scale-90 cursor-pointer ${
              item.active 
                ? 'bg-[#81b9ff] text-[#004980] rounded-xl' 
                : 'text-[#3f4947] hover:text-[#00322d]'
            }`}>
              <span className="material-symbols-outlined" style={item.active ? { fontVariationSettings: "'FILL' 1" } : {}}>{item.icon}</span>
              <span className="text-xs font-mono font-bold mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* Brightness Overlay */}
      <div className={`fixed inset-0 bg-white opacity-0 pointer-events-none z-40 transition-opacity duration-300 ${isBoosted ? 'opacity-30' : 'opacity-0'}`}></div>
    </div>
  );
}
