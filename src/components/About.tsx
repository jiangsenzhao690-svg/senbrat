import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Flame, Play, Volume2, RefreshCw } from 'lucide-react';
import { SKILLS, PLAYLIST, MANIFESTO_QUOTES } from '../data/portfolioData';
import { playSynthNote } from '../utils/audio';

export const About: React.FC = () => {
  const [activePlayingId, setActivePlayingId] = useState<string | null>(null);
  const [quoteIdx, setQuoteIdx] = useState(0);

  const handlePlaySongNote = (trackId: string, idx: number) => {
    setActivePlayingId(trackId);
    playSynthNote(idx);
    setTimeout(() => setActivePlayingId(null), 1000);
  };

  const nextQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % MANIFESTO_QUOTES.length);
  };

  return (
    <section id="about" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative">
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[#9ACD32]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Bio and Skills */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5" /> [ IDENTITY & EXPERIMENTAL PHILOSOPHY ]
              </span>
              <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
                about.赵江森
              </h2>
            </motion.div>

            <div className="space-y-4 font-sans text-gray-300 text-sm leading-relaxed border-l-2 border-[#9ACD32] pl-5">
              <p>
                我是 <span className="font-brat text-[#9ACD32] text-base">赵江森 (Senzhao)</span>
                ，跨界数字设计师与前端工程师。痴迷于 Acid Graphics（酸性图形）、Digital Brutalism（数字粗野主义）、以及 2024 年席卷全球的《brat》亚文化设计美学。
              </p>
              <p>
                我不做千篇一律、苍白无趣的企业模板界面。通过在现代工程中注入高饱和荧光黄绿色彩碰撞、文字横向拉伸失真、低保真模拟噪声和可交互的合成器算法，打造具备强烈亚文化反叛辨识度的沉浸式界面。
              </p>
            </div>

            {/* Interactive Manifesto Quote Banner */}
            <div className="bg-[#141614] border-2 border-[#9ACD32]/30 p-6 relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="font-mono text-[10px] text-[#9ACD32] uppercase tracking-widest flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#9ACD32]" /> VIBE_MANIFESTO.TXT
                </span>
                <button
                  onClick={nextQuote}
                  className="font-mono text-[10px] text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <RefreshCw className="w-3 h-3" /> NEXT VIBE
                </button>
              </div>
              <p className="font-brat text-lg sm:text-xl text-white italic tracking-tight lowercase text-blur-sm min-h-[3rem] flex items-center">
                &ldquo;{MANIFESTO_QUOTES[quoteIdx]}&rdquo;
              </p>
            </div>

            {/* Skills Radar / Bars */}
            <div className="space-y-3 pt-4">
              <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-4">
                // SYSTEM_PROFICIENCY_SPECS
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SKILLS.map((skill) => (
                  <div
                    key={skill.name}
                    className="bg-[#141614] p-3 border border-[#9ACD32]/20 hover:border-[#9ACD32]/60 transition-colors"
                  >
                    <div className="flex justify-between font-mono text-xs mb-1.5">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-[#9ACD32] font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-1.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="bg-[#9ACD32] h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Sound Matrix & Playlist */}
          <div className="lg:col-span-5 bg-[#141614] border-2 border-[#9ACD32]/40 p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-zinc-800 mb-6">
                <div>
                  <span className="font-mono text-[10px] text-[#9ACD32] uppercase tracking-widest block">
                    AUDIO MATRIX
                  </span>
                  <h3 className="font-brat text-2xl text-white uppercase mt-1">brat.club_tunes</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-[#9ACD32]/40">
                  <Volume2 className="w-3.5 h-3.5 text-[#9ACD32] animate-pulse" />
                  <span className="font-mono text-[9px] text-[#9ACD32] uppercase font-bold">140 BPM</span>
                </div>
              </div>

              <div className="space-y-3">
                {PLAYLIST.map((track, idx) => {
                  const isPlaying = activePlayingId === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => handlePlaySongNote(track.id, idx)}
                      className={`p-3 border transition-all cursor-pointer flex items-center justify-between group ${
                        isPlaying
                          ? 'bg-[#9ACD32] text-black border-[#9ACD32]'
                          : 'bg-[#0d0e0d] border-zinc-800 hover:border-[#9ACD32]/60 text-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <button
                          className={`w-8 h-8 flex items-center justify-center rounded-none border transition-colors ${
                            isPlaying
                              ? 'bg-black text-[#9ACD32] border-black'
                              : 'bg-zinc-900 text-gray-400 group-hover:text-white border-zinc-700'
                          }`}
                        >
                          <Play className={`w-3.5 h-3.5 ${isPlaying ? 'fill-[#9ACD32]' : ''}`} />
                        </button>
                        <div>
                          <span
                            className={`font-brat text-sm block ${
                              isPlaying ? 'text-black' : 'text-white'
                            }`}
                          >
                            {track.title}
                          </span>
                          <span className="font-mono text-[10px] opacity-70 block uppercase">
                            {track.energyLevel}
                          </span>
                        </div>
                      </div>

                      <div className="text-right font-mono text-xs">
                        <span className="opacity-80">{track.duration}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-800 text-center">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                CLICK TRACK TO EMIT WEBAUDIO SYNTH PULSE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
