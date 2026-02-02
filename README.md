# Wilbert Chandra - Personal Portfolio

This is the personal portfolio website for **Wilbert Chandra**, a **Data Engineer & AI Engineer** based in Jakarta, Indonesia.

**Live Site**: [webe-dev.vercel.app](https://webe-dev.vercel.app)

## 🚀 Overview
A high-performance, modern single-page portfolio built with **React 19**, **Astro**, and **GSAP**. It features advanced scroll animations, a section-based architecture, and a focus on scalability and production-ready data systems.

## 🛠️ Tech Stack
- **Framework**: [Astro 5](https://astro.build/) + [React 19](https://react.dev/)
- **Database**: [Neon](https://neon.tech/) (PostgreSQL)
- **Deployment**: [Vercel](https://vercel.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/)
- **Animations**: [GSAP](https://gsap.com/) + ScrollTrigger
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/) + [React Hook Form](https://react-hook-form.com/)

## ✨ Key Features
- **Database-Driven Content**: All portfolio data (projects, experiences, etc.) is served dynamically from a PostgreSQL database.
- **Scroll-Snapping**: Custom GSAP-driven scroll-snapping for fluid navigation between sections.
- **AI-Friendly**: Dynamic [llms.txt](https://webe-dev.vercel.app/llms.txt) route for automated agent discovery and summarization.
- **Section-Based Architecture**: Modular design with dedicated sections for Hero, About, Projects, Experience, and more.
- **Grain Overlay**: Custom visual effects for a premium, textured aesthetic.

## 📦 Getting Started

### Prerequisites
- Node.js (Latest LTS recommended)
- npm or pnpm
- A Neon PostgreSQL instance

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables (`.env`):
   ```bash
   POSTGRES_URL=your_neon_connection_string
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run lint`: Run ESLint
- `npm run preview`: Preview production build locally

## 📄 License
This project is for personal use by Wilbert Chandra.
