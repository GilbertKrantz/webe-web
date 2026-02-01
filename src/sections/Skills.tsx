import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { SkillCategory } from '../lib/types';

gsap.registerPlugin(ScrollTrigger);

interface SkillsProps {
  skillCategories: SkillCategory[];
}

export default function Skills({ skillCategories }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Column animations
      colRefs.current.forEach((col, index) => {
        if (!col) return;

        const direction = index % 2 === 0 ? '-6vw' : '6vw';

        gsap.fromTo(col,
          { x: direction, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: col,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true
            }
          }
        );

        // Skill rows stagger
        const rows = col.querySelectorAll('.skill-row');
        rows.forEach((row, rowIndex) => {
          gsap.fromTo(row,
            { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
            {
              opacity: 1,
              x: 0,
              scrollTrigger: {
                trigger: col,
                start: `top ${70 - rowIndex * 3}%`,
                end: `top ${55 - rowIndex * 3}%`,
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
      id="skills"
      className="relative bg-background z-[60] py-[8vh] px-4 md:px-[7vw]"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-[6vh] pb-6 border-b border-white/10 gap-4">
        <h2 className="text-[clamp(32px,10vw,56px)] md:text-[clamp(40px,5vw,56px)] font-bold text-foreground">
          SKILLS
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Tools & Tech
        </span>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-12">
        {skillCategories.map((category, catIndex) => (
          <div
            key={catIndex}
            ref={el => { colRefs.current[catIndex] = el; }}
            className="opacity-0"
          >
            {/* Category Title */}
            <h3 className="text-sm md:text-base font-bold text-foreground mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
              <span className="lime-square"></span>
              {category.title}
            </h3>

            {/* Skills List */}
            <div className="space-y-2 md:space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="skill-row flex items-center gap-2 md:gap-4 opacity-0"
                >
                  <div className="w-4 md:w-8 h-px line-secondary"></div>
                  <span className="text-muted-foreground font-mono text-xs md:text-sm uppercase tracking-wider">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Decorative Lines */}
      <div className="mt-12 md:mt-16 flex items-center gap-4">
        <div className="flex-1 h-px line-secondary"></div>
        <span className="lime-square"></span>
        <div className="flex-1 h-px line-secondary"></div>
        <span className="lime-square"></span>
        <div className="flex-1 h-px line-secondary"></div>
      </div>
    </section>
  );
}
