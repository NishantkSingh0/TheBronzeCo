import { useEffect, useRef, useState } from 'react';
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

const shuffle = (items) => {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Collections() {
  const [orderedCollections] = useState(() => shuffle(collections).map((col) => ({ ...col, products: shuffle(col.products) })));
  const [allProducts] = useState(() => shuffle(orderedCollections.flatMap((col) => col.products.map((product) => ({ ...product, collectionId: col.id })))));
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [previewLimit, setPreviewLimit] = useState(() => window.innerWidth >= 1024 ? 6 : window.innerWidth >= 640 ? 4 : 2);
  const catalogue = useRef(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const tablet = window.matchMedia('(min-width: 640px)');
    const updateLimit = () => setPreviewLimit(desktop.matches ? 6 : tablet.matches ? 4 : 2);
    desktop.addEventListener('change', updateLimit);
    tablet.addEventListener('change', updateLimit);
    return () => {
      desktop.removeEventListener('change', updateLimit);
      tablet.removeEventListener('change', updateLimit);
    };
  }, []);

  useEffect(() => {
    const handleBrowse = ({ detail }) => {
      if (!collections.some((col) => col.id === detail)) return;
      setCategory(detail);
      setQuery('');
      setExpanded(false);
      catalogue.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    window.addEventListener('collection-browse', handleBrowse);
    return () => window.removeEventListener('collection-browse', handleBrowse);
  }, []);

  const total = collections.reduce((count, col) => count + col.products.length, 0);
  const search = query.trim().toLowerCase();
  const visible = orderedCollections
    .filter((col) => category === 'all' || col.id === category)
    .map((col) => ({ ...col, products: col.products.filter((product) =>
      [product.name, product.desc, product.material, product.finish, col.title]
        .join(' ').toLowerCase().includes(search)) }))
    .filter((col) => col.products.length);
  const resultCount = visible.reduce((count, col) => count + col.products.length, 0);
  const matchingIds = new Set(visible.flatMap((col) => col.products.map((product) => product.id)));
  const groups = category === 'all'
    ? [{ id: 'all', products: allProducts.filter((product) => matchingIds.has(product.id)) }]
    : visible;

  const canExpand = resultCount > previewLimit;
  const shownCount = expanded ? resultCount : Math.min(resultCount, previewLimit);

  const browseCategory = (id) => {
    setCategory(id);
    setQuery('');
    setExpanded(false);
    catalogue.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="collections" className="bg-cream-100 scroll-mt-20">
      <div className="bg-brown-900 px-6 pt-24 pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <p className="section-label text-brown-300 mb-5">The Bronze Co / Our Collections</p>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-cream-100 leading-tight">
                Objects for living.<br /><span className="italic text-brown-300">Pieces worth keeping.</span>
              </h2>
            </div>
            <div className="max-w-sm">
              <p className="text-cream-300 text-sm leading-relaxed font-light">
                For the table, the everyday ritual and the thoughtfully made home.
                Explore our collection, one considered piece at a time.
              </p>
              <p className="mt-5 text-brown-300 text-[10px] uppercase tracking-widest2">
                {String(collections.length).padStart(2, '0')} collections <span className="mx-3">/</span> {total} designs to discover
              </p>
            </div>
          </div>

          {/* Featured large card + 2 below */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {orderedCollections.map((col, i) => {
              const c = COLLECTION_COLORS[i];
              return (
                <button key={col.id} type="button" onClick={() => browseCategory(col.id)}
                  className={`collection-card group relative flex flex-col self-stretch text-left bg-cream-100 border ${c.border} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-300`}>
                  {/* Illustration background */}
                  <div className="relative w-full shrink-0 bg-brown-900">
                    <img src={col.cover} alt={col.title} loading="lazy" decoding="async"
                      className="block w-full h-auto" />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-brown-800/5 group-hover:bg-transparent transition-colors" />
                  </div>
                  {/* Content */}
                  <div className="p-4 md:p-5 flex flex-col flex-1 w-full">
                    <p className="text-[9px] uppercase tracking-widest text-brown-600 mb-2">{col.products.length} designs</p>
                    <h3 className="font-serif text-xl md:text-2xl text-brown-800 leading-tight">{col.title}</h3>
                    <span className="block text-[10px] uppercase tracking-widest text-brown-600 mt-auto pt-4 group-hover:text-brown-800">Explore collection <span aria-hidden="true">↗</span></span>
                  </div>
                  {/* Number badge */}
                  <span className="absolute top-2 left-2 bg-cream-100/95 px-2 py-1 font-serif text-sm text-brown-800" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div ref={catalogue} id="collection-catalogue" className="max-w-7xl mx-auto px-6 pt-16 pb-14 md:pt-24 md:pb-20 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <p className="section-label mb-3">Find your piece</p>
            <h3 className="font-serif text-4xl md:text-5xl text-brown-800">The collection edit</h3>
          </div>
          <label className="flex items-center gap-3 border-b border-brown-200 pb-3 w-full md:w-80 text-brown-600 focus-within:border-brown-600">
            <svg aria-hidden="true" className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
            <span className="sr-only">Search collection pieces</span>
            <input type="search" value={query} onChange={(e) => { setQuery(e.target.value); setExpanded(false); }} placeholder="Search bowls, birds, kansa…"
              className="bg-transparent w-full text-sm outline-none placeholder:text-brown-600" />
          </label>
        </div>
        <div className="flex flex-wrap gap-2 border-b border-cream-300 pb-6" role="group" aria-label="Filter collections">
          {[{ id: 'all', title: 'All pieces', products: { length: total } }, ...orderedCollections].map((col) => (
            <button key={col.id} type="button" aria-pressed={category === col.id} onClick={() => { setCategory(col.id); setExpanded(false); }}
              className={`px-4 py-2.5 text-xs border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-600 ${category === col.id ? 'bg-brown-800 text-cream-100 border-brown-800' : 'border-cream-300 text-brown-700 hover:border-brown-400'}`}>
              {col.title} <span className="ml-2 opacity-70">{col.products.length}</span>
            </button>
          ))}
        </div>
        <p className="text-xs text-brown-600 py-5" role="status" aria-live="polite">
          Showing {shownCount} of {resultCount} {resultCount === 1 ? 'piece' : 'pieces'}{search ? ` matching “${query.trim()}”` : ' to explore'}
          <span className="hidden sm:inline"> <span className="mx-2">/</span> Select a piece for design details & materials</span>
        </p>

        <div id="collection-products" className="space-y-16">
          {groups.map((col) => (
            <section key={col.id} aria-label={category === 'all' ? 'All collection pieces' : undefined} aria-labelledby={category === 'all' ? undefined : `category-${col.id}`}>
              {category !== 'all' && <div className="flex items-center justify-between gap-6 mb-7 border-t border-cream-300 pt-7">
                <div className="max-w-2xl">
                  <p className="text-[10px] uppercase tracking-widest2 text-brown-600 mb-2">{col.label}</p>
                  <h4 id={`category-${col.id}`} className="font-serif text-3xl md:text-4xl text-brown-800 mb-2">{col.title}</h4>
                  <p className="text-sm text-brown-600 leading-relaxed font-light">{col.description}</p>
                </div>
                <div className="w-20 h-20 hidden md:block text-brown-600 shrink-0" aria-hidden="true"><CollectionIllustration id={col.icon} /></div>
              </div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {(expanded ? col.products : col.products.slice(0, previewLimit)).map((product) => (
                  <button key={product.id} type="button" onClick={() => setSelected({ collection: orderedCollections.find((item) => item.id === (product.collectionId || col.id)), product })}
                    className="collection-card group text-left flex flex-col bg-white border border-cream-300 hover:border-brown-300 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brown-600">
                    <div className="aspect-[4/3] bg-cream-200/40 overflow-hidden w-full border-b border-cream-300">
                      <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="600" height="450"
                        className="card-img w-full h-full object-contain motion-reduce:transform-none" />
                    </div>
                    <div className="p-5 md:p-6 flex flex-col flex-1 w-full">
                      <p className="text-[9px] uppercase tracking-widest text-brown-600 mb-2">{product.material}</p>
                      <h5 className="font-serif text-2xl leading-tight text-brown-800 mb-3">{product.name}</h5>
                      <p className="text-sm leading-relaxed text-brown-600 font-light line-clamp-2">{product.desc}</p>
                      <div className="mt-auto pt-5">
                        <p className="text-[10px] text-brown-600 border-t border-cream-300 pt-3">{product.finish}</p>
                        <div className="flex items-center justify-between gap-2 mt-4">
                          <span className="text-[10px] text-brown-600">Price on enquiry</span>
                          <span className="text-[10px] tracking-widest uppercase text-brown-800">View piece <span aria-hidden="true" className="inline-block group-hover:translate-x-1 transition-transform">→</span></span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
        {canExpand && (
          <div className="relative isolate mt-8 overflow-hidden border border-cream-300 bg-white/60 px-6 py-8 md:py-10 text-center backdrop-blur-xl shadow-[0_12px_40px_-24px_rgba(61,26,0,0.2)]">
            <div aria-hidden="true" className="pointer-events-none absolute -inset-8 -z-10 bg-gradient-to-r from-cream-200/80 via-white/50 to-brown-100/50 blur-2xl" />
            <p className="section-label text-brown-600 mb-3">{expanded ? 'The complete edit' : 'A little more to discover'}</p>
            <p className="font-serif text-2xl md:text-3xl text-brown-800 mb-5">{expanded ? 'Every piece, in view.' : `${resultCount - shownCount} more considered pieces await.`}</p>
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="collection-products"
              className="btn-primary inline-flex items-center justify-center gap-3 animate-pulse"
              onClick={() => {
                setExpanded((current) => !current);
                if (expanded) {
                  catalogue.current?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                  });
                }
              }}
            >
              {expanded ? 'Show fewer pieces' : `View all ${resultCount} pieces`}
              <svg aria-hidden="true" className={`w-4 h-4 transition-transform motion-reduce:transition-none ${   expanded ? 'rotate-180' : '' }`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" >
                <path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6"
                />
              </svg>
            </button>
          </div>
        )}
        {!resultCount && (
          <div className="text-center border border-cream-300 px-6 py-16">
            <h4 className="font-serif text-3xl text-brown-800 mb-3">A different search, perhaps?</h4>
            <p className="text-sm text-brown-600 mb-6">Try “bowl”, “marble” or “patinated”, or explore all our pieces..</p>
            <button type="button" className="btn-outline" onClick={() => { setCategory('all'); setQuery(''); setExpanded(false); }}>Reset filters</button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-brown-800 p-8 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-2xl">
            <p className="section-label text-brown-300 mb-3">Materials, thoughtfully considered</p>
            <h3 className="font-serif text-3xl md:text-4xl text-cream-100 mb-4">Know the piece. Love it for longer.</h3>
            <p className="text-sm text-cream-300 leading-relaxed font-light">Pure kansa and bronze sit alongside marble, wood and glass in this collection. Each piece has its own material note. Patina, polish and colour describe a finish—not proof of composition. Ask us about material documentation and care before ordering.</p>
          </div>
          <button type="button" className="btn-light shrink-0" onClick={() => document.querySelector('#purity')?.scrollIntoView({ behavior: 'smooth' })}>Our approach to purity</button>
        </div>
      </div>

      {/* Collection detail modal */}
      {selected && <CollectionModal collection={selected.collection} product={selected.product} onClose={() => setSelected(null)}
        onSelect={(product) => setSelected((current) => ({ ...current, product }))} />}
    </section>
  );
}
