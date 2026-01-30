import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const microcopyRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const decorRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(statementRef.current,
        { y: '40vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'left' },
        0.10
      );

      scrollTl.fromTo(microcopyRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(labelRef.current,
        { opacity: 0 },
        { opacity: 1, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(decorRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, ease: 'none' },
        0.20
      );

      // EXIT (70-100%)
      scrollTl.fromTo(statementRef.current,
        { y: 0, opacity: 1 },
        { y: '-15vh', opacity: 0.25, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(microcopyRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(labelRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(decorRef.current,
        { opacity: 1 },
        { opacity: 0.1, ease: 'power2.in' },
        0.75
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0D] z-20 flex items-center justify-center"
    >
      {/* Top-right label */}
      <div
        ref={labelRef}
        className="absolute right-6 md:right-[7vw] top-[10vh] font-mono text-xs uppercase tracking-[0.14em] text-[#A7A7AA] opacity-0"
      >
        ABOUT
      </div>

      {/* Decorative Element */}
      <div
        ref={decorRef}
        className="absolute left-6 md:left-[7vw] top-[15vh] opacity-0"
      >
        <div className="w-16 md:w-24 h-16 md:h-24 border border-lime/30 relative">
          <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-lime"></div>
          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-lime"></div>
        </div>
      </div>

      {/* Main Statement - Centered */}
      <div
        ref={statementRef}
        className="relative w-full px-6 md:px-[15vw] opacity-0"
      >
        <h2 className="text-[clamp(28px,8vw,64px)] md:text-[clamp(40px,5vw,72px)] font-bold text-[#F4F4F5] leading-[1] mb-6 md:mb-8 text-center">
          I build robust data<br className="hidden md:block" /> and AI systems.
        </h2>
        <div
          ref={lineRef}
          className="w-[40vw] md:w-[20vw] h-px line-primary mx-auto mb-6 md:mb-8 origin-left"
          style={{ transform: 'scaleX(0)' }}
        ></div>
        <p className="text-[#A7A7AA] text-base md:text-lg leading-relaxed mb-6 md:mb-8 max-w-[90vw] md:max-w-[50vw] mx-auto text-center">
          I design scalable data engineering pipelines, distributed AI systems,
          and production-ready architectures that make data reliable and intelligent.
        </p>
        <div className="flex justify-center">
          <a
            href="#experience"
            className="group inline-flex items-center gap-3 text-lime font-mono text-sm uppercase tracking-[0.14em] hover:text-white transition-colors"
          >
            <span className="lime-square mr-2"></span>
            Read more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom microcopy */}
      <div
        ref={microcopyRef}
        className="absolute left-6 md:left-[7vw] bottom-[8vh] opacity-0"
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#A7A7AA]">
          Binus University — GPA 3.87/4.00
        </p>
      </div>

      {/* Corner Decoration */}
      <div className="absolute bottom-8 right-8 w-4 h-4 border-b border-r border-white/20"></div>
    </section>
  );
}
