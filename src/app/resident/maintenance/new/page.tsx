'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function NewMaintenancePage() {
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    urgency: 'normal',
  });

  const categories = [
    { value: 'plumbing', label: 'Plumbing', icon: 'plumbing' },
    { value: 'electrical', label: 'Electrical', icon: 'electrical_services' },
    { value: 'furniture', label: 'Furniture', icon: 'chair' },
    { value: 'hvac', label: 'HVAC/Climate', icon: 'ac_unit' },
    { value: 'doors', label: 'Doors & Locks', icon: 'door_front' },
    { value: 'other', label: 'Other', icon: 'help' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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

      <main className="max-w-2xl mx-auto px-4 md:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/resident/maintenance" className="text-[#1961a1] font-bold flex items-center gap-1 mb-4 hover:underline">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Maintenance
          </Link>
          <h2 className="text-3xl md:text-4xl font-bold text-[#00322d] mb-2">Submit Maintenance Request</h2>
          <p className="text-[#3f4947]">Describe the issue and we&apos;ll dispatch the appropriate service team.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Category Selection */}
          <div className="space-y-4">
            <label className="text-xs font-mono font-bold text-[#3f4947] tracking-widest">SELECT CATEGORY *</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: cat.value })}
                  className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                    formData.category === cat.value
                      ? 'border-[#00322d] bg-[#f3f3f6]'
                      : 'border-[#bfc9c6] hover:border-[#00322d] bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-2xl">{cat.icon}</span>
                  <span className="text-sm font-bold text-[#00322d]">{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#3f4947] tracking-widest block">BRIEF TITLE *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Leaking faucet in bathroom"
              className="w-full px-4 py-3 border border-[#bfc9c6] rounded-xl focus:outline-none focus:border-[#00322d] focus:ring-2 focus:ring-[#00322d]/20 transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-mono font-bold text-[#3f4947] tracking-widest block">DETAILED DESCRIPTION *</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Provide as much detail as possible to help our team diagnose and fix the issue quickly."
              rows={6}
              className="w-full px-4 py-3 border border-[#bfc9c6] rounded-xl focus:outline-none focus:border-[#00322d] focus:ring-2 focus:ring-[#00322d]/20 transition-all resize-none"
            />
          </div>

          {/* Urgency */}
          <div className="space-y-4">
            <label className="text-xs font-mono font-bold text-[#3f4947] tracking-widest block">URGENCY LEVEL</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'low', label: 'Low', color: 'bg-blue-50 border-blue-200' },
                { value: 'normal', label: 'Normal', color: 'bg-gray-50 border-gray-200' },
                { value: 'high', label: 'High', color: 'bg-orange-50 border-orange-200' },
              ].map((level) => (
                <button
                  key={level.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, urgency: level.value })}
                  className={`p-4 rounded-xl border-2 transition-all font-bold ${
                    formData.urgency === level.value
                      ? `${level.color} border-current`
                      : `border-[#bfc9c6] bg-white hover:border-[#00322d]`
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[#bfc9c6]">
            <button
              type="submit"
              className="flex-1 bg-[#00322d] text-white py-4 px-6 rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">send</span>
              Submit Request
            </button>
            <Link href="/resident/maintenance" className="flex-1">
              <button
                type="button"
                className="w-full bg-white border border-[#707977] text-[#00322d] py-4 px-6 rounded-full font-bold hover:bg-[#f3f3f6] transition-all"
              >
                Cancel
              </button>
            </Link>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <span className="material-symbols-outlined text-[#2563EB] flex-shrink-0">info</span>
            <div>
              <p className="font-bold text-sm text-[#00322d]">Expected Response</p>
              <p className="text-xs text-[#3f4947] mt-1">Our maintenance team will review your request within 24 hours and contact you with an estimated completion time.</p>
            </div>
          </div>
        </form>
      </main>

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
