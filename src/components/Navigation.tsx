import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const menuItems = [
  { label: 'Work', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Publications', href: '#publications' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] px-4 md:px-[7vw] py-4 md:py-6 flex items-center justify-between transition-all duration-500 ${isVisible ? 'bg-background/90 backdrop-blur-sm' : 'bg-transparent'
          }`}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-foreground hover:text-primary transition-colors"
        >
          Wilbert Chandra
        </a>

        {/* Menu Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          <span className="hidden sm:inline">Menu</span>
          <Menu className="w-4 h-4" />
        </button>
      </header>

      {/* Full-screen Menu Overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-background transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 md:top-6 right-4 md:right-[7vw] font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-foreground hover:text-primary transition-colors flex items-center gap-2"
        >
          <span className="hidden sm:inline">Close</span>
          <X className="w-4 h-4" />
        </button>

        {/* Menu Content */}
        <div className="h-full flex flex-col items-center justify-center px-6">
          <nav className="space-y-6 md:space-y-8">
            {menuItems.map((item, index) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="group flex items-center gap-4 text-foreground hover:text-primary transition-colors"
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.4s ease'
                }}
              >
                <span className="lime-square opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="text-[clamp(28px,8vw,64px)] md:text-[clamp(32px,5vw,64px)] font-bold tracking-tight">
                  {item.label}
                </span>
              </a>
            ))}
          </nav>

          {/* Decorative Lines */}
          <div className="absolute bottom-8 md:bottom-12 left-4 md:left-[7vw] right-4 md:right-[7vw] flex items-center gap-4">
            <div className="flex-1 h-px line-secondary"></div>
            <span className="lime-square"></span>
            <div className="flex-1 h-px line-secondary"></div>
          </div>
        </div>
      </div>
    </>
  );
}
