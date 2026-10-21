import Cursor from './components/Cursor';
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
import ChatBot      from './components/ChatBot';

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
      <ChatBot />
    </>
  );
}
