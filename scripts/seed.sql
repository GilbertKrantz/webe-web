-- =============================================
-- Portfolio Database Schema & Seed Data
-- Run this in your Vercel/Neon Postgres dashboard
-- =============================================

-- Create tables
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  date_range VARCHAR(100) NOT NULL,
  bullets TEXT[] NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  subtitle VARCHAR(255) NOT NULL,
  meta VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  has_link BOOLEAN DEFAULT false,
  link_url VARCHAR(500),
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skill_categories (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES skill_categories(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS publications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  venue VARCHAR(255) NOT NULL,
  link VARCHAR(500) NOT NULL,
  abstract TEXT NOT NULL,
  tags TEXT[] NOT NULL,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- =============================================
-- Seed Data
-- =============================================

-- Make script idempotent by clearing existing data before inserting
TRUNCATE TABLE experiences, projects, publications, skills, skill_categories RESTART IDENTITY CASCADE;

-- Experiences
INSERT INTO experiences (role, company, date_range, bullets, sort_order) VALUES
(
  'Data Engineer Intern',
  'Samsung R&D Institute Indonesia',
  'Mar 2025 – Present',
  ARRAY['Led end-to-end internal AI service using RAG + LangChain.', 'Automated Airflow pipelines and built CI/CD with Docker + GitHub Actions.', 'Improved data governance and AWS architecture.'],
  1
),
(
  'Backend & AI Engineer',
  'UniPal / PKM Indonesia',
  'Jul 2024 – Sep 2024',
  ARRAY['Architected backend service for real-time conversational AI interactions.', 'Built speech-processing pipeline with Google STT and ElevenLabs TTS.', 'Orchestrated core logic using Google Gemini for intelligent responses.'],
  2
),
(
  'Lead AI Engineer',
  'MRI Segmentation Project',
  'Jun 2024 – Dec 2024',
  ARRAY['Spearheaded end-to-end deep learning model for medical scan segmentation.', 'Engineered CNN architecture for precise ROI identification.', 'Achieved high segmentation accuracy through rigorous hyperparameter tuning.'],
  3
);

-- Projects
INSERT INTO projects (title, subtitle, meta, description, has_link, link_url, sort_order) VALUES
(
  'SatuDua',
  'Emergency Response System',
  'Compfest 2025 • React Native • FastAPI • Azure AI',
  'Live calling with real-time transcription, AI summaries, and dispatcher dashboards. Built for the AI Innovation Challenge hosted by University of Indonesia.',
  false,
  NULL,
  1
),
(
  'UniPal',
  'Conversational AI',
  'PKM Indonesia • Python • Gemini • ElevenLabs',
  'Speech-to-text → LLM → lifelike voice, built for low-latency interaction. Real-time conversational AI with seamless speech processing pipeline.',
  false,
  NULL,
  2
),
(
  'MRI Segmentation',
  'Medical Imaging',
  'Deep Learning • PyTorch • Computer Vision',
  'Automated ROI segmentation with strong Dice/IoU on high-dimensional scans. End-to-end deep learning model for medical analysis.',
  false,
  NULL,
  3
);

-- Skill Categories
INSERT INTO skill_categories (title, sort_order) VALUES
('Languages', 1),
('AI & Frameworks', 2),
('Cloud & Tools', 3),
('Skills', 4);

-- Skills
INSERT INTO skills (category_id, name, sort_order) VALUES
-- Languages
(1, 'Python', 1),
(1, 'SQL', 2),
-- AI & Frameworks
(2, 'TensorFlow', 1),
(2, 'PyTorch', 2),
(2, 'LangChain', 3),
(2, 'Airflow', 4),
(2, 'VLLM', 5),
(2, 'RAG', 6),
-- Cloud & Tools
(3, 'AWS', 1),
(3, 'Docker', 2),
(3, 'GitHub Actions', 3),
(3, 'Milvus', 4),
-- Other Skills
(4, 'Data Modeling', 1),
(4, 'Analysis', 2),
(4, 'Visualization', 3);

-- Publications
INSERT INTO publications (title, venue, link, abstract, tags, sort_order) VALUES
(
  'Multiclass Eye Disease Detection',
  'Procedia Computer Science (Elsevier)',
  'https://doi.org/10.1016/j.procs.2025.09.079',
  'Lightweight deep learning for 9 retinal conditions; EfficientViT achieved ROC-AUC 0.9780 with only 3 million parameters.',
  ARRAY['PyTorch', 'EfficientViT', 'Computer Vision'],
  1
),
(
  'RSNA Degenerative Lumbar Spine Classification',
  'IEEE Xplore',
  'https://ieeexplore.ieee.org/document/10933461',
  'Automated spinal condition detection using CNN ensembles on MRI datasets. Led technical implementation of multiple diverse architectures.',
  ARRAY['PyTorch', 'Medical Imaging', 'Ensemble Learning'],
  2
);
