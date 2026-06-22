"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHeader() {
  return (
    <header className="w-full top-0 sticky z-50 glass-header border-b border-outline-variant/30">
      <div className="flex justify-between items-center px-4 md:px-6 py-2 w-full max-w-6xl mx-auto">
        <Link href="/" className="flex items-center gap-2 cursor-pointer">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary font-bold">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
          </div>
          <span className="text-2xl font-bold text-primary hidden sm:inline">OnCampus</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <nav className="flex gap-6">
            <a href="#" className="text-primary font-bold text-sm hover:bg-surface-container-low px-3 py-1 rounded transition-colors">Home</a>
            <a href="#impact" className="text-on-surface-variant font-medium text-sm hover:bg-surface-container-low px-3 py-1 rounded transition-colors">Impact</a>
            <a href="#inventory" className="text-on-surface-variant font-medium text-sm hover:bg-surface-container-low px-3 py-1 rounded transition-colors">Inventory</a>
            <a href="#how-it-works" className="text-on-surface-variant font-medium text-sm hover:bg-surface-container-low px-3 py-1 rounded transition-colors">How it Works</a>
          </nav>
          <Link href="/sponsor/checkout">
            <Button className="bg-primary text-on-primary hover:opacity-90">Sponsor Now</Button>
          </Link>
        </div>

        <div className="md:hidden">
          <span className="material-symbols-outlined text-primary">menu</span>
        </div>
      </div>
    </header>
  );
}
