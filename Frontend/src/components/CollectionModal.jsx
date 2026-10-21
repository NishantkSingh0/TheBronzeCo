import { useEffect, useRef } from 'react';

export default function CollectionModal({ collection: col, product, onClose, onSelect }) {
  const dialog = useRef(null);
  const panel = useRef(null);
  const currentIndex = col.products.findIndex((item) => item.id === product.id);

  // Lock body scroll
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    const element = dialog.current;
    element.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  // ESC to close
  const cancel = (event) => {
    event.preventDefault();
    onClose();
  };

  const selectProduct = (offset) => {
    onSelect(col.products[(currentIndex + offset + col.products.length) % col.products.length]);
    panel.current?.scrollTo({ top: 0 });
  };

  const enquire = () => {
    window.dispatchEvent(new CustomEvent('collection-enquiry', {
      detail: { name: product.name, collection: col.title },
    }));
    onClose();
    requestAnimationFrame(() => {
      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      document.querySelector('#contact textarea')?.focus({ preventScroll: true });
    });
  };

  return (
    <dialog ref={dialog} onCancel={cancel} aria-labelledby="piece-title" aria-describedby="piece-description"
      className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-transparent p-3 sm:p-6 md:p-10 open:flex items-center justify-center backdrop:bg-brown-900/80 backdrop:backdrop-blur-sm">
      {/* Backdrop */}
      <div className="absolute inset-0" aria-hidden="true" onClick={onClose} />

      {/* Panel */}
      <div ref={panel} className="relative bg-cream-100 max-w-6xl w-full max-h-[92dvh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-cream-100 border-b border-cream-300 px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <p className="text-[10px] uppercase tracking-widest text-brown-600">Our collections <span aria-hidden="true" className="mx-2">/</span> {col.title}</p>
          {/* Close */}
          <button type="button" onClick={onClose} className="p-2 text-brown-800 hover:bg-cream-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brown-600" aria-label="Close piece details">
            <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-cream-200/50 p-3 sm:p-6 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-cream-300">
            <img key={product.id} src={product.image} alt={product.name} width="800" height="800" className="w-full h-auto max-h-[65dvh] object-contain" />
          </div>
          <div className="p-6 md:p-9">
            <p className="section-label text-brown-600 mb-3">{col.label}</p>
            <h2 id="piece-title" className="font-serif text-4xl md:text-5xl text-brown-800 leading-tight mb-4">{product.name}</h2>
            <p id="piece-description" className="text-sm text-brown-600 leading-relaxed font-light">{product.desc}</p>
            <div className="border-l-2 border-brown-300 pl-4 my-6">
              <h3 className="text-[10px] uppercase tracking-widest text-brown-600 mb-2">What makes it special</h3>
              <p className="font-serif text-xl text-brown-800 leading-snug">{product.highlight}</p>
            </div>
            <dl className="text-sm divide-y divide-cream-300 border-y border-cream-300">
              {[
                ['Material', product.material],
                ['Design & finish', product.finish],
                ['A place for it', product.use],
              ].map(([label, value]) => (
                <div key={label} className="py-3 grid grid-cols-[100px_1fr] gap-4">
                  <dt className="text-brown-600 text-xs">{label}</dt>
                  <dd className="text-brown-800 text-xs leading-relaxed">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Purity note */}
            <div className="bg-cream-200/70 p-5 mt-6">
              <h3 className="text-[10px] uppercase tracking-widest text-brown-700 mb-2">Material & purity</h3>
              <p className="text-xs text-brown-700 leading-relaxed">{product.purity}</p>
              <p className="text-[10px] text-brown-600 leading-relaxed mt-3">Material descriptions reflect our collection specifications. A photograph cannot verify alloy composition; ask us about supporting documentation.</p>
            </div>

            {/* Enquire CTA */}
            <p className="text-xs text-brown-600 mt-6 mb-4">Price, dimensions, availability and care details on enquiry.</p>
            <div className="flex flex-col gap-3">
              <button type="button" className="btn-primary w-full" onClick={enquire}>Enquire about this piece</button>
              <button type="button" className="text-xs text-brown-600 underline underline-offset-4 py-2" onClick={onClose}>Back to the collection</button>
            </div>
          </div>
        </div>
        <div className="border-t border-cream-300 px-5 md:px-8 py-4 flex items-center justify-between gap-3">
          <button type="button" className="text-xs text-brown-700 p-2 hover:bg-cream-200" onClick={() => selectProduct(-1)} aria-label="Previous piece in this collection">← <span className="hidden sm:inline">Previous piece</span></button>
          <p className="text-[10px] text-brown-600 text-center" aria-live="polite">{currentIndex + 1} / {col.products.length} <span className="hidden sm:inline">in {col.title}</span></p>
          <button type="button" className="text-xs text-brown-700 p-2 hover:bg-cream-200" onClick={() => selectProduct(1)} aria-label="Next piece in this collection"><span className="hidden sm:inline">Next piece</span> →</button>
        </div>
      </div>
    </dialog>
  );
}
