"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
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
            Terms of Service
          </h1>
          <p className="text-[var(--on-surface-variant)]">
            Last updated: January 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 text-[var(--on-surface-variant)]"
        >
          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the OnCampus platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on OnCampus platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software contained on the platform</li>
              <li>Removing any copyright or other proprietary notations from the materials</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">3. Sponsorship Terms</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">Payment Obligations</h3>
                <p>
                  By completing a sponsorship transaction, you agree to pay the specified amount using the provided payment methods. All payments are non-refundable except as required by law.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">Allocation</h3>
                <p>
                  OnCampus reserves the right to allocate sponsored beds to deserving students based on need, availability, and allocation criteria. Sponsors may not designate specific students.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">Impact Reporting</h3>
                <p>
                  We commit to providing regular impact reports. However, student privacy is protected, and identifying information will not be shared without consent.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">4. User Responsibilities</h2>
            <p>
              You agree to use the OnCampus platform only for lawful purposes and in ways that do not infringe upon the rights of others or restrict their use and enjoyment of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">5. Disclaimer of Warranties</h2>
            <p>
              The materials on OnCampus platform are provided on an 'as is' basis. OnCampus makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">6. Limitation of Liability</h2>
            <p>
              In no event shall OnCampus or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on OnCampus platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">7. Accuracy of Materials</h2>
            <p>
              The materials appearing on OnCampus platform could include technical, typographical, or photographic errors. OnCampus does not warrant that any of the materials on its platform are accurate, complete, or current. OnCampus may make changes to the materials contained on its platform at any time without notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">8. Links</h2>
            <p>
              OnCampus has not reviewed all of the sites linked to its platform and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by OnCampus of the site. Use of any such linked website is at the user's own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">9. Modifications</h2>
            <p>
              OnCampus may revise these terms of service for its platform at any time without notice. By using this platform, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">10. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="mt-3 space-y-1">
              <li>📧 sponsor@oncampus.ng</li>
              <li>🤝 partnerships@oncampus.ng</li>
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
