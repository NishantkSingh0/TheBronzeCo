import { useEffect, useRef } from 'react';

// Custom cursor
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    const move = (event) => {
      const interactive = event.target instanceof Element && event.target.closest('a, button, [role="button"]');
      for (const element of [dot.current, ring.current]) {
        element.style.left = `${event.clientX}px`;
        element.style.top = `${event.clientY}px`;
        element.style.visibility = 'visible';
      }
      const size = interactive ? '52px' : '32px';
      ring.current.style.width = size;
      ring.current.style.height = size;
    };
    const hide = () => {
      dot.current.style.visibility = 'hidden';
      ring.current.style.visibility = 'hidden';
    };
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseleave', hide);
    window.addEventListener('blur', hide);
    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseleave', hide);
      window.removeEventListener('blur', hide);
    };
  }, []);

  return (
    <>
      <div ref={dot} aria-hidden="true" className="cursor-dot hidden md:block" style={{ visibility: 'hidden' }} />
      <div ref={ring} aria-hidden="true" className="cursor-ring hidden md:block" style={{ visibility: 'hidden' }} />
    </>
  );
}
