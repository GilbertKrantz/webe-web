import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    const [mounted, setMounted] = useState(false);

    // Read theme from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const stored = localStorage.getItem('theme') as 'light' | 'dark' | null;
        if (stored) {
            setTheme(stored);
        }
    }, []);

    // Apply theme changes
    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);

        // Update the HTML class
        document.documentElement.classList.toggle('light', newTheme === 'light');
    };

    if (!mounted) {
        return (
            <button
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Toggle theme"
            >
                <Moon className="w-4 h-4" />
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="p-2 text-foreground hover:text-primary transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
            ) : (
                <Moon className="w-4 h-4" />
            )}
        </button>
    );
}
