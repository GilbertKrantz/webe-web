import type { Metadata } from 'next';
import { getAllPortfolioData } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Wilbert Chandra CV',
  description: 'Curriculum Vitae of Wilbert Chandra',
};

export const dynamic = 'force-dynamic';

export default async function CvPage() {
  const { experiences, projects, skillCategories } = await getAllPortfolioData();

  return (
    <main className="min-h-screen bg-background px-6 py-10 md:px-[10vw]">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="border-b border-white/10 pb-6">
          <h1 className="text-4xl md:text-5xl text-foreground">Wilbert Chandra</h1>
          <p className="mt-3 text-muted-foreground">
            Data Engineer &amp; AI Engineer · Jakarta, Indonesia
          </p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
            Email: wilbertchandra.official@gmail.com · Phone: +62 851-5515-6773
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-2xl text-foreground">Experience</h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <article key={exp.id} className="border-b border-white/10 pb-4">
                <h3 className="text-lg text-foreground">
                  {exp.role} · {exp.company}
                </h3>
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-primary">
                  {exp.dateRange}
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
                  {exp.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-foreground">Selected Projects</h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <article key={project.id} className="border-b border-white/10 pb-4">
                <h3 className="text-lg text-foreground">{project.title}</h3>
                <p className="text-muted-foreground">{project.subtitle}</p>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl text-foreground">Skills</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {skillCategories.map((category) => (
              <article key={category.id} className="border border-white/10 p-4">
                <h3 className="text-base text-foreground">{category.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {category.skills.join(', ')}
                </p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
