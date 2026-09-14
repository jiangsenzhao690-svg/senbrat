import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [starAngle, setStarAngle] = useState(0);

  const mousePosRef = useRef({ x: -100, y: -100 });
  const followPosRef = useRef({ x: -100, y: -100 });
  const lastMouseRef = useRef({ x: -100, y: -100 });
  const angleRef = useRef(0);
  const animIdRef = useRef<number | null>(null);

  // Enable custom-cursor-enabled class on body
  useEffect(() => {
    document.body.classList.add('custom-cursor-enabled');
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  // Smooth lerp loop for the glowing follower star and dynamic rotation
  useEffect(() => {
    let isRunning = true;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      if (!isRunning) return;

      // Calculate movement velocity to gently rotate the star
      const dx = mousePosRef.current.x - lastMouseRef.current.x;
      const dy = mousePosRef.current.y - lastMouseRef.current.y;
      lastMouseRef.current.x = mousePosRef.current.x;
      lastMouseRef.current.y = mousePosRef.current.y;

      const speed = Math.sqrt(dx * dx + dy * dy);
      angleRef.current = (angleRef.current + speed * 0.45 + 0.6) % 360;
      setStarAngle(Math.round(angleRef.current * 10) / 10);

      // Follower position lerp
      followPosRef.current.x = lerp(followPosRef.current.x, mousePosRef.current.x, 0.24);
      followPosRef.current.y = lerp(followPosRef.current.y, mousePosRef.current.y, 0.24);

      setTargetPos({
        x: Math.round(followPosRef.current.x * 10) / 10,
        y: Math.round(followPosRef.current.y * 10) / 10,
      });

      animIdRef.current = requestAnimationFrame(animate);
    };

    animIdRef.current = requestAnimationFrame(animate);

    return () => {
      isRunning = false;
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, []);

  // Mouse event listeners
  useEffect(() => {
    // Only activate on fine pointer devices (desktop / trackpad / mouse)
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Detect hover over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactiveEl = target.closest(
          'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor]'
        );
        setIsHovered(!!interactiveEl);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* 1. Outer Glowing Follower Star (Replaces old circular halo with a floating glowing 5-pointed star aura) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99998] will-change-transform"
        style={{
          transform: `translate3d(${targetPos.x}px, ${targetPos.y}px, 0)`,
        }}
      >
        <div
          className="relative -top-6 -left-6 w-12 h-12 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotate(${-starAngle}deg) scale(${isHovered ? 1.75 : isClicked ? 0.75 : 1})`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className={`w-full h-full transition-opacity duration-200 ${
              isHovered ? 'opacity-85' : 'opacity-45'
            }`}
            style={{
              filter: isHovered
                ? 'drop-shadow(0 0 12px #9ACD32) drop-shadow(0 0 22px #9ACD32)'
                : 'drop-shadow(0 0 8px rgba(154,205,50,0.75))',
            }}
          >
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill="none"
              stroke="#9ACD32"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 2. Core Glowing Five-Pointed Star (Instant precision cursor anchored right at mouse coordinate) */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className="relative -top-3.5 -left-3.5 w-7 h-7 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `rotate(${starAngle}deg) scale(${isHovered ? 1.35 : isClicked ? 0.8 : 1})`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="w-full h-full select-none"
            style={{
              filter:
                'drop-shadow(0 0 5px #9ACD32) drop-shadow(0 0 12px rgba(154,205,50,0.95)) drop-shadow(0 0 20px rgba(154,205,50,0.7))',
            }}
          >
            <polygon
              points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill="#9ACD32"
              stroke="#ffffff"
              strokeWidth="0.75"
              strokeLinejoin="round"
            />
            {/* Center bright core spark */}
            <circle cx="12" cy="13" r="1.5" fill="#ffffff" opacity="0.9" />
          </svg>
        </div>
      </div>
    </>
  );
};
