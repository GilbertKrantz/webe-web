import { neon } from '@neondatabase/serverless';
import type {
    Experience,
    Project,
    SkillCategory,
    SkillCategoryRow,
    SkillRow,
    Publication
} from './types';

// Create SQL client - uses POSTGRES_URL from environment
function getSQL() {
    const connectionString = import.meta.env.POSTGRES_URL;
    if (!connectionString) {
        throw new Error('POSTGRES_URL environment variable is not set');
    }
    return neon(connectionString);
}

export async function getExperiences(): Promise<Experience[]> {
    const sql = getSQL();
    const rows = await sql`
    SELECT id, role, company, date_range, bullets, sort_order 
    FROM experiences 
    ORDER BY sort_order ASC
  `;
    return rows as Experience[];
}

export async function getProjects(): Promise<Project[]> {
    const sql = getSQL();
    const rows = await sql`
    SELECT id, title, subtitle, meta, description, has_link, link_url, sort_order 
    FROM projects 
    ORDER BY sort_order ASC
  `;
    return rows as Project[];
}

export async function getSkillCategories(): Promise<SkillCategory[]> {
    const sql = getSQL();

    // Get categories
    const categories = await sql`
    SELECT id, title, sort_order 
    FROM skill_categories 
    ORDER BY sort_order ASC
  ` as SkillCategoryRow[];

    // Get all skills
    const skills = await sql`
    SELECT id, category_id, name, sort_order 
    FROM skills 
    ORDER BY sort_order ASC
  ` as SkillRow[];

    // Group skills by category
    return categories.map(cat => ({
        id: cat.id,
        title: cat.title,
        sort_order: cat.sort_order,
        skills: skills
            .filter(s => s.category_id === cat.id)
            .map(s => s.name)
    }));
}

export async function getPublications(): Promise<Publication[]> {
    const sql = getSQL();
    const rows = await sql`
    SELECT id, title, venue, link, abstract, tags, sort_order 
    FROM publications 
    ORDER BY sort_order ASC
  `;
    return rows as Publication[];
}

// Get all portfolio data in a single call (for index page)
export async function getAllPortfolioData() {
    const [experiences, projects, skillCategories, publications] = await Promise.all([
        getExperiences(),
        getProjects(),
        getSkillCategories(),
        getPublications()
    ]);

    return { experiences, projects, skillCategories, publications };
}
