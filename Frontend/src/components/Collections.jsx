import { useState } from 'react';
import { collections } from '../data/collections';
import CollectionModal from './CollectionModal';

const COLLECTION_COLORS = [
  { bg: 'bg-brown-800',  text: 'text-cream-100', border: 'border-brown-600', accent: 'text-brown-300' },
  { bg: 'bg-cream-200',  text: 'text-brown-800', border: 'border-cream-400', accent: 'text-brown-500' },
  { bg: 'bg-brown-700',  text: 'text-cream-100', border: 'border-brown-500', accent: 'text-brown-300' },
  { bg: 'bg-brown-500',  text: 'text-cream-100', border: 'border-brown-400', accent: 'text-brown-200' },
  { bg: 'bg-cream-100',  text: 'text-brown-800', border: 'border-cream-300', accent: 'text-brown-400' },
];

// Simple SVG illustrations per collection
const CollectionIllustration = ({ id }) => {
  const map = {
    vivaah: (
      // Wedding rings + thali
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
        <ellipse cx="60" cy="75" rx="35" ry="6" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="60" cy="75" rx="35" ry="20" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="40" r="18" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="60" cy="40" r="10" stroke="currentColor" strokeWidth="1"/>
        <line x1="42" y1="40" x2="78" y2="40" stroke="currentColor" strokeWidth="0.8"/>
        <line x1="60" y1="22" x2="60" y2="58" stroke="currentColor" strokeWidth="0.8"/>
      </svg>
    ),
    grihapravesh: (
      // Kalash
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
        <path d="M50 90 L42 50 Q38 30 60 24 Q82 30 78 50 L70 90Z" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="45" y1="90" x2="75" y2="90" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="48" y1="95" x2="72" y2="95" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="52" y1="100" x2="68" y2="100" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="55" y1="24" x2="65" y2="24" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="24" x2="60" y2="14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M52 14 Q60 8 68 14" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M45 55 Q40 62 45 66" stroke="currentColor" strokeWidth="1"/>
        <path d="M75 55 Q80 62 75 66" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    gifting: (
      // Gift box
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
        <rect x="28" y="55" width="64" height="46" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="22" y="44" width="76" height="14" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="44" x2="60" y2="101" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M60 44 C60 44 48 36 48 28 C48 20 60 18 60 28 C60 18 72 20 72 28 C72 36 60 44 60 44Z" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    festive: (
      // Diya
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
        <path d="M30 75 Q40 55 60 50 Q80 55 90 75 Q70 85 60 85 Q50 85 30 75Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M60 50 C55 38 52 28 60 20 C68 28 65 38 60 50Z" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="60" y1="20" x2="60" y2="14" stroke="currentColor" strokeWidth="1.5"/>
        <ellipse cx="60" cy="12" rx="4" ry="2" stroke="currentColor" strokeWidth="1"/>
        {[20,40,60,80,100].map((x,i) => (
          <circle key={i} cx={x} cy={96} r="2" stroke="currentColor" strokeWidth="1"/>
        ))}
        <line x1="18" y1="100" x2="102" y2="100" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    everyday: (
      // Water glass + bowl
      <svg viewBox="0 0 120 120" fill="none" className="w-full h-full opacity-20">
        <path d="M45 30 L40 90 L80 90 L75 30Z" stroke="currentColor" strokeWidth="1.5"/>
        <line x1="38" y1="50" x2="82" y2="50" stroke="currentColor" strokeWidth="1"/>
        <ellipse cx="60" cy="90" rx="20" ry="4" stroke="currentColor" strokeWidth="1"/>
        <line x1="20" y1="100" x2="100" y2="100" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M20 100 Q60 80 100 100" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
  };
  return map[id] || null;
};

export default function Collections() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="collections" className="py-24 px-6 bg-brown-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label text-brown-300 mb-4">Our Collections</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-cream-100 leading-tight">
            Five Occasions.<br />
            <span className="italic text-brown-300">One Sacred Metal.</span>
          </h2>
          <span className="divider-line bg-brown-400" />
          <p className="font-sans text-cream-400/70 text-sm max-w-xl mx-auto leading-relaxed font-light">
            From the wedding thali to the morning ritual glass ,  each collection is
            built around the moments that matter most in Indian life.
          </p>
        </div>

        {/* Featured large card + 2 below */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brown-700/30">
          {collections.map((col, i) => {
            const c = COLLECTION_COLORS[i];
            return (
              <div
                key={col.id}
                className={`collection-card relative overflow-hidden cursor-pointer group ${c.bg} ${
                  i === 0 ? 'md:col-span-2 min-h-[420px]' : 'min-h-[320px]'
                } reveal delay-${Math.min(i * 100, 400)}`}
                onClick={() => setSelected(col)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setSelected(col)}
              >
                {/* Illustration background */}
                <div className={`absolute inset-0 flex items-center justify-end pr-12 ${c.text} pointer-events-none`}>
                  <div className="w-48 h-48 md:w-64 md:h-64">
                    <CollectionIllustration id={col.id} />
                  </div>
                </div>

                {/* Hover overlay */}
                <div
                  className={`card-overlay absolute inset-0 opacity-0 ${
                    i % 2 === 0
                      ? 'bg-gradient-to-r from-brown-900/80 to-transparent'
                      : 'bg-gradient-to-r from-brown-900/70 to-transparent'
                  }`}
                />

                {/* Content */}
                <div className="relative z-10 p-10 md:p-12 h-full flex flex-col justify-between">
                  <div>
                    <p className={`font-sans text-xs tracking-widest2 uppercase mb-3 ${c.accent}`}>
                      {col.label}
                    </p>
                    <h3 className={`font-serif text-3xl md:text-4xl font-light mb-2 ${c.text}`}>
                      {col.title}
                    </h3>
                    <p className={`font-serif italic text-lg font-light mb-4 ${c.accent}`}>
                      {col.subtitle}
                    </p>
                    <p className={`font-sans text-sm leading-relaxed font-light max-w-md ${
                      c.text === 'text-cream-100' ? 'text-cream-300/80' : 'text-brown-600'
                    }`}>
                      {col.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <span className={`font-sans text-[10px] tracking-widest3 uppercase ${c.accent}`}>
                      {col.accent}
                    </span>
                    <button
                      className={`font-sans text-xs tracking-widest2 uppercase flex items-center gap-2 transition-colors duration-200 ${
                        c.text === 'text-cream-100'
                          ? 'text-cream-300 group-hover:text-brown-300'
                          : 'text-brown-600 group-hover:text-brown-400'
                      }`}
                    >
                      View Collection
                      <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Number badge */}
                <div className={`absolute top-6 right-8 font-serif text-7xl font-light opacity-10 ${c.text} select-none pointer-events-none`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 reveal">
          <p className="font-sans text-brown-400 text-xs tracking-widest uppercase mb-6">
            All products carry the Purity Passport ,  QR-linked lab certificate
          </p>
          <button
            className="btn-light"
            onClick={() => document.querySelector('#purity')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Learn About Purity Passport
          </button>
        </div>
      </div>

      {/* Collection detail modal */}
      {selected && (
        <CollectionModal collection={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
