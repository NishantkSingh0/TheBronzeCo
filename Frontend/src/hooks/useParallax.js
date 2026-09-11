import { useEffect, useRef } from 'react';

/**
 * Applies a vertical parallax offset to the returned ref element.
 * @param {number} speed - multiplier (0.3 = subtle, 0.6 = strong)
 */
export function useParallax(speed = 0.35) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const rect = el.parentElement?.getBoundingClientRect() ?? el.getBoundingClientRect();
          const offset = -rect.top * speed;
          el.style.transform = `translateY(${offset}px)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}
