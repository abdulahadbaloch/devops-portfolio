'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/useMediaQuery';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(pointer: fine)');
    setIsFinePointer(media.matches);

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsFinePointer(e.matches);
    };
    media.addEventListener('change', handlePointerChange);
    return () => media.removeEventListener('change', handlePointerChange);
  }, []);

  useEffect(() => {
    if (!isFinePointer || prefersReduced) return;

    let animFrame: number;
    let targetX = -100;
    let targetY = -100;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('[role="button"]') ||
        target?.closest('.interactive') ||
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const followMouse = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (targetX - prev.x) * 0.18,
        y: prev.y + (targetY - prev.y) * 0.18
      }));
      animFrame = requestAnimationFrame(followMouse);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    animFrame = requestAnimationFrame(followMouse);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, [isFinePointer, prefersReduced, isVisible]);

  if (!isFinePointer || prefersReduced || !isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="custom-cursor-dot"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`
        }}
        aria-hidden="true"
      />
      <div
        className={`custom-cursor-ring ${isHovered ? 'cursor-hover' : ''}`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`
        }}
        aria-hidden="true"
      />
    </>
  );
}
