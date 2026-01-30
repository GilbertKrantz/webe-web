import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TerminalUIProps {
    children: React.ReactNode;
    className?: string;
    onClose?: () => void;
}

export const TerminalUI: React.FC<TerminalUIProps> = ({ children, className, onClose }) => {
    const terminalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [children]);

    return (
        <div className={cn(
            "fixed bottom-6 right-6 w-[90vw] md:w-[400px] h-[500px] bg-[#1A1A1A] border border-white/10 shadow-2xl flex flex-col z-[100] overflow-hidden rounded-sm backdrop-blur-md",
            "before:content-[''] before:absolute before:inset-0 before:bg-[url('https://grainy-gradients.vercel.app/noise.svg')] before:opacity-[0.03] before:pointer-events-none",
            className
        )}>
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none z-10 scanline opacity-[0.05]"></div>

            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-[#2D2D2D] border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-lime animate-pulse"></div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        System Override: v3.0-flash
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="text-muted-foreground hover:text-white transition-colors"
                >
                    <span className="font-mono text-xs">[×]</span>
                </button>
            </div>

            {/* Content Area */}
            <div
                ref={terminalRef}
                className="flex-1 overflow-y-auto p-4 font-mono text-sm space-y-4 custom-scrollbar scroll-smooth"
            >
                {children}
            </div>

            {/* Footer Decoration */}
            <div className="px-4 py-2 border-t border-white/5 flex justify-between items-center bg-[#1A1A1A]">
                <div className="w-12 h-px bg-white/10"></div>
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Digital Remnant</span>
                <div className="w-12 h-px bg-white/10"></div>
            </div>

            <style>{`
        .scanline {
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.1) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 100% 4px;
          animation: scanline 10s linear infinite;
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #2D2D2D;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3D3D3D;
        }
      `}</style>
        </div>
    );
};
