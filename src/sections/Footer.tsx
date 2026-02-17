import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUp } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const currentYear = new Date().getFullYear();

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 70%',
            scrub: true
          }
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      ref={sectionRef}
      className="relative bg-background z-[90] py-6 md:py-8 px-4 md:px-[7vw] border-t border-white/10"
    >
      <div
        ref={contentRef}
        className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 opacity-0"
      >
        {/* Left: Copyright */}
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground text-center md:text-left">
          © {currentYear} Wilbert Chandra
        </p>

        {/* Center: Back to Top */}
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-xs uppercase tracking-[0.14em]"
        >
          Back to top
          <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
        </button>

        {/* Right: Links */}
        <div className="flex items-center gap-4 md:gap-6">
          <a
            href="https://linkedin.com/in/wilbert-chandra-630b0121a"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
          >
            LinkedIn <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/GilbertKrantz"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
          >
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <a
            href="mailto:wilbertchandra.official@gmail.com"
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground hover:text-primary transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
