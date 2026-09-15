import React from 'react';
import { WorkItem } from '../types';

interface WorkArtworkProps {
  image: WorkItem['image'];
}

export function WorkArtwork({ image }: WorkArtworkProps) {
  switch (image) {
    case 'collage':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-[#9ACD32] border border-[#9ACD32]/30 overflow-hidden group/collage flex flex-col justify-between p-3 select-none">
          <div
            className="absolute inset-0 opacity-[0.14] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#000 1.2px, transparent 1.2px)',
              backgroundSize: '6px 6px',
            }}
          />
          <div className="flex justify-between items-start relative z-10">
            <span className="font-brat text-xl text-black font-black tracking-tighter">
              brat
            </span>
            <div className="w-12 h-12 transform rotate-12 origin-top-right group-hover/collage:scale-110 duration-500 transition-all">
              <svg viewBox="0 0 60 60" className="w-full h-full drop-shadow-md">
                <defs>
                  <radialGradient id="sliceG" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="70%" stopColor="#f7eeae" />
                    <stop offset="100%" stopColor="#8cb71b" />
                  </radialGradient>
                </defs>
                <path
                  d="M 10 30 C 10 10, 50 10, 50 30 C 50 35, 10 35, 10 30"
                  fill="url(#sliceG)"
                  stroke="#557508"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-10">
            <div className="relative w-28 h-28 flex items-center justify-center group-hover/collage:scale-105 duration-500 transition-all">
              <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                <circle cx="50" cy="50" r="44" fill="#8cb71b" stroke="#000" strokeWidth="2" />
                <path d="M 50 6 C 52 2, 58 4, 56 12" stroke="#422e0f" strokeWidth="3" fill="none" />
                <ellipse cx="60" cy="8" rx="7" ry="3.5" fill="#557508" transform="rotate(-15 60 8)" />
                <ellipse cx="38" cy="38" rx="20" ry="12" fill="#fff" opacity="0.18" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-brat text-xl text-black select-none tracking-tight blur-[0.4px]">
                  365_party
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-end relative z-10 font-mono text-[9px] text-black/80 font-bold uppercase">
            <span>[ ACID_COLLAGE ]</span>
            <span>CHARLI_MATRIX</span>
          </div>
        </div>
      );

    case 'rave-android':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-zinc-900 border border-[#9ACD32]/20 overflow-hidden group/rave flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #9ACD32 1px, transparent 1px)',
              backgroundSize: '12px 12px',
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-[#9ACD32]/10 mix-blend-screen opacity-0 group-hover/rave:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <div className="relative z-20 flex flex-col items-center">
            <svg
              viewBox="0 0 100 100"
              className="w-16 h-16 drop-shadow-[0_15px_15px_rgba(0,0,0,0.6)] group-hover/rave:-translate-y-1 transition-transform"
            >
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
            <span className="font-brat text-[10px] text-[#9ACD32] uppercase tracking-widest mt-2">
              RAVE_DROID.360
            </span>
          </div>
          <div className="absolute top-2 left-2 font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
            RAVE-SYSTEM v2
          </div>
        </div>
      );

    case 'studio-android':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-zinc-950 border border-[#9ACD32]/10 overflow-hidden group/studio flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(16,185,129,0.15),transparent_70%)]" />
          <div className="absolute inset-x-0 bottom-0 h-10 border-t border-zinc-900 bg-zinc-900/40" />
          <div className="absolute bottom-[8%] w-16 h-3 bg-green-500/10 rounded-full blur-sm" />
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

    case 'brat-chair':
      return (
        <div
          className="relative w-full h-48 sm:h-56 overflow-hidden group/chair flex items-center justify-center p-4 rounded-t-sm"
          style={{ background: 'radial-gradient(circle, #250902 0%, #100200 45%, #050000 100%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-orange-600/10 rounded-full blur-[40px]" />
          <div className="relative w-32 h-36 flex items-center justify-center group-hover/chair:scale-105 duration-500 transition-transform">
            <svg viewBox="0 0 100 120" className="w-full h-full drop-shadow-2xl">
              <line x1="25" y1="30" x2="25" y2="110" stroke="#525450" strokeWidth="4" />
              <line x1="75" y1="30" x2="75" y2="110" stroke="#484a46" strokeWidth="4" />
              <rect x="25" y="30" width="50" height="8" fill="#4d4f4c" />
              <rect x="25" y="44" width="50" height="5" fill="#424340" />
              <line x1="40" y1="38" x2="40" y2="70" stroke="#373835" strokeWidth="2.5" />
              <line x1="50" y1="38" x2="50" y2="70" stroke="#373835" strokeWidth="2.5" />
              <line x1="60" y1="38" x2="60" y2="70" stroke="#373835" strokeWidth="2.5" />
              <line x1="30" y1="70" x2="30" y2="110" stroke="#878a84" strokeWidth="3.5" />
              <line x1="70" y1="70" x2="70" y2="110" stroke="#797c77" strokeWidth="3.5" />
              <path d="M 20 68 Q 50 63, 80 68 Q 82 72, 80 78 Q 50 82, 20 78 Q 18 72, 20 68 Z" fill="#9ACD32" />
              <path d="M 20 78 C 25 90, 75 90, 80 78 Q 81 74, 80 78 Q 50 82, 20 78" fill="#8cb913" opacity="0.9" />
              <text
                x="50"
                y="76"
                textAnchor="middle"
                fill="#000"
                fontSize="7"
                fontWeight="bold"
                fontStyle="italic"
                fontFamily="Arial"
                transform="skewX(-15)"
              >
                brat
              </text>
            </svg>
          </div>
          <div className="absolute bottom-2 left-3 font-mono text-[8px] text-amber-600/60 uppercase">
            STUDIO RENDERING / DESIGN F-02
          </div>
        </div>
      );

    case 'synth':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-zinc-900 overflow-hidden group/synth flex items-center justify-center border border-zinc-800">
          <div
            className="absolute inset-0 bg-repeat opacity-[0.05]"
            style={{
              backgroundImage: 'repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 6px)',
            }}
          />
          <svg viewBox="0 0 100 50" className="w-3/4 h-2/3 text-[#9ACD32]">
            <path
              d="M 5 25 Q 15 5, 25 25 T 45 25 T 65 25 T 85 25 T 95 25"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3"
              className="animate-pulse"
            />
            <path
              d="M 5 25 Q 15 -2, 25 32 Q 35 15, 45 42 Q 55 10, 65 35 Q 75 8, 85 28 T 95 25"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
            />
          </svg>
          <div className="absolute bottom-2 left-2 pr-2 font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
            SYNTH SIGNAL GENERATOR
          </div>
        </div>
      );

    case 'audio-filter':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-black overflow-hidden group/filter flex items-center justify-center border border-red-500/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ff220015_0%,_transparent_70%)]" />
          <div className="w-5/6 h-5/6 border border-zinc-800 flex flex-col justify-between p-3 rounded bg-zinc-950">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] text-zinc-400">VCF FEEDBACK LOOP</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[7px] text-red-500 font-bold">CLIPPED</span>
                <span className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
              </div>
            </div>
            <div className="h-16 flex items-end gap-1 px-1 border-b border-zinc-900 pb-2">
              {[25, 45, 80, 95, 95, 20, 10, 35, 75, 95, 95, 50, 10, 30, 95, 95, 80, 45, 10].map(
                (val, idx) => (
                  <div
                    key={idx}
                    className={`w-full transition-all duration-300 ${
                      val >= 95 ? 'bg-red-600 animate-pulse' : 'bg-[#9ACD32]'
                    }`}
                    style={{ height: `${val}%` }}
                  />
                )
              )}
            </div>
            <span className="font-mono text-[8px] text-[#9ACD32]/70 uppercase tracking-widest text-center">
              ANALOG DIODE CLIPPER FILTER
            </span>
          </div>
        </div>
      );

    default:
      return null;
  }
}
