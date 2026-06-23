import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is OnCampus?",
    answer:
      "OnCampus is a direct-impact sponsorship platform that connects generous sponsors with first-year students at FUTA who need stable housing. We bridge the gap between available campus beds and students in need.",
  },
  {
    question: "How does the sponsorship process work?",
    answer:
      "Browse available beds on our platform, select a sponsorship tier, and complete the checkout process. Once payment is confirmed, we allocate the bed to a deserving student and provide you with updates on the impact of your sponsorship.",
  },
  {
    question: "What sponsorship tiers are available?",
    answer:
      "We offer flexible sponsorship options including bed equipment sponsorship, semester packages, and full-bed sponsorships. Each tier comes with different impact levels and reporting details.",
  },
  {
    question: "How is my money used?",
    answer:
      "All funds go directly to providing quality housing for students. This includes bed procurement, maintenance, utilities, and facility upgrades. You'll receive transparent reports on how your sponsorship is being utilized.",
  },
  {
    question: "Can I sponsor a specific student?",
    answer:
      "You sponsor a bed, and our allocation team matches it with a student based on need and housing availability. We maintain student privacy while providing you with impact reports and success stories.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major payment methods including Paystack, Flutterwave, and bank transfers. International sponsors can use our diaspora payment options for seamless contributions.",
  },
  {
    question: "Is my sponsorship tax-deductible?",
    answer:
      "OnCampus is registered as a transparent impact initiative. Depending on your location, sponsorships may be tax-deductible. Please refer to our Transparency Report for verification details.",
  },
  {
    question: "How often will I receive updates?",
    answer:
      "Sponsors receive regular impact reports, success stories, and updates on their sponsored student's academic journey. You can choose your preferred update frequency during checkout.",
  },
  {
    question: "Can I sponsor multiple beds?",
    answer:
      "Yes! Many sponsors sponsor multiple beds or team up with others for larger sponsorships. Contact partnerships@oncampus.ng to discuss group sponsorship options.",
  },
  {
    question: "What if I need to withdraw my sponsorship?",
    answer:
      "We understand that circumstances change. Please contact our support team at sponsor@oncampus.ng to discuss your specific situation and available options.",
  },
];

export default function FAQsPage() {
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
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-[var(--on-surface-variant)]">
            Find answers to common questions about sponsorships, payments, and impact reporting.
          </p>
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <motion.details
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="group border border-[var(--outline-variant)] rounded-xl p-6 hover:border-[var(--primary)]/30 transition-colors cursor-pointer"
            >
              <summary className="font-bold text-[var(--on-surface)] text-lg flex items-center gap-3 list-none">
                <span className="material-symbols-outlined group-open:rotate-90 transition-transform">
                  chevron_right
                </span>
                {faq.question}
              </summary>
              <p className="mt-4 text-[var(--on-surface-variant)] text-base leading-relaxed ml-8">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-16 p-8 bg-[var(--primary)]/10 rounded-2xl border border-[var(--primary)]/20"
        >
          <h3 className="text-xl font-bold text-[var(--primary)] mb-2">Still have questions?</h3>
          <p className="text-[var(--on-surface-variant)] mb-4">
            Our support team is here to help. Reach out to us at sponsor@oncampus.ng or partnerships@oncampus.ng.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
