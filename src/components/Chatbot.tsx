import React, { useState } from 'react';
import { Cpu } from 'lucide-react';
import { Terminal } from './Terminal';

export const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 md:bottom-6 md:right-6 w-12 h-12 bg-[#2D2D2D] border border-white/10 rounded-full flex items-center justify-center shadow-2xl z-[9999] group hover:border-lime/50 transition-all"
                title="System Override"
            >
                <div className="absolute inset-0 bg-lime/5 rounded-full animate-pulse group-hover:bg-lime/10"></div>
                <Cpu className="w-5 h-5 text-lime opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-lime rounded-full border border-[#1A1A1A]"></div>
            </button>
        );
    }

    return <Terminal onClose={() => setIsOpen(false)} />;
};
