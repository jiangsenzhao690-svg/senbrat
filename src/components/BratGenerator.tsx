import { useState, useRef } from "react";
import { Sliders, Copy, Check, RotateCcw, Sparkles, Maximize2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BratGenerator() {
  const [text, setText] = useState("senzhao");
  const [blur, setBlur] = useState(0.4);
  const [scaleX, setScaleX] = useState(0.85);
  const [scaleY, setScaleY] = useState(1.05);
  const [fontSize, setFontSize] = useState(72);
  const [bgColor, setBgColor] = useState("#9ACD32");
  const [textColor, setTextColor] = useState("#000000");
  const [isCopied, setIsCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const presets = [
    { name: "classic-brat", bg: "#9ACD32", text: "#000000", blur: 0.4, scaleX: 0.85, label: "經典綠" },
    { name: "club-inverted", bg: "#0A0B08", text: "#9ACD32", blur: 0.6, scaleX: 0.75, label: "低頻暗" },
    { name: "overdrive-orange", bg: "#ff4500", text: "#ffffff", blur: 0.3, scaleX: 0.9, label: "酸橘色" },
    { name: "ambient-gray", bg: "#3a3d3a", text: "#9ACD32", blur: 0.8, scaleX: 0.8, label: "顆粒灰" }
  ];

  const handleApplyPreset = (p: typeof presets[0]) => {
    setBgColor(p.bg);
    setTextColor(p.text);
    setBlur(p.blur);
    setScaleX(p.scaleX);
  };

  const handleCopyConfig = () => {
    const configString = `background: ${bgColor}; color: ${textColor}; filter: blur(${blur}px); transform: scaleX(${scaleX});`;
    navigator.clipboard.writeText(configString).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const randomWord = () => {
    const words = [
      "brat", "so-brat", "360-designer", "alternative", "club-classics", 
      "low-res", "anti-design", "synthesizer", "analog-clipping", "hyperpop"
    ];
    const randomIndex = Math.floor(Math.random() * words.length);
    setText(words[randomIndex]);
  };

  const resetConfig = () => {
    setText("senzhao");
    setBlur(0.4);
    setScaleX(0.85);
    setScaleY(1.05);
    setFontSize(72);
    setBgColor("#9ACD32");
    setTextColor("#000000");
  };

  return (
    <section id="generator" className="py-24 bg-[#0A0B08] border-b-2 border-[#9ACD32] relative overflow-hidden">
      {/* Dynamic Background Circle light glow on scroll */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#9ACD32]/5 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-[#9ACD32] uppercase tracking-[0.3em] text-xs">
              [ interactive visual module ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-white tracking-tighter mt-3 uppercase text-blur-sm">
              brat-sticker.creator
            </h2>
            <p className="font-mono text-gray-400 mt-4 text-xs max-w-xl mx-auto leading-relaxed">
              输入您的单词，调整字体模糊、宽度压缩与色彩。
              感受粗糙低保真数字美学，复制您的定制代码或截图作为壁纸。
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-[#141614] border-2 border-[#9ACD32]/30 p-6 sm:p-8 rounded-sm relative">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#9ACD32]/20 pb-3">
                <span className="font-brat text-lg uppercase text-[#9ACD32] flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#9ACD32]" />
                  customizer.参数
                </span>
                <span className="font-mono text-[10px] text-gray-500">v1.0.4 r-alpha</span>
              </div>

              {/* Text Input */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="font-mono text-xs text-gray-400 uppercase tracking-wider">
                    label.文本
                  </label>
                  <button
                    onClick={randomWord}
                    className="font-mono text-[10px] text-[#9ACD32] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3 h-3" /> 随机特拉普词
                  </button>
                </div>
                <input
                  type="text"
                  maxLength={24}
                  value={text}
                  onChange={(e) => setText(e.target.value.toLowerCase())}
                  className="w-full bg-[#0d0e0d] border border-[#9ACD32]/30 text-white font-brat py-3 px-4 rounded-none focus:outline-none focus:border-[#9ACD32] text-lg transition-all"
                  placeholder="enter.anything..."
                />
              </div>

              {/* Blur Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">blur.油墨溢出模糊</span>
                  <span className="text-[#9ACD32]">{blur.toFixed(1)}px</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={blur}
                  onChange={(e) => setBlur(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Horizontal Stretch Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">stretch-x.水平压缩</span>
                  <span className="text-[#9ACD32]">{scaleX.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.05"
                  value={scaleX}
                  onChange={(e) => setScaleX(parseFloat(e.target.value))}
                  className="w-full h-1 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Font Size Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400 uppercase">font-size.字号大小</span>
                  <span className="text-[#9ACD32]">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min="32"
                  max="140"
                  step="2"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full h-1 bg-[#0d0e0d] appearance-none cursor-pointer accent-[#9ACD32]"
                />
              </div>

              {/* Color Customizer */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-gray-400 uppercase block">colorways.色彩组合</span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">背景 (Bg)</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded-none border-0 p-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-[10px] uppercase text-gray-400">{bgColor}</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-gray-500 uppercase block mb-1">文本 (Text)</label>
                    <div className="flex items-center gap-1">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-8 h-8 rounded-none border-0 p-0 cursor-pointer bg-transparent"
                      />
                      <span className="font-mono text-[10px] uppercase text-gray-400">{textColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-2">
                <span className="font-mono text-xs text-gray-400 uppercase block">presets.快速预设</span>
                <div className="flex flex-wrap gap-2">
                  {presets.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleApplyPreset(preset)}
                      className="px-3 py-1.5 font-mono text-xs border border-[#9ACD32]/20 hover:border-[#9ACD32] hover:bg-[#9ACD32]/5 text-gray-300 rounded-none transition-all flex items-center gap-1"
                    >
                      <span
                        className="w-2.5 h-2.5 inline-block border border-black"
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
                onClick={handleCopyConfig}
                className="flex-1 py-3 px-4 font-brat text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 transition-all cursor-pointer bg-[#9ACD32] text-black hover:bg-black hover:text-[#9ACD32] hover:border hover:border-[#9ACD32] border border-transparent"
              >
                {isCopied ? (
                  <>
                    <Check className="w-4 h-4" />
                    COPIED CODE!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    COPY CSS STYLE
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Canvas Display Column */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div
              ref={containerRef}
              className={`relative overflow-hidden w-full flex-1 aspect-square md:aspect-auto md:h-full rounded-sm border-2 border-[#9ACD32] flex items-center justify-center transition-all duration-300 shadow-2xl ${
                isFullscreen ? "fixed inset-0 z-50 h-screen w-screen" : ""
              }`}
              style={{ backgroundColor: bgColor }}
            >
              {/* Scanline overlay custom toggle on display canvas */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.06] bg-repeat-y"
                   style={{
                     backgroundImage: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.5) 100%), repeating-linear-gradient(0deg, #000 0px, #000 1px, transparent 1px, transparent 3px)"
                   }}
              />

              {/* Main text rendered with exact CSS attributes requested */}
              <div className="relative text-center select-none max-w-full px-6">
                <span
                  className="font-brat block select-none break-all"
                  style={{
                    color: textColor,
                    fontSize: `${fontSize}px`,
                    filter: `blur(${blur}px)`,
                    transform: `scaleX(${scaleX}) scaleY(${scaleY})`,
                    display: "inline-block",
                    lineHeight: "1.1"
                  }}
                >
                  {text || "brat"}
                </span>
              </div>

              {/* Utility elements overlay inside preview frame to give album authenticity */}
              <div className="absolute left-4 bottom-4 font-mono text-[10px] uppercase select-none opacity-60 tracking-wider" style={{ color: textColor }}>
                size: {fontSize}px / stretch: {scaleX.toFixed(2)}x
              </div>

              <div className="absolute right-4 bottom-4 font-mono text-[10px] uppercase select-none opacity-60 tracking-wider" style={{ color: textColor }}>
                album.senzhao_archive
              </div>

              {/* Display controls inside preview frame */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-none border border-transparent hover:border-[#9ACD32]/30 text-[#9ACD32] hover:text-white transition-all z-10 cursor-pointer"
                title={isFullscreen ? "Minimize Viewer" : "Maximize Viewer"}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
            {isFullscreen && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#0d0e0d] border border-[#9ACD32] py-2 px-4 rounded-none font-mono text-xs text-[#9ACD32]">
                按下 ESC 或再次点击右上角缩回。
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
