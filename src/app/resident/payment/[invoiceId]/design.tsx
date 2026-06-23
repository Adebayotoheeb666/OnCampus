'use client';

import { useState } from 'react';

export function InvoicePaymentPage() {
  const [selectedPayment, setSelectedPayment] = useState('wallet');

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)]">
      {/* TopAppBar */}
      <header className="bg-[var(--surface)] w-full top-0 sticky z-40 border-b border-[var(--outline-variant)]">
        <div className="flex justify-between items-center px-4 md:px-6 py-2 w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary-container)] flex items-center justify-center overflow-hidden">
              <span className="material-symbols-outlined">school</span>
            </div>
            <span className="text-xl font-extrabold text-[var(--primary)]">OnCampus</span>
          </div>
          <button className="hover:bg-[var(--surface-container-low)] transition-colors p-2 rounded-full">
            <span className="material-symbols-outlined text-[var(--primary)]">contactless</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center py-8 px-4 md:px-6">
        <div className="w-full max-w-2xl space-y-6">
          {/* Back Action */}
          <div className="flex items-center gap-2 cursor-pointer text-[var(--on-surface-variant)] hover:text-[var(--primary)] transition-colors group">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="text-xs font-mono uppercase">Return to Wallet</span>
          </div>

          {/* Page Headline */}
          <div className="space-y-1">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--primary)]">Invoice Payment</h1>
            <p className="text-[var(--on-surface-variant)]">Review your invoice details and select a secure payment method.</p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Order Summary Card */}
            <div className="md:col-span-12 lg:col-span-5 space-y-4">
              <div className="bg-[var(--surface-container-lowest)] border border-[var(--outline-variant)] p-6 rounded-lg space-y-6">
                <div className="flex justify-between items-start border-b border-[var(--outline-variant)] pb-4">
                  <div>
                    <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">INVOICE ID</p>
                    <p className="font-mono text-sm text-[var(--on-surface)]">#ONCMP-2024-0892</p>
                  </div>
                  <span className="bg-[rgb(37,99,235,0.1)] text-[var(--status-sponsored)] px-3 py-1 rounded-full text-xs font-mono uppercase">Unpaid</span>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-mono text-[var(--on-surface-variant)] uppercase">DESCRIPTION</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--on-surface)]">Monthly Rent (March)</span>
                    <span className="text-sm text-[var(--on-surface)]">$1,250.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--on-surface)]">Laundry Service</span>
                    <span className="text-sm text-[var(--on-surface)]">$25.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-[var(--on-surface)]">Utility Surcharge</span>
                    <span className="text-sm text-[var(--on-surface)]">$45.50</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--outline-variant)] flex justify-between items-baseline">
                  <span className="font-bold text-[var(--on-surface)]">Total Amount</span>
                  <span className="text-2xl font-bold text-[var(--primary)]">$1,320.50</span>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 p-4 bg-[var(--surface-container)] rounded-lg">
                <span className="material-symbols-outlined text-[var(--primary)]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                <p className="text-xs text-[var(--on-surface-variant)]">Payments are encrypted and secured by OnCampus Financial Gateway. No card data is stored on our servers.</p>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="md:col-span-12 lg:col-span-7 space-y-6">
              <div className="bg-white border border-[var(--outline-variant)] rounded-lg overflow-hidden shadow-sm">
                <div className="p-6 border-b border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
                  <h2 className="font-bold text-lg text-[var(--on-surface)]">Select Payment Method</h2>
                </div>

                <div className="p-6 space-y-4">
                  {/* Wallet Option */}
                  <button
                    onClick={() => setSelectedPayment('wallet')}
                    className={`w-full border p-4 rounded-lg flex items-center gap-4 transition-all ${
                      selectedPayment === 'wallet'
                        ? 'border-[var(--primary)] bg-[var(--surface-container-low)] shadow-sm'
                        : 'border-[var(--outline-variant)] hover:bg-[var(--surface-container-lowest)]'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[rgba(0,50,45,0.1)] rounded-lg flex items-center justify-center text-[var(--primary)]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
                    </div>
                    <div className="flex-grow text-left">
                      <div className="flex justify-between items-center">
                        <p className="font-bold text-sm text-[var(--on-surface)]">Wallet Balance</p>
                        <span className="text-xs font-mono text-[var(--status-available)]">Available</span>
                      </div>
                      <p className="text-xs text-[var(--on-surface-variant)]">Current balance: $4,580.00</p>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedPayment === 'wallet'
                        ? 'border-[var(--primary)]'
                        : 'border-[var(--outline-variant)]'
                    }`}>
                      {selectedPayment === 'wallet' && (
                        <div className="w-3 h-3 bg-[var(--primary)] rounded-full"></div>
                      )}
                    </div>
                  </button>

                  {/* Card Option */}
                  <button
                    onClick={() => setSelectedPayment('card')}
                    className={`w-full border p-4 rounded-lg flex items-center gap-4 transition-all ${
                      selectedPayment === 'card'
                        ? 'border-[var(--primary)] bg-[var(--surface-container-low)] shadow-sm'
                        : 'border-[var(--outline-variant)] hover:bg-[var(--surface-container-lowest)]'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[rgba(25,97,161,0.1)] rounded-lg flex items-center justify-center text-[var(--secondary)]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                    </div>
                    <div className="flex-grow text-left">
                      <p className="font-bold text-sm text-[var(--on-surface)]">Credit / Debit Card</p>
                      <p className="text-xs text-[var(--on-surface-variant)]">Visa, Mastercard, AMEX</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--outline-variant)]"></div>
                  </button>

                  {/* Bank Transfer Option */}
                  <button
                    onClick={() => setSelectedPayment('bank')}
                    className={`w-full border p-4 rounded-lg flex items-center gap-4 transition-all ${
                      selectedPayment === 'bank'
                        ? 'border-[var(--primary)] bg-[var(--surface-container-low)] shadow-sm'
                        : 'border-[var(--outline-variant)] hover:bg-[var(--surface-container-lowest)]'
                    }`}
                  >
                    <div className="w-12 h-12 bg-[rgba(0,0,0,0.05)] rounded-lg flex items-center justify-center text-[var(--on-surface-variant)]">
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_balance</span>
                    </div>
                    <div className="flex-grow text-left">
                      <p className="font-bold text-sm text-[var(--on-surface)]">Bank Transfer</p>
                      <p className="text-xs text-[var(--on-surface-variant)]">Direct ACH or SWIFT transfer</p>
                    </div>
                    <div className="w-6 h-6 rounded-full border-2 border-[var(--outline-variant)]"></div>
                  </button>
                </div>

                {/* Card Details (Conditional) */}
                {selectedPayment === 'card' && (
                  <div className="px-6 pb-6 space-y-4 border-t border-[var(--outline-variant)]">
                    <div className="pt-4">
                      <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase block mb-1">CARD NUMBER</label>
                      <input className="w-full bg-[var(--surface)] border border-[var(--outline-variant)] p-3 rounded-lg focus:border-[var(--primary)] transition-colors text-sm" placeholder="XXXX XXXX XXXX XXXX" type="text" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase block mb-1">EXPIRY DATE</label>
                        <input className="w-full bg-[var(--surface)] border border-[var(--outline-variant)] p-3 rounded-lg focus:border-[var(--primary)] transition-colors text-sm" placeholder="MM / YY" type="text" />
                      </div>
                      <div>
                        <label className="text-xs font-mono text-[var(--on-surface-variant)] uppercase block mb-1">CVC</label>
                        <input className="w-full bg-[var(--surface)] border border-[var(--outline-variant)] p-3 rounded-lg focus:border-[var(--primary)] transition-colors text-sm" placeholder="XXX" type="text" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6 bg-[var(--surface-container-lowest)] border-t border-[var(--outline-variant)]">
                  <button className="w-full bg-[var(--primary)] text-white py-4 rounded-full font-bold flex items-center justify-center gap-3 shadow-lg shadow-[rgba(0,50,45,0.1)] hover:shadow-[rgba(0,50,45,0.2)] active:scale-95 transition-all">
                    <span>Pay Now</span>
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p className="text-center mt-4 text-[var(--on-surface-variant)] text-xs">By clicking Pay Now, you agree to the <a href="#" className="text-[var(--primary)] underline">Terms of Payment</a>.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[var(--surface-container-lowest)] w-full py-8 border-t border-[var(--outline-variant)] mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-4 md:px-6 gap-4 max-w-7xl mx-auto text-xs text-[var(--on-surface-variant)]">
          <div className="text-[var(--primary)] font-bold">OnCampus</div>
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Impact Report</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Transparency Policy</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Terms</a>
            <a href="#" className="hover:text-[var(--secondary)] transition-colors">Support</a>
          </div>
          <div>&copy; 2024 OnCampus. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
