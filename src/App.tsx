import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BratGenerator from "./components/BratGenerator";
import Works from "./components/Works";
import About from "./components/About";
import ContactForm from "./components/ContactForm";
import { Disc, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

export default function App() {
  const [currentSection, setCurrentSection] = useState("hero");

  // Track scroll position to update navbar links and background triggers dynamically
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "generator", "works", "about", "contact"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setCurrentSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0B08] text-[#E0E2DB] selection:bg-[#9ACD32] selection:text-[#0A0B08] relative font-sans antialiased brat-noise overflow-x-hidden">
      
      {/* Scroll-Triggered Gradient Background Animation Accent */}
      <div 
        className="fixed inset-0 pointer-events-none -z-20 transition-all duration-1000 ease-in-out opacity-40"
        style={{
          background: currentSection === "hero" 
            ? "radial-gradient(circle at 80% 20%, rgba(154,205,50,0.15) 0%, rgba(10,11,8,1) 60%)"
            : currentSection === "generator"
            ? "radial-gradient(circle at 10% 90%, rgba(154,205,50,0.15) 0%, rgba(10,11,8,1) 50%)"
            : currentSection === "works"
            ? "radial-gradient(circle at 85% 50%, rgba(154,205,50,0.2) 0%, rgba(10,11,8,1) 70%)"
            : currentSection === "about"
            ? "radial-gradient(circle at 25% 75%, rgba(154,205,50,0.18) 0%, rgba(10,11,8,1) 65%)"
            : "radial-gradient(circle at 50% 90%, rgba(154,205,50,0.25) 0%, rgba(10,11,8,1) 55%)"
        }}
      />

      {/* Floating Header */}
      <Navbar currentSection={currentSection} />

      {/* Structured Sections */}
      <main>
        <Hero />
        <BratGenerator />
        <Works />
        <About />
        <ContactForm />
      </main>

      {/* Subtle Analog Footer */}
      <footer className="bg-[#141614] border-t-2 border-[#9ACD32] py-12 relative overflow-hidden select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Left side */}
            <div className="flex items-center space-x-3 text-center md:text-left">
              <Disc className="w-5 h-5 text-[#9ACD32] animate-spin" style={{ animationDuration: "12s" }} />
              <div>
                <span className="font-brat uppercase text-lg text-white block leading-snug">
                  senzhao_creative.2026
                </span>
                <span className="font-mono text-[9px] text-gray-500 uppercase tracking-widest block">
                  built with precision // full responsive acid system
                </span>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4 text-xs font-mono text-gray-400">
              <span className="uppercase text-[10px] text-gray-500">vanguard club collection</span>
              <span className="text-[#9ACD32] font-brat uppercase text-lg select-all">SO BRAT.</span>
            </div>

          </div>
        </div>
      </footer>
    </div>
  );
}
