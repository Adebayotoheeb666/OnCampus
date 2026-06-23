'use client';

import { useState } from 'react';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-surface-bright text-on-surface font-body-md min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center relative overflow-hidden px-gutter-mobile py-margin-safe">
        {/* Background Decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl"></div>
        </div>

        <div className="w-full max-w-[440px] relative z-10">
          {/* Branding Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-[48px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                domain
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-primary tracking-tight">OnCampus</h1>
            <p className="font-body-md text-on-surface-variant mt-2">Admin Management Portal</p>
          </div>

          {/* Login Card */}
          <section className="bg-white bg-opacity-80 backdrop-blur-[12px] rounded-xl p-8 shadow-[0_12px_40px_rgba(0,50,45,0.04)] border border-outline-variant">
            <div className="mb-8">
              <h2 className="font-headline-md text-headline-md text-on-surface">Staff Login</h2>
              <p className="text-on-surface-variant font-body-md mt-1">Please enter your credentials.</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="space-y-2">
                <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="email">
                  Email Address
                </label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                    mail
                  </span>
                  <input
                    className="w-full pl-11 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none font-body-md"
                    id="email"
                    name="email"
                    placeholder="admin@oncampus.edu"
                    required
                    type="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider" htmlFor="password">
                    Password
                  </label>
                  <a className="font-label-caps text-label-caps text-secondary hover:underline transition-all" href="#">
                    Forgot Password?
                  </a>
                </div>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-secondary transition-colors">
                    lock
                  </span>
                  <input
                    className="w-full pl-11 pr-12 py-3 bg-surface-container-lowest border border-outline-variant rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary transition-all outline-none font-body-md"
                    id="password"
                    name="password"
                    placeholder="••••••••"
                    required
                    type={showPassword ? 'text' : 'password'}
                  />
                  <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">{showPassword ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              {/* Action Button */}
              <button
                className="w-full bg-primary hover:bg-primary-container text-on-primary py-4 rounded-xl font-headline-md text-headline-md flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] shadow-lg shadow-primary/10"
                type="submit"
                disabled={isLoading}
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                <span className="material-symbols-outlined">{isLoading ? 'refresh' : 'login'}</span>
              </button>
            </form>

            {/* MFA Hint */}
            <div className="mt-8 pt-6 border-t border-outline-variant flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary">shield_person</span>
              <p className="text-[13px] leading-relaxed text-on-surface-variant font-body-md">
                Multi-Factor Authentication (MFA) will be required if you are logging in from a new device.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <footer className="mt-10 text-center space-y-4">
            <p className="text-label-caps font-label-caps text-on-surface-variant opacity-70 px-4">
              Authorized Access Only. This is a private system for staff. All activities are logged and monitored.
            </p>
            <div className="flex justify-center gap-6">
              <a className="text-label-caps font-label-caps text-outline hover:text-primary transition-colors" href="#">
                Privacy Policy
              </a>
              <a className="text-label-caps font-label-caps text-outline hover:text-primary transition-colors" href="#">
                Support
              </a>
            </div>
          </footer>
        </div>
      </main>

      {/* Decorative Footer */}
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-primary-fixed opacity-80"></div>
    </div>
  );
}
