"use client";

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiPython,
  SiPostgresql,
  SiMysql,
  SiPrisma,
  SiGit,
} from "react-icons/si";

import LogoLoop from "./react-bits/LogoLoop";

const learningLogosLeft = [
  { node: <SiReact />, title: "React" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
];

const learningLogosMiddle = [
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiExpress />, title: "Express.js" },
  { node: <SiVuedotjs />, title: "Vue.js" },
  { node: <SiPrisma />, title: "Prisma" },
];

const learningLogosRight = [
  { node: <SiPython />, title: "Python" },
  { node: <SiPostgresql />, title: "PostgreSQL" },
  { node: <SiMysql />, title: "MySQL" },
  { node: <SiGit />, title: "Git" },
];

const logoLoopProps = {
  logoHeight: 50,
  gap: 22,
  pauseOnHover: false,
  scaleOnHover: true,

  // Matikan fade bawaan LogoLoop.
  // Kita menggunakan CSS mask agar fade benar-benar
  // berdasarkan opacity.
  fadeOut: false,
};

const fadeMaskStyle: React.CSSProperties = {
  maskImage:
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 7%, black 20%, black 80%, rgba(0,0,0,0.15) 93%, transparent 100%)",
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.15) 7%, black 20%, black 80%, rgba(0,0,0,0.15) 93%, transparent 100%)",
};

export default function LearningVisual() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden sm:h-[360px] md:h-[430px]">
      <div className="flex h-full items-center justify-around w-full md:justify-center gap-1">
        <div className="relative h-full w-[70px] overflow-hidden sm:w-[85px] md:w-[100px]" style={fadeMaskStyle}>
          <LogoLoop logos={learningLogosLeft} direction="up" speed={40} {...logoLoopProps} ariaLabel="Frontend technologies" />
        </div>
        <div className="relative h-full w-[70px] overflow-hidden sm:w-[85px] md:w-[100px]" style={fadeMaskStyle}>
          <LogoLoop logos={learningLogosMiddle} direction="down" speed={34} {...logoLoopProps} ariaLabel="Backend technologies" />
        </div>
        <div className="relative h-full w-[70px] overflow-hidden sm:w-[85px] md:w-[100px]" style={fadeMaskStyle}>
          <LogoLoop logos={learningLogosRight} direction="up" speed={44} {...logoLoopProps} ariaLabel="Tools and technologies" />
        </div>
      </div>
    </div>
  );
}