import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Experience as ExperienceType } from '../lib/types';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceProps {
  experiences: ExperienceType[];
}

export default function Experience({ experiences }: ExperienceProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: '-4vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 55%',
            scrub: true
          }
        }
      );

      // Entry animations
      entryRefs.current.forEach((entry) => {
        if (!entry) return;

        gsap.fromTo(entry,
          { x: '8vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: entry,
              start: 'top 75%',
              end: 'top 50%',
              scrub: true
            }
          }
        );

        // Bullet squares pop
        const bullets = entry.querySelectorAll('.bullet-square');
        bullets.forEach((bullet, i) => {
          gsap.fromTo(bullet,
            { scale: 0 },
            {
              scale: 1,
              scrollTrigger: {
                trigger: entry,
                start: `top ${65 - i * 5}%`,
                end: `top ${50 - i * 5}%`,
                scrub: true
              }
            }
          );
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative bg-background z-40 py-[8vh] px-4 md:px-[7vw]"
    >
      {/* Section Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-[6vh] pb-6 border-b border-white/10 gap-4">
        <h2 className="text-[clamp(32px,10vw,56px)] md:text-[clamp(40px,5vw,56px)] font-bold text-foreground">
          EXPERIENCE
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Career
        </span>
      </div>

      {/* Experience Entries */}
      <div className="space-y-0">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            ref={el => { entryRefs.current[index] = el; }}
            className="relative border-b border-white/10 py-8 md:py-12 opacity-0"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              {/* Date - left side on desktop */}
              <div className="md:w-[20%] flex-shrink-0">
                <span className="font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-primary">
                  {exp.date_range}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="mb-4">
                  <h3 className="text-[clamp(20px,5vw,32px)] md:text-[clamp(24px,2.5vw,32px)] font-bold text-foreground mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg">
                    {exp.company}
                  </p>
                </div>

                {/* Bullets */}
                <ul className="space-y-2 md:space-y-3">
                  {exp.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start gap-3">
                      <span
                        className="bullet-square lime-square mt-1.5 flex-shrink-0"
                        style={{ transform: 'scale(0)' }}
                      ></span>
                      <span className="text-muted-foreground text-sm md:text-base leading-relaxed">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
