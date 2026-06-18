/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function TargetCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  // Smooth springs for high-end lag effect
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.6 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-node') ||
        target.style.cursor === 'pointer'
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Outer Tracking Target */}
      <motion.div
        ref={cursorRef}
        style={{
          x: smoothX,
          y: smoothY,
        }}
        className="fixed left-0 top-0 hidden pointer-events-none md:block"
        animate={{
          scale: isHoveringClickable ? 1.5 : 1.0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="relative w-8 h-8 flex items-center justify-center">
          {/* Main Electric Ring */}
          <div
            className={`absolute inset-0 rounded-full border-2 transition-colors duration-300 ${
              isHoveringClickable
                ? 'border-[#00d2ff] bg-[#00d2ff]/10 scale-90'
                : 'border-[#0088ff]/40'
            }`}
          />

          {/* Precision Crosshair Ticks */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#0088ff]/40 -translate-x-1/2 h-full scale-[0.3]" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#0088ff]/40 -translate-y-1/2 w-full scale-[0.3]" />

          {/* Glowing Target Dot */}
          <div
            className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#00d2ff] transition-all duration-300 ${
              isHoveringClickable ? 'bg-[#00d2ff] scale-125' : 'bg-[#0088ff]'
            }`}
          />

          {/* Monospace coordinates ticker */}
          <span className="absolute -bottom-5 left-5 text-[9px] font-mono whitespace-nowrap tracking-wider text-[#00d2ff]/60 bg-black/50 px-1 py-0.5 rounded border border-white/5 backdrop-blur-[2px]">
            T_ {coords.x},{coords.y}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
