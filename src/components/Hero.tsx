import { ArrowDown, Disc, Terminal } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState, MouseEvent } from "react";

export default function Hero() {
  const [typedTitle, setTypedTitle] = useState("");
  const titleText = "赵江森";

  // Simulate minimal typewriter on load to enhance user interaction
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < titleText.length) {
        setTypedTitle(titleText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const [warpStyle, setWarpStyle] = useState({
    scaleX: 0.85,
    scaleY: 1.02,
    skewX: 0,
    blur: 0.5,
  });

  const handleMouseMove = (e: MouseEvent<HTMLHeadingElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Normalized coordinates (-1 to 1) based on cursor position relative to center
    const normX = x / (rect.width / 2);
    const normY = y / (rect.height / 2);
    
    // Distort parameters based on location to achieve a liquid typography warp
    setWarpStyle({
      scaleX: 0.85 + normX * 0.35,          // Interactive horizontal compression/stretching
      scaleY: 1.02 - Math.abs(normY) * 0.15,  // Interactive vertical squish
      skewX: normX * 22,                     // Skew/slant perspective distortion
      blur: 0.3 + Math.abs(normX * normY) * 2.2, // Generous focus bleed on off-centers
    });
  };

  const handleMouseLeave = () => {
    // Transition smoothly back to static brand guidelines
    setWarpStyle({
      scaleX: 0.85,
      scaleY: 1.02,
      skewX: 0,
      blur: 0.5,
    });
  };

  const handleEnterPortal = () => {
    const generator = document.getElementById("generator");
    if (generator) {
      generator.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#9ACD32] flex flex-col justify-between items-center px-4 py-8 overflow-hidden select-none"
    >
      {/* Absolute Noise scan Overlay for album style */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[#000000]" 
           style={{
             backgroundImage: "repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)"
           }}
      />

      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-10">
        <span className="font-mono text-xs text-black font-semibold tracking-widest uppercase">
          [ alternative studio 360 ]
        </span>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
          <span className="font-mono text-[10px] text-black font-semibold uppercase">
            live.vibe_status: brat
          </span>
        </div>
      </div>

      {/* Main Stretched blur typography mimicking Charli XCX album cover */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl"
        >
          {/* Interactive warp typography utilizing state coordinates for liquid ink-bleed effect */}
          <motion.h1
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="font-brat text-black block text-8xl sm:text-[10rem] md:text-[13rem] leading-[0.85] mb-5 font-black select-none tracking-[-0.08em] cursor-crosshair transition-all duration-150 ease-out py-8 px-12"
            style={{
              transform: `scaleX(${warpStyle.scaleX}) scaleY(${warpStyle.scaleY}) skewX(${warpStyle.skewX}deg)`,
              filter: `blur(${warpStyle.blur}px)`,
              display: "inline-block",
              textShadow: "0px 0px 4px rgba(0,0,0,0.12)",
            }}
          >
            {typedTitle || "赵"}
          </motion.h1>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-black/90 mt-4 max-w-xl mx-auto border-y border-black/15 py-3 uppercase">
            <span className="font-mono text-xs font-black tracking-[0.2em]">
              [ CREATIVE PORTFOLIO SYSTEM ]
            </span>
            <span className="hidden sm:inline text-black/40">/</span>
            <span className="font-mono text-xs font-black tracking-[0.2em]">
              [ VISUAL CODE & VIBES ]
            </span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Bottom Control Bar */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 z-10 border-t-2 border-black/15 pt-6">
        <p className="font-mono text-[10px] text-black font-bold text-center md:text-left max-w-md leading-relaxed uppercase">
          Everything is fuzzy, everything is bold, but perfectly responsive. Hover projects to feel the stretch.
        </p>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleEnterPortal}
            className="group px-6 py-3 bg-black text-[#9ACD32] hover:bg-[#9ACD32] hover:text-black hover:border-black font-brat text-xs uppercase tracking-widest flex items-center gap-2 border border-black transition-all cursor-pointer"
          >
            <Disc className="w-4 h-4 group-hover:rotate-180 duration-500 transition-transform" />
            Vibe Playground
          </button>

          <button
            onClick={() => {
              const works = document.getElementById("works");
              if (works) works.scrollIntoView({ behavior: "smooth" });
            }}
            className="p-3 bg-black/5 hover:bg-black/10 rounded-full text-black transition-all cursor-pointer"
            aria-label="Scroll down to projects"
          >
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
