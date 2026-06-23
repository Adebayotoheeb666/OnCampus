'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState('active');

  const activeRequests = [
    {
      type: 'PLUMBING',
      title: 'Leaking Faucet',
      status: 'IN PROGRESS',
      description: 'The bathroom sink faucet is dripping constantly, even when tightly shut. Increasing water waste since yesterday.',
      date: 'OCT 24, 2023',
    },
    {
      type: 'ELECTRICAL',
      title: 'Desk Lamp Flicker',
      status: 'PENDING',
      description: 'Main desk light flickers every few minutes. Tried changing the bulb but the issue persists. Likely socket issue.',
      date: 'OCT 26, 2023',
    },
  ];

  const resolvedRequests = [
    {
      type: 'FURNITURE',
      title: 'Loose Chair Leg',
      status: 'RESOLVED',
      description: 'Left front leg of the study chair was wobbling significantly. Fixed by technical team.',
      date: 'OCT 12, 2023',
    },
  ];

  const getStatusColor = (status: string) => {
    if (status === 'IN PROGRESS') return 'bg-[#D97706]/10 text-[#D97706] border-[#D97706]/20';
    if (status === 'PENDING') return 'bg-[#475569]/10 text-[#475569] border-[#475569]/20';
    return 'bg-[#059669]/10 text-[#059669] border-[#059669]/20';
  };

  const getTypeColor = (type: string) => {
    if (type === 'PLUMBING') return 'bg-[#dee4e2] text-[#171d1c]';
    if (type === 'ELECTRICAL') return 'bg-[#d2e4ff] text-[#001c37]';
    return 'bg-[#e2e2e5] text-[#3f4947]';
  };

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

      <main className="max-w-5xl mx-auto px-4 md:px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00322d] mb-2">Maintenance</h2>
          <p className="text-[#3f4947]">Track your service requests for Room 402B.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-8 border-b border-[#bfc9c6] mb-6 overflow-x-auto">
          {['active', 'resolved'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-1 text-xs font-mono font-bold tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'text-[#00322d] border-b-[3px] border-[#00322d]'
                  : 'text-[#3f4947] hover:text-[#00322d]'
              }`}
            >
              {tab === 'active' ? 'ACTIVE' : 'RESOLVED'}
            </button>
          ))}
        </div>

        {/* Requests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {(activeTab === 'active' ? activeRequests : resolvedRequests).map((request, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#bfc9c6] p-6 rounded-xl flex flex-col gap-4 group hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full inline-block w-fit ${getTypeColor(request.type)}`}>
                    {request.type}
                  </span>
                  <h3 className="text-lg font-bold text-[#00322d] mt-1">{request.title}</h3>
                </div>
                <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${getStatusColor(request.status)}`}>
                  {request.status}
                </span>
              </div>
              <p className="text-[#3f4947] text-sm line-clamp-2">{request.description}</p>
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-[#bfc9c6]">
                <span className="material-symbols-outlined text-base text-[#3f4947]">calendar_today</span>
                <span className="text-xs font-mono font-bold text-[#3f4947]">SUBMITTED: {request.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FAB: New Maintenance Request */}
      <Link href="/resident/maintenance/new">
        <button className="fixed bottom-24 right-6 md:right-10 w-16 h-16 bg-[#00322d] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-50 group">
          <span className="material-symbols-outlined text-2xl">add</span>
          <span className="absolute right-20 bg-[#00322d] text-white px-4 py-2 rounded-xl text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            NEW REQUEST
          </span>
        </button>
      </Link>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full z-50 bg-white md:hidden shadow-[0_-4px_12px_rgba(0,50,45,0.04)] border-t border-[#bfc9c6]">
        <div className="flex justify-around items-center px-4 pb-safe pt-2">
          {[
            { icon: 'home', label: 'Home' },
            { icon: 'local_laundry_service', label: 'Laundry' },
            { icon: 'build', label: 'Maintenance', active: true },
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
    </div>
  );
}
