'use client';
import { useEffect, useState } from 'react';
import { Mail, Code2, Sparkles } from 'lucide-react';
import { FloatingLabel } from '@/components/floating-label';
import { InView } from '@/components/in-view';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Lanyard, DotField, WarpText } from '@/components/lazy';
import { HeroTitleFallback } from './hero-title-fallback';
import Image from 'next/image';

function useResponsiveHeroFontSize() {
  const [fontSize, setFontSize] = useState(88);

  useEffect(() => {
    const MIN_VW = 320;
    const MAX_VW = 640;
    const MIN_SIZE = 24;
    const MAX_SIZE = 48;

    const update = () => {
      const vw = window.innerWidth;
      if (vw >= 1024) {
        setFontSize(88);
        return;
      }
      const clampedVw = Math.min(Math.max(vw, MIN_VW), MAX_VW);
      const ratio = (clampedVw - MIN_VW) / (MAX_VW - MIN_VW);
      setFontSize(Math.round(MIN_SIZE + ratio * (MAX_SIZE - MIN_SIZE)));
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return fontSize;
}

function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isDesktop;
}

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
  letterSpacing: -0.06,
  lineHeight: 0,
} as const;

export function Hero() {
  const heroFontSize = useResponsiveHeroFontSize();
  const isDesktop = useIsDesktopViewport();
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const show3DDesktop = isDesktop === true && !reduceMotion;
  const show3DMobile = isDesktop === false && !reduceMotion;

  return (
    <>
      <div className="absolute left-1/2 bottom-8 z-30 hidden w-120 -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-muted px-8 py-2 shadow-xl backdrop-blur-xl lg:flex">
        <p className="text-sm font-semibold leading-tight">Presented by Achmat Fajri</p>
      </div>

      {/* Floating labels — desktop only */}
      <FloatingLabel
        icon={Code2}
        title="3+ Years Experience"
        description="Fullstack Developer"
        className="absolute left-8 bottom-12 z-30 hidden lg:flex"
      />
      <FloatingLabel
        icon={Sparkles}
        title="Open to Work"
        description="Fullstack / Data Analyst"
        className="absolute right-8 top-[10%] z-30 hidden lg:flex"
        delay="1s"
      />
      <FloatingLabel
        icon={Mail}
        title="Contact Me"
        description="achmatfajri@gmail.com"
        className="absolute left-80 top-[24%] z-30 hidden lg:flex"
        delay="1s"
      />

      {/* Dot field background */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
        <InView>
          <DotField
            dotRadius={1}
            dotSpacing={20}
            bulgeStrength={67}
            glowRadius={160}
            sparkle={false}
            waveAmplitude={0}
            cursorRadius={500}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom="#A855F7"
            gradientTo="#A855F7"
            glowColor="#A855F7"
          />
        </InView>

        <div className="absolute bottom-16 flex w-full justify-center pb-4 md:hidden">
          <span className="rounded-full border border-white/20 bg-muted px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted-foreground backdrop-blur-xl">
            Presented by Achmat Fajri
          </span>
        </div>
      </div>

      {/* Lanyard 3D — desktop */}
      {show3DDesktop && (
        <div className="pointer-events-none absolute -top-16 left-0 z-[998] h-full w-full">
          <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} lanyardWidth={1} />
        </div>
      )}

      <section className="relative px-4 pt-8 sm:px-8 lg:flex min-h-screen lg:items-center lg:justify-center lg:top-20 lg:pt-0 lg:pb-0">
        {/* ===== Below lg ===== */}
        <div className={`flex w-full flex-col lg:hidden ${reduceMotion ? 'pt-24' : ''}`}>
          {show3DMobile && (
            <div className="pointer-events-none relative left-1/2 right-1/2 -mx-[50vw] -mt-24 h-[calc(100vh+6rem)] h-[calc(100dvh+6rem)] w-screen overflow-hidden">
              <Lanyard position={[0, 0, 30]} lookAt={[-8, 0, 0]} gravity={[0, -40, 0]} fov={20} lanyardWidth={1} />
            </div>
          )}

          <div className="flex w-full flex-col items-center gap-6 pb-8">
            <div className="relative min-h-24 w-full -rotate-1 border border-border bg-transparent shadow-2xl backdrop-blur-xl">
              <span className="absolute -left-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
              <span className="absolute -right-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
              <span className="absolute -bottom-1.5 -left-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
              <span className="absolute -bottom-1.5 -right-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />

            <div className="relative z-30 pointer-events-auto">
  {isDesktop === false && !reduceMotion
    ? <WarpText {...warpProps} fontSize={heroFontSize} />
    : <HeroTitleFallback fontSize={heroFontSize} />}
</div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-muted px-4 py-2 text-xs backdrop-blur-xl">
                <Code2 className="h-4 w-4" /> 3+ Years · Fullstack Developer
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-muted px-4 py-2 text-xs backdrop-blur-xl">
                <Sparkles className="h-4 w-4" /> Open to Work
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-muted px-4 py-2 text-xs backdrop-blur-xl">
                <Mail className="h-4 w-4" /> achmatfajri@gmail.com
              </span>
            </div>

        
             
            {/* Carbon — Light mode, mobile */}
            <Image
              src="/assets/carbon-light.webp"
              alt="Achmat Fajri code profile"
              width={1840}
              height={1020}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 384px"
              className="h-auto w-full max-w-lg -rotate-1 rounded-lg shadow-2xl sm:max-w-sm lg:hidden dark:hidden"
            />

            {/* Carbon — Dark mode, mobile */}
            <Image
              src="/assets/carbon-dark.webp"
              alt="Achmat Fajri code profile"
              width={1840}
              height={1020}
              loading="lazy"
              sizes="(max-width: 640px) 100vw, 384px"
              className="hidden h-auto w-full max-w-lg -rotate-1 rounded-lg shadow-2xl sm:max-w-sm lg:hidden dark:block"
            />

            
          </div>
        </div>

        {/* ===== lg ke atas: layout desktop ===== */}
        <div className="relative z-10 hidden w-full max-w-[74vw] -translate-x-[12vh] -translate-y-[8vh] -rotate-2 border border-white/20 bg-transparent px-6 shadow-2xl backdrop-blur-xl lg:block">
          <span className="absolute -left-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
          <span className="absolute -right-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
          <span className="absolute -bottom-1.5 -left-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
          <span className="absolute -bottom-1.5 -right-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />

          <div className="relative z-30 pointer-events-auto">
  {isDesktop === true && !reduceMotion
    ? <WarpText {...warpProps} fontSize={heroFontSize} style={{ height: '100%' }} />
    : <HeroTitleFallback fontSize={heroFontSize} />}
</div>
        </div>

        
        {/* Carbon — Light mode, desktop */}
        <Image
          src="/assets/carbon-light.webp"
          alt="Achmat Fajri code profile"
          width={1840}
          height={1020}
          priority
          sizes="44vw"
          className="pointer-events-none absolute top-[40vh] z-20 hidden h-auto max-w-none -translate-y-1/2 -rotate-2 lg:right-[-10vw] lg:block dark:lg:hidden lg:w-[44vw]"
        />

        {/* Carbon — Dark mode, desktop */}
        <Image
          src="/assets/carbon-dark.webp"
          alt="Achmat Fajri code profile"
          width={1840}
          height={1020}
          sizes="44vw"
          className="pointer-events-none absolute top-[40vh] z-20 hidden h-auto max-w-none -translate-y-1/2 -rotate-2 lg:right-[-10vw] lg:w-[44vw] dark:lg:block"
        />

      </section>
    </>
  );
}