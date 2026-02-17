'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Experience from '@/sections/Experience';
import type {
  Experience as ExperienceType,
  Project,
  Publication,
  SkillCategory,
} from '@/lib/types';

const Chatbot = dynamic(() => import('@/components/Chatbot').then((mod) => mod.Chatbot), {
  ssr: false,
});

const PublicationsSection = dynamic(() => import('@/sections/Publications'));
const SkillsSection = dynamic(() => import('@/sections/Skills'));
const ContactSection = dynamic(() => import('@/sections/Contact'), {
  ssr: false,
});
const ThankYouSection = dynamic(() => import('@/sections/ThankYou'));
const FooterSection = dynamic(() => import('@/sections/Footer'));

gsap.registerPlugin(ScrollTrigger);

interface PortfolioPageProps {
  experiences: ExperienceType[];
  projects: Project[];
  publications: Publication[];
  skillCategories: SkillCategory[];
}

export default function PortfolioPage({
  experiences,
  projects,
  publications,
  skillCategories,
}: PortfolioPageProps) {
  useEffect(() => {
    const timeout = window.setTimeout(() => {
      ScrollTrigger.getById('global-scroll-snap')?.kill();

      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center:
          (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        id: 'global-scroll-snap',
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02,
            );

            if (!inPinned) return value;

            return pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0,
            );
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 100);

    return () => {
      window.clearTimeout(timeout);
      ScrollTrigger.getById('global-scroll-snap')?.kill();
    };
  }, []);

  return (
    <>
      <Navigation />
      <main className="relative">
        <div className="content-auto">
          <Hero />
        </div>
        <div className="content-auto">
          <About />
        </div>
        <div className="content-auto">
          <Projects projects={projects} />
        </div>
        <div className="content-auto">
          <Experience experiences={experiences} />
        </div>
        <div className="content-auto">
          <PublicationsSection publications={publications} />
        </div>
        <div className="content-auto">
          <SkillsSection skillCategories={skillCategories} />
        </div>
        <div className="content-auto">
          <ContactSection />
        </div>
        <div className="content-auto">
          <ThankYouSection />
        </div>
        <FooterSection />
        <Chatbot />
      </main>
    </>
  );
}
