import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-[var(--on-surface-variant)]">
            Last updated: January 2024
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none space-y-8 text-[var(--on-surface-variant)]"
        >
          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">1. Introduction</h2>
            <p>
              OnCampus ("we," "us," or "our") operates the OnCampus platform. This Privacy Policy explains how we collect, use, disclose, and otherwise handle your information when you use our website, mobile application, and related services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">2. Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">Personal Information</h3>
                <p>
                  When you create an account or make a sponsorship, we collect information such as your name, email address, phone number, mailing address, payment information, and other details you provide.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">Usage Information</h3>
                <p>
                  We automatically collect information about your interactions with our platform, including IP address, browser type, pages visited, and time spent on our service.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[var(--on-surface)] mb-2">Cookies</h3>
                <p>
                  We use cookies and similar tracking technologies to enhance your experience and analyze platform usage.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Process your sponsorship transactions</li>
              <li>Send you impact reports and updates on your sponsored student</li>
              <li>Communicate with you about our services</li>
              <li>Comply with legal obligations</li>
              <li>Improve and optimize our platform</li>
              <li>Prevent fraud and ensure security</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">4. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">5. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share information with:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Payment processors to complete transactions</li>
              <li>Service providers who assist us in operations</li>
              <li>Legal authorities when required by law</li>
              <li>Our partner institution (FUTA) for allocation and impact purposes</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">6. Your Rights</h2>
            <p>
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>Access your personal information</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt-out of communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--on-surface)] mb-4">7. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <ul className="mt-3 space-y-1">
              <li>📧 sponsor@oncampus.ng</li>
              <li>🤝 partnerships@oncampus.ng</li>
              <li>🏢 FUTA, Akure, Nigeria</li>
            </ul>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
