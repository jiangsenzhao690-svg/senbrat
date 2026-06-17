import { useState } from "react";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, Flame, Briefcase } from "lucide-react";

function ProjectVisual({ image }: { image?: string }) {
  if (!image) return null;

  switch (image) {
    case "collage":
      return (
        <div className="relative w-full h-48 sm:h-56 bg-[#9ACD32] border border-[#9ACD32]/30 overflow-hidden group/collage flex flex-col justify-between p-3 select-none">
          {/* Halftone network texture overlay */}
          <div className="absolute inset-0 opacity-[0.14] pointer-events-none" 
               style={{ backgroundImage: "radial-gradient(#000 1.2px, transparent 1.2px)", backgroundSize: "6px 6px" }} />
          
          {/* Brat and star top section */}
          <div className="flex justify-between items-start relative z-10">
            <span className="font-brat text-xl text-black font-black tracking-tighter">brat</span>
            {/* Apple Slice Top Right */}
            <div className="w-12 h-12 transform rotate-12 origin-top-right group-hover/collage:scale-110 duration-500 transition-all">
              <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
                <radialGradient id="sliceG" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="70%" stopColor="#f7eeae" />
                  <stop offset="100%" stopColor="#8cb71b" />
                </radialGradient>
                <path d="M 10 30 C 10 10, 50 10, 50 30 C 50 35, 10 35, 10 30" fill="url(#sliceG)" stroke="#557508" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          {/* Core Central Apple */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
            <div className="relative w-28 h-28 flex items-center justify-center group-hover/collage:scale-105 duration-500 transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                <path d="M 50 25 C 47 15, 38 10, 36 8" stroke="#3d2516" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 45 18 C 35 15, 23 22, 26 25 C 32 27, 42 22, 45 18 Z" fill="#42551c" />
                <radialGradient id="appleG" cx="45%" cy="35%" r="60%">
                  <stop offset="0%" stopColor="#d4fa4c" />
                  <stop offset="50%" stopColor="#8cb913" />
                  <stop offset="100%" stopColor="#2e4004" />
                </radialGradient>
                <path d="M 50 26 C 65 24, 82 28, 84 50 C 86 72, 70 88, 50 88 C 30 88, 14 72, 16 50 C 18 28, 35 24, 50 26 Z" fill="url(#appleG)" />
              </svg>
              {/* Overlay quote */}
              <p className="absolute text-[8px] sm:text-[9.5px] text-center text-black font-semibold leading-[1.05] tracking-tight max-w-[62px] px-1 select-none">
                I know there's lots of different nuances to you and to me
              </p>
            </div>
          </div>

          {/* Diagonal Slips Crop with intensity eyes */}
          <div className="absolute left-2 bottom-8 w-24 h-8 bg-[#0A0B08] border border-black/40 shadow-lg -rotate-[16deg] overflow-hidden flex items-center justify-center group-hover/collage:rotate-[-8deg] transition-all duration-500 z-20">
            <svg viewBox="0 0 100 40" className="w-full h-full">
              <rect width="100" height="40" fill="#e0b898" />
              <rect width="100" height="40" fill="white" opacity="0.15" style={{ mixBlendMode: 'overlay' }} />
              {/* Left Eye */}
              <path d="M 15 20 Q 30 11, 45 20 Q 30 29, 15 20" fill="#fff" stroke="#000" strokeWidth="2.5" />
              <circle cx="30" cy="20" r="5" fill="#4a2503" />
              <circle cx="28.5" cy="18" r="1.5" fill="#fff" />
              <path d="M 12 16 Q 30 3, 48 16" stroke="#000" strokeWidth="4.5" fill="none" strokeLinecap="round" />
              {/* Right Eye */}
              <path d="M 55 20 Q 70 11, 85 20 Q 70 29, 55 20" fill="#fff" stroke="#000" strokeWidth="2.5" />
              <circle cx="70" cy="20" r="5" fill="#4a2503" />
              <circle cx="68.5" cy="18" r="1.5" fill="#fff" />
              <path d="M 52 16 Q 70 3, 88 16" stroke="#000" strokeWidth="4.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          {/* Black star vectors */}
          <div className="absolute top-14 left-8 text-black opacity-90 scale-75 group-hover/collage:rotate-45 transition-all duration-700">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z"/></svg>
          </div>
          <div className="absolute bottom-1 right-2 text-black opacity-90 group-hover/collage:scale-110 transition-transform duration-500">
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-current"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z"/></svg>
          </div>
          <div className="absolute bottom-5 left-8 text-black opacity-80 scale-50">
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.41l8.2-1.192z"/></svg>
          </div>

          {/* Bottom brand layout */}
          <div className="flex justify-between items-end relative z-10 border-t border-black/10 pt-1">
            <span className="font-brat text-lg text-black font-black tracking-tighter transform rotate-180 origin-center leading-none">t1rd</span>
            <span className="font-mono text-[8px] text-black/60 font-black">COLLAGE NO.01</span>
          </div>
        </div>
      );

    case "rave-android":
      return (
        <div className="relative w-full h-48 sm:h-56 bg-[#0A0B08] border border-[#9ACD32]/20 overflow-hidden group/rave flex items-center justify-center p-4">
          {/* Half background split (Green floor / White back or similar) */}
          <div className="absolute inset-0 grid grid-cols-1 grid-rows-2">
            <div className="bg-[#9ACD32]" />
            <div className="bg-[#1c1d1a]" />
          </div>

          {/* Shadow from bot */}
          <div className="absolute bottom-[22%] w-16 h-4 bg-black/60 rounded-full blur-md scale-x-125 z-0" />

          {/* Charli Portrait in Back center */}
          <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-48 h-28 bg-[#101010] border-2 border-black overflow-hidden flex items-center justify-center shadow-2xl z-10 select-none">
            {/* Draw a monochromatic poster face with wavy hair */}
            <div className="relative w-full h-full flex flex-col justify-end bg-gradient-to-t from-black to-zinc-900 p-2">
              <svg viewBox="0 0 100 50" className="absolute top-1 w-full h-32 opacity-70 group-hover/rave:scale-105 duration-1000 transition-all">
                {/* Hair background */}
                <path d="M 0 50 Q 15 10, 30 15 Q 45 5, 50 20 Q 55 5, 70 15 Q 85 10, 100 50 Z" fill="#000" />
                <path d="M 10 50 C 15 2, 85 2, 90 50" fill="#000" />
                {/* Pale human face outline */}
                <ellipse cx="50" cy="24" rx="14" ry="17" fill="#fcfcfc" stroke="#000" strokeWidth="0.5" />
                {/* Dark gorgeous wavy hair strands front */}
                <path d="M 37 15 Q 40 25, 41 42" stroke="#000" strokeWidth="2.5" fill="none"/>
                <path d="M 63 15 Q 60 25, 59 42" stroke="#000" strokeWidth="2.5" fill="none"/>
                <path d="M 45 10 Q 50 16, 55 10" stroke="#000" strokeWidth="2" fill="none" />
                {/* Emo gaze eyes */}
                <ellipse cx="44" cy="22" rx="2" ry="1.2" fill="#000" />
                <ellipse cx="56" cy="22" rx="2" ry="1.2" fill="#000" />
                {/* Red tinted lips */}
                <path d="M 46 32 C 48 34, 52 34, 54 32" stroke="#4a0404" strokeWidth="1" fill="none" />
              </svg>
              <div className="h-6 w-full bg-[#9ACD32] flex items-center justify-center relative z-20 overflow-hidden">
                <span className="font-brat text-[9px] text-black font-black uppercase tracking-widest animate-pulse">CHARLI EDITION</span>
              </div>
            </div>
          </div>

          {/* 3D-styled SVG Android bot mascot */}
          <div className="absolute bottom-[24%] transform z-20 group-hover/rave:-translate-y-2 duration-300 transition-transform">
            <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)]">
              <rect x="32" y="14" width="4" height="15" rx="2" transform="rotate(-25 32 14)" fill="#9ACD32" />
              <rect x="64" y="14" width="4" height="15" rx="2" transform="rotate(25 64 14)" fill="#9ACD32" />
              <path d="M 30 35 A 20 20 0 0 1 70 35 Z" fill="#9ACD32" />
              <circle cx="42" cy="25" r="2" fill="#000" />
              <circle cx="58" cy="25" r="2" fill="#000" />
              <rect x="22" y="38" width="6" height="22" rx="3" fill="#8cb913" />
              <rect x="72" y="38" width="6" height="22" rx="3" fill="#8cb913" />
              <rect x="30" y="38" width="40" height="26" rx="2" fill="#9ACD32" />
              <rect x="38" y="64" width="6" height="12" rx="3" fill="#8cb913" />
              <rect x="56" y="64" width="6" height="12" rx="3" fill="#8cb913" />
            </svg>
          </div>

          {/* Tech layout border line info */}
          <div className="absolute top-2 left-2 pr-2 font-mono text-[8px] text-black/60 uppercase tracking-widest">
            RAVE-SYSTEM v2
          </div>
        </div>
      );

    case "studio-android":
      return (
        <div className="relative w-full h-48 sm:h-56 bg-zinc-950 border border-[#9ACD32]/10 overflow-hidden group/studio flex items-center justify-center">
          {/* Spotlight vignette overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(16,185,129,0.15),transparent_70%)]" />
          
          {/* Concrete columns grid line */}
          <div className="absolute inset-x-0 bottom-0 h-10 border-t border-zinc-900 bg-zinc-900/40" />
          
          <div className="absolute bottom-[8%] w-16 h-3 bg-green-500/10 rounded-full blur-sm" />
          
          {/* Large text "brat" embedded blur in the back */}
          <div className="absolute top-[20%] font-brat text-6xl text-center text-green-950/40 select-none tracking-tight text-blur-lg filter blur-[2px] transition-all duration-700 group-hover/studio:blur-[5px]">
            brat
          </div>

          <div className="absolute bottom-[10%] group-hover/studio:scale-105 duration-300 transition-transform">
            <svg viewBox="0 0 100 100" className="w-14 h-14 drop-shadow-[0_10px_10px_rgba(0,255,0,0.15)]">
              <rect x="32" y="14" width="4" height="15" rx="2" transform="rotate(-25 32 14)" fill="#7ba512" />
              <rect x="64" y="14" width="4" height="15" rx="2" transform="rotate(25 64 14)" fill="#7ba512" />
              <path d="M 30 35 A 20 20 0 0 1 70 35 Z" fill="#7ba512" />
              <circle cx="42" cy="25" r="1.5" fill="#000" />
              <circle cx="58" cy="25" r="1.5" fill="#000" />
              <rect x="22" y="38" width="6" height="22" rx="3" fill="#5b7d0a" />
              <rect x="72" y="38" width="6" height="22" rx="3" fill="#5b7d0a" />
              <rect x="30" y="38" width="40" height="26" rx="2" fill="#7ba512" />
              <rect x="38" y="64" width="6" height="12" rx="3" fill="#5b7d0a" />
              <rect x="56" y="64" width="6" height="12" rx="3" fill="#5b7d0a" />
            </svg>
          </div>

          <div className="absolute bottom-1 right-2 font-mono text-[8px] text-zinc-600">
            OCTANE RENDER
          </div>
        </div>
      );

    case "brat-chair":
      return (
        <div className="relative w-full h-48 sm:h-56 overflow-hidden group/chair flex items-center justify-center p-4 rounded-t-sm"
             style={{ background: "radial-gradient(circle, #250902 0%, #100200 45%, #050000 100%)" }}>
          
          {/* Subtle warm amber particle light in background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-600/10 rounded-full blur-[40px]" />

          {/* Chair 3D construct using SVGs */}
          <div className="relative w-32 h-36 flex items-center justify-center group-hover/chair:scale-105 duration-500 transition-transform">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
              {/* Backrest rails and wood legs */}
              <line x1="25" y1="30" x2="25" y2="110" stroke="#525450" strokeWidth="4" />
              <line x1="75" y1="30" x2="75" y2="110" stroke="#484a46" strokeWidth="4" />
              <rect x="25" y="30" width="50" height="8" fill="#4d4f4c" />
              <rect x="25" y="44" width="50" height="5" fill="#424340" />
              
              <line x1="40" y1="38" x2="40" y2="70" stroke="#373835" strokeWidth="2.5" />
              <line x1="50" y1="38" x2="50" y2="70" stroke="#373835" strokeWidth="2.5" />
              <line x1="60" y1="38" x2="60" y2="70" stroke="#373835" strokeWidth="2.5" />

              {/* Front legs which are brighter */}
              <line x1="30" y1="70" x2="30" y2="110" stroke="#878a84" strokeWidth="3.5" />
              <line x1="70" y1="70" x2="70" y2="110" stroke="#797c77" strokeWidth="3.5" />

              {/* Translucent neon green melting leather cushion pad over seat */}
              {/* Top face */}
              <path d="M 20 68 Q 50 63, 80 68 Q 82 72, 80 78 Q 50 82, 20 78 Q 18 72, 20 68 Z" fill="#9ACD32" />
              {/* Front leather overhang draping down */}
              <path d="M 20 78 C 25 90, 75 90, 80 78 Q 81 74, 80 78 Q 50 82, 20 78" fill="#8cb913" opacity="0.9" />

              {/* "brat" word printed on dynamic stretch green leather in lowercase italicized Arial */}
              <text x="50" y="76" textAnchor="middle" fill="#000" fontSize="7" fontWeight="bold" fontStyle="italic" fontFamily="Arial" transform="skewX(-15)">brat</text>
            </svg>
          </div>

          <div className="absolute bottom-2 left-3 font-mono text-[8px] text-amber-600/60 uppercase">
            STUDIO RENDERING / DESIGN F-02
          </div>
        </div>
      );

    case "synth":
      return (
        <div className="relative w-full h-48 sm:h-56 bg-zinc-900 overflow-hidden group/synth flex items-center justify-center border border-zinc-800">
          <div className="absolute inset-0 bg-repeat opacity-[0.05]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 6px)" }} />
          <svg viewBox="0 0 100 50" className="w-3/4 h-2/3 text-[#9ACD32]">
            {/* Audio waveform line representation */}
            <path d="M 5 25 Q 15 5, 25 25 T 45 25 T 65 25 T 85 25 T 95 25" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3" className="animate-pulse" />
            <path d="M 5 25 Q 15 -2, 25 32 Q 35 15, 45 42 Q 55 10, 65 35 Q 75 8, 85 28 T 95 25" stroke="currentColor" strokeWidth="2.5" fill="none" />
          </svg>
          <div className="absolute bottom-2 left-2 pr-2 font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
            SYNTH SIGNAL GENERATOR
          </div>
        </div>
      );

    case "audio-filter":
      return (
        <div className="relative w-full h-48 sm:h-56 bg-black overflow-hidden group/filter flex items-center justify-center border border-red-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff220015_0%,_transparent_70%)]" />
          <div className="w-5/6 h-5/6 border border-zinc-800 flex flex-col justify-between p-3 rounded bg-zinc-950">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] text-zinc-400">VCF FEEDBACK LOOP</span>
              {/* Small audio clipping red indicator lamp */}
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[7px] text-red-500 font-bold">CLIPPED</span>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              </div>
            </div>
            {/* Extreme graphic clipper waves */}
            <div className="h-16 flex items-end gap-1 px-1 border-b border-zinc-900 pb-2">
              {[25, 45, 80, 95, 95, 20, 10, 35, 75, 95, 95, 50, 10, 30, 95, 95, 80, 45, 10].map((h, i) => (
                <div key={i} className={`w-full transition-all duration-300 ${h >= 95 ? 'bg-red-600 animate-pulse' : 'bg-[#9ACD32]'}`} style={{ height: `${h}%` }} />
              ))}
            </div>
            <span className="font-mono text-[8px] text-[#9ACD32]/70 uppercase tracking-widest text-center">ANALOG DIODE CLIPPER FILTER</span>
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function Works() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "all.全部作品" },
    { id: "web", label: "code.技术渲染" },
    { id: "design", label: "type.平面排版" },
    { id: "art", label: "art.视觉表达" },
    { id: "audio", label: "dsp.声音交互" }
  ];

  const filteredProjects = activeCategory === "all"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="works" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#9ACD32]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5" /> [ selected work index ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              works.作品展示
            </h2>
          </motion.div>

          {/* Filtering Buttons */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 font-brat text-xs uppercase tracking-wider transition-all duration-150 cursor-pointer ${
                    isActive
                      ? "bg-[#9ACD32] text-black scale-105 border-transparent font-bold text-blur-sm"
                      : "bg-[#141614] text-gray-400 hover:text-white border border-[#9ACD32]/20 hover:border-[#9ACD32]"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative flex flex-col justify-between bg-[#141614] border-2 border-transparent hover:border-[#9ACD32] p-6 sm:p-8 transition-all duration-300 rounded-sm"
              >
                {/* Micro Noise Background inside cards */}
                <div className="absolute inset-0 opacity-[0.02] bg-repeat pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-300"
                  style={{
                    backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)"
                  }}
                />

                <div className="space-y-6 relative">
                  {/* Dynamic Custom-Drawn Artwork Header matching User's Uploaded images */}
                  <ProjectVisual image={project.image} />

                  {/* Top line metadata */}
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <span className="font-mono text-[10px] text-gray-500 uppercase">
                      NO.{project.id.split("-")[1]} // CLASS: {project.category}
                    </span>
                    <span className="font-mono text-xs text-[#9ACD32] font-semibold">
                      {project.year}
                    </span>
                  </div>

                  {/* Stretched Title on Hover (cohesive with album stretch) */}
                  <div className="space-y-2">
                    <h3 className="font-brat text-2xl sm:text-3xl text-white tracking-tight uppercase group-hover:scale-x-90 group-hover:scale-y-105 group-hover:text-[#9ACD32] origin-left duration-300 transition-all text-blur-sm">
                      {project.title}
                    </h3>
                    <p className="font-mono text-[#9ACD32]/75 text-[11px] font-semibold uppercase tracking-wider">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Project description in Chinese */}
                  <p className="font-mono text-xs text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Tags and Live URL action */}
                <div className="pt-6 mt-8 border-t border-gray-800 flex items-center justify-between gap-3 relative z-10">
                  <div className="flex flex-wrap gap-1.5 max-w-[70%]">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] px-2 py-0.5 bg-black text-gray-400 uppercase tracking-widest border border-gray-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link || "https://github.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-black hover:bg-[#9ACD32] text-gray-400 hover:text-black border border-gray-800 hover:border-transparent transition-all rounded-full flex items-center justify-center cursor-pointer"
                    aria-label={`View documentation for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-[#9ACD32]/25">
            <Flame className="w-8 h-8 text-gray-600 animate-pulse mx-auto mb-3" />
            <p className="font-mono text-xs text-gray-500 uppercase">没有找到该分类的作品 / 敬请期待后续发布</p>
          </div>
        )}
      </div>
    </section>
  );
}
