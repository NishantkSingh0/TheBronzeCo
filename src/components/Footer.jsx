// Each link maps to the section id it should scroll to
const NAV = {
  Collections: [
    { label: 'Vivaah',               href: '#collections' },
    { label: 'Griha Pravesh',         href: '#collections' },
    { label: 'Gifting',               href: '#gifting'     },
    { label: 'Festive',               href: '#collections' },
    { label: 'Everyday & Wellness',   href: '#collections' },
  ],
  'Our Brand': [
    { label: 'Our Story',        href: '#story'      },
    { label: 'Purity Passport',  href: '#purity'     },
    { label: 'Artisan Clusters', href: '#story'      },
    { label: 'Care Guide',       href: '#care'       },  // CareNote section gets id below
  ],
  'B2B & Trade': [
    { label: 'HoReCa Program',    href: '#horeca'  },
    { label: 'Corporate Gifting', href: '#gifting' },
    { label: 'Bulk Orders',       href: '#contact' },
    { label: 'Trade Enquiries',   href: '#contact' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-brown-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Pre-footer CTA */}
        <div className="border-t border-b border-brown-700 py-14 mb-14 text-center">
          <p className="section-label text-brown-300 mb-4">Begin Here</p>
          <h2 className="font-serif text-3xl md:text-5xl text-cream-100 font-light leading-tight mb-8">
            One Piece. <span className="italic text-brown-300">A Daily Ritual.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="btn-light"
              onClick={() => scrollTo('#collections')}
            >
              Explore Collections
            </button>
            <button
              className="btn-outline border-brown-500 text-cream-300 hover:bg-brown-700 hover:border-brown-700"
              onClick={() => scrollTo('#contact')}
            >
              Enquire Now
            </button>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="The Bronze Co" className="h-10 w-10 object-contain" />
              <div>
                <p className="font-serif text-cream-100 text-sm tracking-wider">The Bronze Co</p>
                <p className="font-sans text-brown-400 text-[10px] tracking-widest uppercase">Ancient Alloy. Everyday Table.</p>
              </div>
            </div>
            <p className="font-sans text-brown-500 text-xs leading-relaxed mb-6">
              Verified-pure Kansa, sourced from artisan clusters in Odisha and Assam.
              Lab-certified. Priced for daily use.
            </p>
            <div className="flex gap-3 items-center">
              {[
                {
                  label: 'Instagram',
                  value: '@tbronzeco',
                  href: 'https://www.instagram.com/tbronzeco/',
                  icon: (
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  ),
                },
                {
                  label: 'WhatsApp',
                  value: '+91 98XX5 4XX10',
                  href: '#',
                  icon: (
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  aria-label={s.label}
                  className=" group flex items-center h-10 w-10 hover:w-44 overflow-hidden rounded-full border border-brown-500/30 text-brown-500 hover:text-brown-300 hover:border-brown-400/60 hover:bg-brown-900/20 transition-all duration-500 ease-out"
                >
                  {/* Icon */}
                  <div className="w-10 h-10 min-w-10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {s.icon}
                    </svg>
                  </div>

                  {/* Text revealed on hover */}
                  <span
                    className=" whitespace-nowrap text-sm font-medium opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 pr-4"
                  >
                    {s.value}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {Object.entries(NAV).map(([section, links]) => (
            <div key={section}>
              <p className="font-sans text-[10px] tracking-widest3 uppercase text-brown-400 mb-5">
                {section}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="font-sans text-sm text-brown-500 hover:text-brown-200 transition-colors duration-200 font-light text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brown-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-brown-600 text-xs">
            © {year} The Bronze Co. All rights reserved.
          </p>
          <p className="font-sans text-brown-600 text-xs italic">
            Every piece is handcrafted and may carry small natural variations ,  a mark of authenticity, not a flaw.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms'].map((l) => (
              <p key={l} className="font-sans text-brown-600 text-xs hover:text-brown-400 transition-colors duration-200">
                {l}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
