import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Works } from './components/Works';
import { Generator } from './components/Generator';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  const [currentSection, setCurrentSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'works', 'generator', 'about', 'contact'];
      const scrollPos = window.scrollY + 160;

      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setCurrentSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0B08] text-[#E0E2DB] selection:bg-[#9ACD32] selection:text-[#0A0B08] relative font-sans antialiased brat-noise overflow-x-hidden">
      {/* Dynamic ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none -z-20 transition-all duration-1000 ease-in-out opacity-40"
        style={{
          background:
            currentSection === 'hero'
              ? 'radial-gradient(circle at 80% 20%, rgba(154,205,50,0.15) 0%, rgba(10,11,8,1) 60%)'
              : currentSection === 'works'
              ? 'radial-gradient(circle at 85% 50%, rgba(154,205,50,0.2) 0%, rgba(10,11,8,1) 70%)'
              : currentSection === 'generator'
              ? 'radial-gradient(circle at 10% 90%, rgba(154,205,50,0.15) 0%, rgba(10,11,8,1) 50%)'
              : currentSection === 'about'
              ? 'radial-gradient(circle at 25% 75%, rgba(154,205,50,0.18) 0%, rgba(10,11,8,1) 65%)'
              : 'radial-gradient(circle at 50% 90%, rgba(154,205,50,0.25) 0%, rgba(10,11,8,1) 55%)',
        }}
      />

      {/* Navigation Header */}
      <Navbar currentSection={currentSection} />

      {/* Main Single-Page Sections */}
      <main>
        {/* Homepage / Hero Section (with small text removed) */}
        <Hero />

        {/* Selected Works Gallery */}
        <Works />

        {/* Brat Style Type Generator */}
        <Generator />

        {/* About, Vibe Manifesto & Audio Synthesizer */}
        <About />

        {/* Contact Form & Dispatch Logs */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Brat Custom Cursor */}
      <CustomCursor />
    </div>
  );
}

export default App;
