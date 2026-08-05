import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Our Story',   href: '#story' },
  { label: 'Collections', href: '#collections' },
  { label: 'Why Kansa',   href: '#why-kansa' },
  { label: 'Gifting',     href: '#gifting' },
  { label: 'B2B',         href: '#horeca' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [activeHash, setActiveHash] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    setActiveHash(href);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-brown-900/50 shadow-md backdrop-blur-md py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNav('#hero'); }}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.png"
              alt="The Bronze Co"
              className="h-10 w-10 object-contain"
            />
            <div className="flex flex-col leading-none">
              <span className="font-serif text-cream-100 text-lg font-bold tracking-wider">
                The Bronze Co
              </span>
              <span className="font-sans text-brown-300 font-bold text-[10px] tracking-widest2 uppercase">
                Ancient Alloy. Everyday Table.
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className={`font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                  activeHash === link.href
                    ? 'text-brown-300'
                    : 'text-cream-300 hover:text-brown-300'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => handleNav('#contact')}
              className="btn-light text-[11px] py-2.5 px-6"
            >
              Enquire
            </button>
          </nav>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-px bg-cream-200 transition-all duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-cream-200 transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-px bg-cream-200 transition-all duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

{/* Mobile Fullscreen Menu */}
<div
  className={`fixed inset-0 z-40 w-screen h-[100dvh] bg-brown-900
    transition-all duration-500 ease-out
    ${
      menuOpen
        ? 'opacity-100 visible pointer-events-auto'
        : 'opacity-0 invisible pointer-events-none'
    }`}
>
  {/* Optional subtle overlay */}
  <div className="absolute inset-0 bg-brown-900/95 backdrop-blur-md" />

  {/* Menu Content */}
  <nav
    className="relative z-10 w-full h-full flex flex-col
               items-center justify-center text-center px-6"
  >
    {/* Nav Links */}
    <div className="flex flex-col items-center gap-7">
      {navLinks.map((link, index) => (
        <button
          key={link.href}
          onClick={() => handleNav(link.href)}
          style={{
            transitionDelay: menuOpen
              ? `${150 + index * 90}ms`
              : '0ms',
          }}
          className={`
            font-serif text-3xl text-cream-200
            hover:text-brown-300
            transition-all duration-500 ease-out

            ${
              menuOpen
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }
          `}
        >
          {link.label}
        </button>
      ))}

      {/* Enquire Button */}
      <button
        onClick={() => handleNav('#contact')}
        style={{
          transitionDelay: menuOpen
            ? `${150 + navLinks.length * 90}ms`
            : '0ms',
        }}
        className={`
          btn-light mt-5 text-[11px]
          transition-all duration-500 ease-out

          ${
            menuOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }
        `}
      >
        Enquire Now
      </button>
    </div>

    {/* Bottom Content */}
    <div
      style={{
        transitionDelay: menuOpen
          ? `${250 + navLinks.length * 90}ms`
          : '0ms',
      }}
      className={`
        absolute bottom-10 left-6 right-6
        transition-all duration-700 ease-out

        ${
          menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4'
        }
      `}
    >
      <div className="gold-line w-full max-w-sm mx-auto mb-5" />

      <span className="font-sans text-brown-400 text-[10px] tracking-widest uppercase">
        Ancient Alloy. Everyday Table.
      </span>
    </div>
  </nav>
</div>
    </>
  );
}
