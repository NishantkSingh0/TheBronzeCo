import { useEffect } from 'react';

export default function CollectionModal({ collection, onClose }) {
  const col = collection;

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={col.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brown-900/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative z-10 bg-cream-100 max-w-4xl w-full rounded-lg max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Header */}
        <div className="bg-brown-800 px-8 py-10 relative">
          <p className="section-label text-brown-300 mb-3">{col.label}</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream-100 font-light mb-2">
            {col.title}
          </h2>
          <p className="font-serif italic text-brown-300 text-xl font-light">
            {col.subtitle}
          </p>
          <p className="font-sans text-cream-300/70 text-sm mt-4 max-w-xl leading-relaxed font-light">
            {col.description}
          </p>

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-cream-300 hover:text-cream-100 transition-colors duration-200"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Products */}
        <div className="p-8">
          <p className="section-label text-brown-400 mb-6">Products in This Collection</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {col.products.map((p, i) => (
              <div
                key={i}
                className="bg-white border border-cream-300 p-6 hover:border-brown-300 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-serif text-xl text-brown-800 leading-snug group-hover:text-brown-600 transition-colors">
                    {p.name}
                  </h3>
                  <span className="font-sans text-[10px] tracking-widest uppercase text-brown-400 border border-brown-200 px-2 py-0.5 ml-2 shrink-0">
                    {p.tier}
                  </span>
                </div>
                <p className="font-sans text-sm text-brown-500 leading-relaxed font-light">
                  {p.desc}
                </p>
                <div className="mt-4 flex items-center gap-1">
                  <span className="font-sans text-xs text-brown-400 italic">Price on enquiry</span>
                  <span className="h-px w-8 bg-brown-200 inline-block ml-1" />
                </div>
              </div>
            ))}
          </div>

          {/* Purity note */}
          <div className="mt-8 bg-brown-800 p-6 flex items-start gap-4">
            <div className="shrink-0 text-brown-300 mt-0.5">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div>
              <p className="font-sans text-brown-300 text-xs tracking-widest uppercase mb-1">Purity Passport</p>
              <p className="font-sans text-cream-300/80 text-sm leading-relaxed font-light">
                Every piece in this collection carries a batch-level QR code linking to a third-party lab
                certificate and the artisan cluster of origin ,  proof, not just promise.
              </p>
            </div>
          </div>

          {/* Enquire CTA */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              className="btn-primary"
              onClick={() => {
                onClose();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Enquire About This Collection
            </button>
            <button className="btn-outline" onClick={onClose}>
              Continue Browsing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
