import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  User,
  MapPin,
  ArrowDown,
  Terminal,
  RotateCcw,
  Camera,
  Upload,
  RefreshCw,
} from 'lucide-react';
import { MagneticWord, MagneticText } from './MagneticWord';

interface AboutMeProps {
  onTriggerSynthNote?: (index: number) => void;
}

export function AboutMe({ onTriggerSynthNote }: AboutMeProps) {
  const [typingKey, setTypingKey] = useState(0);
  const narrativeRef = useRef<HTMLDivElement | null>(null);
  const isNarrativeInView = useInView(narrativeRef, { once: false, margin: '-40px' });

  // Paragraph texts to type sequentially
  const paragraphs = [
    {
      prefix: '我是 ',
      name: '赵江森 (Senzhao)',
      suffix: '，一名专注于前卫数字视觉与前沿Web工程的跨界创作者。',
    },
    {
      text: '我痴迷于 Acid Graphics（酸性图形）、Digital Brutalism（数字粗野主义），以及席卷全球潮流圈的《brat》亚文化设计美学。',
    },
    {
      text: '在当今被同质化设计系统与僵化卡片套路所充斥的互联网中，我坚持通过极高饱和度的荧光黄绿色彩碰撞、文字横向拉伸失真、低保真模拟噪声和可交互的算法声音合成，打破千篇一律的企业模板，赋予每个数字产品充满反叛精神与辨识度的生命力。',
    },
  ];

  // Progressive typing state across the narrative
  const [charIndex, setCharIndex] = useState(0);
  const fullContentString = paragraphs.map(p => ('prefix' in p ? `${p.prefix}${p.name}${p.suffix}` : p.text)).join('\n\n');
  const totalLength = fullContentString.length;

  // Photo state (supports uploading or default avant-garde placeholder photo / /pic1.jpg)
  const [photoUrl, setPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem('sen_profile_photo') || '/pic1.jpg';
  });
  const [isPhotoDragging, setIsPhotoDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlePhotoUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPhotoUrl(result);
        try {
          localStorage.setItem('sen_profile_photo', result);
        } catch {
          // localStorage quota exceeded fallback
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDropPhoto = (e: React.DragEvent) => {
    e.preventDefault();
    setIsPhotoDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handlePhotoUpload(e.dataTransfer.files[0]);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoUrl(null);
    localStorage.removeItem('sen_profile_photo');
  };

  useEffect(() => {
    if (!isNarrativeInView) return;

    setCharIndex(0);
    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= totalLength) {
          clearInterval(interval);
          return totalLength;
        }
        return prev + 1;
      });
    }, 22);

    return () => clearInterval(interval);
  }, [isNarrativeInView, typingKey, totalLength]);

  const scrollToWorks = () => {
    const el = document.getElementById('works');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 80, behavior: 'smooth' });
    }
  };

  // Replay typing effect
  const handleReplayTyping = (e: React.MouseEvent) => {
    e.stopPropagation();
    setTypingKey((prev) => prev + 1);
    if (onTriggerSynthNote) {
      onTriggerSynthNote(3);
    }
  };

  return (
    <section
      id="about-me"
      className="py-24 bg-[#9ACD32] border-b-2 border-black relative overflow-hidden select-none"
    >
      {/* Subtle screen scanline texture matching homepage style */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.05] bg-black"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)',
        }}
      />

      {/* Main Container - with generous reserved breathing space on the right */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:pr-16 relative z-10">
        {/* Section Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-mono text-black font-extrabold uppercase tracking-[0.3em] text-xs flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-black" />
              [ ABOUT ME // IDENTITY & BIOGRAPHY // 个人介绍 ]
            </span>
            <h2 className="font-brat text-4xl sm:text-6xl text-black font-black tracking-tighter mt-3 uppercase">
              <MagneticWord strength={18} radius={120}>about</MagneticWord>{' '}
              <MagneticWord strength={18} radius={120}>me.</MagneticWord>{' '}
              <MagneticWord strength={22} radius={140}>赵江森</MagneticWord>{' '}
              <MagneticWord strength={20} radius={130}>(Senzhao)</MagneticWord>
            </h2>
            <p className="font-mono text-xs text-black/85 font-bold mt-2 uppercase tracking-widest">
              // CROSS-DISCIPLINARY DIGITAL DESIGNER & CREATIVE FRONTEND DEVELOPER
            </p>
          </motion.div>
        </div>

        {/* Main Layout: Left = Portrait / Photo Showcase, Right = Bio Self Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-16">
          {/* ================= LEFT COLUMN: PORTRAIT PHOTO SHOWCASE ================= */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full max-w-[480px] sm:max-w-[520px] flex flex-col items-center"
            >
              {/* Hidden file input for photo upload */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handlePhotoUpload(e.target.files[0]);
                  }
                }}
              />

              {/* Photo Card Container with Acid Brutalism Border & Metadata Overlay */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsPhotoDragging(true);
                }}
                onDragLeave={() => setIsPhotoDragging(false)}
                onDrop={handleDropPhoto}
                className={`w-full relative bg-black/10 border-4 border-black transition-all duration-200 overflow-hidden shadow-[8px_8px_0px_rgba(0,0,0,1)] group ${
                  isPhotoDragging ? 'border-dashed scale-[1.02] bg-black/20' : ''
                }`}
              >
                {/* Photo Top Header Tag */}
                <div className="bg-black text-[#9ACD32] px-4 py-2 flex items-center justify-between font-mono text-[11px] font-extrabold uppercase tracking-wider">
                  <span className="flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5" />
                    PHOTO.PROFILE // PORTRAIT ARCHIVE
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-white hover:text-[#9ACD32] flex items-center gap-1 cursor-pointer transition-colors"
                      title="点击上传个人真实照片"
                    >
                      <Upload className="w-3 h-3" />
                      <span className="hidden sm:inline">换照片</span>
                    </button>
                    {photoUrl && (
                      <button
                        type="button"
                        onClick={handleResetPhoto}
                        className="text-white/70 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
                        title="重置为默认展示图"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span className="hidden sm:inline">重置</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Photo Display Frame - 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] w-full bg-[#11130e] flex items-center justify-center overflow-hidden">
                  {photoUrl ? (
                    <img
                      src={photoUrl}
                      alt="赵江森 (Senzhao) - 个人肖像照片"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    /* Default Avant-Garde Minimal Portrait Poster */
                    <div className="w-full h-full relative flex flex-col items-center justify-between p-8 bg-gradient-to-b from-[#181a13] via-[#0e100a] to-black text-center select-none overflow-hidden">
                      {/* Background decorative cyber grid & acid text */}
                      <div className="absolute inset-0 opacity-15 pointer-events-none flex items-center justify-center font-brat text-8xl font-black text-[#9ACD32] tracking-tighter leading-none select-none">
                        SEN
                      </div>

                      {/* Top badge */}
                      <div className="relative z-10 w-full flex justify-between items-center border-b border-[#9ACD32]/30 pb-3">
                        <span className="font-mono text-[10px] text-[#9ACD32] font-bold tracking-widest uppercase">
                          REC ● LIVE
                        </span>
                        <span className="font-mono text-[10px] text-[#9ACD32]/70">
                          35MM // 2026 ARCHIVE
                        </span>
                      </div>

                      {/* Center Silhouette / Graphic Area with prompt to upload */}
                      <div className="relative z-10 my-auto flex flex-col items-center">
                        <div
                          onClick={() => fileInputRef.current?.click()}
                          className="w-40 h-40 sm:w-48 sm:h-48 border-2 border-dashed border-[#9ACD32]/60 rounded-full flex flex-col items-center justify-center cursor-pointer hover:border-[#9ACD32] hover:bg-[#9ACD32]/10 transition-all group/upload p-4 mb-4"
                        >
                          <Camera className="w-10 h-10 text-[#9ACD32] group-hover/upload:scale-110 transition-transform mb-2" />
                          <span className="font-mono text-xs text-[#9ACD32] font-bold uppercase tracking-wider">
                            点击 / 拖拽上传
                          </span>
                          <span className="font-brat text-xs text-white/80 mt-1 font-bold">
                            放入你的个人照片
                          </span>
                        </div>
                        <span className="font-brat text-xl sm:text-2xl text-white font-black tracking-tight">
                          赵江森 · SENZHAO
                        </span>
                        <span className="font-mono text-xs text-[#9ACD32] font-semibold mt-1">
                          PORTRAIT RESERVED FOR REAL PHOTO
                        </span>
                      </div>

                      {/* Bottom film metadata bar */}
                      <div className="relative z-10 w-full pt-3 border-t border-[#9ACD32]/30 flex justify-between items-center font-mono text-[9px] text-[#9ACD32]/80 uppercase">
                        <span>ISO 400 // F1.8</span>
                        <span>DRAG & DROP ANY IMAGE HERE</span>
                        <span>RAW FILE</span>
                      </div>
                    </div>
                  )}

                  {/* Drag and Drop Active Overlay */}
                  {isPhotoDragging && (
                    <div className="absolute inset-0 bg-[#9ACD32]/90 flex flex-col items-center justify-center p-6 text-black z-20">
                      <Upload className="w-12 h-12 animate-bounce mb-3" />
                      <span className="font-brat text-xl font-black uppercase">
                        释放图片立即更新个人照片
                      </span>
                      <span className="font-mono text-xs font-bold mt-1">
                        DROP TO LOAD YOUR HIGH-RES PORTRAIT
                      </span>
                    </div>
                  )}
                </div>

                {/* Bottom Frame Info */}
                <div className="bg-black text-white p-3.5 flex items-center justify-between font-mono text-xs border-t-2 border-black">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#9ACD32] animate-ping" />
                    <span className="font-bold text-[#9ACD32] uppercase tracking-wider">
                      {photoUrl ? 'CUSTOM PHOTO LOADED' : 'READY FOR PHOTO'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[#9ACD32] hover:text-white underline text-[11px] font-bold cursor-pointer"
                  >
                    {photoUrl ? '更换新照片' : '上传照片 / 选文件'}
                  </button>
                </div>
              </div>

              {/* Minimalist Caption Below Photo */}
              <div className="mt-4 text-center select-none">
                <span className="font-brat text-lg text-black font-extrabold uppercase tracking-widest block">
                  SEN // 个人肖像档案
                </span>
                <span className="font-mono text-xs text-black/75 font-bold uppercase tracking-wider block mt-0.5">
                  [ VISUAL ARTIST & DIGITAL CREATOR // PORTRAIT ]
                </span>
              </div>
            </motion.div>
          </div>

          {/* ================= RIGHT COLUMN: SELF INTRODUCTION ================= */}
          <div className="lg:col-span-6 xl:col-span-6">
            {/* Personal Narrative Box with Terminal Typing Animation */}
            <motion.div
              ref={narrativeRef}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-black/8 border-2 border-black/25 p-7 sm:p-10 relative group"
            >
              {/* Terminal status bar */}
              <div className="flex items-center justify-between mb-6 pb-3 border-b border-black/15">
                <div className="flex items-center gap-2 font-mono text-[11px] text-black font-extrabold tracking-wider">
                  <Terminal className="w-3.5 h-3.5 text-black" />
                  <span>BIO_STREAM.INIT // TYPING_ACTIVE</span>
                  <span className="hidden md:inline-block text-[10px] text-black/60 font-mono">
                    [MAGNETIC_TEXT: HOVER WORDS]
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleReplayTyping}
                    title="重新播放打字机动效 (Replay typing)"
                    className="flex items-center gap-1 font-mono text-[10px] bg-black text-[#9ACD32] hover:bg-white hover:text-black px-2 py-0.5 font-extrabold transition-colors cursor-pointer border border-black"
                  >
                    <RotateCcw className="w-2.5 h-2.5" />
                    <span>REPLAY</span>
                  </button>
                  <div className="bg-black text-[#9ACD32] font-mono text-[10px] font-bold px-2.5 py-0.5 uppercase tracking-widest hidden sm:block">
                    PROFILE_DATA_v26
                  </div>
                </div>
              </div>

              {/* Typed narrative paragraphs */}
              <div className="space-y-5 text-black text-base sm:text-lg leading-relaxed font-medium min-h-[220px]">
                {/* Paragraph 1 */}
                <p>
                  <MagneticWord className="hover:text-black">我是</MagneticWord>{' '}
                  <MagneticWord strength={18} radius={100}>
                    <span className="font-brat text-black text-xl sm:text-2xl font-black underline decoration-black/40 hover:bg-black hover:text-[#9ACD32] px-1 py-0.5 transition-colors">
                      赵江森 (Senzhao)
                    </span>
                  </MagneticWord>
                  {(() => {
                    const p1Total = '我是 赵江森 (Senzhao)，一名专注于前卫数字视觉与前沿Web工程的跨界创作者。'.length;
                    const p1PrefixLen = '我是 赵江森 (Senzhao)'.length;
                    if (charIndex < p1PrefixLen) {
                      return (
                        <span className="inline-block w-2.5 h-5 bg-black align-middle ml-1 animate-pulse" />
                      );
                    }
                    const textP1 = '，一名专注于前卫数字视觉与前沿Web工程的跨界创作者。'.slice(0, charIndex - p1PrefixLen);
                    return (
                      <>
                        <MagneticText text={textP1} />
                        {charIndex < p1Total && (
                          <span className="inline-block w-2.5 h-5 bg-black align-middle ml-1 animate-pulse" />
                        )}
                      </>
                    );
                  })()}
                </p>

                {/* Paragraph 2 */}
                {(() => {
                  const p1Total = '我是 赵江森 (Senzhao)，一名专注于前卫数字视觉与前沿Web工程的跨界创作者。'.length;
                  const p2Full = '我痴迷于 Acid Graphics（酸性图形）、Digital Brutalism（数字粗野主义），以及席卷全球潮流圈的《brat》亚文化设计美学。';
                  if (charIndex <= p1Total) return null;

                  const p2TypedLen = charIndex - p1Total - 1;
                  const p2Text = p2Full.slice(0, Math.max(0, p2TypedLen));
                  const isDoneP2 = p2TypedLen >= p2Full.length;

                  return (
                    <p className="text-black/95">
                      {/* Highlight keywords with Magnetic displacement as they get typed */}
                      {p2Text.includes('Acid Graphics') ? (
                        <>
                          <MagneticText text="我痴迷于 " />
                          <MagneticWord strength={16} radius={90}>
                            <strong className="font-extrabold text-black hover:bg-black hover:text-[#9ACD32] px-1 transition-colors">
                              Acid Graphics（酸性图形）
                            </strong>
                          </MagneticWord>
                          {p2Text.includes('Digital Brutalism') ? (
                            <>
                              、
                              <MagneticWord strength={16} radius={90}>
                                <strong className="font-extrabold text-black hover:bg-black hover:text-[#9ACD32] px-1 transition-colors">
                                  Digital Brutalism（数字粗野主义）
                                </strong>
                              </MagneticWord>
                              {p2Text.includes('《brat》亚文化设计美学') ? (
                                <>
                                  <MagneticText text="，以及席卷全球潮流圈的 " />
                                  <MagneticWord strength={20} radius={100}>
                                    <strong className="font-black text-black hover:bg-black hover:text-[#9ACD32] px-1 transition-colors">
                                      《brat》亚文化设计美学
                                    </strong>
                                  </MagneticWord>
                                  。
                                </>
                              ) : (
                                <MagneticText text={p2Text.slice(p2Text.indexOf('Digital Brutalism（数字粗野主义）') + 'Digital Brutalism（数字粗野主义）'.length)} />
                              )}
                            </>
                          ) : (
                            <MagneticText text={p2Text.slice(p2Text.indexOf('Acid Graphics（酸性图形）') + 'Acid Graphics（酸性图形）'.length)} />
                          )}
                        </>
                      ) : (
                        <MagneticText text={p2Text} />
                      )}
                      {!isDoneP2 && (
                        <span className="inline-block w-2.5 h-5 bg-black align-middle ml-1 animate-pulse" />
                      )}
                    </p>
                  );
                })()}

                {/* Paragraph 3 */}
                {(() => {
                  const p1Total = '我是 赵江森 (Senzhao)，一名专注于前卫数字视觉与前沿Web工程的跨界创作者。'.length;
                  const p2Full = '我痴迷于 Acid Graphics（酸性图形）、Digital Brutalism（数字粗野主义），以及席卷全球潮流圈的《brat》亚文化设计美学。';
                  const p2Total = p1Total + p2Full.length + 1;
                  const p3Full = '在当今被同质化设计系统与僵化卡片套路所充斥的互联网中，我坚持通过极高饱和度的荧光黄绿色彩碰撞、文字横向拉伸失真、低保真模拟噪声和可交互的算法声音合成，打破千篇一律的企业模板，赋予每个数字产品充满反叛精神与辨识度的生命力。';

                  if (charIndex <= p2Total) return null;

                  const p3TypedLen = charIndex - p2Total - 1;
                  const p3Text = p3Full.slice(0, Math.max(0, p3TypedLen));
                  const isDoneAll = p3TypedLen >= p3Full.length;

                  return (
                    <p className="text-black/85 text-sm sm:text-base leading-relaxed">
                      <MagneticText text={p3Text} />
                      {!isDoneAll && (
                        <span className="inline-block w-2 sm:w-2.5 h-4 sm:h-5 bg-black align-middle ml-1 animate-pulse" />
                      )}
                    </p>
                  );
                })()}
              </div>

              {/* Identity Snapshot Pills with Magnetic Pull */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-8 border-t border-black/20">
                <MagneticWord strength={10} radius={60} className="w-full">
                  <div className="bg-black/10 hover:bg-black hover:text-[#9ACD32] p-3.5 border border-black/20 transition-colors w-full group">
                    <span className="font-mono text-[10px] text-black/70 group-hover:text-[#9ACD32]/70 block uppercase font-bold">
                      姓名 / NAME
                    </span>
                    <span className="font-brat text-sm sm:text-base text-black group-hover:text-[#9ACD32] mt-0.5 block font-extrabold">
                      赵江森 (SEN)
                    </span>
                  </div>
                </MagneticWord>
                <MagneticWord strength={10} radius={60} className="w-full">
                  <div className="bg-black/10 hover:bg-black hover:text-[#9ACD32] p-3.5 border border-black/20 transition-colors w-full group">
                    <span className="font-mono text-[10px] text-black/70 group-hover:text-[#9ACD32]/70 block uppercase font-bold">
                      角色 / ROLE
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-black group-hover:text-[#9ACD32] mt-1 block font-extrabold">
                      Designer & Dev
                    </span>
                  </div>
                </MagneticWord>
                <MagneticWord strength={10} radius={60} className="w-full">
                  <div className="bg-black/10 hover:bg-black hover:text-[#9ACD32] p-3.5 border border-black/20 transition-colors w-full group">
                    <span className="font-mono text-[10px] text-black/70 group-hover:text-[#9ACD32]/70 block uppercase font-bold">
                      基地 / BASE
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-black group-hover:text-[#9ACD32] mt-1 flex items-center gap-1 font-bold">
                      <MapPin className="w-3.5 h-3.5 text-black group-hover:text-[#9ACD32]" /> 全球远程
                    </span>
                  </div>
                </MagneticWord>
                <MagneticWord strength={10} radius={60} className="w-full">
                  <div className="bg-black/10 hover:bg-black hover:text-[#9ACD32] p-3.5 border border-black/20 transition-colors w-full group">
                    <span className="font-mono text-[10px] text-black/70 group-hover:text-[#9ACD32]/70 block uppercase font-bold">
                      状态 / STATUS
                    </span>
                    <span className="font-mono text-xs sm:text-sm text-black group-hover:text-[#9ACD32] mt-1 flex items-center gap-1 font-extrabold">
                      <span className="w-2 h-2 rounded-full bg-black group-hover:bg-[#9ACD32] animate-pulse" /> 开放委托
                    </span>
                  </div>
                </MagneticWord>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Call To Action: Go to Works */}
        <div className="border-t-2 border-black/25 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <span className="font-brat text-lg text-black font-extrabold block">
              准备好深入了解我的数字创作与代码实践了吗？
            </span>
            <span className="font-mono text-xs text-black/75 font-bold">
              NEXT SECTION: SELECTED WORK INDEX // 查看全部精选作品
            </span>
          </div>

          <button
            id="btn-about-to-works"
            type="button"
            onClick={scrollToWorks}
            className="px-6 py-3 bg-black hover:bg-white text-[#9ACD32] hover:text-black font-brat text-sm uppercase tracking-wider flex items-center gap-2 transition-colors duration-200 cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.25)] font-black"
          >
            <span>VIEW WORKS.查看作品展示</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
