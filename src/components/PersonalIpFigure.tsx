import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Upload, Sparkles, RefreshCw, ZoomIn } from 'lucide-react';

interface PersonalIpFigureProps {
  className?: string;
}

export function PersonalIpFigure({ className = '' }: PersonalIpFigureProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userImage, setUserImage] = useState<string | null>(() => {
    return localStorage.getItem('senzhao_ip_image_v3') || null;
  });
  const [transparentCutout, setTransparentCutout] = useState<string | null>(null);
  const [removeBg, setRemoveBg] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Check if /fgh.jpg or /pip.jpg exists in public folder on mount
  useEffect(() => {
    if (!userImage) {
      // Try /fgh.jpg first, then /pip.jpg
      fetch('/fgh.jpg', { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            setUserImage('/fgh.jpg');
          } else {
            return fetch('/pip.jpg', { method: 'HEAD' }).then((r) => {
              if (r.ok) setUserImage('/pip.jpg');
            });
          }
        })
        .catch(() => {});
    }
  }, [userImage]);

  // Process image to create transparent cutout removing pure black background
  useEffect(() => {
    if (!userImage) {
      setTransparentCutout(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = userImage;
    img.onload = () => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = img.naturalWidth || img.width;
      offCanvas.height = img.naturalHeight || img.height;
      const ctx = offCanvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imgData = ctx.getImageData(0, 0, offCanvas.width, offCanvas.height);
      const data = imgData.data;

      // Filter pure black / near-black background to transparent
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Dark background threshold
        const maxVal = Math.max(r, g, b);
        if (maxVal < 24) {
          data[i + 3] = 0;
        } else if (maxVal < 44) {
          const alphaFactor = (maxVal - 24) / 20;
          data[i + 3] = Math.floor(data[i + 3] * alphaFactor);
        }
      }

      ctx.putImageData(imgData, 0, 0);
      setTransparentCutout(offCanvas.toDataURL('image/png'));
    };
  }, [userImage]);

  // Handle file selection or drop
  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setUserImage(result);
        try {
          localStorage.setItem('senzhao_ip_image_v3', result);
        } catch {
          // ignore quota error if file too large
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserImage(null);
    setTransparentCutout(null);
    localStorage.removeItem('senzhao_ip_image_v3');
  };

  // Meticulous programmatic sketch canvas reproducing fgh.jpg at high resolution
  useEffect(() => {
    if (userImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    // Enlarged scale: 440px x 720px
    const width = 440;
    const height = 720;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, width, height);

    let seed = 108;
    const pseudoRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const drawSketchLine = (
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      color: string,
      lineWidth: number,
      jitter = 1.4
    ) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1 + (pseudoRandom() - 0.5) * jitter, y1 + (pseudoRandom() - 0.5) * jitter);
      const midX = (x1 + x2) / 2 + (pseudoRandom() - 0.5) * jitter * 2;
      const midY = (y1 + y2) / 2 + (pseudoRandom() - 0.5) * jitter * 2;
      ctx.quadraticCurveTo(midX, midY, x2 + (pseudoRandom() - 0.5) * jitter, y2 + (pseudoRandom() - 0.5) * jitter);
      ctx.stroke();
      ctx.restore();
    };

    const centerX = 220;

    // 1. Neon Ground Ambient Glow reflecting onto floor
    const groundGlow = ctx.createRadialGradient(centerX, 660, 15, centerX, 660, 115);
    groundGlow.addColorStop(0, 'rgba(0, 255, 60, 0.55)');
    groundGlow.addColorStop(0.35, 'rgba(118, 255, 3, 0.3)');
    groundGlow.addColorStop(0.8, 'rgba(0, 255, 60, 0.08)');
    groundGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = groundGlow;
    ctx.beginPath();
    ctx.ellipse(centerX, 660, 110, 32, 0, 0, Math.PI * 2);
    ctx.fill();

    // 2. SLATE-GREY WIDE-LEG PANTS (fgh.jpg style)
    const pTopY = 304;
    const pBottomY = 636;
    const pLeftTopX = centerX - 56;   // 164
    const pRightTopX = centerX + 56;  // 276
    const pLeftBottomX = centerX - 100; // 120
    const pRightBottomX = centerX + 100;// 320

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(pLeftTopX, pTopY);
    ctx.lineTo(pRightTopX, pTopY);
    ctx.quadraticCurveTo(centerX + 85, 460, pRightBottomX, pBottomY);
    ctx.quadraticCurveTo(centerX + 60, pBottomY + 10, centerX, pBottomY + 4);
    ctx.quadraticCurveTo(centerX - 60, pBottomY + 10, pLeftBottomX, pBottomY);
    ctx.quadraticCurveTo(centerX - 85, 460, pLeftTopX, pTopY);
    ctx.closePath();

    // Distinct Slate-Grey base fill matching fgh.jpg
    ctx.fillStyle = '#4E5562';
    ctx.fill();
    ctx.clip();

    // Subtle dark gradient shading towards inner crotch & sides
    const pantsGrad = ctx.createLinearGradient(centerX - 90, pTopY, centerX + 90, pBottomY);
    pantsGrad.addColorStop(0, '#58606E');
    pantsGrad.addColorStop(0.5, '#484E5A');
    pantsGrad.addColorStop(1, '#3E4450');
    ctx.fillStyle = pantsGrad;
    ctx.fill();

    // Charcoal & pencil crosshatching textures on the trousers
    for (let i = 0; i < 950; i++) {
      const rx = centerX - 105 + pseudoRandom() * 210;
      const ry = pTopY + pseudoRandom() * (pBottomY - pTopY + 20);
      const angle = (pseudoRandom() - 0.5) * 0.9 + Math.PI / 2;
      const len = 18 + pseudoRandom() * 45;
      const x2 = rx + Math.cos(angle) * len;
      const y2 = ry + Math.sin(angle) * len;
      const alpha = 0.12 + pseudoRandom() * 0.32;
      ctx.strokeStyle = pseudoRandom() > 0.45 ? `rgba(20, 24, 30, ${alpha})` : `rgba(110, 118, 132, ${alpha * 0.7})`;
      ctx.lineWidth = 0.8 + pseudoRandom() * 1.8;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // Center vertical crotch crease
    ctx.strokeStyle = '#1E222A';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(centerX, pTopY + 28);
    ctx.lineTo(centerX, 480);
    ctx.stroke();

    // Left and right trouser leg draping fold lines
    drawSketchLine(centerX - 42, pTopY + 40, centerX - 55, pBottomY - 15, '#222832', 2.8, 2.5);
    drawSketchLine(centerX + 42, pTopY + 40, centerX + 55, pBottomY - 15, '#222832', 2.8, 2.5);

    // Hands-in-pockets side creases
    drawSketchLine(pLeftTopX - 6, pTopY + 15, pLeftTopX + 22, pTopY + 90, '#1A1E26', 3.2, 1.8);
    drawSketchLine(pRightTopX + 6, pTopY + 15, pRightTopX - 22, pTopY + 90, '#1A1E26', 3.2, 1.8);

    ctx.restore();

    // 3. DANGLING WAISTBAND DRAWSTRINGS (Exact feature from fgh.jpg)
    ctx.save();
    ctx.strokeStyle = '#262A32';
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    // Left string
    ctx.beginPath();
    ctx.moveTo(centerX - 5, pTopY + 4);
    ctx.quadraticCurveTo(centerX - 8, pTopY + 30, centerX - 4, pTopY + 54);
    ctx.stroke();
    // Right string
    ctx.beginPath();
    ctx.moveTo(centerX + 5, pTopY + 4);
    ctx.quadraticCurveTo(centerX + 7, pTopY + 28, centerX + 10, pTopY + 58);
    ctx.stroke();
    // Knot caps at string ends
    ctx.fillStyle = '#1A1C22';
    ctx.beginPath();
    ctx.arc(centerX - 4, pTopY + 55, 2.5, 0, Math.PI * 2);
    ctx.arc(centerX + 10, pTopY + 59, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Trouser Outer Contour outlines
    ctx.strokeStyle = '#181C24';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(pLeftTopX, pTopY);
    ctx.quadraticCurveTo(centerX - 85, 460, pLeftBottomX, pBottomY);
    ctx.moveTo(pRightTopX, pTopY);
    ctx.quadraticCurveTo(centerX + 85, 460, pRightBottomX, pBottomY);
    ctx.stroke();

    // 4. ACID NEON GREEN SNEAKERS (Enlarged and vivid)
    const drawSneaker = (cx: number, cy: number, isRight = false) => {
      ctx.save();
      // Outer bright green neon bloom
      ctx.shadowColor = '#00FF44';
      ctx.shadowBlur = 24;
      ctx.fillStyle = '#00FF33';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 27, 18, isRight ? 0.12 : -0.12, 0, Math.PI * 2);
      ctx.fill();

      // Top highlighted shoe cap
      ctx.shadowColor = '#76FF03';
      ctx.shadowBlur = 12;
      ctx.fillStyle = '#64FF00';
      ctx.beginPath();
      ctx.ellipse(cx, cy - 3, 21, 12, isRight ? 0.12 : -0.12, 0, Math.PI * 2);
      ctx.fill();

      // Horizontal black laces & strap detailing
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#05070A';
      ctx.lineWidth = 2.4;
      for (let l = -7; l <= 7; l += 4.5) {
        ctx.beginPath();
        ctx.moveTo(cx - 11, cy + l);
        ctx.lineTo(cx + 11, cy + l);
        ctx.stroke();
      }

      // Outer pencil sketch rim
      ctx.strokeStyle = '#0A1208';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
    };

    drawSneaker(centerX - 40, 646, false);
    drawSneaker(centerX + 40, 646, true);

    // 5. NECK & COLLAR
    ctx.fillStyle = '#EDE3D5';
    ctx.beginPath();
    ctx.rect(centerX - 13, 136, 26, 30);
    ctx.fill();
    // Neck collar shading
    ctx.strokeStyle = '#322E28';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX - 12, 160);
    ctx.quadraticCurveTo(centerX, 166, centerX + 12, 160);
    ctx.stroke();

    // 6. INNER HEATHER GREY RIBBED SHIRT
    ctx.fillStyle = '#737A84';
    ctx.beginPath();
    ctx.moveTo(centerX - 20, 164);
    ctx.quadraticCurveTo(centerX, 180, centerX + 20, 164);
    ctx.lineTo(centerX + 22, 230);
    ctx.lineTo(centerX - 22, 230);
    ctx.closePath();
    ctx.fill();

    // Vertical shirt ribbing texture
    ctx.strokeStyle = '#484E58';
    ctx.lineWidth = 1.2;
    for (let x = centerX - 16; x <= centerX + 16; x += 4) {
      ctx.beginPath();
      ctx.moveTo(x, 172);
      ctx.lineTo(x, 228);
      ctx.stroke();
    }

    // 7. DISTRESSED OFF-WHITE JACKET WITH FRONT POCKETS (fgh.jpg style)
    ctx.save();
    ctx.beginPath();
    // Shoulder to hands-in-pockets drape
    ctx.moveTo(centerX - 40, 162);
    ctx.lineTo(centerX - 72, 206);
    ctx.quadraticCurveTo(centerX - 82, 258, centerX - 75, 305);
    ctx.lineTo(centerX - 48, 312);
    ctx.lineTo(centerX - 38, 242);
    ctx.lineTo(centerX - 14, 250);
    ctx.lineTo(centerX + 14, 250);
    ctx.lineTo(centerX + 38, 242);
    ctx.lineTo(centerX + 48, 312);
    ctx.lineTo(centerX + 75, 305);
    ctx.quadraticCurveTo(centerX + 82, 258, centerX + 72, 206);
    ctx.lineTo(centerX + 40, 162);
    ctx.closePath();

    ctx.fillStyle = '#F4F5F8';
    ctx.fill();
    ctx.clip();

    // Smudged quilted horizontal lines
    for (let y = 180; y <= 294; y += 17) {
      drawSketchLine(centerX - 78, y, centerX + 78, y, '#6E7684', 1.6, 2.2);
    }

    // Grunge smudges and graphite specks
    for (let i = 0; i < 160; i++) {
      ctx.fillStyle = 'rgba(35, 40, 50, 0.22)';
      ctx.beginPath();
      ctx.arc(
        centerX - 75 + pseudoRandom() * 150,
        162 + pseudoRandom() * 145,
        1 + pseudoRandom() * 3,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    // TWO LOWER FRONT POCKETS (Kangaroo/patch pockets from fgh.jpg)
    // Left Pocket
    ctx.strokeStyle = '#181C22';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    ctx.moveTo(centerX - 46, 252);
    ctx.lineTo(centerX - 16, 250);
    ctx.lineTo(centerX - 14, 298);
    ctx.lineTo(centerX - 44, 302);
    ctx.closePath();
    ctx.stroke();

    // Right Pocket
    ctx.beginPath();
    ctx.moveTo(centerX + 46, 252);
    ctx.lineTo(centerX + 16, 250);
    ctx.lineTo(centerX + 14, 298);
    ctx.lineTo(centerX + 44, 302);
    ctx.closePath();
    ctx.stroke();

    // Center Vertical Black Zipper
    ctx.strokeStyle = '#080A0E';
    ctx.lineWidth = 3.6;
    ctx.beginPath();
    ctx.moveTo(centerX, 180);
    ctx.lineTo(centerX, 248);
    ctx.stroke();

    // Double-ribbed waistband hem band
    ctx.strokeStyle = '#323844';
    ctx.lineWidth = 2;
    drawSketchLine(centerX - 50, 304, centerX + 50, 304, '#383F4C', 2.2, 1.5);
    drawSketchLine(centerX - 50, 310, centerX + 50, 310, '#383F4C', 2.2, 1.5);

    ctx.restore();

    // Jacket outline strokes
    ctx.strokeStyle = '#11141A';
    ctx.lineWidth = 2.8;
    ctx.beginPath();
    ctx.moveTo(centerX - 40, 162);
    ctx.lineTo(centerX - 72, 206);
    ctx.quadraticCurveTo(centerX - 82, 258, centerX - 75, 305);
    ctx.moveTo(centerX + 40, 162);
    ctx.lineTo(centerX + 72, 206);
    ctx.quadraticCurveTo(centerX + 82, 258, centerX + 75, 305);
    ctx.stroke();

    // 8. FACELESS IVORY OVAL HEAD
    ctx.save();
    ctx.fillStyle = '#F4EDE2';
    ctx.beginPath();
    ctx.ellipse(centerX, 114, 30, 39, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#221F1B';
    ctx.lineWidth = 2.4;
    ctx.stroke();

    // Characteristic charcoal graphite smudge on right cheek & jawline
    const smudgeGrad = ctx.createRadialGradient(centerX + 20, 126, 2, centerX + 20, 126, 17);
    smudgeGrad.addColorStop(0, 'rgba(100, 85, 70, 0.55)');
    smudgeGrad.addColorStop(0.6, 'rgba(100, 85, 70, 0.2)');
    smudgeGrad.addColorStop(1, 'rgba(100, 85, 70, 0)');
    ctx.fillStyle = smudgeGrad;
    ctx.beginPath();
    ctx.arc(centerX + 20, 126, 17, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 9. MESSY WAVY CURLY BLACK HAIR (Parted near center, locks fluttering out)
    ctx.save();
    ctx.fillStyle = '#111317';
    // Main hair dome
    ctx.beginPath();
    ctx.ellipse(centerX, 90, 40, 35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Left curved wavy locks
    ctx.beginPath();
    ctx.moveTo(centerX - 36, 85);
    ctx.quadraticCurveTo(centerX - 50, 112, centerX - 32, 134);
    ctx.quadraticCurveTo(centerX - 24, 115, centerX - 24, 95);
    ctx.fill();

    // Right curved wavy locks
    ctx.beginPath();
    ctx.moveTo(centerX + 36, 85);
    ctx.quadraticCurveTo(centerX + 50, 112, centerX + 32, 134);
    ctx.quadraticCurveTo(centerX + 24, 115, centerX + 24, 95);
    ctx.fill();

    // Top hair flyaways and pencil sketch contours
    ctx.strokeStyle = '#0A0C0F';
    ctx.lineWidth = 2;
    for (let i = 0; i < 35; i++) {
      const hx = centerX - 35 + pseudoRandom() * 70;
      const hy = 70 + pseudoRandom() * 30;
      const hAngle = (pseudoRandom() - 0.5) * 1.5 - Math.PI / 2;
      const hLen = 8 + pseudoRandom() * 16;
      ctx.beginPath();
      ctx.moveTo(hx, hy);
      ctx.lineTo(hx + Math.cos(hAngle) * hLen, hy + Math.sin(hAngle) * hLen);
      ctx.stroke();
    }
    ctx.restore();
  }, [userImage]);

  const displayImage = removeBg && transparentCutout ? transparentCutout : userImage;

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center select-none ${className}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
      />

      {/* Expanded Neon Green Ground Reflection from Shoes */}
      <div className="absolute bottom-2 w-56 sm:w-72 h-10 bg-[#00FF44]/45 rounded-full blur-xl pointer-events-none -z-10" />

      {/* Main Figure Display - Substantially Enlarged Scale */}
      <motion.div
        animate={{ y: [-3, 3, -3] }}
        transition={{ repeat: Infinity, duration: 4.8, ease: 'easeInOut' }}
        whileHover={{ scale: 1.02 }}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex items-center justify-center cursor-pointer transition-all duration-300 ${
          isDragging ? 'scale-105 filter drop-shadow-[0_0_32px_rgba(0,255,60,0.9)]' : ''
        }`}
      >
        {displayImage ? (
          <div className="relative group">
            <img
              src={displayImage}
              alt="Personal IP"
              className={`max-h-[580px] sm:max-h-[660px] lg:max-h-[720px] w-auto object-contain transition-all duration-300 ${
                removeBg
                  ? 'filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] drop-shadow-[0_0_20px_rgba(0,255,60,0.35)]'
                  : 'shadow-2xl'
              }`}
            />

            {/* Quick hover controls */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 z-20">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setRemoveBg(!removeBg);
                }}
                title={removeBg ? '切换为原黑底' : '抠除黑底(透明化)'}
                className="p-1.5 bg-black text-[#9ACD32] hover:text-white text-[10px] font-mono flex items-center gap-1 border border-black shadow"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{removeBg ? '透明立绘' : '黑底'}</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="重新选择或复原"
                className="p-1.5 bg-black text-white hover:text-red-400 border border-black shadow"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="relative group flex flex-col items-center">
            <canvas
              ref={canvasRef}
              className="max-h-[580px] sm:max-h-[660px] lg:max-h-[720px] w-auto drop-shadow-[0_16px_36px_rgba(0,0,0,0.5)]"
            />

            {/* Floating drag-and-drop prompt indicator */}
            <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-black font-extrabold bg-black/10 hover:bg-black hover:text-[#9ACD32] px-3.5 py-1.5 transition-colors border border-black/30">
              <Upload className="w-3.5 h-3.5" />
              <span>拖入 fgh.jpg 或点击图片直接替换原图</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
