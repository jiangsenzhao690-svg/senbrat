import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { playSynthNote } from '../utils/audio';

interface HeroProps {
  onTriggerSynthNote?: (index: number) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  sizeY: number;
  color: string;
  alpha: number;
  rotation: number;
  vRot: number;
  gravity: number;
  floorY: number;
  settled: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onTriggerSynthNote }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedSub, setTypedSub] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isBlownAway, setIsBlownAway] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  const { scrollY } = useScroll();
  const bgScale = useTransform(scrollY, [0, 480], [1, 0.96]);
  const bgY = useTransform(scrollY, [0, 480], [0, 35]);
  const photoFilter = useTransform(
    scrollY,
    [0, 380],
    ['blur(0px) contrast(112%) brightness(98%)', 'blur(9px) contrast(115%) brightness(95%)']
  );
  const photoOpacity = useTransform(scrollY, [0, 480], [0.52, 0.28]);

  const [photoUrl, setPhotoUrl] = useState<string>('/pic1.jpg');

  // Load photo with priority: localStorage -> /pic1.jpg -> /网站素材1.jpg -> /hero-portrait.svg
  useEffect(() => {
    try {
      const stored = localStorage.getItem('senzhao:original-photo');
      if (stored) {
        setPhotoUrl(stored);
        return;
      }
    } catch {}

    const img = new Image();
    img.src = '/pic1.jpg';
    img.onload = () => setPhotoUrl('/pic1.jpg');
    img.onerror = () => {
      const fallback = new Image();
      fallback.src = '/网站素材1.jpg';
      fallback.onload = () => setPhotoUrl('/网站素材1.jpg');
      fallback.onerror = () => setPhotoUrl('/hero-portrait.svg');
    };
  }, []);

  // Typewriter effect on load
  useEffect(() => {
    const sub = 'WELCOME TO';
    const main = 'SENZHAO';
    let subIdx = 0;
    let mainIdx = 0;
    setTypedSub('');
    setTypedTitle('');
    setIsTypingDone(false);

    const interval = setInterval(() => {
      if (subIdx < sub.length) {
        setTypedSub(sub.slice(0, subIdx + 1));
        subIdx++;
      } else if (mainIdx < main.length) {
        setTypedTitle(main.slice(0, mainIdx + 1));
        mainIdx++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, []);

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const prevHeight = canvas.height || rect.height;
      canvas.width = rect.width;
      canvas.height = rect.height;

      if (particlesRef.current.length > 0) {
        const diff = canvas.height - prevHeight;
        particlesRef.current.forEach((p) => {
          if (p.settled) {
            p.floorY += diff;
            p.y = p.floorY;
          }
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Animation loop for particles
  const runParticleLoop = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const list = particlesRef.current;
      let allSettled = true;

      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        if (!p.settled) {
          allSettled = false;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.985;
          p.rotation += p.vRot;

          if (p.y >= p.floorY) {
            p.y = p.floorY;
            p.vy = -p.vy * 0.22;
            p.vx *= 0.62;
            p.vRot *= 0.5;
            if (Math.abs(p.vy) < 0.45 && Math.abs(p.vx) < 0.25) {
              p.settled = true;
              p.vx = 0;
              p.vy = 0;
              p.vRot = 0;
              p.y = p.floorY;
            }
          }

          if (p.x < 4) {
            p.x = 4;
            p.vx = -p.vx * 0.5;
          } else if (p.x > canvas.width - 4) {
            p.x = canvas.width - 4;
            p.vx = -p.vx * 0.5;
          }
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.sizeY / 2, p.size, p.sizeY);
        ctx.restore();
      }

      if (allSettled) {
        animFrameRef.current = null;
      } else {
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    animFrameRef.current = requestAnimationFrame(render);
  };

  // Title click particle blast
  const handleTitleClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (isBlownAway) return;
    playSynthNote(0);
    onTriggerSynthNote?.(0);
    setIsBlownAway(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const cRect = canvas.getBoundingClientRect();
    const tRect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - cRect.left;
    const clickY = e.clientY - cRect.top;

    const colors = [
      '#000000',
      '#000000',
      '#0A0B08',
      '#1c1e19',
      '#9ACD32',
      '#a8e635',
      '#6b8e23',
      '#ffffff',
    ];
    const newParticles: Particle[] = [];
    const count = 300;
    const floorBase = canvas.height - 12;

    for (let i = 0; i < count; i++) {
      const fromClick = i < count * 0.45;
      const x = fromClick
        ? clickX + (Math.random() - 0.5) * 60
        : tRect.left - cRect.left + Math.random() * tRect.width;
      const y = fromClick
        ? clickY + (Math.random() - 0.5) * 40
        : tRect.top - cRect.top + Math.random() * tRect.height;
      const angle = fromClick
        ? Math.random() * Math.PI * 2
        : -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
      const speed = Math.random() * 12 + 3;
      const size = Math.random() * 6 + 3.5;
      const isStretched = Math.random() > 0.3;
      const curve = Math.sin((x / Math.max(1, canvas.width)) * Math.PI) * 18 + Math.random() * 8;
      const floorY = floorBase - curve;

      newParticles.push({
        x,
        y,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * speed - Math.random() * 5,
        size,
        sizeY: isStretched ? size * (Math.random() * 2.2 + 1.2) : size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.35,
        gravity: 0.32 + Math.random() * 0.14,
        floorY,
        settled: false,
      });
    }

    particlesRef.current = newParticles;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    runParticleLoop();
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 75, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#9ACD32] flex flex-col justify-between items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-24 pb-16 sm:pt-28 sm:pb-20 overflow-hidden select-none"
    >
      {/* Background Personal Photo Overlay */}
      <motion.div
        style={{ scale: bgScale, y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[92vw] max-w-[540px] sm:max-w-[640px] md:max-w-[720px] aspect-[4/3] flex items-center justify-center overflow-hidden will-change-transform"
      >
        <motion.img
          id="hero-background-photo"
          src={photoUrl}
          alt="赵江森 Senzhao 个人照片"
          onError={() => {
            if (photoUrl !== '/hero-portrait.svg') {
              setPhotoUrl('/hero-portrait.svg');
            }
          }}
          className="w-full h-full object-cover object-center select-none"
          style={{
            opacity: photoOpacity,
            mixBlendMode: 'multiply',
            filter: photoFilter,
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, transparent 38%, rgba(154,205,50,0.82) 88%, #9ACD32 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 4px)',
          }}
        />
      </motion.div>

      {/* CRT Scanline Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.06] bg-[#000000]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)',
        }}
      />

      {/* Physics Blast Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-30 w-full h-full" />

      {/* Top Header Row (Preserved for Identity) */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs text-black font-extrabold tracking-widest uppercase bg-black/10 px-2.5 py-1 border border-black/20">
            [ ALTERNATIVE STUDIO 360 ]
          </span>
          <label
            htmlFor="hero-photo-upload"
            className="font-mono text-[10px] text-black font-bold uppercase tracking-wider bg-black/10 hover:bg-black hover:text-[#9ACD32] px-2 py-1 border border-black/20 cursor-pointer transition-colors flex items-center gap-1.5"
            title="当前使用 pic1.jpg / 点击可选择本地照片直接替换"
          >
            <span>[ PHOTO: pic1.jpg ]</span>
            <input
              id="hero-photo-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (evt) => {
                    const result = evt.target?.result as string;
                    if (result) {
                      setPhotoUrl(result);
                      try {
                        localStorage.setItem('senzhao:original-photo', result);
                      } catch {}
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        <div className="flex items-center space-x-2 bg-black/10 px-3 py-1 border border-black/20">
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
          <span className="font-mono text-[11px] text-black font-bold uppercase tracking-wider">
            LIVE.VIBE_STATUS: SO BRAT
          </span>
        </div>
      </div>

      {/* Center: Massive Iconic Title */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 relative w-full px-6 sm:px-12 md:px-16 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl w-full flex flex-col items-center justify-center mx-auto"
        >
          <div className="relative w-full flex items-center justify-center py-2 px-4 sm:px-8 md:px-12">
            <motion.h1
              id="hero-senzhao-title"
              onClick={handleTitleClick}
              animate={
                isBlownAway
                  ? { opacity: 0, filter: 'blur(24px) contrast(180%)', scale: 1.12, y: -14 }
                  : { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0 }
              }
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className={`font-brat text-black flex flex-col items-center justify-center font-black select-none ${
                isBlownAway ? 'pointer-events-none' : 'cursor-pointer active:scale-95'
              } py-2 px-4 sm:px-8 relative z-10 transition-transform`}
              style={{
                display: 'inline-flex',
                textShadow:
                  '0px 0px 8px rgba(154,205,50,0.9), 0px 0px 2px rgba(0,0,0,0.35)',
              }}
              title={isBlownAway ? undefined : '点击使字体消散并堆积在底部'}
            >
              {/* Subtitle above SENZHAO */}
              <span className="block text-xl sm:text-3xl md:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[0.92] tracking-[0.14em] sm:tracking-[0.18em] text-black/75 font-extrabold">
                {typedSub || (isTypingDone ? 'WELCOME TO' : '\u00A0')}
              </span>

              {/* Main SENZHAO Display with layered glow */}
              <motion.span
                animate={isBlownAway ? {} : isTypingDone ? { scale: [1, 1.035, 1] } : { scale: 1 }}
                transition={{ duration: 1.8, times: [0, 0.35, 1], ease: [0.22, 1, 0.36, 1] }}
                className="block relative text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[8rem] leading-[0.88] tracking-[-0.075em] mt-1 sm:mt-2 md:mt-3 font-black text-black will-change-transform"
              >
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={
                    isTypingDone && !isBlownAway
                      ? { opacity: [0, 0.95, 0], scale: [0.92, 1.16, 1.02] }
                      : { opacity: 0 }
                  }
                  transition={{ duration: 1.8, times: [0, 0.35, 1], ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -inset-x-12 -inset-y-6 blur-2xl rounded-full pointer-events-none -z-10 mix-blend-overlay will-change-[opacity,transform]"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(154,205,50,0.4) 45%, transparent 75%)',
                  }}
                />
                <span className="relative z-10 block">
                  {typedTitle || (isTypingDone ? 'SENZHAO' : '\u00A0')}
                </span>
              </motion.span>
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar: Horizontally Mirrored Brat Text (Centered) & Scroll Down Arrow */}
      <div className="w-full max-w-7xl mx-auto relative flex flex-col items-center justify-center gap-3 z-10 border-t-2 border-black/20 pt-5 pb-1">
        {/* Horizontally Mirrored Text - Center Aligned with Wider Tracking */}
        <div className="w-full flex items-center justify-center select-none py-1 px-4 text-center">
          <span
            className="font-brat text-xs sm:text-sm text-black font-bold tracking-[0.26em] inline-block transform scale-x-[-1] transition-transform duration-500 hover:scale-x-100 cursor-pointer"
            title="左右反转镜面 // 悬停翻转"
          >
            brat but it's a website made by SEN but it's still brat
          </span>
        </div>

        {/* Scroll Down Arrow with Subtle Vertical Bounce (Right-aligned on desktop, stacked on mobile) */}
        <div className="sm:absolute sm:right-0 flex items-center justify-center">
          <motion.button
            onClick={() => scrollToSection('works')}
            aria-label="Scroll down to works"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-3.5 text-black hover:text-white transition-colors cursor-pointer group bg-black/10 hover:bg-black rounded-full border border-black/20 shadow-sm"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex items-center justify-center"
            >
              <ArrowDown className="w-5 h-5 stroke-[2.5]" />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </section>
  );
};
