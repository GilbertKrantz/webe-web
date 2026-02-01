// Portfolio data types
export interface Experience {
    id: number;
    role: string;
    company: string;
    date_range: string;
    bullets: string[];
    sort_order: number;
}

export interface Project {
    id: number;
    title: string;
    subtitle: string;
    meta: string;
    description: string;
    has_link: boolean;
    link_url: string | null;
    sort_order: number;
}

export interface SkillCategory {
    id: number;
    title: string;
    skills: string[];
    sort_order: number;
}

export interface Publication {
    id: number;
    title: string;
    venue: string;
    link: string;
    abstract: string;
    tags: string[];
    sort_order: number;
}

// Database row types (before transformation)
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
