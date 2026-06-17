import { useState, useEffect } from "react";
import { Menu, X, Disc, Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentSection: string;
}

export default function Navbar({ currentSection }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "hero", label: "home" },
    { id: "generator", label: "brat-creator" },
    { id: "works", label: "works" },
    { id: "about", label: " manifesto" },
    { id: "contact", label: "contact" }
  ];

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  return (
    <nav
      id="app-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0e0d]/90 backdrop-blur-md border-b-2 border-[#9ACD32]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleScrollTo("hero")}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              className="text-[#9ACD32]"
            >
              <Disc className="w-6 h-6" />
            </motion.div>
            <span className="font-brat text-xl tracking-tight text-white group-hover:text-[#9ACD32] transition-colors leading-none">
              senzhao<span className="text-[#9ACD32] text-xs align-super">360</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleScrollTo(item.id)}
                  className={`relative px-4 py-2 font-brat text-sm tracking-tight transition-all duration-150 uppercase ${
                    isActive 
                      ? "text-[#9ACD32] scale-110 tracking-widest text-blur-sm" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-glow"
                      className="absolute inset-0 bg-[#9ACD32]/5 border border-[#9ACD32]/40 rounded-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-sm text-[#9ACD32] hover:bg-[#9ACD32]/10 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden bg-[#0d0e0d] border-b-2 border-[#9ACD32] overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const isActive = currentSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleScrollTo(item.id)}
                    className={`block w-full text-left px-4 py-3 font-brat uppercase text-lg ${
                      isActive
                        ? "text-[#9ACD32] bg-[#9ACD32]/10 pl-6 border-l-4 border-[#9ACD32] text-blur-sm"
                        : "text-gray-300 hover:bg-[#9ACD32]/5 hover:text-white"
                    } transition-all duration-150`}
                  >
                    <div className="flex items-center space-x-2">
                      {isActive && <Star className="w-4 h-4 fill-[#9ACD32]" />}
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
