"use client";

import { AdminNav } from "@/components/layout/admin-nav";
import { useState } from "react";

export default function AdminTenantCheckoutPage() {
  const [selectedTenant, setSelectedTenant] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const tenants = [
    {
      name: "Jordan Davies",
      roomId: "RM: 402-B",
      studentId: "ID: 29948",
      checkout: "Today",
      initials: "JD",
      bgColor: "bg-blue-200",
    },
    {
      name: "Amara Lawson",
      roomId: "RM: 115-A",
      studentId: "ID: 30122",
      checkout: "Tomorrow",
      initials: "AL",
      bgColor: "bg-stone-300",
    },
  ];

  const handleCheckout = () => {
    setShowModal(true);
    setTimeout(() => {
      // Auto-close after showing
      setTimeout(() => setShowModal(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <AdminNav active="/admin/maintenance" />

      <main className="mx-auto max-w-2xl px-4 pt-10 pb-32">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-stone-900">Tenant Checkout</h2>
          <p className="mt-2 text-stone-600">
            Processing move-outs for Semester End.
          </p>
        </div>

        {/* Pending Checkouts List */}
        <section className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-widest text-stone-600">
              EXPIRING SESSIONS (3)
            </h3>
            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-[10px] font-bold">
              URGENT
            </span>
          </div>
          <div className="space-y-3">
            {tenants.map((tenant, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedTenant(idx)}
                className={`border rounded-xl p-4 cursor-pointer transition-all ${
                  selectedTenant === idx
                    ? "border-stone-900 bg-white shadow-md"
                    : "border-stone-200 bg-white hover:border-stone-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-lg ${tenant.bgColor} flex items-center justify-center text-stone-900 font-bold`}
                    >
                      {tenant.initials}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900">
                        {tenant.name}
                      </h4>
                      <p className="text-xs text-stone-600 uppercase font-semibold">
                        {tenant.roomId} • {tenant.studentId}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-red-600 font-bold text-xs">
                      {tenant.checkout}
                    </p>
                    <span className="material-symbols-outlined text-stone-900 text-lg">
                      chevron_right
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Checkout Process Area */}
        <div className="space-y-6">
          {/* Checklist Card */}
          <section className="bg-white border border-stone-200 rounded-xl p-6">
            <h3 className="text-xs font-bold uppercase text-stone-900 mb-4 border-b border-stone-200 pb-2">
              CHECKOUT CHECKLIST
            </h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-medium text-stone-900">
                  Keys/Access Cards Returned
                </span>
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded border-stone-300 text-stone-900 focus:ring-stone-900 transition-all cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-medium text-stone-900">
                  Room Inspection Completed
                </span>
                <input
                  type="checkbox"
                  className="w-6 h-6 rounded border-stone-300 text-stone-900 focus:ring-stone-900 transition-all cursor-pointer"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="font-medium text-stone-900">
                  Outstanding Balance Cleared
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                    $0.00
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-6 h-6 rounded border-stone-300 text-stone-900 focus:ring-stone-900 transition-all cursor-pointer"
                  />
                </div>
              </label>
            </div>
          </section>

          {/* Damage/Asset Logging */}
          <section className="bg-white border border-stone-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xs font-bold uppercase text-stone-900">
                DAMAGE & ASSET LOG
              </h3>
              <span className="material-symbols-outlined text-stone-400 cursor-pointer hover:text-stone-900">
                add_a_photo
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-2 uppercase tracking-wider">
                  Report Issue
                </label>
                <select className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none">
                  <option>No damages detected</option>
                  <option>Wall Scuffs / Paint Damage</option>
                  <option>Missing Furniture Item</option>
                  <option>Plumbing/Fixture Issue</option>
                  <option>Cleaning Required (Deep Clean)</option>
                </select>
              </div>
              <textarea
                className="w-full bg-stone-50 border border-stone-200 rounded-lg p-3 text-sm min-h-[100px] focus:ring-2 focus:ring-stone-900 focus:border-stone-900 outline-none"
                placeholder="Additional notes or repair instructions..."
              />
              <div className="flex gap-2 overflow-x-auto pb-2">
                <div className="w-16 h-16 rounded-lg bg-stone-100 border-2 border-dashed border-stone-300 flex items-center justify-center text-stone-400 flex-shrink-0">
                  <span className="material-symbols-outlined">add</span>
                </div>
              </div>
            </div>
          </section>

          {/* Confirm Action */}
          <button
            onClick={handleCheckout}
            className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-stone-800 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined">how_to_reg</span>
            Confirm Checkout
          </button>
          <p className="text-center text-xs text-stone-600 uppercase font-semibold">
            This will set Bed 402-B to{" "}
            <span className="text-emerald-600">AVAILABLE</span>
          </p>
        </div>
      </main>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 z-60 bg-stone-900/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl w-full max-w-sm p-8 text-center shadow-2xl animate-in">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-symbols-outlined text-5xl">
                check_circle
              </span>
            </div>
            <h2 className="text-2xl font-bold text-stone-900 mb-2">
              Checkout Complete
            </h2>
            <p className="text-stone-600 mb-8">
              {tenants[selectedTenant].name} has been officially checked out.
              Room 402-B is now listed as available.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="w-full bg-stone-900 text-white py-4 rounded-xl font-bold hover:bg-stone-800 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
