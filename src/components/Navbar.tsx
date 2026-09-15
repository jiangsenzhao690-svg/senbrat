import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Asterisk, Menu, X } from 'lucide-react';
import { NavSection } from '../types';

interface NavbarProps {
  currentSection: string;
}

const NAV_ITEMS: NavSection[] = [
  { id: 'hero', label: 'home' },
  { id: 'about-me', label: 'about me' },
  { id: 'works', label: 'works' },
  { id: 'generator', label: 'brat-creator' },
  { id: 'contact', label: 'contact' },
];

export function Navbar({ currentSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav
      id="app-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0d0e0d]/90 backdrop-blur-md border-b-2 border-[#9ACD32]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand logo */}
          <button
            id="nav-brand-logo"
            type="button"
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 cursor-pointer group bg-transparent border-0 text-left p-0"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="text-[#9ACD32]"
            >
              <Asterisk className="w-6 h-6" />
            </motion.div>
            <span className="font-brat text-xl tracking-tight text-white group-hover:text-[#9ACD32] transition-colors leading-none">
              senzhao
              <span className="text-[#9ACD32] text-xs align-super ml-0.5">360</span>
            </span>
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-black bg-[#9ACD32] font-bold shadow-[0_0_12px_rgba(154,205,50,0.5)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu toggle */}
          <div className="md:hidden flex items-center">
            <button
              id="mobile-menu-toggle"
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#9ACD32] p-2 hover:bg-[#9ACD32]/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0e0d] border-b border-[#9ACD32]/30 px-4 pt-2 pb-6 space-y-2"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-widest ${
                    isActive
                      ? 'bg-[#9ACD32] text-black font-bold'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
