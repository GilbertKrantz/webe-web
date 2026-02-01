import { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Linkedin, Github, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const socials = [
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/wilbert-chandra-630b0121a' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/GilbertKrantz' },
  { name: 'Email', icon: Mail, href: 'mailto:wilbertchandra.official@gmail.com' }
];

export default function ThankYou() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });

      // ENTRANCE (0-30%)
      scrollTl.fromTo(headlineRef.current,
        { y: '30vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0
      );

      scrollTl.fromTo(sublineRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.10
      );

      scrollTl.fromTo(socialsRef.current,
        { y: '10vh', opacity: 0 },
        { y: 0, opacity: 1, ease: 'none' },
        0.15
      );

      scrollTl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', transformOrigin: 'center' },
        0.20
      );

      // EXIT (70-100%)
      scrollTl.fromTo(headlineRef.current,
        { opacity: 1 },
        { opacity: 0.35, ease: 'power2.in' },
        0.70
      );

      scrollTl.fromTo(sublineRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(socialsRef.current,
        { opacity: 1 },
        { opacity: 0.2, ease: 'power2.in' },
        0.74
      );

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-[#0B0B0D] z-[80] flex items-center justify-center"
    >
      {/* Horizontal Line */}
      <div
        ref={lineRef}
        className="absolute top-1/2 left-[10vw] right-[10vw] h-px line-secondary origin-center"
        style={{ transform: 'scaleX(0)' }}
      />

      {/* Centered Content */}
      <div className="relative text-center px-6 z-10">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="text-[clamp(40px,14vw,120px)] md:text-[clamp(60px,10vw,140px)] font-bold text-[#F4F4F5] leading-[0.85] mb-4 md:mb-6 opacity-0"
        >
          Thanks.
        </h2>

        {/* Subline */}
        <p
          ref={sublineRef}
          className="text-[#A7A7AA] text-base md:text-xl mb-8 md:mb-12 opacity-0"
        >
          Open to collaborations, research, and product work.
        </p>

        {/* Socials */}
        <div
          ref={socialsRef}
          className="flex flex-row items-center justify-center gap-6 md:gap-8 opacity-0"
        >
          {socials.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 md:gap-3 text-[#A7A7AA] hover:text-lime transition-colors"
              >
                <div className="w-10 md:w-12 h-10 md:h-12 border border-white/20 flex items-center justify-center group-hover:border-lime transition-colors">
                  <Icon className="w-4 md:w-5 h-4 md:h-5" />
                </div>
                <span className="font-mono text-xs uppercase tracking-[0.14em]">
                  {social.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
