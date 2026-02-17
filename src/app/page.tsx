import PortfolioPage from '@/components/PortfolioPage';
import { getAllPortfolioData } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const { experiences, projects, publications, skillCategories } =
    await getAllPortfolioData();

  return (
    <PortfolioPage
      experiences={experiences}
      projects={projects}
      publications={publications}
      skillCategories={skillCategories}
    />
  );
}
