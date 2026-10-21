"use client";
import dynamic from "next/dynamic";
import { useMediaQuery } from "@/hooks/use-media-query";
import GradientText from "./react-bits/GradientText";
import TextType from "./react-bits/TextType";
import {
  Rocket01Icon,
  UserIcon,
  Briefcase01Icon,
  BookOpen01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";
import BranchedMenu from "./react-bits/BranchedMenu";
import { Button } from "./ui/button";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { useEffect, useRef } from "react";

const MagicBento = dynamic(() => import("./react-bits/MagicBento"));

interface AboutInteractiveProps {
  selected: number;
  onSelect: (index: number) => void;
  visual: React.ReactNode;
}

const cardData = [
  {
    title: "Understand First",
    label: "01 — Research",
    description: "",
  },
  {
    title: "Talk It Through",
    label: "02 — Communication",
    description: "",
  },
  {
    title: "Make a Plan",
    label: "03 — Planning",
    description: "",
  },
  {
    title: "Build It",
    label: "04 — Development",
    description: "",
  },
  {
    title: "Keep Improving",
    label: "05 — Iteration",
    description: "",
  },
  {
    title: "Make It Useful",
    label: "06 — Delivery",
    description: "",
  },
];

const aboutSections = [
    {
        label: "Introduction",
        content: (
          <div>
            <div className="hidden md:flex w-fit items-center gap-2 rounded-2xl border border-border bg-muted/80 px-4 py-2 shadow-sm backdrop-blur-xl">
              <p className="text-xs md:text-sm font-semibold leading-tight text-foreground">
                Available for Work and Projects
              </p>

              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </span>
            </div>

            <div className="flex flex-col items-start gap-4">
                <p className="mt-8 mb-0 pl-1 text-lg font-medium tracking-[0.15em] text-muted-foreground sm:text-2xl sm:tracking-[0.2em]">
                  Hi, I'm
                </p>

                
<h2 className="m-0">
  <GradientText
    colors={["#7C3AED", "#C026D3", "#8B5CF6"]}
    animationSpeed={8}
    showBorder={false}
    className="text-4xl font-bold leading-[0.85] tracking-tight sm:text-5xl md:text-7xl lg:text-7xl 2xl:text-8xl"
  >
    Achmat Fajri
  </GradientText>
</h2>


                <div className="-mt-1 space-y-4">
                  <p className="m-0 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
                    I'm a Fullstack Web Developer who enjoys turning ideas into
                    clean, interactive, and purposeful web experiences.
                  </p>


                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <FaLinkedinIn className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </a>

                  <a
                    href="https://instagram.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <FaInstagram className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </a>

                  <a
                    href="https://github.com/username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <FaGithub className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    className="rounded-full px-4 md:px-6 text-xs md:text-lg"
                    variant="outline"
                  >
                    View Work
                  </Button>

                  <Button
                    variant="outline"
                    className="rounded-full border-primary/30 bg-primary px-4 md:px-6 text-xs text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground md:text-lg"
                  >
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
    },
  {
    label: "Background",
    content: (
  <div className="w-full">
    <div className="mb-4 md:mb-6">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#A855F7]">
        My Background
      </p>

      <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-4xl">
        Where it all started.
      </h2>
    </div>

    <div className="max-w-xl text-xs md:text-lg">
      <TextType
        text={[
          "My journey in IT started back in vocational high school, majoring in Computer Networking, followed by a Bachelor's degree in Informatics Engineering at Universitas Sebelas Maret, Surakarta. Throughout college, I worked on a variety of IT projects and completed an internship as a Fullstack Web Developer through the MBKM program in Malang. Before graduating, I began working professionally as a Frontend Developer in Jogja, then took on the same role at a hospital in Pasuruan. After completing a fullstack bootcamp, I joined a Pertamina subsidiary as a Fullstack Web Developer, where I still work today."
        ]}
        typingSpeed={15}
        pauseDuration={5000}
        showCursor
        cursorCharacter="▎"
        cursorBlinkDuration={0.5}
        loop={false}
      />
    </div>
  </div>
)
  },
  {
  label: "Approach",
  content: (
    <div className="w-full">
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#A855F7]">
          My Approach
        </p>

       <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-4xl">
  How I turn ideas into action.
</h2>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
  I usually take a step back before jumping in — understand the problem,
  explore the possibilities, discuss them with the team, and then build.
</p>
      </div>
<div className="w-full">
        <MagicBento
          cards={cardData}
          textAutoHide={false}
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt={false}
          enableMagnetism={false}
          clickEffect
          spotlightRadius={350}
          particleCount={4}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
      </div>
      
    </div>
  )
},
 {
  label: "Learning",
  content: (
    <div className="flex w-full">
      <div className="w-full">
        <div className="mb-4 md:mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#A855F7]">
            My Learning
          </p>

          <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-4xl">
            Always learning, always evolving.
          </h2>

          <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm">
  I'm constantly exploring new technologies while strengthening the
  fundamentals behind the tools I use every day.
</p>
        </div>

        <div className="max-w-2xl">
          <p className="text-xs leading-relaxed md:leading-8 text-muted-foreground md:text-lg">
            Right now I'm sharpening my skills across the JavaScript ecosystem
            — React, Vue, Next.js, Node.js, Express.js, and a few CSS
            frameworks.
          </p>

          <p className="mt-4 text-xs leading-relaxed md:leading-8 text-muted-foreground md:text-lg">
            Alongside that, I've started learning Python, driven by curiosity
            about data analysis and how AI is built. Overall, I'm pushing to
            keep up with how quickly the technology landscape evolves.
          </p>
        </div>
      </div>
    </div>
  ),
},
  {
    label: "Looking For",
    content: (
      <div className="w-full h-full flex">
         <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#A855F7]">
          What I'm Looking For
        </p>

        <h2 className="text-xl font-semibold tracking-tight text-foreground md:text-4xl">
          Looking for the next thing to build.
        </h2>

<p className="mt-5 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-lg">
  Right now, I'm most interested in{" "}
  <span className="font-semibold text-primary">
    Fullstack Web Developer
  </span>{" "}
  roles within the{" "}
  <span className="font-semibold text-foreground">
    JavaScript ecosystem
  </span>
  , though I'm also open to{" "}
  <span className="font-semibold text-primary">
    Frontend
  </span>{" "}
  or{" "}
  <span className="font-semibold text-primary">
    Backend
  </span>{" "}
  positions.
</p>

<p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-lg">
  As I'm exploring{" "}
  <span className="font-semibold text-foreground">
    Python and data analysis
  </span>
  , I'm also open to opportunities in that direction.
</p>

        <p className="mt-4 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-lg">
          As I'm exploring{" "}
          <span className="font-semibold text-foreground">
            Python and data analysis
          </span>
          , I'm also open to opportunities in that direction.
        </p>
      </div>
      </div>
    )
  },
];

const ABOUT_SECTION_IDS = [
  "about-introduction",
  "about-background",
  "about-approach",
  "about-learning",
  "about-looking-for",
] as const;

const ABOUT_HASH_INDEX: Record<string, number> = {
  "#about-introduction": 0,
  "#about-background": 1,
  "#about-approach": 2,
  "#about-learning": 3,
  "#about-looking-for": 4,
};


export default function AboutInteractive({
  selected,
  onSelect,
  visual,
}: AboutInteractiveProps) {
  const isMd = useMediaQuery("(min-width: 768px)");


  const hashScrollTargetRef = useRef<string | null>(null);

useEffect(() => {
  const syncAboutFromHash = () => {
    const index = ABOUT_HASH_INDEX[window.location.hash];

    if (index !== undefined) {
      hashScrollTargetRef.current = ABOUT_SECTION_IDS[index];
      onSelect(index);
    }
  };

  // Mendukung URL langsung seperti /#about-background.
  syncAboutFromHash();
  window.addEventListener("hashchange", syncAboutFromHash);

  return () => {
    window.removeEventListener("hashchange", syncAboutFromHash);
  };
}, [onSelect]);

useEffect(() => {
  const targetId = ABOUT_SECTION_IDS[selected];

  // Scroll otomatis hanya untuk navigasi melalui URL/hash,
  // bukan ketika pengguna sekadar mengganti tab About.
  if (
    !targetId ||
    hashScrollTargetRef.current !== targetId ||
    window.location.hash !== `#${targetId}`
  ) {
    return;
  }

  hashScrollTargetRef.current = null;

  const frame = window.requestAnimationFrame(() => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });

  return () => window.cancelAnimationFrame(frame);
}, [selected]);

const selectAboutSection = (index: number) => {
  onSelect(index);

  const nextHash = `#${ABOUT_SECTION_IDS[index]}`;

  // Sinkronkan hash ketika tab/BranchedMenu dipilih secara manual,
  // agar memilih submenu navbar yang sama tetap konsisten.
  if (window.location.hash !== nextHash) {
    window.history.replaceState(window.history.state, "", nextHash);
  }
};


  return (
    <div className="flex w-full flex-col gap-6 md:min-h-[500px] md:flex-row md:gap-2">
      {/* Menu desktop: wrapper selalu ada agar layout stabil, menu hanya di-mount di md ke atas */}
      <div className="hidden w-1/4 min-w-0 shrink-0 md:block">
        {isMd && (
          <BranchedMenu
            items={[
              {
                label: "Getting Started",
                children: [
                  { value: "introduction", label: "Introduction", icon: UserIcon },
                  { value: "background", label: "Background", icon: Briefcase01Icon },
                  { value: "approach", label: "Approach", icon: Rocket01Icon },
                  { value: "learning", label: "Learning", icon: BookOpen01Icon },
                  { value: "looking-for", label: "Looking For", icon: Search01Icon },
                ],
              },
            ]}
            defaultOpen={0}
            defaultActive="introduction"
            onToggle={() => {}}
            onSelect={(value: string) => {
              const indexByValue: Record<string, number> = {
                introduction: 0,
                background: 1,
                approach: 2,
                learning: 3,
                "looking-for": 4,
              };
              if (indexByValue[value] !== undefined) if (indexByValue[value] !== undefined) {
  selectAboutSection(indexByValue[value]);
};
            }}
            color="hsl(var(--foreground))"
            accentColor="#A855F7"
            lineColor="hsl(var(--border))"
            width={280}
            rowHeight={48}
            indent={38}
            trunk={20}
            radius={12}
            lineWidth={1.5}
            fontSize={16}
            drawDuration={400}
            foldDuration={300}
          />
        )}
      </div>

      {/* Tab pill: hanya mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 md:hidden">
        {aboutSections.map((s, i) => (
          <button
            key={s.label}
            onClick={() => selectAboutSection(i)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs transition-colors ${
  selected === i
    ? "border-primary bg-primary text-primary-foreground"
    : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Konten: SATU kali untuk semua ukuran layar */}
      <div
  id={ABOUT_SECTION_IDS[selected]}
  className="min-w-0 scroll-mt-28 text-base md:flex md:w-3/4 md:pl-8 md:text-xl"
>
  {aboutSections[selected].content}
</div>


      {/* Visual mobile (di desktop prop ini null dari AboutSection) */}
      {visual && <div className="md:hidden">{visual}</div>}
    </div>
  );
}