import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Publications from './sections/Publications';
import Skills from './sections/Skills';
import Contact from './sections/Contact';
import ThankYou from './sections/ThankYou';
import Footer from './sections/Footer';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Chatbot } from './components/Chatbot';


gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build pinned ranges and snap targets
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce((closest, r) =>
              Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out'
        }
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-background min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <div className="content-auto"><Hero /></div>
        <div className="content-auto"><About /></div>
        <div className="content-auto"><Projects /></div>
        <div className="content-auto"><Experience /></div>
        <div className="content-auto"><Publications /></div>
        <div className="content-auto"><Skills /></div>
        <div className="content-auto"><Contact /></div>
        <div className="content-auto"><ThankYou /></div>
        <Footer />
        <SpeedInsights />
        <Chatbot />
      </main>
    </div>
  );
}

export default App;
