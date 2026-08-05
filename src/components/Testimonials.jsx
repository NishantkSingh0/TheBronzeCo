const TESTIMONIALS = [
  {
    quote:
      'The Purity Passport QR was the reason I chose The Bronze Co over every other seller I had bookmarked. Scanning the lab certificate at home felt reassuring in a way no "100% pure" label ever could.',
    author: 'Priya M.',
    role: 'Home buyer, Bengaluru',
  },
  {
    quote:
      'We ordered forty Bridal Thali Sets for our wedding gifting. The customisation, the packaging, and the documentation of purity ,  none of our other gifting vendors come close to this level of care.',
    author: 'Rahul & Ananya S.',
    role: 'Wedding gifting client, Hyderabad',
  },
  {
    quote:
      'Our Ayurveda retreat wanted Kansa dining as part of the guest experience. The Bronze Co provided the serveware, the story, and the lab certificates ,  everything we needed to explain the choice to our guests.',
    author: 'Meena R.',
    role: 'Owner, Wellness Resort ,  Coorg',
  },
  {
    quote:
      'The Everyday Dinner Set replaced our stainless steel thalis. My children ask why their food tastes better ,  I tell them it is the metal, and I can prove it.',
    author: 'Sunita K.',
    role: 'Daily use customer, Pune',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 bg-brown-900">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-16 reveal">
          <p className="section-label text-brown-300 mb-4">From Our Customers</p>
          <h2 className="font-serif text-4xl md:text-5xl text-cream-100 font-light leading-tight">
            What the Table <span className="italic text-brown-300">Remembers</span>
          </h2>
          <span className="block h-px w-14 bg-brown-400 mx-auto mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brown-700/30">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`reveal bg-brown-800 p-10 hover:bg-brown-700 transition-colors duration-300 delay-${i * 100}`}
            >
              {/* Large quote mark */}
              <p className="font-serif text-6xl text-brown-600 font-light leading-none mb-6 select-none">
                "
              </p>
              <p className="font-serif text-lg md:text-xl text-cream-200/80 font-light leading-relaxed mb-8 italic">
                {t.quote}
              </p>
              <div className="h-px bg-brown-600 mb-6" />
              <div>
                <p className="font-sans text-cream-100 text-sm font-medium">{t.author}</p>
                <p className="font-sans text-brown-400 text-xs mt-1">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
