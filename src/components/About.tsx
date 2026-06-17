import { useState } from "react";
import { SKILLS, PLAYLIST, MEMORABLE_QUOTES } from "../data";
import { motion } from "motion/react";
import { Play, Volume2, ShieldCheck, HelpCircle, FileText } from "lucide-react";

export default function About() {
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const [currentQuoteIdx, setCurrentQuoteIdx] = useState(0);

  // Procedural WebAudio synthesizer notes matching specific pop energy levels
  const triggerSynthTone = (songId: string, idx: number) => {
    setActiveSongId(songId);
    setTimeout(() => setActiveSongId(null), 1000);

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      const osc = ctx.createOscillator();
      const oscFilter = ctx.createBiquadFilter();
      const gainNode = ctx.createGain();
      
      // Determine frequency patterns based on indexes
      const freqs = [110, 164.81, 220, 130.81, 146.83];
      const targetFreq = freqs[idx % freqs.length] || 110;
      
      // Select waves matching Brat energy (sawtooth or triangle)
      osc.type = idx % 2 === 0 ? "sawtooth" : "triangle";
      osc.frequency.setValueAtTime(targetFreq, ctx.currentTime);
      
      // Filter sweep simulation
      oscFilter.type = "lowpass";
      oscFilter.frequency.setValueAtTime(300, ctx.currentTime);
      oscFilter.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 0.5);
      
      // Gain envelope
      gainNode.gain.setValueAtTime(0.12, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      
      // Connecting modules
      osc.connect(oscFilter);
      oscFilter.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.8);
    } catch (e) {
      console.warn("Audio synthesis context restricted by browser security policies.", e);
    }
  };

  const nextQuote = () => {
    setCurrentQuoteIdx((prev) => (prev + 1) % MEMORABLE_QUOTES.length);
  };

  return (
    <section id="about" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative">
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-10 w-[300px] h-[300px] bg-[#9ACD32]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Manifesto Bio Column */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs">
                [ creative manifesto / bio ]
              </span>
              <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
                the.alternative.path
              </h2>
            </motion.div>

            <div className="font-mono text-xs text-gray-300 leading-relaxed space-y-6">
              <p className="border-l-2 border-[#9ACD32] pl-4 text-[#9ACD32]/90 italic font-semibold">
                “我们不追求光滑平整的无瑕排版，我们在低分辨率的模糊、拉伸与噪声干扰中，寻找数字灵魂的原始质感。”
              </p>
              <p>
                我是 SENZHAO。一名根植于反传统排版（Anti-Design）、前卫数码艺术与复杂 Web 开发交叉领域的创意工程师。
                利用 React 等前沿前端工程体系，配合 WebAudio API、Shaders（着色器）与物理模拟交互，
                我专为对视觉有极致态度、向往亚文化电子乐美学的独特品牌打造高度沉浸式的数字门户与艺术展示级载体。
              </p>
              <p>
                我的核心理念就如 Charli XCX 掀起的那场关于绿色和 Arial 粗糙字体的 Brat 盛宴：
                <strong>极致简单、保持粗野。</strong> 当所有的移动端和桌面网站都缩进千篇一律的完美边距与温和渐变时，
                在这里，我们打破常规：用强对比的黄绿色调（YellowGreen）、低频溢出效果和互动控制模块，实现难以令人移开目光的电子噪音美学。
              </p>
            </div>

            {/* Micro quote slider with immediate reactive interaction */}
            <div className="bg-[#141614] border border-[#9ACD32]/20 p-5 rounded-none space-y-2 select-none">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[9px] text-gray-500 uppercase">Interactive.Vibe_Manifesto_Check</span>
                <button
                  onClick={nextQuote}
                  className="font-mono text-[10px] text-[#9ACD32] hover:underline cursor-pointer"
                >
                  [ next.切换 ]
                </button>
              </div>
              <p className="font-brat text-lg text-white italic tracking-tight lowercase text-blur-sm">
                "{MEMORABLE_QUOTES[currentQuoteIdx]}"
              </p>
            </div>

            {/* Simple technical status tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4">
              <div className="bg-[#141614] p-3 text-center border border-gray-800">
                <span className="block font-brat text-[#9ACD32] text-xl">360°</span>
                <span className="font-mono text-[9px] text-gray-500 uppercase">responsive grid</span>
              </div>
              <div className="bg-[#141614] p-3 text-center border border-gray-800">
                <span className="block font-brat text-[#9ACD32] text-xl">0.0s</span>
                <span className="font-mono text-[9px] text-gray-500 uppercase">cached load</span>
              </div>
              <div className="bg-[#141614] p-3 text-center border border-gray-800 col-span-2 sm:col-span-1">
                <span className="block font-brat text-[#9ACD32] text-xl">100%</span>
                <span className="font-mono text-[9px] text-gray-500 uppercase">acid authenticity</span>
              </div>
            </div>
          </div>

          {/* Vibe Checklist & Skills Column */}
          <div className="lg:col-span-5 space-y-8 bg-[#141614] border-2 border-[#9ACD32]/20 p-6 sm:p-8 rounded-sm">
            {/* Skills Radar List */}
            <div className="space-y-4">
              <span className="font-brat text-lg uppercase text-[#9ACD32] block border-b border-[#9ACD32]/20 pb-2">
                skills.核心参数
              </span>
              <div className="space-y-3">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-[#9ACD32]">{skill.level}%</span>
                    </div>
                    <div className="w-full h-2 bg-black border border-[#9ACD32]/10 rounded-none overflow-hidden relative">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-[#9ACD32]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Club Pop Playlist Interactive Sound Board Mockup */}
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-[#9ACD32]/20 pb-2">
                <span className="font-brat text-lg uppercase text-white">
                  vibe.合成音板
                </span>
                <Volume2 className="w-4 h-4 text-[#9ACD32] animate-pulse" />
              </div>
              <p className="font-mono text-[10px] text-gray-400 uppercase leading-relaxed mb-2">
                * 点击音响播放按钮触发即时微积分 WebAudio 酸性合成音阶音色
              </p>

              <div className="space-y-2">
                {PLAYLIST.map((song, idx) => {
                  const isPlaying = activeSongId === song.id;
                  return (
                    <div
                      key={song.id}
                      onClick={() => triggerSynthTone(song.id, idx)}
                      className={`flex items-center justify-between p-2.5 bg-black hover:bg-[#9ACD32]/5 border transition-all cursor-pointer ${
                        isPlaying ? "border-[#9ACD32] bg-[#9ACD32]/10" : "border-gray-800 hover:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <button
                          className={`p-1.5 rounded-none flex items-center justify-center transition-colors ${
                            isPlaying ? "bg-[#9ACD32] text-black" : "bg-zinc-900 text-gray-400 group-hover:text-white"
                          }`}
                          aria-label={`Play frequency synth tone inspired by ${song.title}`}
                        >
                          <Play className={`w-3 h-3 ${isPlaying ? "fill-black" : ""}`} />
                        </button>
                        <div className="truncate">
                          <span className="font-brat text-sm block leading-normal text-white group-hover:text-[#9ACD32] lowercase text-blur-sm">
                            {song.title}
                          </span>
                          <span className="font-mono text-[9px] text-gray-500 block uppercase">
                            {song.artist} // En: {song.energyLevel}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-xs text-gray-400">{song.duration}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
