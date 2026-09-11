const CARE_STEPS = [
  {
    step: '01',
    title: 'Darkening is Natural',
    body: 'Bell metal oxidises with use and time ,  this is patina, not damage. It is a sign of authentic alloy and regular use.',
  },
  {
    step: '02',
    title: 'Clean with Tamarind & Salt',
    body: 'A simple paste of tamarind and coarse salt, rubbed gently and rinsed with warm water, restores the original shine within minutes.',
  },
  {
    step: '03',
    title: 'Avoid Harsh Detergents',
    body: 'Abrasive cleaners and metal scourers will scratch the surface. Hand wash only ,  no dishwasher.',
  },
  {
    step: '04',
    title: 'Store Dry',
    body: 'After washing, dry immediately with a soft cloth. Storing wet can accelerate surface oxidation beyond natural patina.',
  },
];

export default function CareNote() {
  return (
    <section id="care" className="py-24 px-6 bg-cream-200">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="reveal">
            <p className="section-label text-brown-400 mb-4">Care Guide</p>
            <h2 className="section-heading mb-6">
              Built to Last.<br />
              <span className="italic text-brown-400">Cared for Simply.</span>
            </h2>
            <span className="block h-px w-14 bg-brown-300 mb-8" />
            <p className="body-text mb-8 max-w-md">
              Bell metal is one of the most durable alloys ever put to everyday use ,  but it rewards
              a little care. These are the only four things you need to know.
            </p>
            <p className="font-sans text-sm text-brown-600 italic font-light">
              "Every piece is handcrafted and may carry small natural variations ,  a mark of
              authenticity, not a flaw."
            </p>
          </div>

          {/* Right: steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-right">
            {CARE_STEPS.map((s, i) => (
              <div
                key={i}
                className={`bg-white border border-cream-300 p-6 hover:border-brown-300 transition-all duration-200 delay-${i * 100}`}
              >
                <p className="font-serif text-3xl text-brown-200 font-light mb-4 leading-none">
                  {s.step}
                </p>
                <h3 className="font-serif text-lg text-brown-800 mb-2 leading-snug">
                  {s.title}
                </h3>
                <p className="font-sans text-sm text-brown-500 leading-relaxed font-light">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
