'use client'
import { useEffect, useState } from "react";
import { Menu, X, Github, Mail, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsSection } from "@/components/projects-section";
import { ThemeToggle } from "@/components/theme-toggle";
import Lanyard from "@/components/react-bits/Lanyard";
import DotField from "@/components/react-bits/DotField";
import ProfileCardWrapper from '@/components/react-bits/ProfileCardWrapper';
import { DataProjectCard } from "@/components/data-project-card";
import WarpText from '@/components/react-bits/WarpText';
import { FloatingLabel } from "@/components/floating-label";
import OptionWheelWrapper from '@/components/react-bits/OptionWheelWrapper';
import AboutInteractive from "@/components/AboutInteractive";
import BackgroundVisual from "@/components/BackgroundVisual";
import ApproachVisual from "@/components/ApproachVisual";
import LearningVisual from "@/components/LearningVisual";
import LookingForVisual from "@/components/LookingForVisual";
import { SkillsSection } from "@/components/SkillsSection";
import { DataSection } from "@/components/DataSection";
import ContactSection from "@/components/ContactSection";
import { Footer } from "@/components/Footer";


const dataProjects = [
  {
    title: "E-commerce Sales Analysis",
    description:
      "Analisis penjualan e-commerce setahun (data simulasi) untuk cari pendorong revenue & peluang retensi.",
    tech: ["SQL", "Python", "Pandas", "Matplotlib"],
    insights: [
      "Revenue Q4 melonjak tajam — musim belanja akhir tahun jadi pendorong utama",
      "Electronics dominasi 68% revenue — ada risiko konsentrasi kategori",
      "Repeat customer cuma 76% pelanggan tapi sumbang 91% revenue",
    ],
    repoHref: "https://github.com/achmatfajrii/ecommerce-sales-analysis",
  },
]

const skillGroups = [
  { label: "Frontend", skills: ["React", "Vue"] },
  { label: "Backend", skills: ["Node.js"] },
  { label: "Database", skills: ["SQL", "DBeaver"] },
  { label: "Tools", skills: ["Git", "Docker", "Canva"] },
];

// TODO Fase 3+: ganti tech/label per proyek sesuai stack asli tiap project

/**
 * fontSize WarpText itu prop JS (bukan className), jadi ngga bisa diatur
 * pakai sm:/lg:. Di bawah lg dia scaling MENERUS mengikuti lebar layar
 * (320px -> 640px), lalu "nahan" di ukuran itu sampai lg. Di lg ke atas
 * balik ke 88 kayak semula. Angka MIN_SIZE/MAX_SIZE ini estimasi awal,
 * kemungkinan perlu disesuaikan lagi pas kamu lihat langsung di device.
 */
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
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return fontSize;
}
 
function useIsDesktopViewport() {
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

export default function Home() {
  const [aboutSelected, setAboutSelected] = useState(0);
  const heroFontSize = useResponsiveHeroFontSize();
  const isDesktop = useIsDesktopViewport();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const visuals = [
  <ProfileCardWrapper key="profile" />,
  <BackgroundVisual key="background" />,
  <ApproachVisual key="approach" />,
  <LearningVisual key="learning" />,
  <LookingForVisual key="lookingfor" />,
];
  return (
    <main className="min-h-screen overflow-x-hidden">
      <div className="absolute left-1/2 bottom-8 z-30 hidden w-120 -translate-x-1/2 items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-8 py-2 shadow-xl backdrop-blur-xl lg:flex">
        <p className="text-sm font-semibold leading-tight">Presented by Achmat Fajri</p>
      </div>

      {/* Floating labels — desktop only, ngga diubah */}
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

      {/* Dot field background — tampil di semua ukuran layar, ngga diubah */}
      <div className="absolute left-0 top-0 -z-10 h-full w-full overflow-hidden">
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

        <div className="absolute bottom-16 flex w-full justify-center pb-4 md:hidden">
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-wide text-muted-foreground backdrop-blur-xl">
              Presented by Achmat Fajri
            </span>
          </div>
      </div>

      {/* Lanyard 3D — DESKTOP: overlay absolute penuh layar, menggantung
         di depan card, posisi & props TIDAK diubah dari punya kamu. */}
      {isDesktop && (
        <div className="pointer-events-none absolute -top-16 left-0 z-[998] h-full w-full">
          <Lanyard position={[0, 0, 30]} gravity={[0, -40, 0]} fov={20} lanyardWidth={1} />
        </div>
      )}

      {/* NAVBAR */}
      <nav className="fixed left-1/2 top-6 z-[999] w-11/12 max-w-sm -translate-x-1/2 rounded-full border border-white/10 bg-transparent shadow-[0_0_30px_rgba(168,85,247,0.08)] backdrop-blur md:w-1/2 md:max-w-none lg:top-8">
        <div className="flex h-12 items-center justify-between px-4">
          <span className="font-mono text-sm font-medium">AF/</span>

          <div className="hidden items-center gap-6 font-mono text-xs uppercase tracking-wide text-muted-foreground md:flex">
            <a href="#about" className="hover:text-foreground">About</a>
            <a href="#projects" className="hover:text-foreground">Projects</a>
            <a href="#skills" className="hover:text-foreground">Skills</a>
            <a id="data-projects" className="hover:text-foreground">Data</a>
            <a href="#contact" className="hover:text-foreground">Contact</a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button className="rounded-full" variant="outline" size="sm">Resume</Button>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Buka menu navigasi"
              aria-expanded={isMenuOpen}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 md:hidden"
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="flex flex-col gap-4 border-t border-white/10 px-6 py-4 font-mono text-xs uppercase tracking-wide text-muted-foreground md:hidden">
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="hover:text-foreground">About</a>
            <a href="#projects" onClick={() => setIsMenuOpen(false)} className="hover:text-foreground">Projects</a>
            <a href="#skills" onClick={() => setIsMenuOpen(false)} className="hover:text-foreground">Skills</a>
            <a id="data-projects" onClick={() => setIsMenuOpen(false)} className="hover:text-foreground">Data</a>
            <a href="#contact" onClick={() => setIsMenuOpen(false)} className="hover:text-foreground">Contact</a>
          </div>
        )}
      </nav>

  
      <section className="relative px-4 pt-8 sm:px-8 lg:flex min-h-screen lg:items-center lg:justify-center lg:top-20 lg:pt-0 lg:pb-0">

        {/* ===== Below lg ===== */}
        <div className="flex w-full flex-col lg:hidden">
         
          {isDesktop === false && (
             <>
            <div className="pointer-events-none relative left-1/2 right-1/2 -mx-[50vw] -mt-24 h-[calc(100vh+6rem)] h-[calc(100dvh+6rem)] w-screen overflow-hidden">
              <Lanyard position={[0, 0, 30]} lookAt={[-8, 0, 0]} gravity={[0, -40, 0]} fov={20} lanyardWidth={1} />
            </div>

          
            </>
          )}

          {/* Layar 2: judul + image + badge — muncul pas discroll ke bawah */}
          <div className="flex w-full flex-col items-center gap-6 pb-8">
           

            <div className="relative w-full -rotate-1 border border-white/20 bg-transparent shadow-2xl backdrop-blur-xl">
              <span className="absolute -left-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />
              <span className="absolute -right-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />
              <span className="absolute -bottom-1.5 -left-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />
              <span className="absolute -bottom-1.5 -right-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />

              <div className="relative z-30 pointer-events-auto">
                <WarpText
                  text="MY PORTFOLIO"
                  color="#f8f5ff"
                  warpStrength={0.08}
                  warpScale={1.7}
                  speed={0.55}
                  pointerInfluence={0.42}
                  pointerStrength={0.38}
                  refraction={0.018}
                  ripple
                  fontSize={heroFontSize}
                  fontWeight={800}
                  fontFamily="inherit"
                  letterSpacing={-0.06}
                  lineHeight={0}
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs backdrop-blur-xl">
                <Code2 className="h-4 w-4" /> 3+ Years · Fullstack Developer
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs backdrop-blur-xl">
                <Sparkles className="h-4 w-4" /> Open to Work
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs backdrop-blur-xl">
                <Mail className="h-4 w-4" /> achmatfajri@gmail.com
              </span>
            </div>

            <img
              src="/assets/carbon.png"
              alt="Achmat Fajri code profile"
              className="w-full max-w-lg -rotate-1 rounded-lg shadow-2xl sm:max-w-sm"
            />
          </div>
        </div>

        {/* ===== lg ke atas: layout desktop asli — posisi & ukuran TIDAK diubah ===== */}
        <div className="relative z-10 hidden w-full max-w-[74vw] -translate-x-[12vh] -translate-y-[8vh] -rotate-2 border border-white/20 bg-transparent px-6 shadow-2xl backdrop-blur-xl lg:block">
          <span className="absolute -left-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />
          <span className="absolute -right-1.5 -top-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />
          <span className="absolute -bottom-1.5 -left-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />
          <span className="absolute -bottom-1.5 -right-1.5 z-20 h-3 w-3 rounded-full border border-white/40 bg-[#A855F7]" />

          <div className="relative z-30 pointer-events-auto">
            <WarpText
              text="MY PORTFOLIO"
              color="#f8f5ff"
              warpStrength={0.08}
              warpScale={1.7}
              speed={0.55}
              pointerInfluence={0.42}
              pointerStrength={0.38}
              refraction={0.018}
              ripple
              fontSize={heroFontSize}
              fontWeight={800}
              style={{ height: "100%" }}
              fontFamily="inherit"
              letterSpacing={-0.06}
              lineHeight={0}
            />
          </div>
        </div>

        <img
          src="/assets/carbon.png"
          alt="Achmat Fajri code profile"
          className="pointer-events-none absolute top-[40vh] z-20 hidden max-w-none -translate-y-1/2 -rotate-2 lg:block lg:w-[44vw] lg:right-[-10vw]"
        />
      </section>

      {/* ...lanjutan file kamu (AboutInteractive, ProjectsSection, dst) ngga
         disertain di sini karena ngga ada di potongan yang kamu kirim —
         tetap sambung seperti punya kamu setelah </section> ini. */}

      {/* About */}
      <section id="about" className="bg-[#0E0C14] py-8 md:py-24">
  <div className="container grid gap-10 md:grid-cols-[2fr_1fr]">
    <div className="relative w-full min-w-0 flex flex-row items-center justify-center text-muted-foreground">
      <AboutInteractive
        selected={aboutSelected}
        onSelect={setAboutSelected}
        visual={visuals[aboutSelected]}
      />
    </div>

    {/* Kolom visual bawaan cuma tampil di md ke atas, karena di mobile AboutInteractive sudah merender visualnya sendiri */}
    <div className="hidden md:block space-y-4">
      {visuals[aboutSelected]}
    </div>
  </div>
</section>

       <ProjectsSection />

      {/* Skills */}
      <SkillsSection />

          {/* Data Projects */}


      <DataSection />


      {/* Contact */}
     <ContactSection />

    <Footer />
      {/* <footer className="container flex items-center justify-between border-t border-border py-6 text-xs text-muted-foreground">
        <span>&copy; 2026 Achmat Fajri</span>
        <div className="flex gap-4">
          <a href="https://github.com/achmatfajrii" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="h-4 w-4 hover:text-foreground" />
          </a>
          <a href="mailto:achmatfajri@gmail.com" aria-label="Email">
            <Mail className="h-4 w-4 hover:text-foreground" />
          </a>
        </div>
      </footer> */}
    </main>
  );
}
