import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Wand2,
  Shuffle,
  RotateCcw,
  Copy,
  Check,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { COLOR_PRESETS, RANDOM_WORDS } from '../data/portfolioData';
import { ColorPreset } from '../types';

export function BratGenerator() {
  const [inputText, setInputText] = useState<string>('senzhao');
  const [blurVal, setBlurVal] = useState<number>(0.4);
  const [stretchX, setStretchX] = useState<number>(0.85);
  const [stretchY] = useState<number>(1.05);
  const [fontSize, setFontSize] = useState<number>(72);
  const [bgColor, setBgColor] = useState<string>('#9ACD32');
  const [textColor, setTextColor] = useState<string>('#000000');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const previewBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsExpanded(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleApplyPreset = (preset: ColorPreset) => {
    setBgColor(preset.bg);
    setTextColor(preset.text);
    setBlurVal(preset.blur);
    setStretchX(preset.scaleX);
  };

  const handleCopyCss = () => {
    const cssString = `background: ${bgColor}; color: ${textColor}; filter: blur(${blurVal}px); transform: scaleX(${stretchX}) scaleY(${stretchY}); font-family: "Helvetica Neue", Arial Black, sans-serif; font-weight: 900; letter-spacing: -0.06em;`;
    navigator.clipboard.writeText(cssString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const handleRandomWord = () => {
    const word = RANDOM_WORDS[Math.floor(Math.random() * RANDOM_WORDS.length)];
    setInputText(word);
  };

  const handleReset = () => {
    setInputText('senzhao');
    setBlurVal(0.4);
    setStretchX(0.85);
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
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-2">
              <Wand2 className="w-3.5 h-3.5" />
              [ BRAT TYPE GENERATOR & TEXT DISRUPTION ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              brat.封面文字生成器
            </h2>
            <p className="font-mono text-xs text-gray-400 max-w-xl mx-auto mt-4 uppercase">
              自定义拉伸、模糊与低保真失真算法，生成符合 Charli XCX《brat》风格的酸性排版并实时导出代码
            </p>
          </motion.div>
        </div>

        {/* Generator Controls and Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Panel */}
          <div className="lg:col-span-5 bg-[#141614] border-2 border-[#9ACD32]/40 p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-5">
              {/* Input field */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    htmlFor="brat-input-text"
                    className="font-mono text-xs text-gray-300 uppercase tracking-wider"
                  >
                    input text / 输入文本
                  </label>
                  <button
                    type="button"
                    onClick={handleRandomWord}
                    className="text-[10px] font-mono text-[#9ACD32] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Shuffle className="w-3 h-3" /> RANDOM WORD
                  </button>
                </div>
                <input
                  id="brat-input-text"
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 px-4 py-3 font-brat text-lg text-white focus:outline-none focus:border-[#9ACD32]"
                  placeholder="type anything..."
                />
              </div>

              {/* Sliders */}
              <div className="space-y-4 pt-2 border-t border-zinc-800">
                <div>
                  <div className="flex justify-between font-mono text-xs text-gray-400 mb-1">
                    <span>BLUR FILTER (模糊滤镜)</span>
                    <span className="text-[#9ACD32]">{blurVal.toFixed(2)}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2.5"
                    step="0.05"
                    value={blurVal}
                    onChange={(e) => setBlurVal(parseFloat(e.target.value))}
                    className="w-full accent-[#9ACD32] bg-zinc-800 h-1.5 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-mono text-xs text-gray-400 mb-1">
                    <span>HORIZONTAL STRETCH (横向挤压)</span>
                    <span className="text-[#9ACD32]">{stretchX.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="1.5"
                    step="0.05"
                    value={stretchX}
                    onChange={(e) => setStretchX(parseFloat(e.target.value))}
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
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="p-2 bg-[#0d0e0d] border border-[#9ACD32]/20 hover:border-[#9ACD32] text-xs font-mono text-gray-300 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span
                        className="w-3 h-3 inline-block border border-black shrink-0"
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
                type="button"
                onClick={handleReset}
                className="p-3 text-gray-400 hover:text-white border-2 border-transparent hover:border-[#9ACD32]/30 transition-all cursor-pointer"
                title="Reset Config"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleCopyCss}
                className="flex-1 py-3 px-4 font-brat text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all cursor-pointer bg-[#9ACD32] text-black hover:bg-black hover:text-[#9ACD32] hover:border hover:border-[#9ACD32] border border-transparent font-bold"
              >
                {isCopied ? (
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

          {/* Live Preview Display Canvas */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              ref={previewBoxRef}
              className={`relative overflow-hidden w-full flex-1 aspect-square md:aspect-auto md:h-full border-2 border-[#9ACD32] flex items-center justify-center transition-all duration-300 shadow-2xl ${
                isExpanded ? 'fixed inset-0 z-50 h-screen w-screen' : ''
              }`}
              style={{ backgroundColor: bgColor }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] bg-repeat-y"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%), repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)',
                }}
              />

              <div className="relative text-center select-none max-w-full px-6">
                <span
                  className="font-brat block select-none break-all"
                  style={{
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    filter: `blur(${blurVal}px)`,
                    transform: `scaleX(${stretchX}) scaleY(${stretchY})`,
                    display: 'inline-block',
                    lineHeight: '1.1',
                  }}
                >
                  {inputText || 'brat'}
                </span>
              </div>

              <div
                className="absolute left-4 bottom-4 font-mono text-[10px] uppercase select-none opacity-60 tracking-wider"
                style={{ color: textColor }}
              >
                size: {fontSize}px / stretch: {stretchX.toFixed(2)}x
              </div>

              <div
                className="absolute right-4 bottom-4 font-mono text-[10px] uppercase select-none opacity-60 tracking-wider"
                style={{ color: textColor }}
              >
                album.senzhao_archive
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm border border-transparent hover:border-[#9ACD32]/30 text-[#9ACD32] hover:text-white transition-all z-10 cursor-pointer"
                title={isExpanded ? 'Minimize Viewer' : 'Maximize Viewer'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>

            {isExpanded && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0e0d] border border-[#9ACD32] py-2 px-4 font-mono text-xs text-[#9ACD32]">
                按下 ESC 或再次点击右上角缩回。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
