import { useEffect } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';

import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import Story        from './components/Story';
import WhyBronze    from './components/WhyBronze';
import Collections  from './components/Collections';
import PurityPassport from './components/PurityPassport';
import Gifting      from './components/Gifting';
import HoReCa       from './components/HoReCa';
import CareNote     from './components/CareNote';
import Testimonials from './components/Testimonials';
import Contact      from './components/Contact';
import Footer       from './components/Footer';

// Custom cursor
function Cursor() {
  useEffect(() => {
    const dot  = document.querySelector('.cursor-dot');
    const ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    const move = (e) => {
      dot.style.left  = `${e.clientX}px`;
      dot.style.top   = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top  = `${e.clientY}px`;
    };

    const grow = () => {
      ring.style.width  = '52px';
      ring.style.height = '52px';
    };
    const shrink = () => {
      ring.style.width  = '32px';
      ring.style.height = '32px';
    };

    window.addEventListener('mousemove', move);
    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', grow);
      el.addEventListener('mouseleave', shrink);
    });

    return () => {
      window.removeEventListener('mousemove', move);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot hidden md:block" />
      <div className="cursor-ring hidden md:block" />
    </>
  );
}

export default function App() {
  // Activate all scroll-reveal animations
  useScrollReveal(0.1);

  return (
    <>
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <Story />
        <WhyBronze />
        <Collections />
        <PurityPassport />
        <Gifting />
        <HoReCa />
        <CareNote />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
