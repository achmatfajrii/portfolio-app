// components/hero-lanyard.tsx
'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Lanyard } from '@/components/lazy';
import { useIdleReady } from '@/hooks/use-idle-ready';
import { useMediaQuery } from '@/hooks/use-media-query';

interface HeroLanyardProps {
  variant: 'desktop' | 'mobile';
  /**
   * Gambar poster kartu (webp, ±20–40 KB) untuk mobile. Jadi elemen LCP yang
   * murah selama 3D belum dimuat. Kosongkan kalau belum punya.
   */
  posterSrc?: string;
}

export function HeroLanyard({ variant, posterSrc }: HeroLanyardProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  // mobile: beri jeda lebih lama setelah load supaya main thread bebas untuk render & interaksi awal
  const idle = useIdleReady({ delay: variant === 'desktop' ? 0 : 2500 });
  const [ready, setReady] = useState(false);

  const viewportMatches = variant === 'desktop' ? isDesktop : !isDesktop;
  const show3D = idle && !reduceMotion && viewportMatches;

  if (variant === 'desktop') {
    if (!show3D) return null;
    return (
      <div className="pointer-events-none absolute -top-16 left-0 z-[998] h-full w-full">
        <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} lanyardWidth={1} />
      </div>
    );
  }

  return (
    // tinggi tetap sejak SSR → tidak ada layout shift saat 3D muncul
    <div className="pointer-events-none relative left-1/2 right-1/2 -mx-[50vw] -mt-24 h-[calc(100vh+6rem)] h-[calc(100dvh+6rem)] w-screen overflow-hidden motion-reduce:hidden">
      {posterSrc && (
        <Image
          src={posterSrc}
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className={`object-cover object-top transition-opacity duration-300 ${ready ? 'opacity-0' : 'opacity-100'}`}
        />
      )}
      {show3D && (
        <div className="absolute inset-0">
          <Lanyard
            position={[0, 0, 30]}
            lookAt={[-8, 0, 0]}
            gravity={[0, -40, 0]}
            fov={20}
            lanyardWidth={1}
            onReady={() => setReady(true)}
          />
        </div>
      )}
    </div>
  );
}
