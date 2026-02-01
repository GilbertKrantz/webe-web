import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../lib/types';

gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { y: '-6vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true
          }
        }
      );

      // Card animations
      cardRefs.current.forEach((card) => {
        if (!card) return;

        const content = card.querySelector('.card-content');
        const number = card.querySelector('.card-number');
        const line = card.querySelector('.card-line');

        gsap.fromTo(number,
          { x: '-5vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true
            }
          }
        );

        gsap.fromTo(content,
          { x: '5vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 75%',
              end: 'top 40%',
              scrub: true
            }
          }
        );

        gsap.fromTo(line,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left',
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              end: 'top 45%',
              scrub: true
            }
          }
        );
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative bg-background z-30 py-[8vh] px-4 md:px-[7vw]"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-[6vh] pb-6 border-b border-white/10 gap-4">
        <h2 className="text-[clamp(32px,10vw,56px)] md:text-[clamp(40px,5vw,56px)] font-bold text-foreground">
          PROJECTS
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Selected Work
        </span>
      </div>

      {/* Project Cards */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => { cardRefs.current[index] = el; }}
            className="relative border-b border-white/10 py-8 md:py-12"
          >
            {/* Horizontal line */}
            <div
              className="card-line absolute top-0 left-0 w-full h-px line-secondary origin-left"
              style={{ transform: 'scaleX(0)' }}
            ></div>

            <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
              {/* Number */}
              <div className="card-number flex-shrink-0">
                <span className="text-[clamp(48px,12vw,80px)] md:text-[clamp(64px,8vw,100px)] font-bold text-primary/10 leading-none">
                  0{project.id}
                </span>
              </div>

              {/* Content */}
              <div className="card-content flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-4">
                  <div>
                    <h3 className="text-[clamp(24px,6vw,40px)] md:text-[clamp(28px,3vw,44px)] font-bold text-foreground mb-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-base md:text-lg">
                      {project.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                    {project.meta}
                  </span>
                </div>

                <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4 md:mb-6 max-w-[90vw] md:max-w-[70%]">
                  {project.description}
                </p>

                {/* Case Study Link - non-clickable if no link */}
                {project.has_link ? (
                  <a
                    href={project.link_url || '#'}
                    className="group inline-flex items-center gap-2 text-foreground font-mono text-sm uppercase tracking-[0.14em] hover:text-primary transition-colors"
                  >
                    View case study
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 text-muted-foreground/40 font-mono text-sm uppercase tracking-[0.14em] cursor-default">
                    View case study
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
