import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, FileDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Auto-play entrance animation on load
        const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // Lines draw
        loadTl.fromTo([line1Ref.current, line2Ref.current],
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, stagger: 0.1, transformOrigin: 'left' },
          0
        );

        // Headline words stagger
        const words = headlineRef.current?.querySelectorAll('.word');
        if (words) {
          loadTl.fromTo(words,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.9, stagger: 0.06 },
            0.2
          );
        }

        // Subheadline
        loadTl.fromTo(subheadRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.5
        );

        // CTA
        loadTl.fromTo(ctaRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          0.6
        );

        // Location
        loadTl.fromTo(locationRef.current,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          0.7
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([line1Ref.current, line2Ref.current, subheadRef.current, ctaRef.current, locationRef.current], { opacity: 1, y: 0, scaleX: 1 });
        const words = headlineRef.current?.querySelectorAll('.word');
        if (words) gsap.set(words, { opacity: 1, y: 0 });
      });

      // Scroll-driven exit animation
      const words = headlineRef.current?.querySelectorAll('.word');
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([line1Ref.current, line2Ref.current, subheadRef.current, ctaRef.current, locationRef.current], {
              opacity: 1, x: 0, y: 0
            });
            if (words) gsap.set(words, { opacity: 1, x: 0, y: 0 });
          }
        }
      });

      // Exit phase (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(subheadRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(ctaRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0.25, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo([line1Ref.current, line2Ref.current],
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(locationRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.querySelector('#projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-background z-10 flex items-center justify-center"
    >
      {/* Decorative Lines */}
      <div
        ref={line1Ref}
        className="absolute top-[15vh] left-[7vw] w-[30vw] h-px line-primary origin-left"
        style={{ transform: 'scaleX(0)' }}
      />
      <div
        ref={line2Ref}
        className="absolute bottom-[20vh] right-[7vw] w-[25vw] h-px line-secondary origin-left"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Main Content - Centered */}
      <div className="relative w-full px-6 md:px-[7vw] flex flex-col items-start md:items-center">
        {/* Headline */}
        <div ref={headlineRef} className="mb-6 md:mb-8">
          <h1 className="text-[clamp(48px,15vw,120px)] md:text-[clamp(64px,12vw,140px)] font-bold text-foreground leading-[0.85] tracking-[-0.03em]">
            <span className="word block">WILBERT</span>
            <span className="word block text-lime">CHANDRA</span>
          </h1>
        </div>

        {/* Subheadline */}
        <div ref={subheadRef} className="mb-8 md:mb-10 opacity-0">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 md:w-12 h-px line-primary"></div>
            <p className="text-[clamp(12px,3vw,16px)] md:text-[clamp(14px,1.5vw,18px)] text-muted-foreground font-mono uppercase tracking-[0.2em]">
              Data Engineer & AI Engineer
            </p>
            <div className="w-8 md:w-12 h-px line-primary"></div>
          </div>
        </div>

        {/* CTA Row */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-6 opacity-0">
          <a
            href="#projects"
            onClick={handleScrollToProjects}
            className="group flex items-center gap-3 px-6 py-3 border border-primary text-primary font-mono text-sm uppercase tracking-[0.14em] hover:bg-primary hover:text-background transition-colors touch-manipulation"
          >
            View Projects
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-muted-foreground font-mono text-sm uppercase tracking-[0.14em] hover:text-lime transition-colors touch-manipulation"
          >
            <FileDown className="w-4 h-4" />
            Download CV
          </a>
        </div>

        {/* Location */}
        <div
          ref={locationRef}
          className="absolute bottom-[-20vh] md:bottom-[-25vh] left-6 md:left-auto opacity-0"
        >
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Jakarta, Indonesia
          </p>
        </div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-8 right-8 w-4 h-4 border-t border-r border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-4 h-4 border-b border-l border-white/20"></div>
    </section>
  );
}
