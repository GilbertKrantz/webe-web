import React, { useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { TerminalUI } from './TerminalUI';
import { cn } from '@/lib/utils';
import { Cpu, Send } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputVal, setInputVal] = useState('');

    const { messages, sendMessage, status } = useChat({
        transport: new DefaultChatTransport({
            api: '/api/chat',
        }),
    });

    const isLoading = status === 'submitted' || status === 'streaming';

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-12 h-12 bg-[#2D2D2D] border border-white/10 rounded-full flex items-center justify-center shadow-2xl z-[90] group hover:border-lime/50 transition-all"
                title="System Override"
            >
                <div className="absolute inset-0 bg-lime/5 rounded-full animate-pulse group-hover:bg-lime/10"></div>
                <Cpu className="w-5 h-5 text-lime opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-lime rounded-full border border-[#1A1A1A]"></div>
            </button>
        );
    }

    return (
        <TerminalUI onClose={() => setIsOpen(false)}>
            <div className="space-y-4">
                {messages.length === 0 && (
                    <div className="text-muted-foreground animate-pulse">
                        <span className="text-lime">{">"}</span> INITIALIZING...
                        <br />
                        <span className="text-lime">{">"}</span> SYSTEM ARCHITECT ONLINE.
                        <br />
                        <span className="text-lime">{">"}</span> QUERY REMNANT DATA?
                    </div>
                )}

                {messages.map((m) => (
                    <div
                        key={m.id}
                        className={cn(
                            "flex flex-col gap-1",
                            m.role === 'user' ? "items-end" : "items-start"
                        )}
                    >
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                                {m.role === 'user' ? 'GUEST' : 'ARCHITECT'}
                            </span>
                        </div>
                        <div className={cn(
                            "max-w-[85%] px-3 py-2 rounded-sm text-xs leading-relaxed",
                            m.role === 'user'
                                ? "bg-white/5 text-white/80 border border-white/5"
                                : "bg-lime/5 text-lime border border-lime/10"
                        )}>
                            {m.parts.map((part, index) =>
                                part.type === 'text' ? (
                                    <div key={index} className="prose-monolith">
                                        <ReactMarkdown>
                                            {part.text}
                                        </ReactMarkdown>
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>
                ))}

                {isLoading && (
                    <div className="flex items-center gap-2 text-lime/50 animate-pulse">
                        <span className="text-[10px]">ANALYZING...</span>
                    </div>
                )}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    if (inputVal.trim() && status === 'ready') {
                        sendMessage({ text: inputVal });
                        setInputVal('');
                    }
                }}
                className="mt-6 flex gap-2 sticky bottom-0 bg-[#1A1A1A] pt-2"
            >
                <input
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="ENTER QUERY..."
                    className="flex-1 bg-transparent border-b border-white/10 font-mono text-xs py-1 focus:outline-none focus:border-lime/50 placeholder:text-white/10 text-lime"
                    autoFocus
                    disabled={status !== 'ready'}
                />
                <button
                    type="submit"
                    disabled={status !== 'ready' || !inputVal.trim()}
                    className="text-white/20 hover:text-lime transition-colors disabled:opacity-0"
                >
                    <Send className="w-4 h-4" />
                </button>
            </form>
            <style>{`
                .prose-monolith p {
                    margin: 0;
                }
                .prose-monolith p + p {
                    margin-top: 0.5rem;
                }
                .prose-monolith ul, .prose-monolith ol {
                    margin: 0.5rem 0;
                    padding-left: 1.25rem;
                }
                .prose-monolith li {
                    margin: 0.25rem 0;
                }
            `}</style>
        </TerminalUI>
    );
};
