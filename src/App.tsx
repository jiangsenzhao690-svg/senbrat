import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutMe } from './components/AboutMe';
import { Works } from './components/Works';
import { BratGenerator } from './components/BratGenerator';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  const [currentSection, setCurrentSection] = useState<string>('hero');

  useEffect(() => {
    const sectionIds = ['hero', 'about-me', 'works', 'generator', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setCurrentSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0B08] text-white font-sans selection:bg-[#9ACD32] selection:text-black brat-noise relative">
      {/* Original glowing rotating star cursor */}
      <CustomCursor />

      {/* Top Fixed Navigation */}
      <Navbar currentSection={currentSection} />

      {/* 1. Hero / Home Section */}
      <Hero />

      {/* 2. NEW: About Me Section (placed directly between HOME and WORKS, Manifesto deleted) */}
      <AboutMe />

      {/* 3. Works Showcase Section */}
      <Works />

      {/* 4. Brat Generator Section */}
      <BratGenerator />

      {/* 5. Contact Section */}
      <Contact />

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}

export default App;
