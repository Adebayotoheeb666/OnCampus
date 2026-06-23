"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BedCard } from "@/components/sponsor/bed-card";
import { CAMPAIGN_TARGET_BEDS } from "@/lib/constants";
import { formatNaira } from "@/lib/utils";
import {
  containerVariants,
  itemVariants,
  fadeInUp,
  fadeIn,
  cardVariants,
} from "@/lib/animations";

interface Stats {
  totalRaised: number;
  totalTarget: number;
  fundedBeds: number;
}

interface Bed {
  id: string;
  blockName: string;
  roomNumber: string;
  bedLabel: string;
  fundingType: string;
  status: string;
  totalCost: number;
  fundedAmount: number;
}

interface HomePageClientProps {
  stats: Stats;
  featuredBeds: Bed[];
  campaignPercent: number;
}

export function HomePageClient({
  stats,
  featuredBeds,
  campaignPercent,
}: HomePageClientProps) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full min-h-[80vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full"
            style={{
              backgroundImage: "url('/hero-bg.png')",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent" />
        </div>
        <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8 py-20 grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-[var(--secondary-container)]/30 border border-[var(--secondary-container)] text-[var(--on-secondary-container)] px-3 py-1 rounded-full w-fit"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="font-bold text-xs tracking-widest">
                FUTA OFFICIAL PARTNER
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-[var(--primary)] leading-tight"
              style={{ fontFamily: "Manrope" }}
            >
              Change a Life, <br className="hidden md:block" /> One Bed at a Time
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeInUp}
              className="text-lg text-[var(--on-surface-variant)] max-w-lg"
            >
              OnCampus bridges the gap between available campus housing and
              students in need. Direct-impact sponsorship that ensures a stable
              future for the next generation of leaders.
            </motion.p>

            {/* Campaign Progress Card */}
            <motion.div
              variants={fadeInUp}
              className="bg-[var(--surface-container-highest)] p-6 rounded-2xl border border-[var(--outline-variant)] shadow-md max-w-md"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-xs text-[var(--primary)] tracking-widest">
                  2024 CAMPAIGN PROGRESS
                </span>
                <span className="text-2xl font-bold text-[var(--impact-gold)]">
                  {campaignPercent}%
                </span>
              </div>
              <div className="w-full h-4 bg-[var(--surface-container-low)] rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full impact-gradient"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: campaignPercent / 100 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  style={{ originX: 0 }}
                />
              </div>
              <div className="flex justify-between text-xs text-[var(--on-surface-variant)] font-semibold">
                <span>{formatNaira(stats.totalRaised)} RAISED</span>
                <span>{formatNaira(stats.totalTarget)} GOAL</span>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div variants={fadeInUp} className="pt-4">
              <Link
                href="/beds"
                className="inline-flex items-center justify-center gap-2 bg-[var(--primary)] text-[var(--on-primary)] px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
              >
                Browse Available Beds
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Stats Cards */}
          <motion.div
            className="grid grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={cardVariants}
              className="bg-[var(--surface-container-lowest)] p-6 rounded-xl border border-[var(--outline-variant)] flex flex-col justify-center items-center text-center shadow-sm"
            >
              <span
                className="text-4xl font-bold text-[var(--primary)]"
                style={{ fontFamily: "Manrope" }}
              >
                {stats.fundedBeds}
              </span>
              <span className="font-bold text-xs text-[var(--on-surface-variant)] mt-2 tracking-widest">
                BEDS FUNDED
              </span>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="bg-[var(--surface-container-lowest)] p-6 rounded-xl border border-[var(--outline-variant)] flex flex-col justify-center items-center text-center shadow-sm"
            >
              <span
                className="text-4xl font-bold text-[var(--primary)]"
                style={{ fontFamily: "Manrope" }}
              >
                {CAMPAIGN_TARGET_BEDS}+
              </span>
              <span className="font-bold text-xs text-[var(--on-surface-variant)] mt-2 tracking-widest">
                STUDENTS HOUSED
              </span>
            </motion.div>
            <motion.div
              variants={cardVariants}
              className="col-span-2 bg-[var(--primary)] text-[var(--on-primary)] p-4 rounded-xl flex items-center gap-4 shadow-lg"
            >
              <div className="p-3 bg-white/10 rounded-lg">
                <span className="material-symbols-outlined text-3xl">
                  diversity_3
                </span>
              </div>
              <div>
                <p className="font-bold text-lg" style={{ fontFamily: "Manrope" }}>
                  89 Sponsors Active
                </p>
                <p className="text-[var(--on-primary-container)] text-sm opacity-80">
                  Join our community of change-makers today.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className="w-full py-12 bg-[var(--surface-container-low)]"
        id="how-it-works"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="text-center mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4"
              style={{ fontFamily: "Manrope" }}
            >
              How It Works
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[var(--on-surface-variant)] max-w-2xl mx-auto"
            >
              Sponsoring a student&apos;s housing is a simple, secure, and
              transparent process designed to create immediate impact.
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Step 1 */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center p-6 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center text-[var(--primary)] mb-6 shadow-sm">
                <span className="material-symbols-outlined text-3xl">bed</span>
              </div>
              <h3
                className="text-lg font-bold text-[var(--primary)] mb-2"
                style={{ fontFamily: "Manrope" }}
              >
                1. Choose a Bed
              </h3>
              <p className="text-[var(--on-surface-variant)]">
                Browse our inventory of verified campus hostel beds. Select a
                room or a student currently seeking funding.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center p-6 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center text-[var(--primary)] mb-6 shadow-sm">
                <span className="material-symbols-outlined text-3xl">
                  payments
                </span>
              </div>
              <h3
                className="text-lg font-bold text-[var(--primary)] mb-2"
                style={{ fontFamily: "Manrope" }}
              >
                2. Fund the Gap
              </h3>
              <p className="text-[var(--on-surface-variant)]">
                Contribute any amount toward the total cost. Your funds are held
                securely and released directly to the university housing office.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              variants={cardVariants}
              className="flex flex-col items-center text-center p-6 bg-[var(--surface-container-lowest)] rounded-xl border border-[var(--outline-variant)] hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--primary-fixed)] flex items-center justify-center text-[var(--primary)] mb-6 shadow-sm">
                <span className="material-symbols-outlined text-3xl">
                  insights
                </span>
              </div>
              <h3
                className="text-lg font-bold text-[var(--primary)] mb-2"
                style={{ fontFamily: "Manrope" }}
              >
                3. Track Impact
              </h3>
              <p className="text-[var(--on-surface-variant)]">
                Receive updates once the bed is fully funded and the student has
                moved in. See the tangible difference your support makes.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Available Beds Section */}
      <section
        className="w-full py-12 max-w-6xl mx-auto px-4 md:px-8"
        id="inventory"
      >
        <motion.div
          className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="max-w-xl">
            <h2
              className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-2"
              style={{ fontFamily: "Manrope" }}
            >
              Available for Sponsorship
            </h2>
            <p className="text-[var(--on-surface-variant)]">
              Every card represents a tangible impact. Filter by hostel block or
              funding progress to find a student to support.
            </p>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Link
              href="/beds"
              className="text-[var(--primary)] font-bold hover:underline whitespace-nowrap"
            >
              View all beds →
            </Link>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto mb-8"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <button className="px-4 py-2 bg-[var(--primary)] text-[var(--on-primary)] rounded-xl whitespace-nowrap font-bold text-xs tracking-widest hover:opacity-90 transition-opacity">
            ALL BLOCKS
          </button>
          <button className="px-4 py-2 bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] rounded-xl whitespace-nowrap font-bold text-xs tracking-widest hover:bg-[var(--surface-variant)] transition-colors">
            BLOCK A
          </button>
          <button className="px-4 py-2 bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] rounded-xl whitespace-nowrap font-bold text-xs tracking-widest hover:bg-[var(--surface-variant)] transition-colors">
            BLOCK B
          </button>
          <button className="px-4 py-2 bg-[var(--surface-container-high)] text-[var(--on-surface-variant)] rounded-xl whitespace-nowrap font-bold text-xs tracking-widest hover:bg-[var(--surface-variant)] transition-colors">
            LOW FUNDING
          </button>
        </motion.div>

        {/* Beds Grid */}
        {featuredBeds.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredBeds.map((bed) => (
              <motion.div key={bed.id} variants={cardVariants}>
                <BedCard bed={bed} />
              </motion.div>
            ))}

            {/* Quick Sponsor Card */}
            <motion.div
              variants={cardVariants}
              className="bg-[var(--primary)] text-[var(--on-primary)] p-6 rounded-xl border border-[var(--primary)] flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-white text-2xl">
                    auto_awesome
                  </span>
                </div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Manrope" }}
                >
                  Gift a Semester
                </h3>
                <p className="text-[var(--on-primary-container)] opacity-80 mb-6 text-sm">
                  Can&apos;t decide on a specific room? Your contribution will be
                  automatically assigned to the bed with the highest need.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-bold text-xs transition-colors border border-white/10">
                    $100
                  </button>
                  <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-bold text-xs transition-colors border border-white/10">
                    $250
                  </button>
                  <button className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg font-bold text-xs transition-colors border border-white/10">
                    $500
                  </button>
                </div>
                <button className="w-full bg-[var(--primary-fixed)] text-[var(--on-primary-fixed)] py-3 rounded-xl font-bold shadow-md hover:scale-105 active:scale-95 transition-transform">
                  Quick Sponsor
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <p className="rounded-xl border border-dashed border-[var(--outline)] p-8 text-center text-[var(--on-surface-variant)]">
            No beds in the catalogue yet. Run <code className="text-sm">npm run db:seed</code> to load pilot inventory.
          </p>
        )}
      </section>

      {/* Impact Stories Section */}
      <section
        className="w-full py-12 bg-[var(--surface-container-lowest)] overflow-hidden"
        id="impact"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Image */}
            <motion.div variants={itemVariants} className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-[var(--surface-dim)]">
                <img
                  alt="Adejoke, a scholarship recipient"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqGbuhDvDaNX7TDZhwfUl5PuiGJk2R7DCwOA-Jx9octPx9WMUhaioNMDKLT3Os-Au8rkLbdoLtJNvK-IV5oSDdHvmMzbkLcO3EzZudnvBGD9cUiJO4XzYzkZ_VcGH2h1TdBWSjZPhxHgJp7CPgds8W-KCa1yIUiiRiirT3FNhMFNObzW0l2P9PxeatPtfqKUVKV9L22O-XIeRcFXsJW8tSB7aZt5QAfKZBp9ROo-eVO9Kux0Gn9zYCGHb3DSiRCfIBEJoTUQllNrBh"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[var(--primary)] text-[var(--on-primary)] p-6 rounded-xl shadow-xl max-w-[240px] hidden md:block">
                <p className="text-lg italic" style={{ fontFamily: "Manrope" }}>
                  &quot;I can finally focus on my Engineering degree instead of
                  worrying where I&apos;ll sleep tonight.&quot;
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={containerVariants}
              className="space-y-6 md:pl-8"
            >
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 text-[var(--impact-gold)]"
              >
                <span className="material-symbols-outlined">star</span>
                <span className="font-bold text-xs tracking-widest">
                  SUCCESS STORY
                </span>
              </motion.div>
              <motion.h2
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-[var(--primary)]"
                style={{ fontFamily: "Manrope" }}
              >
                Adejoke&apos;s Story
              </motion.h2>
              <motion.p
                variants={itemVariants}
                className="text-lg text-[var(--on-surface-variant)]"
              >
                Adejoke was in her final year at FUTA when financial hardship
                threatened her housing stability. Through OnCampus sponsors, her
                room in Block A was funded in just 14 days.
              </motion.p>
              <motion.p
                variants={itemVariants}
                className="text-lg text-[var(--on-surface-variant)]"
              >
                Today, she is graduating at the top of her class and has already
                secured a position at a leading tech firm.
              </motion.p>
              <motion.button
                variants={itemVariants}
                className="text-[var(--primary)] font-bold flex items-center gap-2 hover:gap-3 transition-all"
              >
                Read more impact stories
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Transparency & Trust Section */}
      <section className="w-full py-12 bg-[var(--primary)] text-[var(--on-primary)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ fontFamily: "Manrope" }}
            >
              Transparency &amp; Trust
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="text-[var(--on-primary-container)] opacity-80 max-w-3xl mx-auto mb-12 text-lg"
            >
              We are committed to total accountability. Every Naira donated goes
              directly toward housing costs through our official university
              partnership.
            </motion.p>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={containerVariants}
            >
              <motion.div
                variants={cardVariants}
                className="p-8 border border-white/10 rounded-xl bg-white/5"
              >
                <span className="material-symbols-outlined text-5xl mb-4 block">
                  handshake
                </span>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Manrope" }}
                >
                  FUTA Partnership
                </h3>
                <p className="opacity-70 text-sm">
                  Official collaboration with the Federal University of
                  Technology, Akure, ensuring all beds are verified and academic
                  standing is maintained.
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                className="p-8 border border-white/10 rounded-xl bg-white/5"
              >
                <span className="material-symbols-outlined text-5xl mb-4 block">
                  verified_user
                </span>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Manrope" }}
                >
                  Financial Auditing
                </h3>
                <p className="opacity-70 text-sm">
                  Quarterly external audits of all sponsorship funds, with
                  reports made available to all active sponsors upon request.
                </p>
              </motion.div>
              <motion.div
                variants={cardVariants}
                className="p-8 border border-white/10 rounded-xl bg-white/5"
              >
                <span className="material-symbols-outlined text-5xl mb-4 block">
                  direct_helpline
                </span>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ fontFamily: "Manrope" }}
                >
                  Direct Impact
                </h3>
                <p className="opacity-70 text-sm">
                  Funds are paid directly to the university housing department.
                  No cash is handled by third parties or students.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Corporate Sponsorships Section */}
      <section className="w-full py-12 bg-[var(--surface-container-high)]">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            className="bg-[var(--surface-container-lowest)] rounded-2xl p-12 flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm border border-[var(--outline-variant)]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants} className="max-w-xl">
              <h2
                className="text-3xl md:text-4xl font-bold text-[var(--primary)] mb-4"
                style={{ fontFamily: "Manrope" }}
              >
                Corporate Sponsorships
              </h2>
              <p className="text-[var(--on-surface-variant)] text-lg">
                Empower a generation. Organizations can sponsor entire hostel
                blocks or floors, providing naming rights and long-term legacy
                impact.
              </p>
            </motion.div>
            <motion.button
              variants={itemVariants}
              className="bg-[var(--primary)] text-[var(--on-primary)] px-10 py-5 rounded-xl font-bold shadow-xl hover:scale-105 transition-transform whitespace-nowrap"
              style={{ fontFamily: "Manrope" }}
            >
              Partner With Us
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
