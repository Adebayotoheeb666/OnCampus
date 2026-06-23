import { motion } from "framer-motion";

export default function AuditStatementPage() {
  const auditItems = [
    {
      year: "2024",
      status: "Completed",
      auditor: "A&C Audit Partners",
      date: "January 31, 2024",
      opinion: "Unqualified",
    },
    {
      year: "2023",
      status: "Completed",
      auditor: "A&C Audit Partners",
      date: "February 15, 2023",
      opinion: "Unqualified",
    },
    {
      year: "2022",
      status: "Completed",
      auditor: "BDO Auditors",
      date: "March 20, 2022",
      opinion: "Unqualified",
    },
  ];

  const standards = [
    "International Financial Reporting Standards (IFRS)",
    "FUTA Financial Management Policies",
    "Nigerian Charitable Organizations Guidelines",
    "OnCampus Internal Controls Framework",
    "Independent Auditor Standards of Practice",
  ];

  return (
    <div className="w-full py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[var(--primary)] mb-4" style={{ fontFamily: "Manrope" }}>
            Audit Statements
          </h1>
          <p className="text-lg text-[var(--on-surface-variant)]">
            Independent verification of financial accuracy and operational integrity
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]"
        >
          <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">Audit Overview</h2>
          <p className="text-[var(--on-surface-variant)] leading-relaxed">
            OnCampus undergoes annual independent audits by certified external auditors to ensure financial accuracy, operational compliance, and proper fund utilization. All audit statements are publicly available and confirm our commitment to transparency and accountability.
          </p>
        </motion.section>

        {/* Audit History */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-6">Audit History</h2>
          <div className="space-y-4">
            {auditItems.map((audit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="p-6 rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)] hover:border-[var(--primary)]/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-[var(--on-surface)] mb-1">{audit.year} Audit</h3>
                    <p className="text-sm text-[var(--on-surface-variant)]">Conducted by {audit.auditor}</p>
                    <p className="text-xs text-[var(--on-surface-variant)] mt-1">Completed: {audit.date}</p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-2 bg-emerald-600/20 text-emerald-600 rounded-lg font-semibold text-sm mb-2">
                      {audit.opinion} Opinion
                    </span>
                    <p className="text-sm text-[var(--on-surface-variant)]">{audit.status}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Audit Standards */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-2xl border border-[var(--outline-variant)] bg-[var(--surface-container-low)]"
        >
          <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-6">Audit Standards & Compliance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {standards.map((standard, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="flex items-start gap-3"
              >
                <span className="text-emerald-600 font-bold mt-1">✓</span>
                <span className="text-[var(--on-surface-variant)]">{standard}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Key Findings */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-12 p-8 rounded-2xl border border-emerald-600/20 bg-emerald-50/5"
        >
          <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-6">Key Audit Findings</h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-emerald-600 font-bold min-w-fit">✓</span>
              <div>
                <h4 className="font-semibold text-[var(--on-surface)] mb-1">Financial Controls</h4>
                <p className="text-sm text-[var(--on-surface-variant)]">
                  All financial controls are operating effectively with no material weaknesses identified.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-600 font-bold min-w-fit">✓</span>
              <div>
                <h4 className="font-semibold text-[var(--on-surface)] mb-1">Fund Utilization</h4>
                <p className="text-sm text-[var(--on-surface-variant)]">
                  100% of sponsor contributions are properly allocated and documented according to stated purposes.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-600 font-bold min-w-fit">✓</span>
              <div>
                <h4 className="font-semibold text-[var(--on-surface)] mb-1">Allocation Process</h4>
                <p className="text-sm text-[var(--on-surface-variant)]">
                  Student allocation decisions follow documented policies and are made by qualified personnel.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-emerald-600 font-bold min-w-fit">✓</span>
              <div>
                <h4 className="font-semibold text-[var(--on-surface)] mb-1">Documentation</h4>
                <p className="text-sm text-[var(--on-surface-variant)]">
                  All transactions are properly documented and records are maintained in compliance with regulations.
                </p>
              </div>
            </li>
          </ul>
        </motion.section>

        {/* Auditor Contact */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="p-8 bg-[var(--primary)]/10 rounded-2xl border border-[var(--primary)]/20"
        >
          <h3 className="text-xl font-bold text-[var(--primary)] mb-4">External Auditor Information</h3>
          <div className="space-y-3 text-[var(--on-surface-variant)]">
            <p>
              <strong>Current Auditor:</strong> A&C Audit Partners
            </p>
            <p>
              <strong>Audit Frequency:</strong> Annual independent audit
            </p>
            <p>
              <strong>Report Availability:</strong> Full audit reports are available upon request
            </p>
            <p className="mt-4">
              For audit-related inquiries, contact:
            </p>
            <a href="mailto:partnerships@oncampus.ng" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              📧 partnerships@oncampus.ng
            </a>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
