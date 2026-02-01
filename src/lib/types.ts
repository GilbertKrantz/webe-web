// UI-facing portfolio data types (camelCase)
export interface Experience {
    id: number;
    role: string;
    company: string;
    dateRange: string;
    bullets: string[];
    sortOrder: number;
}

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    meta: string;
    description: string;
    hasLink: boolean;
    linkUrl: string | null;
    sortOrder: number;
}

export interface SkillCategory {
    id: number;
    title: string;
    skills: string[];
    sortOrder: number;
}

export interface Publication {
    id: number;
    title: string;
    venue: string;
    link: string;
    abstract: string;
    tags: string[];
    sortOrder: number;
}

// Database row types (snake_case from DB)
export interface ExperienceRow {
    id: number;
    role: string;
    company: string;
    date_range: string;
    bullets: string[];
    sort_order: number;
}

export interface ProjectRow {
    id: number;
    title: string;
    subtitle: string;
    meta: string;
    description: string;
    has_link: boolean;
    link_url: string | null;
    sort_order: number;
}

export interface SkillCategoryRow {
    id: number;
    title: string;
    sort_order: number;
}

export interface SkillRow {
    id: number;
    category_id: number;
    name: string;
    sort_order: number;
}

export interface PublicationRow {
    id: number;
    title: string;
    venue: string;
    link: string;
    abstract: string;
    tags: string[];
    sort_order: number;
}
