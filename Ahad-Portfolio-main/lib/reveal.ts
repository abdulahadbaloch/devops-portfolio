import type { CSSProperties } from 'react';

/** Stagger delay for an element marked with data-reveal. */
export function revealDelay(index: number, stepMs = 80): CSSProperties {
  return { ['--reveal-delay' as string]: `${Math.min(index, 10) * stepMs}ms` } as CSSProperties;
}
