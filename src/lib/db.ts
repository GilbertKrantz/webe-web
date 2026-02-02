import { neon } from '@neondatabase/serverless';
import type {
    Experience,
    ExperienceRow,
    Project,
    ProjectRow,
    SkillCategory,
    SkillCategoryRow,
    SkillRow,
    Publication,
    PublicationRow
} from './types';

// Create singleton SQL client - uses POSTGRES_URL from environment
let sqlClient: ReturnType<typeof neon> | null = null;

function getSQL() {
    if (!sqlClient) {
        const connectionString = import.meta.env.POSTGRES_URL;
        if (!connectionString) {
            throw new Error('POSTGRES_URL environment variable is not set');
        }
        sqlClient = neon(connectionString);
    }
    return sqlClient;
}

export async function getExperiences(): Promise<Experience[]> {
    const sql = getSQL();
    const rows = await sql`
    SELECT id, role, company, date_range, bullets, sort_order 
    FROM experiences 
    ORDER BY sort_order ASC
  ` as ExperienceRow[];
    
    // Map DB rows to camelCase UI types
    return rows.map(row => ({
        id: row.id,
        role: row.role,
        company: row.company,
        dateRange: row.date_range,
        bullets: row.bullets,
        sortOrder: row.sort_order
    }));
}

export async function getProjects(): Promise<Project[]> {
    const sql = getSQL();
    const rows = await sql`
    SELECT id, title, subtitle, meta, description, has_link, link_url, sort_order 
    FROM projects 
    ORDER BY sort_order ASC
  ` as ProjectRow[];
    
    // Map DB rows to camelCase UI types
    return rows.map(row => ({
        id: row.id,
        title: row.title,
        subtitle: row.subtitle,
        meta: row.meta,
        description: row.description,
        hasLink: row.has_link,
        linkUrl: row.link_url,
        sortOrder: row.sort_order
    }));
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

    // Build an index of skills by category_id in one pass (O(n))
    const skillsByCategory = new Map<SkillRow['category_id'], string[]>();
    for (const skill of skills) {
        const existing = skillsByCategory.get(skill.category_id);
        if (existing) {
            existing.push(skill.name);
        } else {
            skillsByCategory.set(skill.category_id, [skill.name]);
        }
    }

    // Group skills by category using the precomputed index and map to camelCase
    return categories.map(cat => ({
        id: cat.id,
        title: cat.title,
        sortOrder: cat.sort_order,
        skills: skillsByCategory.get(cat.id) ?? []
    }));
}

export async function getPublications(): Promise<Publication[]> {
    const sql = getSQL();
    const rows = await sql`
    SELECT id, title, venue, link, abstract, tags, sort_order 
    FROM publications 
    ORDER BY sort_order ASC
  ` as PublicationRow[];
    
    // Map DB rows to camelCase UI types
    return rows.map(row => ({
        id: row.id,
        title: row.title,
        venue: row.venue,
        link: row.link,
        abstract: row.abstract,
        tags: row.tags,
        sortOrder: row.sort_order
    }));
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
