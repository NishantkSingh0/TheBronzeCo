import { whyBronze } from '../data/collections';

const icons = [
  // Ashtadhatu - dharma wheel
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" key="1">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1"/>
    <circle cx="20" cy="20" r="6" stroke="currentColor" strokeWidth="1"/>
    {[0,45,90,135,180,225,270,315].map((deg,i) => (
      <line key={i}
        x1="20" y1="14" x2="20" y2="2"
        stroke="currentColor" strokeWidth="1"
        transform={`rotate(${deg} 20 20)`}
      />
    ))}
  </svg>,
  // Bell / sound
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" key="2">
    <path d="M20 6 C13 6 9 12 9 20 L9 28 L31 28 L31 20 C31 12 27 6 20 6Z" stroke="currentColor" strokeWidth="1"/>
    <line x1="15" y1="28" x2="15" y2="32" stroke="currentColor" strokeWidth="1"/>
    <line x1="25" y1="28" x2="25" y2="32" stroke="currentColor" strokeWidth="1"/>
    <ellipse cx="20" cy="33" rx="4" ry="1.5" stroke="currentColor" strokeWidth="1"/>
    <line x1="20" y1="6" x2="20" y2="3" stroke="currentColor" strokeWidth="1"/>
  </svg>,
  // Leaf / sattvic
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" key="3">
    <path d="M20 34 C20 34 6 26 6 14 C6 8 12 4 20 4 C28 4 34 8 34 14 C34 26 20 34 20 34Z" stroke="currentColor" strokeWidth="1"/>
    <line x1="20" y1="34" x2="20" y2="8" stroke="currentColor" strokeWidth="1"/>
    <line x1="20" y1="16" x2="12" y2="10" stroke="currentColor" strokeWidth="0.8"/>
    <line x1="20" y1="20" x2="28" y2="14" stroke="currentColor" strokeWidth="0.8"/>
    <line x1="20" y1="24" x2="12" y2="18" stroke="currentColor" strokeWidth="0.8"/>
  </svg>,
  // Home / kalash
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" key="4">
    <path d="M14 36 L14 22 L26 22 L26 36" stroke="currentColor" strokeWidth="1"/>
    <path d="M8 22 L20 8 L32 22" stroke="currentColor" strokeWidth="1"/>
    <line x1="14" y1="36" x2="26" y2="36" stroke="currentColor" strokeWidth="1"/>
  </svg>,
  // Diya / lamp
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" key="5">
    <ellipse cx="20" cy="28" rx="12" ry="5" stroke="currentColor" strokeWidth="1"/>
    <path d="M20 23 C17 18 15 12 20 10 C25 8 26 14 20 23Z" stroke="currentColor" strokeWidth="1"/>
    <line x1="20" y1="10" x2="20" y2="7" stroke="currentColor" strokeWidth="1"/>
    <ellipse cx="20" cy="6.5" rx="2" ry="1" stroke="currentColor" strokeWidth="0.8"/>
  </svg>,
  // Microscope / science
  <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7" key="6">
    <line x1="20" y1="8" x2="20" y2="28" stroke="currentColor" strokeWidth="1"/>
    <ellipse cx="20" cy="28" rx="8" ry="3" stroke="currentColor" strokeWidth="1"/>
    <circle cx="20" cy="14" r="5" stroke="currentColor" strokeWidth="1"/>
    <line x1="12" y1="36" x2="28" y2="36" stroke="currentColor" strokeWidth="1"/>
    <line x1="20" y1="31" x2="20" y2="36" stroke="currentColor" strokeWidth="1"/>
  </svg>,
];

export default function WhyBronze() {
  return (
    <section id="why-bronze" className="py-24 px-6 bg-cream-100">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">The Sacred Metal</p>
          <h2 className="section-heading text-brown-800">
            Why Bronze Belongs<br />
            <span className="italic font-light text-brown-400">at Your Table</span>
          </h2>
          <span className="divider-line" />
          <p className="body-text max-w-xl mx-auto">
            Three thousand years of tradition converge in a single alloy ,  revered in Ayurveda,
            woven into ritual, and now brought back to the everyday table.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {whyBronze.map((item, i) => (
            <div
              key={i}
              className={`reveal group bg-white border border-cream-300 p-8 hover:border-brown-300 hover:shadow-lg transition-all duration-300 delay-${i * 100}`}
            >
              <div className="text-brown-400 group-hover:text-brown-500 transition-colors duration-200 mb-5">
                {icons[i]}
              </div>
              <h3 className="font-serif text-xl text-brown-800 mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-brown-500 leading-relaxed font-light">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom quote */}
        <div className="mt-20 text-center reveal">
          <div className="gold-line max-w-xs mx-auto mb-10" />
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-brown-700 font-light italic max-w-3xl mx-auto leading-relaxed">
            "In Ayurveda, Bronze is regarded as a sattvic (pure) metal,
            traditionally favoured for daily dining as part of a mindful,
            balanced way of eating."
          </blockquote>
          <div className="gold-line max-w-xs mx-auto mt-10" />
        </div>
      </div>
    </section>
  );
}
