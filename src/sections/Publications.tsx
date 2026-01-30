import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const publications = [
  {
    id: 1,
    title: 'Multiclass Eye Disease Detection',
    venue: 'Procedia Computer Science (Elsevier)',
    link: 'https://doi.org/10.1016/j.procs.2025.09.079',
    abstract: 'Lightweight deep learning for 9 retinal conditions; EfficientViT achieved ROC-AUC 0.9780 with only 3 million parameters.',
    tags: ['PyTorch', 'EfficientViT', 'Computer Vision']
  },
  {
    id: 2,
    title: 'RSNA Degenerative Lumbar Spine Classification',
    venue: 'IEEE Xplore',
    link: 'https://ieeexplore.ieee.org/document/10933461',
    abstract: 'Automated spinal condition detection using CNN ensembles on MRI datasets. Led technical implementation of multiple diverse architectures.',
    tags: ['PyTorch', 'Medical Imaging', 'Ensemble Learning']
  }
];

export default function Publications() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Card animations
      cardRefs.current.forEach((card) => {
        if (!card) return;

        gsap.fromTo(card,
          { y: '8vh', opacity: 0 },
          {
            y: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              end: 'top 55%',
              scrub: true
            }
          }
        );

        // Border draw
        const border = card.querySelector('.card-border');
        gsap.fromTo(border,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left',
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: 'top 70%',
              toggleActions: 'play none none reverse'
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
      id="publications"
      className="relative bg-background z-50 py-[8vh] px-4 md:px-[7vw]"
    >
      {/* Header */}
      <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-[6vh] pb-6 border-b border-white/10 gap-4">
        <h2 className="text-[clamp(32px,10vw,56px)] md:text-[clamp(40px,5vw,56px)] font-bold text-foreground">
          PUBLICATIONS
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
          Research
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {publications.map((pub, index) => (
          <div
            key={pub.id}
            ref={el => { cardRefs.current[index] = el; }}
            className="relative group opacity-0"
          >
            {/* Border */}
            <div
              className="card-border absolute inset-0 border border-white/20 pointer-events-none group-hover:border-primary/50 transition-colors"
              style={{ transform: 'scaleX(0)' }}
            ></div>

            {/* Content */}
            <div className="relative p-6 md:p-8">
              {/* Venue */}
              <div className="flex items-center gap-3 mb-4">
                <span className="lime-square"></span>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  {pub.venue}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-[clamp(18px,5vw,24px)] md:text-[clamp(20px,1.8vw,24px)] font-bold text-foreground mb-4 leading-tight">
                {pub.title}
              </h3>

              {/* Abstract */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                {pub.abstract}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {pub.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-2 md:px-3 py-1 border border-white/20 text-muted-foreground font-mono text-xs uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 text-foreground font-mono text-sm uppercase tracking-[0.14em] hover:text-primary transition-colors"
              >
                View DOI
                <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
