import { useState, useEffect, useRef } from 'react';

export function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [rotation, setRotation] = useState(0);

  const targetPosRef = useRef({ x: -100, y: -100 });
  const followerPosRef = useRef({ x: -100, y: -100 });
  const lastMousePosRef = useRef({ x: -100, y: -100 });
  const rotAccumulatorRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    document.body.classList.add('custom-cursor-enabled');
    return () => {
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, []);

  // Physics animation loop for continuous rotation and smooth lag
  useEffect(() => {
    let active = true;
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    const animate = () => {
      if (!active) return;

      const dx = targetPosRef.current.x - lastMousePosRef.current.x;
      const dy = targetPosRef.current.y - lastMousePosRef.current.y;
      lastMousePosRef.current.x = targetPosRef.current.x;
      lastMousePosRef.current.y = targetPosRef.current.y;

      const speed = Math.sqrt(dx * dx + dy * dy);
      rotAccumulatorRef.current =
        (rotAccumulatorRef.current + speed * 0.45 + 0.6) % 360;
      setRotation(Math.round(rotAccumulatorRef.current * 10) / 10);

      followerPosRef.current.x = lerp(
        followerPosRef.current.x,
        targetPosRef.current.x,
        0.24
      );
      followerPosRef.current.y = lerp(
        followerPosRef.current.y,
        targetPosRef.current.y,
        0.24
      );

      setFollowerPos({
        x: Math.round(followerPosRef.current.x * 10) / 10,
        y: Math.round(followerPosRef.current.y * 10) / 10,
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      active = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  // Mouse event listeners
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetPosRef.current = { x: e.clientX, y: e.clientY };
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, label, .cursor-pointer, [data-cursor]'
        );
        setIsHovered(Boolean(interactive));
      }
    };

    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);
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
      {/* Outer Follower Star */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99998] will-change-transform"
        style={{
          transform: `translate3d(${followerPos.x}px, ${followerPos.y}px, 0)`,
        }}
      >
        <div
          className="relative -top-6 -left-6 w-12 h-12 flex items-center justify-center transition-transform duration-200 ease-out"
          style={{
            transform: `rotate(${-rotation}deg) scale(${
              isHovered ? 1.75 : isPressed ? 0.75 : 1
            })`,
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

      {/* Inner Exact Glowing Star */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] will-change-transform"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
      >
        <div
          className="relative -top-3.5 -left-3.5 w-7 h-7 flex items-center justify-center transition-transform duration-100 ease-out"
          style={{
            transform: `rotate(${rotation}deg) scale(${
              isHovered ? 1.35 : isPressed ? 0.8 : 1
            })`,
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
            <circle cx="12" cy="13" r="1.5" fill="#ffffff" opacity="0.9" />
          </svg>
        </div>
      </div>
    </>
  );
}
