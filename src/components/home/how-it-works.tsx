export function HowItWorks() {
  const steps = [
    {
      icon: "bed",
      title: "1. Choose a Bed",
      description: "Browse our inventory of verified campus hostel beds. Select a room or a student currently seeking funding.",
    },
    {
      icon: "payments",
      title: "2. Fund the Gap",
      description: "Contribute any amount toward the total cost. Your funds are held securely and released directly to the university housing office.",
    },
    {
      icon: "insights",
      title: "3. Track Impact",
      description: "Receive updates once the bed is fully funded and the student has moved in. See the tangible difference your support makes.",
    },
  ];

  return (
    <section className="w-full py-12 md:py-20 bg-surface-container-low" id="how-it-works">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">How It Works</h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto">
            Sponsoring a student&apos;s housing is a simple, secure, and transparent process designed to create immediate impact.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-6 shadow-sm">
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>{step.icon}</span>
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{step.title}</h3>
              <p className="text-on-surface-variant">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
