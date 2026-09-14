import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Disc, Menu, X } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'home' },
    { id: 'works', label: 'works' },
    { id: 'generator', label: 'brat-creator' },
    { id: 'about', label: 'manifesto' },
    { id: 'contact', label: 'contact' },
  ];

  const scrollTo = (id: string) => {
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
          {/* Brand Logo */}
          <div
            onClick={() => scrollTo('hero')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="text-[#9ACD32]"
            >
              <Disc className="w-6 h-6" />
            </motion.div>
            <span className="font-brat text-xl tracking-tight text-white group-hover:text-[#9ACD32] transition-colors leading-none">
              senzhao
              <span className="text-[#9ACD32] text-xs align-super">360</span>
            </span>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-4 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                    active
                      ? 'text-black bg-[#9ACD32] font-bold shadow-[0_0_12px_rgba(154,205,50,0.5)]'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#9ACD32] p-2 hover:bg-[#9ACD32]/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0d0e0d] border-b border-[#9ACD32]/30 px-4 pt-2 pb-6 space-y-2"
          >
            {navItems.map((item) => {
              const active = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`w-full text-left px-4 py-3 text-xs font-mono uppercase tracking-widest ${
                    active
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
};
