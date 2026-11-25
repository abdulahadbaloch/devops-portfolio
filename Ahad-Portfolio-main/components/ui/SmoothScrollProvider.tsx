'use client';

import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useMediaQuery';

interface LenisContextType {
  lenis: Lenis | null;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextType>({
  lenis: null,
  stop: () => {},
  start: () => {}
});

export const useLenis = () => useContext(LenisContext);

export default function SmoothScrollProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined' || prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0
    });

    setLenisInstance(lenis);

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      setLenisInstance(null);
    };
  }, [prefersReduced]);

  const stop = () => {
    lenisInstance?.stop();
  };

  const start = () => {
    lenisInstance?.start();
  };

  return (
    <LenisContext.Provider value={{ lenis: lenisInstance, stop, start }}>
      {children}
    </LenisContext.Provider>
  );
}
