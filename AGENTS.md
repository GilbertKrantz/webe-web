# Agent Context

This file provides essential context for AI agents working on the **webe-web** project.

## Project Overview
**webe-web** is a modern, high-performance personal portfolio website built with React 19, Next.js, and GSAP. It showcases the work and expertise of a **Data Engineer & AI Engineer**, featuring a polished, section-based single-page layout with advanced scroll animations and responsive design.

## Tech Stack
- **Framework**: React 19 (Strict Mode enabled)
- **Framework Runtime**: Next.js App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Radix UI Primitives
- **Animations**: GSAP (GreenSock Animation Platform) + ScrollTrigger
- **Forms**: React Hook Form + Zod validation
- **Icons**: Lucide React
- **Theming**: next-themes

## Project Structure
- `/src/sections`: Contains the main components for each part of the landing page (Hero, About, Projects, Experience, etc.).
- `/src/components`:
    - `ui/`: Reusable primitive components (mostly Radix UI components styled with Tailwind).
    - `Navigation.tsx`: Main navigation component.
- `/src/lib/`: Utility functions and shared library configurations.
- `/src/hooks/`: Custom React hooks for shared logic.
- `/src/App.tsx`: The main application container. It includes global GSAP ScrollTrigger configuration for scroll-snapping and grain overlays.
- `/src/app/layout.tsx` and `/src/app/page.tsx`: Application entry points.

## Key Patterns & Architecture
- **Section-based Layout**: Most content is organized into self-contained sections within `src/sections`.
- **GSAP Animations**: Animations are primarily handled via GSAP. `App.tsx` contains a global snap mechanism for pinned sections.
- **Radix UI**: Standard UI components (Dialogs, HoverCards, NavMenus, etc.) are built using Radix UI primitives for accessibility.
- **Tailwind CSS**: Styling is exclusively done with Tailwind, often using the `cn` utility (from `clsx` and `tailwind-merge`) for conditional classes.

## Development Workflow
- **Development Server**: `npm run dev`
- **Production Build**: `npm run build`
- **Linting**: `npm run lint` (ESLint with TypeScript support)
- **Preview Build**: `npm run preview`

## Guidelines for Agents
- **Styling**: Always use Tailwind utilities. Do not add custom CSS unless absolutely necessary (prefer updating `tailwind.config.js`).
- **Animations**: Prefer GSAP for complex interactions. For simple transitions, Tailwind/CSS is acceptable.
- **Accessibility**: Ensure new components maintain accessibility by using Radix UI primitives where appropriate.
- **Performance**: Be mindful of ScrollTrigger performance when adding new scroll-based interactions.
