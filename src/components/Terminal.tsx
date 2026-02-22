import React, { useEffect, useRef, useState } from 'react';
import { TerminalUI } from './TerminalUI';
import { useTypingEffect } from '@/hooks/useTypingEffect';

interface TerminalProps {
  onClose?: () => void;
}

interface TerminalEntry {
  id: string;
  command: string;
  output: string;
}

const PROMPT_PREFIX = 'visitor@wilbert-chandra ➜ ~';

const COMMAND_OUTPUTS: Record<string, string> = {
  whoami:
    'Final Year Data Science student focused on building robust data pipelines and production-ready AI systems.',
  'ls ./projects/':
    '📁 ./projects/\n- satu-dua.sh → Emergency Response System | React Native, FastAPI, Azure AI\n- multi-agent-orchestrator.py → AI agents for CSV/document parsing\n- mri-segmentation.pt → Deep learning for high-dimensional medical scans',
  './experience.sh':
    '[2026] Data Engineer Intern @ DANA Indonesia ☁️\n[2025] Data Engineer Intern @ Samsung R&D Institute Indonesia 🐘\n[2024] Backend & AI Engineer @ UniPal 🐍',
  'cat stack.json':
    '{\n  "data_orchestration": ["Airflow"],\n  "query_engines": ["Athena"],\n  "llm_serving": ["vLLM"],\n  "ai_architecture": ["RAG"],\n  "vector_databases": ["Milvus", "pgvector"]\n}',
};

const TypedOutput: React.FC<{ value: string }> = ({ value }) => {
  const typedValue = useTypingEffect(value, 10);
  return <pre aria-live="polite" className="whitespace-pre-wrap text-lime/80">{typedValue}</pre>;
};

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<TerminalEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (input: string) => {
    const command = input.trim();
    if (!command) return;
    if (command === 'clear') {
      setHistory([]);
      return;
    }

    const output = COMMAND_OUTPUTS[command] ?? `Command not found: ${command}`;
    setHistory((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${prev.length}`,
        command,
        output,
      },
    ]);
  };

  const submitCommand = (command: string) => {
    handleCommand(command);
    setInputValue('');
  };

  return (
    <TerminalUI onClose={onClose} className="font-hack">
      <div className="space-y-4 pb-20 md:pb-2" onClick={() => inputRef.current?.focus()}>
        {history.length === 0 && (
          <p className="text-lime/70">
            Type <code>whoami</code>, <code>ls ./projects/</code>, <code>./experience.sh</code>, <code>cat stack.json</code>, or <code>clear</code>.
          </p>
        )}

        {history.map((entry) => (
          <div key={entry.id} className="space-y-1">
            <p className="text-lime">{PROMPT_PREFIX} {entry.command}</p>
            <TypedOutput value={entry.output} />
          </div>
        ))}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitCommand(inputValue);
        }}
        className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3"
      >
        <span className="text-lime text-xs md:text-sm">{PROMPT_PREFIX}</span>
        <div className="flex flex-1 items-center">
          <input
            ref={inputRef}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            aria-label="Terminal command input"
            className="w-full bg-transparent border-none outline-none ring-0 focus:outline-none focus:ring-0 text-lime caret-transparent"
            autoFocus
          />
          <span className="pointer-events-none text-lime animate-terminal-cursor">█</span>
        </div>
      </form>
      <div className="fixed inset-x-0 bottom-0 z-[10001] flex gap-2 border-t border-white/10 bg-[#0D0D0D]/95 p-2 md:hidden">
        <button
          type="button"
          className="rounded border border-white/20 px-2 py-1 text-[10px] text-lime"
          onClick={() => submitCommand('./experience.sh')}
        >
          [ ./experience ]
        </button>
        <button
          type="button"
          className="rounded border border-white/20 px-2 py-1 text-[10px] text-lime"
          onClick={() => submitCommand('ls ./projects/')}
        >
          [ ./projects ]
        </button>
        <button
          type="button"
          className="rounded border border-white/20 px-2 py-1 text-[10px] text-lime"
          onClick={() => submitCommand('clear')}
        >
          [ clear ]
        </button>
      </div>
    </TerminalUI>
  );
};
