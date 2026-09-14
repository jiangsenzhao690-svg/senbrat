import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  SlidersVertical,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { COLOR_PRESETS } from '../data/portfolioData';
import { ColorPreset } from '../types';

export const Generator: React.FC = () => {
  const [text, setText] = useState('senzhao');
  const [blur, setBlur] = useState(0.4);
  const [scaleX, setScaleX] = useState(0.85);
  const [scaleY, setScaleY] = useState(1.05);
  const [fontSize, setFontSize] = useState(72);
  const [bgColor, setBgColor] = useState('#9ACD32');
  const [textColor, setTextColor] = useState('#000000');
  const [copied, setCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  // Handle ESC to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleApplyPreset = (preset: ColorPreset) => {
    setBgColor(preset.bg);
    setTextColor(preset.text);
    setBlur(preset.blur);
    setScaleX(preset.scaleX);
  };

  const copyCSS = () => {
    const cssString = `background: ${bgColor}; color: ${textColor}; filter: blur(${blur}px); transform: scaleX(${scaleX}) scaleY(${scaleY}); font-family: "Helvetica Neue", Arial Black, sans-serif; font-weight: 900; letter-spacing: -0.06em;`;
    navigator.clipboard.writeText(cssString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const randomizeText = () => {
    const words = [
      'brat',
      'so-brat',
      '360-designer',
      'alternative',
      'club-classics',
      'low-res',
      'anti-design',
      'synthesizer',
      'analog-clipping',
      'hyperpop',
    ];
    setText(words[Math.floor(Math.random() * words.length)]);
  };

  const resetConfig = () => {
    setText('senzhao');
    setBlur(0.4);
    setScaleX(0.85);
    setScaleY(1.05);
    setFontSize(72);
    setBgColor('#9ACD32');
    setTextColor('#000000');
  };

  return (
    <section
      id="generator"
      className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9ACD32]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2">
              <SlidersVertical className="w-3.5 h-3.5" /> [ BRAT TYPE GENERATOR & TEXT DISRUPTION ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              brat.封面文字生成器
            </h2>
            <p className="font-mono text-xs text-gray-400 max-w-xl mx-auto mt-4 uppercase">
              自定义拉伸、模糊与低保真失真算法，生成符合 Charli XCX《brat》风格的酸性排版并实时导出代码
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-[#141614] border-2 border-[#9ACD32]/40 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Text input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="brat-input-text" className="font-mono text-xs text-gray-300 uppercase tracking-wider">
                    input text / 输入文本
                  </label>
                  <button
                    onClick={randomizeText}
                    className="text-[10px] font-mono text-[#9ACD32] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> RANDOM WORD
                  </button>
                </div>
                <input
                  id="brat-input-text"
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 px-4 py-3 font-brat text-lg text-white focus:outline-none focus:border-[#9ACD32]"
                  placeholder="type anything..."
                />
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                <div>
                  <div className="flex justify-between font-mono text-xs text-gray-400 mb-1">
                    <span>BLUR FILTER (模糊滤镜)</span>
                    <span className="text-[#9ACD32]">{blur.toFixed(2)}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.05"
                    value={blur}
                    onChange={(e) => setBlur(parseFloat(e.target.value))}
                    className="w-full accent-[#9ACD32] bg-zinc-800 h-1.5 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-gray-400 mb-1">
                    <span>HORIZONTAL STRETCH (横向挤压)</span>
                    <span className="text-[#9ACD32]">{scaleX.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.5"
                    step="0.05"
                    value={scaleX}
                    onChange={(e) => setScaleX(parseFloat(e.target.value))}
                    className="w-full accent-[#9ACD32] bg-zinc-800 h-1.5 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-gray-400 mb-1">
                    <span>FONT SIZE (字阶尺寸)</span>
                    <span className="text-[#9ACD32]">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="32"
                    max="140"
                    step="2"
                    value={fontSize}
                    onChange={(e) => setFontSize(parseInt(e.target.value))}
                    className="w-full accent-[#9ACD32] bg-zinc-800 h-1.5 cursor-pointer"
                  />
                </div>
              </div>

              {/* Color Presets */}
              <div className="space-y-2 pt-2 border-t border-zinc-800">
                <span className="font-mono text-xs text-gray-400 uppercase block">
                  COLOR PRESET (预设主题)
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleApplyPreset(preset)}
                      className="p-2 bg-[#0d0e0d] border border-[#9ACD32]/20 hover:border-[#9ACD32] text-xs font-mono text-gray-300 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span
                        className="w-3 h-3 inline-block border border-black"
                        style={{ backgroundColor: preset.bg }}
                      />
                      <span>{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-[#9ACD32]/20 flex items-center justify-between gap-3">
              <button
                onClick={resetConfig}
                className="p-3 text-gray-400 hover:text-white border-2 border-transparent hover:border-[#9ACD32]/30 transition-all cursor-pointer"
                title="Reset Config"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                onClick={copyCSS}
                className="flex-1 py-3 px-4 font-brat text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all cursor-pointer bg-[#9ACD32] text-black hover:bg-black hover:text-[#9ACD32] hover:border hover:border-[#9ACD32] border border-transparent font-bold"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" /> COPIED CODE!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> COPY CSS STYLE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Preview Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              ref={canvasRef}
              className={`relative overflow-hidden w-full flex-1 aspect-square md:aspect-auto md:h-full border-2 border-[#9ACD32] flex items-center justify-center transition-all duration-300 shadow-2xl ${
                isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen' : ''
              }`}
              style={{ backgroundColor: bgColor }}
            >
              {/* Halftone / scanline overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] bg-repeat-y"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%), repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)',
                }}
              />

              {/* Text Render */}
              <div className="relative text-center select-none max-w-full px-6">
                <span
                  className="font-brat block select-none break-all"
                  style={{
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    filter: `blur(${blur}px)`,
                    transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
                    display: 'inline-block',
                    lineHeight: '1.1',
                  }}
                >
                  {text || 'brat'}
                </span>
              </div>

              {/* Metadata tags on canvas */}
              <div
                className="absolute left-4 bottom-4 font-mono text-[10px] uppercase select-none opacity-60 tracking-wider"
                style={{ color: textColor }}
              >
                size: {fontSize}px / stretch: {scaleX.toFixed(2)}x
              </div>
              <div
                className="absolute right-4 bottom-4 font-mono text-[10px] uppercase select-none opacity-60 tracking-wider"
                style={{ color: textColor }}
              >
                album.senzhao_archive
              </div>

              {/* Maximize toggle */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm border border-transparent hover:border-[#9ACD32]/30 text-[#9ACD32] hover:text-white transition-all z-10 cursor-pointer"
                title={isFullscreen ? 'Minimize Viewer' : 'Maximize Viewer'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {isFullscreen && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0e0d] border border-[#9ACD32] py-2 px-4 font-mono text-xs text-[#9ACD32]">
                按下 ESC 或再次点击右上角缩回。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
