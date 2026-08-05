export default function Story() {
  return (
    <section id="story" className="py-28 px-6 bg-cream-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <div>
            <p className="section-label text-brown-400 mb-4 reveal">Our Story</p>
            <h2 className="section-heading mb-6 reveal delay-100">
              The Alloy That Outlives<br />
              <span className="italic text-brown-400">Every Occasion</span>
            </h2>
            <span className="block h-px w-14 bg-brown-300 mb-8 reveal delay-200" />

            <div className="space-y-5 reveal delay-300">
              <p className="body-text">
                The Bronze Co was founded on a single observation: the most credible Kansa brands
                were priced for collectors, and the most affordable options offered no credible
                purity assurance. No one was bridging the gap.
              </p>
              <p className="body-text">
                We built our brand around one proposition ,  <span className="font-medium text-brown-700">
                verified-pure Kansa, priced for everyday use.</span> Not just for special occasions.
                Not locked behind collector premiums. For the daily ritual at every Indian table.
              </p>
              <p className="body-text">
                We work directly with artisan clusters in Odisha and Assam ,  the same families
                whose craft has been documented for three millennia. Every batch is lab-tested.
                Every piece carries a QR code linking you to the results.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 reveal delay-400">
              <button
                className="btn-primary"
                onClick={() => document.querySelector('#purity')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Our Purity Promise
              </button>
              <button
                className="btn-outline"
                onClick={() => document.querySelector('#collections')?.scrollIntoView({ behavior: 'smooth' })}
              >
                See Collections
              </button>
            </div>
          </div>

          {/* Right: decorative feature blocks */}
          <div className="reveal-right">
            <div className="grid grid-cols-2 gap-4">
              {/* Block 1 */}
              <div className="col-span-2 bg-brown-800 p-8 relative overflow-hidden">
                <p className="font-serif text-5xl text-brown-300 font-light leading-none mb-2 opacity-30 absolute top-4 right-6 select-none">
                  I
                </p>
                <p className="section-label text-brown-300 mb-3">Heritage</p>
                <p className="font-serif text-2xl text-cream-100 font-light leading-snug">
                  Sourced from artisan clusters whose craft spans three thousand years.
                </p>
              </div>

              {/* Block 2 */}
              <div className="bg-cream-100 border border-cream-300 p-6">
                <p className="font-serif text-3xl text-brown-300 font-light mb-1">Odisha</p>
                <p className="font-sans text-xs text-brown-500 tracking-wide leading-relaxed">
                  Balakati cluster ,  Kansa dinnerware
                </p>
              </div>

              {/* Block 3 */}
              <div className="bg-cream-100 border border-cream-300 p-6">
                <p className="font-serif text-3xl text-brown-300 font-light mb-1">Assam</p>
                <p className="font-sans text-xs text-brown-500 tracking-wide leading-relaxed">
                  Sarthebari cluster ,  bell metal craft
                </p>
              </div>

              {/* Block 4 */}
              <div className="col-span-2 bg-brown-700 p-8 flex items-center gap-6">
                <div className="shrink-0">
                  <svg className="w-10 h-10 text-brown-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <div>
                  <p className="section-label text-brown-300 mb-1">Verified Purity</p>
                  <p className="font-sans text-cream-300/80 text-sm leading-relaxed font-light">
                    Lab-certified alloy composition on every batch.
                    QR-linked to results ,  scannable at the point of purchase.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
