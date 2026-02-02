import { getAllPortfolioData } from '../lib/db';

export async function GET() {
  const { experiences, projects, publications } = await getAllPortfolioData();

  const content = `# Wilbert Chandra - Data & AI Engineer

Wilbert Chandra is a Data Engineer and AI Engineer based in Jakarta, Indonesia, specializing in scalable data pipelines, distributed AI systems, and production-ready architectures.

## Roles
${experiences.map(exp => `- **${exp.role}** at **${exp.company}** (${exp.dateRange})`).join('\n')}

## Technical Stack
- **Languages**: Python, SQL
- **AI & Frameworks**: TensorFlow, PyTorch, LangChain, Airflow, VLLM, RAG
- **Cloud & Infrastructure**: AWS, Docker, GitHub Actions, Milvus, Neon (PostgreSQL), Vercel
- **Frontend**: Astro, React 19, Tailwind CSS, GSAP

## Key Projects
${projects.map(proj => `- **${proj.title}**: ${proj.subtitle}. ${proj.description}`).join('\n')}

## Selected Publications
${publications.map(pub => `- **${pub.title}**: Published in *${pub.venue}*. ${pub.abstract}`).join('\n')}

## Contact
- **Website**: https://wilbertchandra.com
- **GitHub**: https://github.com/GilbertKrantz
- **Location**: Jakarta, Indonesia
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
