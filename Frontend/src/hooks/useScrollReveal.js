import { useEffect, useRef } from 'react';

/**
 * Attaches an IntersectionObserver that adds the 'visible' class
 * to matching elements once they enter the viewport.
 *
 * Usage: call useScrollReveal() once at the top of your component tree
 * (e.g. in App.jsx). All elements with class "reveal", "reveal-left",
 * "reveal-right", or "reveal-scale" will animate in automatically.
 */
export function useScrollReveal(threshold = 0.12) {
  useEffect(() => {
    const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
    const elements = document.querySelectorAll(selectors);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      { threshold }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);
}

/**
 * Returns a ref you can attach to a single element for reveal-on-scroll.
 */
export function useRevealRef(type = 'reveal', delay = 0) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add(type);
    if (delay) el.style.transitionDelay = `${delay}ms`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [type, delay]);

  return ref;
}
