import { differentiators } from '../data/collections';

const GIFTING_TIERS = [
  {
    tier: 'Essential Gift Box',
    tag: 'Entry Tier',
    desc: 'A single kansa bowl and glass, gift-boxed ,  an accessible entry point for first-time gifting. Under ₹999.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1">
        <rect x="6" y="14" width="20" height="14"/>
        <rect x="4" y="10" width="24" height="5"/>
        <line x1="16" y1="10" x2="16" y2="28"/>
        <path d="M16 10 C16 10 12 7 12 4 C12 2 16 1 16 6 C16 1 20 2 20 4 C20 7 16 10 16 10Z"/>
      </svg>
    ),
  },
  {
    tier: 'Premium Gift Hamper',
    tag: 'Premium Tier',
    desc: 'Thali, bowls and glass presented in a curated hamper ,  suited for weddings, anniversaries and housewarmings.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1">
        <path d="M6 18 L8 10 L24 10 L26 18"/>
        <ellipse cx="16" cy="18" rx="10" ry="4"/>
        <line x1="16" y1="14" x2="16" y2="2"/>
        <path d="M10 2 Q16 6 22 2"/>
      </svg>
    ),
  },
  {
    tier: 'Signature Personalised Set',
    tag: 'Signature Tier',
    desc: 'Engraved with a name or date ,  a keepsake gift for milestone occasions and family celebrations.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1">
        <circle cx="16" cy="14" r="10"/>
        <circle cx="16" cy="14" r="5"/>
        <path d="M16 2 L16 6 M16 22 L16 26 M4 14 L8 14 M24 14 L28 14"/>
        <line x1="10" y1="26" x2="22" y2="26"/>
      </svg>
    ),
  },
  {
    tier: 'Corporate Gifting',
    tag: 'Bulk · Custom',
    desc: 'Bulk-order bell metal pieces for festive client and employee gifting, with custom branding options and scheduled delivery.',
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6" stroke="currentColor" strokeWidth="1">
        <rect x="6" y="10" width="20" height="16"/>
        <path d="M10 10 L10 6 L22 6 L22 10"/>
        <line x1="6" y1="17" x2="26" y2="17"/>
        <line x1="16" y1="10" x2="16" y2="26"/>
      </svg>
    ),
  },
];

export default function Gifting() {
  return (
    <section id="gifting" className="py-28 px-6 bg-cream-100">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div className="reveal">
            <p className="section-label text-brown-400 mb-4">Gifting & Corporate</p>
            <h2 className="section-heading">
              Gifting as a Service , <br />
              <span className="italic text-brown-400">Not Off the Shelf</span>
            </h2>
          </div>
          <div className="reveal delay-200">
            <span className="block h-px w-14 bg-brown-300 mb-6" />
            <p className="body-text">
              Our competitors sell gift sets. We offer a complete gifting experience ,  personalised
              engraving, curated packaging, scheduled delivery, and bulk corporate programs.
              Bell metal that carries meaning long after the occasion has passed.
            </p>
          </div>
        </div>

        {/* Gifting tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-cream-300">
          {GIFTING_TIERS.map((item, i) => (
            <div
              key={i}
              className={`reveal bg-cream-100 p-8 hover:bg-white hover:shadow-md transition-all duration-300 group border-t-2 border-transparent hover:border-brown-300 delay-${i * 100}`}
            >
              <div className="text-brown-400 group-hover:text-brown-500 mb-5 transition-colors">
                {item.icon}
              </div>
              <p className="font-sans text-[10px] tracking-widest uppercase text-brown-400 mb-3">
                {item.tag}
              </p>
              <h3 className="font-serif text-xl text-brown-800 mb-3 leading-snug">
                {item.tier}
              </h3>
              <p className="font-sans text-sm text-brown-500 leading-relaxed font-light">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-14 bg-brown-800 p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 reveal">
          <div>
            <p className="section-label text-brown-300 mb-3">Ready to Order?</p>
            <h3 className="font-serif text-3xl md:text-4xl text-cream-100 font-light leading-snug">
              Bespoke gifting programs<br />for every scale.
            </h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button
              className="btn-light"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start a Gifting Enquiry
            </button>
            <button
              className="btn-outline border-brown-400 text-cream-300 hover:bg-brown-600 hover:border-brown-600"
              onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Browse Collections
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
