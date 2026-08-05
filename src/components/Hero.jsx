import { useEffect, useRef, useState, useCallback } from 'react';

// Each block is one "topic" ,  all four lines shown together, top to bottom.
const BLOCKS = [
  {
    label: 'Kansa Dinnerware',
    heading: 'Tradition,',
    heading2: 'Served Daily.',
    sub: 'Timeless Kansa thalis, bowls and glasses crafted to bring the beauty of Indian tradition to your everyday table.',
  },
  {
    label: 'Marriage Collection',
    heading: 'For Two.',
    heading2: 'For Generations.',
    sub: 'Bridal thalis, Jodi glass pairs and kitchen essentials created to become a lasting part of a new household.',
  },
  {
    label: 'Housewarming Collection',
    heading: 'A New Home.',
    heading2: 'An Auspicious Beginning.',
    sub: 'Kalash sets, dinnerware and traditional essentials designed for Griha Pravesh and the first celebrations of a new home.',
  },
  {
    label: 'Kansa Cookware',
    heading: 'Crafted to Cook.',
    heading2: 'Made to Endure.',
    sub: 'Traditional Kansa cookware made for kitchens where heritage, everyday utility and lasting craftsmanship belong together.',
  },
  {
    label: 'Festive Collection',
    heading: 'Celebrate',
    heading2: 'In Kansa.',
    sub: 'Puja thalis, serving sets and festive essentials created for Dhanteras, Diwali and celebrations throughout the year.',
  },
  {
    label: 'Premium Gifting',
    heading: 'Gift Something',
    heading2: 'Worth Keeping.',
    sub: 'Thoughtfully curated Kansa gift boxes and hampers for weddings, anniversaries, housewarmings and milestone occasions.',
  },
  {
    label: 'Personalised Kansa',
    heading: 'Made Special.',
    heading2: 'Made Personal.',
    sub: 'Personalised Kansa pieces engraved with names or dates, turning traditional serveware into meaningful keepsakes.',
  },
  {
    label: 'Corporate Gifting',
    heading: 'Make Your Gift',
    heading2: 'Mean More.',
    sub: 'Premium bell metal gifting collections for clients, employees and festive occasions, with custom branding options.',
  },
  {
    label: 'Everyday Essentials',
    heading: 'Not Just Occasions.',
    heading2: 'Every Single Day.',
    sub: 'Kansa glasses, bowls and complete dinner sets designed to bring traditional metalware into the modern everyday home.',
  },
  {
    label: 'Handcrafted Bell Metal',
    heading: 'Made by Hand.',
    heading2: 'Made to Last.',
    sub: 'Each piece carries the natural character of handcrafted bell metal ,  subtle variations that make every product uniquely its own.',
  },
];

// Order the lines appear in, top to bottom
const FIELD_ORDER = ['label', 'heading', 'heading2', 'sub'];

// Typing / erasing speed per field (ms per character ,  lower = faster)
const TYPE_SPEED = {
  label:    38,   // unchanged
  heading:  60,   // slower
  heading2: 60,   // slower
  sub:      20,   // faster
};
const DELETE_SPEED = {
  label:    10,   // faster erase than before
  heading:  34,   // slower
  heading2: 34,   // slower
  sub:      10,   // faster
};

// How long to hold a completed line before moving to the next line
const HOLD_AFTER_TYPE = {
  label:    500,
  heading:  500,
  heading2: 500,
  sub:      2200, // long pause on the full sentence before the next topic begins
};

// Small pause between "line finished holding" and "start erasing it" during a transition
const PRE_DELETE_PAUSE = 250;
// Small pause after a line is fully erased before typing the new one starts
const PRE_TYPE_PAUSE = 150;
const BLOCK_START_DELAY = 800;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function Hero() {
  const videoRef = useRef(null);
  const cancelledRef = useRef(false);

  // Displayed state
  const [label,    setLabel]    = useState('');
  const [heading,  setHeading]  = useState('');
  const [heading2, setHeading2] = useState('');
  const [sub,      setSub]      = useState('');

  // Cursor blink target ,  which field currently shows the caret
  const [cursor, setCursor] = useState('label');

  const settersRef = useRef({
    label:    setLabel,
    heading:  setHeading,
    heading2: setHeading2,
    sub:      setSub,
  });

  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Types `text` into `field`, one character at a time
  const typeField = useCallback(async (field, text) => {
    const setter = settersRef.current[field];
    setCursor(field);
    const speed = TYPE_SPEED[field];
    for (let i = 1; i <= text.length; i++) {
      if (cancelledRef.current) return;
      setter(text.slice(0, i));
      await delay(speed);
    }
  }, []);

  // Erases whatever is currently in `field`, one character at a time
  const deleteField = useCallback(async (field, currentText) => {
    const setter = settersRef.current[field];
    setCursor(field);
    const speed = DELETE_SPEED[field];
    for (let i = currentText.length; i >= 0; i--) {
      if (cancelledRef.current) return;
      setter(currentText.slice(0, i));
      await delay(speed);
    }
  }, []);

  const runSequence = useCallback(async () => {
    cancelledRef.current = false;
    await delay(BLOCK_START_DELAY);

    // Keep track of what's currently on screen, per field, so we know what to erase
    const current = { label: '', heading: '', heading2: '', sub: '' };

    let blockIndex = 0;

    while (!cancelledRef.current) {
      const block = BLOCKS[blockIndex % BLOCKS.length];
      for (const field of FIELD_ORDER) {
        if (cancelledRef.current) return;

        if (current[field]) {
          await delay(PRE_DELETE_PAUSE);
          if (cancelledRef.current) return;
          await deleteField(field, current[field]);
          await delay(PRE_TYPE_PAUSE);
        }

        if (cancelledRef.current) return;
        await typeField(field, block[field]);
        current[field] = block[field];

        await delay(HOLD_AFTER_TYPE[field]);
      }

      blockIndex++;
    }
  }, [typeField, deleteField]);

  useEffect(() => {
    runSequence();
    return () => {
      cancelledRef.current = true;
    };
  }, [runSequence]);

  // Blinking caret component
  const Caret = ({ field }) =>
    cursor === field ? (
      <span className="inline-block w-0.5 h-[0.85em] bg-brown-300 ml-0.5 align-middle animate-[caretBlink_0.8s_step-end_infinite]" />
    ) : null;

  return (
    <section id="hero" className="relative h-screen min-h-[640px] overflow-hidden">

      {/* ── Video background ── */}
      <video ref={videoRef} src="/Home.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover scale-105" style={{ filter: 'blur(3px) brightness(0.38) saturate(0.7)' }}/>

      {/* Dark + warm tint overlay so text always reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-b from-brown-900/60 via-brown-900/40 to-brown-900/70" />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[650px] h-[650px] rounded-full border border-brown-300/15  absolute" />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none">
        <p className="font-serif text-[10vw] font-light text-white/[0.025] whitespace-nowrap leading-none pb-2">
          The Bronze Co
        </p>
      </div>

      {/* ── Typewriter content ── */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">

        {/* Label */}
        <p className="section-label text-brown-300 mb-5 min-h-[1.2em]">
          {label}<Caret field="label" />
        </p>

        {/* Logo divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="h-px w-10 bg-gradient-to-r from-transparent to-brown-400/60" />
          <img src="/logo.png" alt="" className="h-8 w-8 object-contain opacity-60" />
          <span className="h-px w-10 bg-gradient-to-l from-transparent to-brown-400/60" />
        </div>

        {/* Heading line 1 */}
        <h1 className="font-serif font-light text-cream-100 leading-tight">
          <span className="block text-4xl md:text-5xl lg:text-8xl min-h-[1.15em]">
            {heading}<Caret field="heading" />
          </span>

          {/* Heading line 2 ,  shimmer */}
          <span className="block text-4xl md:text-5xl lg:text-8xl shimmer-text min-h-[1.15em]">
            {heading2}<Caret field="heading2" />
          </span>
        </h1>

        {/* Gold separator ,  only show once first heading appears */}
        <div
          className={`gold-line my-3 max-w-xs mx-auto transition-opacity duration-700 ${
            heading.length > 0 ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Sub description */}
        <p className="font-sans text-cream-300/75 text-sm md:text-base max-w-lg mx-auto leading-relaxed font-light mb-10 min-h-[3em]">
          {sub}<Caret field="sub" />
        </p>

        {/* CTAs ,  always visible */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="btn-light" onClick={() => scrollTo('#collections')}>
            Explore Collections
          </button>
          <button
            className="font-sans text-xs tracking-widest2 uppercase text-brown-300 hover:text-cream-100 transition-colors duration-200 py-3.5 flex items-center gap-2 justify-center"
            onClick={() => scrollTo('#why-kansa')}
          >
            Why Kansa
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </button>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-12 right-8 hidden md:flex flex-col items-center gap-2">
          <span className="font-sans text-[10px] tracking-widest3 uppercase text-brown-400/70 rotate-90 origin-center mb-4">
            Scroll
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-brown-400/50 to-transparent" />
        </div>
      </div>

      {/* Inject caret keyframe into <head> once */}

    </section>
  );
}