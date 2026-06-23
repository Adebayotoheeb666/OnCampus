'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ResidentDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-[#f9f9fc]">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-50 bg-white flex justify-between items-center px-4 md:px-6 py-2 border-b border-[#bfc9c6]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#004b44] flex items-center justify-center overflow-hidden">
            <span className="text-white font-bold text-lg">OC</span>
          </div>
          <h1 className="text-xl font-bold text-[#00322d]">OnCampus</h1>
        </div>
        <button className="p-2 hover:bg-[#f3f3f6] transition-colors rounded-full">
          <span className="material-symbols-outlined">contactless</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Welcome Greeting */}
        <section className="mb-8">
          <div className="flex items-end gap-2 mb-2">
            <h2 className="text-4xl font-bold text-[#00322d]">Welcome back, Tunde</h2>
            <span className="text-3xl animate-bounce">👋</span>
          </div>
          <p className="text-lg text-[#3f4947]">Your residence dashboard is up to date.</p>
        </section>

        {/* Status Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {/* Room Status Card */}
          <div className="col-span-1 bg-white border border-[#bfc9c6] p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-[#b1eee4]">
                <span className="material-symbols-outlined text-[#00322d]">hotel</span>
              </div>
              <span className="font-xs px-2 py-1 bg-[#059669]/10 text-[#059669] rounded-full text-xs">ACTIVE</span>
            </div>
            <div>
              <p className="text-xs text-[#3f4947] mb-1 font-mono font-bold tracking-wide">ROOM STATUS</p>
              <h3 className="text-xl font-bold text-[#00322d]">Unit 402-B</h3>
              <p className="text-sm text-[#3f4947] mt-2">South Wing Residence</p>
            </div>
          </div>

          {/* Rent Balance Card */}
          <div className="col-span-1 bg-white border border-[#bfc9c6] p-6 rounded-xl flex flex-col justify-between hover:shadow-lg transition-all duration-300">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-full bg-[#d2e4ff]">
                <span className="material-symbols-outlined text-[#1961a1]">payments</span>
              </div>
              <span className="font-xs px-2 py-1 bg-[#2563EB]/10 text-[#2563EB] rounded-full text-xs">PAID</span>
            </div>
            <div>
              <p className="text-xs text-[#3f4947] mb-1 font-mono font-bold tracking-wide">RENT BALANCE</p>
              <h3 className="text-xl font-bold text-[#00322d]">₦0.00</h3>
              <p className="text-sm text-[#3f4947] mt-2">Next due: Oct 1st</p>
            </div>
          </div>

          {/* Announcements Card */}
          <div className="col-span-2 bg-[#00322d] text-white p-6 rounded-xl relative overflow-hidden group">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined">campaign</span>
                  <span className="text-xs font-mono font-bold tracking-widest opacity-80">RECENT ANNOUNCEMENTS</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Weekend Maintenance Notice</h3>
                <p className="text-sm opacity-90 max-w-md">Hot water system upgrade scheduled for Saturday, 8 AM - 12 PM in South Wing.</p>
              </div>
              <button className="mt-4 flex items-center gap-2 text-xs font-mono font-bold group-hover:underline">
                VIEW ALL UPDATES <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <span className="material-symbols-outlined text-[160px]">notifications_active</span>
            </div>
          </div>
        </section>

        {/* Central Navigation Hub */}
        <section className="mb-12">
          <h3 className="text-xs font-mono font-bold text-[#3f4947] mb-6 tracking-widest">RESIDENT SERVICES</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: 'badge', label: 'Resident ID', href: '/resident/id' },
              { icon: 'build', label: 'Maintenance', href: '/resident/maintenance' },
              { icon: 'local_laundry_service', label: 'Laundry Hub', href: '/resident/laundry' },
              { icon: 'group_add', label: 'Visitor Pass', href: '/resident/visitors' },
            ].map((service, idx) => (
              <Link key={idx} href={service.href}>
                <div className="bg-white border border-[#bfc9c6] p-4 rounded-xl flex flex-col items-center text-center cursor-pointer hover:bg-[#f3f3f6] transition-colors group active:scale-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-[#e2e2e5] flex items-center justify-center mb-3 group-hover:bg-[#00322d] group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined">{service.icon}</span>
                  </div>
                  <span className="text-sm font-bold text-[#00322d]">{service.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-white md:hidden shadow-[0_-4px_12px_rgba(0,50,45,0.04)] border-t border-[#bfc9c6]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          {[
            { icon: 'home', label: 'Home', active: true },
            { icon: 'local_laundry_service', label: 'Laundry', active: false },
            { icon: 'badge', label: 'My ID', active: false },
            { icon: 'build', label: 'Maintenance', active: false },
            { icon: 'account_balance_wallet', label: 'Wallet', active: false },
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
    </div>
  );
}
