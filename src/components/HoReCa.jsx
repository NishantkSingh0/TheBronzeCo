const VERTICALS = [
  {
    name: 'Boutique Hotels',
    sub: 'Hospitality',
    copy: 'Bell metal serveware that signals wellness and heritage ,  a table story your guests take home.',
    benefit: 'Custom branding · Bulk supply · Artisan story collateral',
  },
  {
    name: 'Ayurveda Resorts',
    sub: 'Wellness',
    copy: 'Kansa is a sattvic metal ,  naturally aligned with Ayurvedic dining philosophy. We supply the science and the story.',
    benefit: 'Lab-certified purity · Wellness narrative support · Dedicated account',
  },
  {
    name: 'Restaurants',
    sub: 'Food & Beverage',
    copy: 'Heritage serveware with a menu story. From chaat bowls to thali sets ,  curated for front-of-house use.',
    benefit: 'Durable cast range · Chef consultations · Custom sizing',
  },
  {
    name: 'Corporate Programmes',
    sub: 'B2B Gifting',
    copy: 'Festive employee gifts, client hampers, and onboarding kits ,  bell metal that carries your brand\'s intent.',
    benefit: 'Engraving · Custom packaging · Scheduled delivery',
  },
];

export default function HoReCa() {
  return (
    <section id="horeca" className="py-28 px-6 bg-brown-800 relative overflow-hidden">
      {/* Decorative rule */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brown-400/30 to-transparent" />

      {/* Background text */}
      <div className="absolute right-0 bottom-0 overflow-hidden pointer-events-none select-none">
        <p className="font-serif text-[15vw] font-light text-white/[0.02] whitespace-nowrap leading-none">
          B2B
        </p>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-20">
          <div className="reveal">
            <p className="section-label text-brown-300 mb-4">Institutional & B2B</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-cream-100 leading-tight">
              Serveware That Tells<br />
              <span className="italic text-brown-300">Your Wellness Story</span>
            </h2>
          </div>
          <div className="reveal delay-200">
            <span className="block h-px w-14 bg-brown-400 mb-6" />
            <p className="font-sans text-cream-400/70 text-sm md:text-base leading-relaxed font-light">
              No competitor in the bell metal category currently leads with a dedicated hospitality
              or institutional program. We do. From a single resort's thali supply to a 500-piece
              corporate gifting run ,  with purity documentation for every batch.
            </p>
          </div>
        </div>

        {/* Verticals grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brown-600/20">
          {VERTICALS.map((v, i) => (
            <div
              key={i}
              className={`reveal bg-brown-800 hover:bg-brown-700 transition-colors duration-300 p-10 group border-t border-brown-700 delay-${i * 100}`}
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="section-label text-brown-400 mb-2">{v.sub}</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-cream-100 font-light">
                    {v.name}
                  </h3>
                </div>
                <span className="font-serif text-5xl text-brown-700 font-light select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className="font-sans text-cream-400/70 text-sm leading-relaxed font-light mb-6">
                {v.copy}
              </p>

              <div className="h-px bg-brown-600 mb-6" />

              <p className="font-sans text-brown-400 text-xs tracking-wide">
                {v.benefit}
              </p>

              <button
                className="mt-6 font-sans text-xs tracking-widest uppercase text-brown-300 hover:text-cream-100 transition-colors duration-200 flex items-center gap-2 group-hover:gap-3"
                onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Enquire
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="mt-20 text-center reveal">
          <div className="gold-line max-w-xs mx-auto mb-10 bg-brown-500" />
          <blockquote className="font-serif text-2xl md:text-3xl text-cream-200/70 font-light italic max-w-2xl mx-auto leading-relaxed">
            "Serveware that tells your wellness story on every table."
          </blockquote>
          <p className="font-sans text-brown-400 text-xs tracking-widest mt-4 uppercase">
            ,  The Bronze Co HoReCa Program
          </p>
          <div className="gold-line max-w-xs mx-auto mt-10 bg-brown-500" />
        </div>
      </div>
    </section>
  );
}
