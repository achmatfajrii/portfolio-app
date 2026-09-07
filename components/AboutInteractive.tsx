"use client";

import { useState } from "react";
import OptionWheel from "./react-bits/OptionWheel";
import GradientText from './react-bits/GradientText';
import TextType from './react-bits/TextType';

import { Button } from "./ui/button";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import MagicBento, { BentoCardProps } from "./react-bits/MagicBento";

interface AboutInteractiveProps {
  selected: number;
  onSelect: (index: number) => void;
  visual: React.ReactNode;
}

const cardData: BentoCardProps[] = [
  {
    color: "#120F17",
    title: "Understand First",
    description:
      "",
    label: "01 — Research",
  },
  {
    color: "#120F17",
    title: "Talk It Through",
    description:
      "",
    label: "02 — Collaborate",
  },
  {
    color: "#120F17",
    title: "Make a Plan",
    description:
      "",
    label: "03 — Prepare",
  },
  {
    color: "#120F17",
    title: "Build It",
    description:
      "",
    label: "04 — Build",
  },
  {
    color: "#120F17",
    title: "Keep Improving",
    description:
      "",
    label: "05 — Iterate",
  },
  {
    color: "#120F17",
    title: "Make It Useful",
    description:
      "",
    label: "06 — Deliver",
  },
];

const aboutSections = [
    {
        label: "Introduction",
        content: (
            <div>
              <div className="hidden md:block flex w-fit items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-4 py-2 shadow-xl backdrop-blur-xl">
                <p className="text-xs md:text-sm font-semibold leading-tight">
                  Available for Work and Projects
                </p>

  <span className="relative flex h-2.5 w-2.5">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
  </span>
</div>
               <div className="space-y-1">
                <p className="pl-1 text-lg font-medium tracking-[0.15em] text-white/50 md:mt-8 sm:text-2xl sm:tracking-[0.2em]">
    Hi, I'm
</p>

                <GradientText
    colors={["#5227FF", "#FF9FFC", "#B497CF"]}
    animationSpeed={8}
    showBorder={false}
    className="text-4xl font-bold leading-[0.95] tracking-tight sm:text-5xl md:text-7xl lg:text-8xl"
>
    Achmat Fajri &nbsp;
</GradientText>

                <div className="space-y-4">
                    <p className="max-w-2xl text-xs text-base leading-relaxed text-white/60 md:text-lg">
                        I'm a Fullstack Web Developer who enjoys turning ideas into
                    clean, interactive, and purposeful web experiences.
                    </p>

                    <div className="flex items-center gap-3">
                        <a
                            href="https://linkedin.com/in/username"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        >
                            <FaLinkedinIn className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </a>

                        <a
                            href="https://instagram.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                            className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
                        >
                            <FaInstagram className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
                        </a>

                        <a
                            href="https://github.com/username"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:text-white"
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
                        className="rounded-full text-xs md:text-lg border-white/20 bg-[#A855F7] px-4 md:px-6 text-white hover:bg-[#A855F7]/80 hover:text-white"
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

      <h2 className="text-xl font-semibold tracking-tight text-white md:text-4xl">
        Where it all started.
      </h2>
    </div>

    <div className="max-w-xl text-xs md:text-lg">
      <TextType
        text={[
          "My journey in IT started back in vocational high school, majoring in Computer Networking, followed by a Bachelor's degree in Informatics Engineering at Universitas Sebelas Maret, Surakarta. Throughout college, I worked on a variety of IT projects and completed an internship as a Fullstack Web Developer through the MBKM program in Malang. Before graduating, I began working professionally as a Frontend Developer in Jogja, then took on the same role at a hospital in Pasuruan. After completing a fullstack bootcamp, I joined a Pertamina subsidiary as a Fullstack Web Developer, where I still work today."
        ]}
        typingSpeed={5}
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

       <h2 className="text-xl font-semibold tracking-tight text-white md:text-4xl">
  How I turn ideas into action.
</h2>

        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
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
          particleCount={8}
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
    <div className="flex w-full items-center">
      <div className="w-full">
        <div className="mb-4 md:mb-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-[#A855F7]">
            My Learning
          </p>

          <h2 className="text-xl font-semibold tracking-tight text-white md:text-4xl">
            Always learning, always evolving.
          </h2>

          <p className="mt-3 max-w-xl text-xs md:text-sm leading-relaxed text-white/50">
            I'm constantly exploring new technologies while strengthening the
            fundamentals behind the tools I use every day.
          </p>
        </div>

        <div className="max-w-2xl">
          <p className="text-xs leading-relaxed md:leading-8 text-white/60 md:text-lg">
            Right now I'm sharpening my skills across the JavaScript ecosystem
            — React, Vue, Next.js, Node.js, Express.js, and a few CSS
            frameworks.
          </p>

          <p className="mt-4 text-xs leading-relaxed md:leading-8 text-white/60 md:text-lg">
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
      <div className="w-full h-full flex items-center">
         <div>
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-[#A855F7]">
          What I'm Looking For
        </p>

        <h2 className="text-xl font-semibold tracking-tight text-white md:text-4xl">
          Looking for the next thing to build.
        </h2>

        <p className="mt-5 max-w-xl text-xs leading-relaxed text-white/50 md:text-lg">
          Right now, I'm most interested in{" "}
          <span className="font-semibold text-[#C084FC]">
            Fullstack Web Developer
          </span>{" "}
          roles within the{" "}
          <span className="font-semibold text-white">
            JavaScript ecosystem
          </span>
          , though I'm also open to{" "}
          <span className="font-semibold text-[#C084FC]">
            Frontend
          </span>{" "}
          or{" "}
          <span className="font-semibold text-[#C084FC]">
            Backend
          </span>{" "}
          positions.
        </p>

        <p className="mt-4 max-w-xl text-xs leading-relaxed text-white/50 md:text-lg">
          As I'm exploring{" "}
          <span className="font-semibold text-white">
            Python and data analysis
          </span>
          , I'm also open to opportunities in that direction.
        </p>
      </div>
      </div>
    )
  },
];

export default function AboutInteractive({
  selected,
  onSelect,
  visual,
}: AboutInteractiveProps) {
  return (
    <div className="w-full">
      {/* Desktop/tablet: layout lama, tidak berubah */}
      <div className="hidden md:flex min-h-[500px] w-full flex-row gap-2">
        <div className="w-1/4 min-w-0 shrink-0">
          <OptionWheel
            className="m-0 w-full p-0"
            items={aboutSections.map((s) => s.label)}
            defaultSelected={selected}
            textColor="#a6a6a6"
            activeColor="#ffffff"
            side="left"
            fontSize={1.4}
            spacing={2}
            curve={2}
            tilt={10}
            blur={2}
            fade={0.25}
            smoothing={150}
            inset={80}
            loop={true}
            draggable={false}
            onChange={onSelect}
          />
        </div>
        <div className="flex w-3/4 min-w-0 pl-8 text-xl">
          {aboutSections[selected].content}
        </div>
      </div>

      {/* Mobile: tab pill di atas, deskripsi, lalu visual */}
      <div className="md:hidden space-y-6">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {aboutSections.map((s, i) => (
            <button
              key={s.label}
              onClick={() => onSelect(i)}
              className={`text-xs shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                selected === i
                  ? "border-white bg-white text-black"
                  : "border-white/20 text-white/50"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="text-base">{aboutSections[selected].content}</div>

        <div>{visual}</div>
      </div>
    </div>
  );
}