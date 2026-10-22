// components/hero-title.tsx
'use client';
import { useState } from 'react';
import { WarpText } from '@/components/lazy';
import { useIdleReady } from '@/hooks/use-idle-ready';
import { useMediaQuery } from '@/hooks/use-media-query';

const FONT_SIZE = 88;

// props identik dengan versi sebelumnya (tampilan WarpText tidak berubah)
const warpProps = {
  text: 'MY PORTFOLIO',
  color: 'hsl(var(--foreground))',
  warpStrength: 0.08,
  warpScale: 1.7,
  speed: 0.55,
  pointerInfluence: 0.42,
  pointerStrength: 0.38,
  refraction: 0.018,
  ripple: true,
  fontWeight: 800,
  fontFamily: 'inherit',
  letterSpacing: -0.06, // angka = px (bukan em), sama seperti sebelumnya
  lineHeight: 0,
} as const;

export function HeroTitle() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const idle = useIdleReady();
  const mountWarp = idle && isDesktop && !reduceMotion;

  return (
    <div className="relative min-h-[220px] w-full">
      {/* Teks HTML dirender di server → FCP/LCP tidak menunggu WebGL */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center overflow-hidden text-foreground"
      >
        <span
          className="select-none whitespace-nowrap"
          style={{ fontSize: `min(${FONT_SIZE}px, 7.3vw)`, fontWeight: 800, letterSpacing: '-0.06px', lineHeight: 1 }}
        >
          MY PORTFOLIO
        </span>
      </div>
    </div>
  );
}
