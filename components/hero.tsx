// components/hero.tsx  (server component — tanpa 'use client')
import Image from 'next/image';
import { Mail, Code2, Sparkles } from 'lucide-react';
import { FloatingLabel } from '@/components/floating-label';
import { HeroLanyard } from '@/components/hero-lanyard';
import { HeroTitle } from '@/components/hero-title';
import { DotField } from '@/components/lazy';

// Isi dengan path poster mobile kalau sudah dibuat, mis. '/assets/lanyard/poster-mobile.webp'.
// Jangan diisi sebelum file-nya ada (404 akan menurunkan skor Best Practices).
const MOBILE_POSTER: string | undefined = undefined;

export function Hero() {
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

      {/* Dot field background — pause/tidur sendiri, tidak perlu <InView> */}
      <div className="pointer-events-none absolute inset-0 z-0 h-full overflow-hidden">
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
      </div>

      {/* Lanyard 3D — desktop */}
      <HeroLanyard variant="desktop" />

      <section className="relative px-4 pt-8 sm:px-8 lg:flex min-h-screen lg:items-center lg:justify-center lg:top-20 lg:pt-0 lg:pb-0">
        {/* ===== Below lg ===== */}
        <h1 className="sr-only">Achmat Fajri — Fullstack Developer</h1>

        <div className="flex w-full flex-col lg:hidden motion-reduce:pt-24">
          <HeroLanyard variant="mobile" posterSrc={MOBILE_POSTER} />

          <div className="flex w-full flex-col items-center gap-6 pb-8">
            <div className="relative min-h-24 w-full -rotate-1 border border-border bg-transparent shadow-2xl backdrop-blur-xl">
              <span className="absolute -left-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
              <span className="absolute -right-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
              <span className="absolute -bottom-1.5 -left-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />
              <span className="absolute -bottom-1.5 -right-1.5 z-20 h-3 w-3 rounded-full border border-primary/40 bg-primary" />

              <div className="relative z-30 pointer-events-auto">
                <HeroTitle />
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
            <HeroTitle />
          </div>
        </div>

        {/* Carbon — Light mode, desktop (tanpa `priority`: tidak ikut di-preload di dark mode / mobile) */}
        <Image
          src="/assets/carbon-light.webp"
          alt="Achmat Fajri code profile"
          width={1840}
          height={1020}
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
