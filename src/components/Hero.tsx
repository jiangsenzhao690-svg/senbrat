import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { getOriginalPhoto } from '../utils/imageStorage';

interface HeroProps {
  onTriggerSynthNote?: (freq: number) => void;
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
  const [line1Text, setLine1Text] = useState('');
  const [line2Text, setLine2Text] = useState('');
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isDissolved, setIsDissolved] = useState(false);

  // Particle canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);

  // Permanent resident photo source
  const [portraitSrc, setPortraitSrc] = useState<string>('/hero-portrait.svg');

  // Scroll-linked depth effects: progressive blur and subtle parallax as user scrolls down
  const { scrollY } = useScroll();
  const portraitFilter = useTransform(
    scrollY,
    [0, 380],
    ['blur(0px) contrast(112%) brightness(98%)', 'blur(9px) contrast(115%) brightness(95%)']
  );
  const portraitOpacity = useTransform(scrollY, [0, 480], [0.52, 0.28]);
  const portraitScale = useTransform(scrollY, [0, 480], [1, 0.96]);
  const portraitParallaxY = useTransform(scrollY, [0, 480], [0, 35]);

  // Load saved photo if exists in storage or default to the resident portrait
  useEffect(() => {
    async function loadResidentPhoto() {
      const saved = await getOriginalPhoto();
      if (saved) {
        setPortraitSrc(saved);
        return;
      }

      const img = new Image();
      img.src = '/网站素材1.jpg';
      img.onload = () => setPortraitSrc('/网站素材1.jpg');
      img.onerror = () => setPortraitSrc('/hero-portrait.svg');
    }
    loadResidentPhoto();
  }, []);

  // Typewriter effect for WELCOME TO SENZHAO
  useEffect(() => {
    const target1 = 'WELCOME TO';
    const target2 = 'SENZHAO';
    let i = 0;
    let j = 0;
    setLine1Text('');
    setLine2Text('');
    setIsTypingDone(false);

    const interval = setInterval(() => {
      if (i < target1.length) {
        setLine1Text(target1.slice(0, i + 1));
        i++;
      } else if (j < target2.length) {
        setLine2Text(target2.slice(0, j + 1));
        j++;
      } else {
        setIsTypingDone(true);
        clearInterval(interval);
      }
    }, 85);

    return () => clearInterval(interval);
  }, []);

  // Canvas resize and cleanup
  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const oldHeight = canvas.height || rect.height;
      canvas.width = rect.width;
      canvas.height = rect.height;

      if (particlesRef.current.length > 0) {
        const heightDiff = canvas.height - oldHeight;
        particlesRef.current.forEach((p) => {
          if (p.settled) {
            p.floorY += heightDiff;
            p.y = p.floorY;
          }
        });

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particlesRef.current.forEach((p) => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation);
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size / 2, -p.sizeY / 2, p.size, p.sizeY);
            ctx.restore();
          });
        }
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const runParticleAnimation = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particles = particlesRef.current;
      let allSettled = true;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!p.settled) {
          allSettled = false;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += p.gravity;
          p.vx *= 0.985;
          p.rotation += p.vRot;

          // Floor collision detection
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

          // Left/Right edge bounce
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

      if (!allSettled) {
        animFrameRef.current = requestAnimationFrame(update);
      } else {
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(update);
  };

  const handleFontClick = (e: React.MouseEvent<HTMLHeadingElement>) => {
    if (isDissolved) return;

    if (onTriggerSynthNote) onTriggerSynthNote(320);
    setIsDissolved(true);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const headingRect = e.currentTarget.getBoundingClientRect();

    const clickX = e.clientX - canvasRect.left;
    const clickY = e.clientY - canvasRect.top;

    const colors = [
      '#000000',
      '#000000',
      '#0A0B08',
      '#1c1e19',
      '#9ACD32',
      '#a8e635',
      '#6b8e23',
      '#ffffff'
    ];

    const newParticles: Particle[] = [];
    const count = 320;
    const floorBaseY = canvas.height - 12;

    for (let i = 0; i < count; i++) {
      const fromClick = i < count * 0.45;
      const px = fromClick
        ? clickX + (Math.random() - 0.5) * 60
        : headingRect.left - canvasRect.left + Math.random() * headingRect.width;
      const py = fromClick
        ? clickY + (Math.random() - 0.5) * 40
        : headingRect.top - canvasRect.top + Math.random() * headingRect.height;

      const angle = fromClick
        ? Math.random() * Math.PI * 2
        : -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.5;
      const speed = Math.random() * 12 + 3;
      const size = Math.random() * 6 + 3.5;
      const isRect = Math.random() > 0.3;

      const moundHeight = Math.sin((px / Math.max(1, canvas.width)) * Math.PI) * 18 + Math.random() * 8;
      const floorY = floorBaseY - moundHeight;

      newParticles.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 4,
        vy: Math.sin(angle) * speed - Math.random() * 5,
        size: size,
        sizeY: isRect ? size * (Math.random() * 2.2 + 1.2) : size,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: 1,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.35,
        gravity: 0.32 + Math.random() * 0.14,
        floorY: floorY,
        settled: false
      });
    }

    particlesRef.current = newParticles;
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    runParticleAnimation();
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top - 75, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#9ACD32] flex flex-col justify-between items-center px-6 sm:px-12 md:px-16 lg:px-24 pt-20 pb-16 sm:pt-24 sm:pb-20 overflow-hidden select-none"
    >
      {/* ABSOLUTE BOTTOM LAYER: Resident Portrait Photo */}
      <motion.div
        style={{
          scale: portraitScale,
          y: portraitParallaxY
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[92vw] max-w-[540px] sm:max-w-[640px] md:max-w-[720px] aspect-[4/3] flex items-center justify-center overflow-hidden will-change-transform"
      >
        <motion.img
          src={portraitSrc}
          alt="赵江森 Senzhao 个人照片"
          onError={() => setPortraitSrc('/hero-portrait.svg')}
          className="w-full h-full object-cover object-center select-none"
          style={{
            opacity: portraitOpacity,
            mixBlendMode: 'multiply',
            filter: portraitFilter
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at center, transparent 38%, rgba(154,205,50,0.82) 88%, #9ACD32 100%)'
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.10] pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 4px)'
          }}
        />
      </motion.div>

      {/* Subtle scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.06] bg-[#000000]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #000 0px, #000 2px, transparent 2px, transparent 4px)'
        }}
      />

      {/* Particle Dissipation Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-30 w-full h-full"
      />

      {/* Top Banner stats */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between z-10 relative">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-xs text-black font-extrabold tracking-widest uppercase bg-black/10 px-2.5 py-1 border border-black/20">
            [ ALTERNATIVE STUDIO 360 ]
          </span>
        </div>

        <div className="flex items-center space-x-2 bg-black/10 px-3 py-1 border border-black/20">
          <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
          <span className="font-mono text-[11px] text-black font-bold uppercase tracking-wider">
            LIVE.VIBE_STATUS: SO BRAT
          </span>
        </div>
      </div>

      {/* Center Stage: Name Typography Centered */}
      <div className="flex-1 flex flex-col items-center justify-center text-center z-10 relative w-full px-6 sm:px-12 md:px-16 my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl w-full flex flex-col items-center justify-center mx-auto"
        >
          {/* MAIN STAGE: Name Typography (Stacked: WELCOME TO on top, SENZHAO on bottom) */}
          <div className="relative w-full flex items-center justify-center py-2 px-4 sm:px-8 md:px-12">
            <motion.h1
              id="hero-senzhao-title"
              onClick={handleFontClick}
              animate={
                isDissolved
                  ? {
                      opacity: 0,
                      filter: 'blur(24px) contrast(180%)',
                      scale: 1.12,
                      y: -14
                    }
                  : {
                      opacity: 1,
                      filter: 'blur(0px)',
                      scale: 1,
                      y: 0
                    }
              }
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1]
              }}
              className={`font-brat text-black flex flex-col items-center justify-center font-black select-none ${
                isDissolved ? 'pointer-events-none' : 'cursor-pointer active:scale-95'
              } py-2 px-4 sm:px-8 relative z-10 transition-transform`}
              style={{
                display: 'inline-flex',
                textShadow: '0px 0px 8px rgba(154,205,50,0.9), 0px 0px 2px rgba(0,0,0,0.35)'
              }}
              title={isDissolved ? undefined : '点击使字体消散并堆积在底部'}
            >
              <span className="block text-xl sm:text-3xl md:text-4xl lg:text-[3.25rem] xl:text-[3.75rem] leading-[0.92] tracking-[0.14em] sm:tracking-[0.18em] text-black/75 font-extrabold">
                {line1Text || (isTypingDone ? 'WELCOME TO' : '\u00A0')}
              </span>
              <motion.span
                animate={
                  isDissolved
                    ? {}
                    : isTypingDone
                    ? {
                        scale: [1, 1.035, 1]
                      }
                    : { scale: 1 }
                }
                transition={{
                  duration: 1.8,
                  times: [0, 0.35, 1],
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="block relative text-4xl sm:text-7xl md:text-8xl lg:text-[6.5rem] xl:text-[7.8rem] leading-[0.88] tracking-[-0.075em] mt-1 sm:mt-2 md:mt-3 font-black text-black will-change-transform"
              >
                {/* 1. Silky smooth ambient radial halo */}
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={
                    isTypingDone && !isDissolved
                      ? {
                          opacity: [0, 0.95, 0],
                          scale: [0.92, 1.16, 1.02]
                        }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 1.8,
                    times: [0, 0.35, 1],
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute -inset-x-12 -inset-y-6 blur-2xl rounded-full pointer-events-none -z-10 mix-blend-overlay will-change-[opacity,transform]"
                  style={{
                    background:
                      'radial-gradient(ellipse at center, rgba(255,255,255,0.85) 0%, rgba(154,205,50,0.4) 45%, transparent 75%)'
                  }}
                />

                {/* 2. Soft bloom text glow layer */}
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={
                    isTypingDone && !isDissolved
                      ? {
                          opacity: [0, 1, 0]
                        }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 1.8,
                    times: [0, 0.32, 1],
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute inset-0 select-none pointer-events-none text-white font-black blur-[10px] will-change-[opacity]"
                  style={{
                    textShadow:
                      '0 0 25px rgba(255,255,255,0.95), 0 0 50px rgba(154,205,50,0.9), 0 0 85px rgba(154,205,50,0.8)'
                  }}
                >
                  {line2Text || (isTypingDone ? 'SENZHAO' : '\u00A0')}
                </motion.span>

                {/* 3. Crisp highlight edge glow layer */}
                <motion.span
                  aria-hidden="true"
                  initial={{ opacity: 0 }}
                  animate={
                    isTypingDone && !isDissolved
                      ? {
                          opacity: [0, 0.95, 0]
                        }
                      : { opacity: 0 }
                  }
                  transition={{
                    duration: 1.6,
                    times: [0, 0.3, 1],
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute inset-0 select-none pointer-events-none text-white font-black blur-[2px] will-change-[opacity]"
                  style={{
                    textShadow:
                      '0 0 12px rgba(255,255,255,1), 0 0 24px rgba(154,205,50,0.9)'
                  }}
                >
                  {line2Text || (isTypingDone ? 'SENZHAO' : '\u00A0')}
                </motion.span>

                {/* 4. Base clean black text */}
                <span className="relative z-10 block">
                  {line2Text || (isTypingDone ? 'SENZHAO' : '\u00A0')}
                </span>
              </motion.span>
            </motion.h1>
          </div>
        </motion.div>
      </div>

      {/* Bottom Info Row */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 z-10 border-t-2 border-black/20 pt-5">
        <p className="font-mono text-[10px] text-black font-bold text-center md:text-left max-w-md leading-relaxed uppercase">
          [ SENZHAO DESIGN MATRIX ] — RAW EXPERIMENTAL COMPUTING, ACID GRAPHICS & DIGITAL BRUTALISM.
        </p>

        <button
          onClick={() => scrollTo('works')}
          className="flex items-center space-x-2 text-black hover:text-white transition-colors cursor-pointer group"
        >
          <span className="font-mono text-xs font-black tracking-widest uppercase">
            SCROLL DOWN / 向下滚动
          </span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};
