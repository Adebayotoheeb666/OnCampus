'use client';

import { useEffect } from 'react';

export default function ConfirmationPage({ params }: { params: { pledgeId: string } }) {
  useEffect(() => {
    const canvas = document.getElementById('confetti') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Array<{ x: number; y: number; size: number; color: string; speedX: number; speedY: number; rotation: number; rotationSpeed: number }> = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        const colors = ['#00322d', '#2563EB', '#B45309', '#059669'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 5 + 3;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
        ctx.restore();
      }
    }

    window.addEventListener('resize', resize);
    resize();

    function createParticles() {
      for (let i = 0; i < 150; i++) {
        setTimeout(() => {
          particles.push(new Particle());
        }, i * 20);
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.update();
        p.draw(ctx);
        if (p.y > canvas.height) particles.splice(i, 1);
      });
      requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    setTimeout(() => {
      particles = [];
    }, 8000);

    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9f9fc] via-[#f9f9fc] to-[#f9f9fc] flex flex-col">
      {/* TopAppBar */}
      <header className="w-full top-0 sticky z-40 bg-white">
        <div className="flex justify-between items-center px-4 md:px-6 py-2 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#004b44] flex items-center justify-center text-white overflow-hidden">
              <span className="font-bold">OC</span>
            </div>
            <span className="text-lg font-bold text-[#00322d]">OnCampus</span>
          </div>
          <button className="p-2 hover:bg-[#f3f3f6] transition-colors rounded-full cursor-pointer active:opacity-80">
            <span className="material-symbols-outlined text-[#00322d]">contactless</span>
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        <canvas className="confetti-canvas fixed inset-0 pointer-events-none z-10" id="confetti"></canvas>

        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-[#bfc9c6] overflow-hidden relative">
          {/* Celebratory Top Section */}
          <div className="bg-[#00322d] pt-12 pb-8 px-4 md:px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#B45309] rounded-full blur-3xl -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#2563EB] rounded-full blur-3xl -ml-32 -mb-32"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/20">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" className="opacity-0 animate-pulse" style={{ strokeDasharray: 100, strokeDashoffset: 0, animation: 'dash 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.2s forwards' }}></polyline>
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Sponsorship Confirmed</h1>
              <p className="text-white/80 max-w-md">Your generous contribution has secured a safe space for a deserving student. Thank you for making a difference.</p>
            </div>
          </div>

          {/* Receipt Details */}
          <div className="p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              {/* Unit Summary */}
              <div className="bg-[#f3f3f6] rounded-xl p-6 border border-[#bfc9c6]">
                <span className="text-xs font-mono font-bold text-[#3f4947] mb-4 block tracking-widest">SPONSORSHIP UNIT</span>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#00322d] rounded-lg flex items-center justify-center text-white">
                    <span className="material-symbols-outlined">hotel</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#00322d]">Bed #EDU-7742-B</h3>
                    <p className="text-sm text-[#3f4947]">Block B • Residential Complex</p>
                  </div>
                </div>
                <div className="mt-6 flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                    STATUS: ACTIVE
                  </span>
                </div>
              </div>

              {/* Payment Summary */}
              <div className="bg-[#f3f3f6] rounded-xl p-6 border border-[#bfc9c6]">
                <span className="text-xs font-mono font-bold text-[#3f4947] mb-4 block tracking-widest">TRANSACTION DETAILS</span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-[#3f4947]">Amount Contributed</span>
                  <span className="text-2xl font-bold text-[#00322d]">₦1,200,000</span>
                </div>
                <div className="mt-6 space-y-1">
                  <p className="text-xs text-[#3f4947] font-mono font-bold">TXN ID: TXN-0982736451</p>
                  <p className="text-xs text-[#3f4947] font-mono font-bold">DATE: MAY 24, 2024</p>
                </div>
              </div>
            </div>

            {/* Impact Summary */}
            <div className="border-t border-[#bfc9c6] pt-8 mb-10">
              <h4 className="text-xs font-mono font-bold text-[#3f4947] mb-4 tracking-widest">IMPACT SUMMARY</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#3f4947]">Full Year Accommodation</span>
                  <span className="font-bold text-[#00322d]">₦1,150,000</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#3f4947]">Facility Maintenance Fund</span>
                  <span className="font-bold text-[#00322d]">₦35,000</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-[#3f4947]">Administrative Services</span>
                  <span className="font-bold text-[#00322d]">₦15,000</span>
                </div>
                <div className="pt-4 border-t border-dashed border-[#bfc9c6] flex justify-between items-center">
                  <span className="font-bold text-[#00322d]">Total Disbursement</span>
                  <span className="text-xl font-bold text-[#00322d]">₦1,200,000</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <button className="w-full sm:w-auto px-8 py-4 bg-[#00322d] text-white rounded-full font-bold hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 group">
                <span className="material-symbols-outlined group-hover:translate-y-0.5 transition-transform">card_membership</span>
                Download Digital Certificate
              </button>
              <button className="w-full sm:w-auto px-8 py-4 bg-transparent border border-[#707977] text-[#00322d] rounded-full font-bold hover:bg-[#f3f3f6] transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">dashboard</span>
                Return to Dashboard
              </button>
            </div>
          </div>

          {/* Security Trust Signal */}
          <div className="bg-white border-t border-[#bfc9c6] py-4 text-center flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm text-[#059669]">verified_user</span>
            <span className="text-xs font-mono font-bold text-[#3f4947] tracking-widest">SECURED & VERIFIED BY ONCAMPUS PHILANTHROPY NETWORK</span>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}
