"use client";

import { motion } from "framer-motion";

export default function TransparencyReportPage() {
  const metrics = [
    { label: "Total Beds Sponsored", value: "156", color: "emerald" },
    { label: "Students Housed", value: "156", color: "blue" },
    { label: "Total Funds Raised", value: "₦24.5M", color: "amber" },
    { label: "Active Sponsors", value: "89", color: "purple" },
  ];

  const breakdown = [
    { category: "Housing & Equipment", percentage: 65, amount: "₦15.9M" },
    { category: "Operations & Support", percentage: 20, amount: "₦4.9M" },
    { category: "Transparency & Reporting", percentage: 10, amount: "₦2.5M" },
    { category: "Reserve Fund", percentage: 5, amount: "₦1.2M" },
  ];

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: "Manrope" }}>
            Transparency Report
          </h1>
          <p className="text-lg text-[var(--on-surface-variant)]">
            Full accountability of funds, operations, and impact metrics
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]"
            >
              <p className="text-sm text-[var(--on-surface-variant)] mb-2">{metric.label}</p>
              <p className="text-3xl font-bold text-[var(--primary)]">{metric.value}</p>
            </div>
          ))}
        </motion.div>

        {/* Fund Allocation */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]"
        >
          <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-8">Fund Allocation Breakdown</h2>
          <div className="space-y-6">
            {breakdown.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between mb-2">
                  <span className="font-semibold text-[var(--on-surface)]">{item.category}</span>
                  <span className="text-[var(--on-surface-variant)]">{item.amount}</span>
                </div>
                <div className="w-full bg-[var(--surface-container)] rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.percentage}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400"
                  />
                </div>
                <p className="text-sm text-[var(--on-surface-variant)] mt-1">{item.percentage}% of total funds</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Operational Details */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        >
          <div className="p-8 rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
            <h3 className="text-xl font-bold text-[var(--on-surface)] mb-4">Allocation Process</h3>
            <ul className="space-y-3 text-[var(--on-surface-variant)]">
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Independent allocation committee reviews all eligible applications</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Need-based assessment using standardized criteria</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Regular audits by third-party auditors</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Monthly impact tracking and verification</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]">
            <h3 className="text-xl font-bold text-[var(--on-surface)] mb-4">Accountability Measures</h3>
            <ul className="space-y-3 text-[var(--on-surface-variant)]">
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Quarterly financial statements published publicly</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Impact reports sent directly to sponsors</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Annual third-party audit by certified auditors</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-600 font-bold">✓</span>
                <span>Open communication with all stakeholders</span>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 bg-[var(--primary)]/10 rounded-2xl border border-[var(--primary)]/20"
        >
          <h3 className="text-xl font-bold text-[var(--primary)] mb-2">Questions About Our Report?</h3>
          <p className="text-[var(--on-surface-variant)] mb-4">
            We welcome questions and maintain complete transparency. Contact our operations team for detailed financial statements, audit reports, or impact data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a href="mailto:partnerships@oncampus.ng" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              📧 partnerships@oncampus.ng
            </a>
            <a href="tel:+234800000000" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              📱 Request Full Report
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
