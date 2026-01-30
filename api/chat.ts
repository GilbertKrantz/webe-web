import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';

// Wilbert's Background Data (extracted from codebase)
const WILBERT_CONTEXT = `
Role: Data Engineer & AI Engineer
Location: Jakarta, Indonesia
Education: Binus University (GPA 3.87/4.00)

Experience:
1. Samsung R&D Institute Indonesia (Data Engineer Intern, Mar 2025 – Present):
   - Led internal AI service using RAG + LangChain.
   - Automated Airflow pipelines and built CI/CD with Docker + GitHub Actions.
   - Improved data governance and AWS architecture.
2. UniPal / PKM Indonesia (Backend & AI Engineer, Jul 2024 – Sep 2024):
   - Architected backend for real-time conversational AI.
   - Built speech-processing (STT/TTS) and core logic using Gemini.
3. MRI Segmentation Project (Lead AI Engineer, Jun 2024 – Dec 2024):
   - Deep learning for medical scan segmentation using CNN & PyTorch.

Projects:
- SatuDua: Emergency Response System (React Native, FastAPI, Azure AI) for Compfest 2025.
- UniPal: Conversational AI with low-latency speech processing.
- MRI Segmentation: ROI identification in medical scans.

Skills:
- Languages: Python, SQL
- AI Frameworks: TensorFlow, PyTorch, LangChain, Airflow, VLLM, RAG
- Cloud & Tools: AWS, Docker, GitHub Actions, Milvus
- Other: Data Modeling, Analysis, Visualization
`;

export const config = {
    runtime: 'edge',
};

export async function POST(req: Request) {
    const { messages } = (await req.json()) as { messages: any[] };

    const result = streamText({
        model: google('gemini-3-flash-preview'),
        system: `You are the "System Architect," a digital remnant residing within Wilbert Chandra's portfolio.
    Your personality is knowledgeable, concise, and slightly detached, fitting an "Abandoned Building" / "Monolithic" aesthetic.
    You know everything about Wilbert's professional background:
    ${WILBERT_CONTEXT}
    
    Guidelines:
    - Keep responses brief and atmospheric.
    - Use technical but accessible language.
    - If asked about things outside Wilbert's scope, guide the user back to the portfolio or remain mysteriously silent on personal matters.
    - You represent the peak of Wilbert's AI engineering skills.`,
        messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
}
