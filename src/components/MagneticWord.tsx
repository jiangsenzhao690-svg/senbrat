import React, { useRef, useState, useCallback } from 'react';
import { motion } from 'motion/react';

interface MagneticWordProps {
  children: React.ReactNode;
  strength?: number; // max displacement in px (default ~12)
  radius?: number;   // influence radius in px (default ~75)
  className?: string;
  key?: React.Key;
}

export function MagneticWord({
  children,
  strength = 14,
  radius = 80,
  className = '',
}: MagneticWordProps) {
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      const el = wordRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance < radius) {
        // Closer cursor -> higher pull towards the cursor
        const factor = (1 - distance / radius) * strength;
        const moveX = (deltaX / distance) * factor;
        const moveY = (deltaY / distance) * factor;
        setPosition({ x: moveX, y: moveY });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    },
    [strength, radius]
  );

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.span
      ref={wordRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 18,
        mass: 0.2,
      }}
      className={`inline-block select-none cursor-default transition-colors duration-150 ${className}`}
    >
      {children}
    </motion.span>
  );
}

// Splits Chinese/English mixed text into interactive magnetic words/tokens
export function MagneticText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  // Regex to split into English words, punctuation, Chinese phrases/characters
  const tokens = text.match(/[\u4e00-\u9fa5]{1,2}|[a-zA-Z0-9_.-]+|[^\s\w\u4e00-\u9fa5]|\s+/g) || [text];

  return (
    <span className={className}>
      {tokens.map((token, idx) => {
        // If it's whitespace, preserve it
        if (/^\s+$/.test(token)) {
          return <span key={idx}>{token}</span>;
        }
        return (
          <MagneticWord
            key={idx}
            className="hover:text-black hover:font-bold hover:scale-105"
          >
            {token}
          </MagneticWord>
        );
      })}
    </span>
  );
}
