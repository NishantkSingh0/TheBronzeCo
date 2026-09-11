export default function PurityPassport() {
  const steps = [
    {
      number: '01',
      title: 'Artisan Cluster Selection',
      body: 'We partner directly with craft clusters in Odisha (Balakati) and Assam (Sarthebari) ,  established bell metal traditions with traceable production.',
    },
    {
      number: '02',
      title: 'Batch-Level Lab Testing',
      body: 'Every production batch is independently tested by a third-party laboratory for alloy composition ,  copper content, tin ratio, and absence of harmful additives.',
    },
    {
      number: '03',
      title: 'QR Code Assignment',
      body: 'Each product receives a unique QR code tied to its specific production batch and the lab certificate for that batch.',
    },
    {
      number: '04',
      title: 'Scan Anytime',
      body: 'The buyer scans the QR at purchase or any time thereafter ,  and lands on the live certificate page with artisan cluster details.',
    },
  ];

  return (
    <section id="purity" className="py-28 px-6 bg-brown-900 overflow-hidden relative">

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-20 reveal">
          <p className="section-label text-brown-300 mb-4">Differentiation</p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light text-cream-100 leading-tight mb-6">
            The Purity Passport , <br />
            <span className="italic text-brown-300">Proof, Not Just Promise</span>
          </h2>
          <span className="block h-px w-14 bg-brown-400 mb-8" />
          <p className="font-sans text-cream-400/70 text-sm md:text-base leading-relaxed font-light">
            "Pure Kansa" is claimed by almost every seller in the category ,  yet almost none can
            prove it. We turned an unverifiable claim into a checkable fact.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-brown-700/30">
          {steps.map((step, i) => (
            <div
              key={i}
              className={`reveal bg-brown-800 p-8 hover:bg-brown-700 transition-colors duration-300 delay-${i * 100}`}
            >
              <p className="font-serif text-5xl font-light text-brown-600 mb-6 leading-none">
                {step.number}
              </p>
              <div className="h-px w-10 bg-brown-500 mb-6" />
              <h3 className="font-serif text-xl text-cream-100 font-light mb-4 leading-snug">
                {step.title}
              </h3>
              <p className="font-sans text-cream-400/60 text-sm leading-relaxed font-light">
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* QR mock visual */}
        <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <p className="section-label text-brown-300 mb-4">The Certificate</p>
            <h3 className="font-serif text-3xl md:text-4xl text-cream-100 font-light leading-snug mb-6">
              Everything you need to know ,  in one scan.
            </h3>
            <ul className="space-y-4">
              {[
                'Copper and tin alloy percentages from independent lab',
                'Artisan cluster name, region, and production date',
                'Absence of lead, cadmium, and harmful additives confirmed',
                'Direct link to the original lab report PDF',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1 h-1 rounded-full bg-brown-300 mt-2.5 shrink-0" />
                  <span className="font-sans text-cream-400/70 text-sm leading-relaxed font-light">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            <button
              className="btn-light mt-10"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Request a Sample Certificate
            </button>
          </div>

          {/* QR card mock */}
          <div className="reveal-right">
            <div className="bg-brown-800 p-10 max-w-sm mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <img src="/logo.png" alt="" className="h-8 w-8 object-contain" />
                <div>
                  <p className="font-serif text-cream-100 text-sm tracking-wide">The Bronze Co</p>
                  <p className="font-sans text-brown-400 text-[10px] tracking-widest uppercase">Purity Passport</p>
                </div>
              </div>

              {/* QR placeholder grid */}
              <div className="bg-cream-100 p-4 mb-6 flex items-center justify-center">
                <div className="w-32 h-32 grid grid-cols-8 grid-rows-8 gap-px opacity-80">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`${
                        Math.random() > 0.55 ? 'bg-brown-900' : 'bg-cream-100'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b border-brown-700">
                  <span className="font-sans text-brown-400 text-xs">Batch ID</span>
                  <span className="font-sans text-cream-300 text-xs font-medium">TBC-OD-2024-114</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brown-700">
                  <span className="font-sans text-brown-400 text-xs">Cluster</span>
                  <span className="font-sans text-cream-300 text-xs font-medium">Balakati, Odisha</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-brown-700">
                  <span className="font-sans text-brown-400 text-xs">Copper</span>
                  <span className="font-sans text-brown-300 text-xs font-medium">78.4%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="font-sans text-brown-400 text-xs">Tin</span>
                  <span className="font-sans text-brown-300 text-xs font-medium">21.6%</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <svg className="w-4 h-4 text-brown-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                <span className="font-sans text-brown-300 text-xs tracking-widest uppercase">Lab Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
