"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { journeyData } from "./journeyData";

interface CareerJourneyProps {
  compact?: boolean;
}

export default function CareerJourney({
  compact = false,
}: CareerJourneyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const activeJourney = journeyData[activeIndex];

  const handleJourneyChange = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section
  className={`
    w-full
    ${compact ? "px-0 py-2" : "px-5 py-20 md:px-6"}
  `}
>
      {/* =========================
          HEADING
      ========================== */}

      {!compact && (
  <div className="mb-14 text-center md:mb-16">
    <p className="mb-3 text-xs uppercase tracking-[0.3em] text-neutral-400 md:text-sm">
      My Journey
    </p>

    <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
      The path that brought me here.
    </h2>
  </div>
)}

      <div className="mx-auto w-full max-w-5xl">
        {/* =====================================================
            DESKTOP TIMELINE
        ====================================================== */}

        <div className="hidden md:block">
          <div className="relative flex items-center">
            {journeyData.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div
                  key={item.year}
                  className="flex flex-1 items-center"
                >
                  {/* NODE */}
                  <button
                    type="button"
                    onClick={() => handleJourneyChange(index)}
                    className="
  group relative flex flex-col items-center
  rounded-full outline-none
  focus-visible:ring-2
  focus-visible:ring-[#5227FF]/50
  focus-visible:ring-offset-2
  focus-visible:ring-offset-[#120F17]
"
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                      }}
                      whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`
  relative flex
  ${compact ? "h-8 w-8" : "h-10 w-10"}
  items-center justify-center
                        rounded-full border transition-colors duration-300
                        ${
                          isActive
                            ? "border-[#5227FF] bg-[#5227FF]/20"
                            : isPast
                              ? "border-[#5227FF] bg-[#5227FF]"
                              : "border-neutral-700 bg-[#120F17]"
                        }
                      `}
                    >
                      {/* Active glow */}
                      {isActive && (
  <>
    <motion.div
      layoutId="journey-glow"
      className="absolute inset-[-7px] rounded-full border border-[#5227FF]/20"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25,
      }}
    />

    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: [0, 0.35, 0], scale: [0.7, 1.5, 1.8] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeOut",
      }}
      className="absolute inset-0 rounded-full bg-[#5227FF]/20"
    />
  </>
)}

                      {/* Dot */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.2 : 1,
                        }}
                        className={`
                         ${compact ? "h-2.5 w-2.5" : "h-3 w-3"} rounded-full
                          ${
                            isActive
                              ? "bg-[#5227FF]"
                              : isPast
                                ? "bg-white"
                                : "bg-neutral-600"
                          }
                        `}
                      />
                    </motion.div>

                    {/* Year */}
                    <span
                      className={`
                       absolute whitespace-nowrap
${compact ? "top-10 text-xs" : "top-14 text-sm"} whitespace-nowrap text-lg
                        transition-all duration-300
                        ${
                          isActive
                            ? "font-semibold text-white"
                            : "text-neutral-500 group-hover:text-neutral-300"
                        }
                      `}
                    >
                      {item.year}
                    </span>
                  </button>

                  {/* Connector */}
                  {index < journeyData.length - 1 && (
                    <div className="mx-3 h-[2px] flex-1 overflow-hidden rounded-full bg-neutral-800">
                      <motion.div
                        initial={false}
                        animate={{
                          width: index < activeIndex ? "100%" : "0%",
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="h-full bg-gradient-to-r from-[#5227FF]/70 to-[#A855F7]"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            MOBILE TIMELINE
        ====================================================== */}

        <div className="md:hidden">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-neutral-800" />

            {journeyData.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <button
                  key={item.year}
                  type="button"
                  onClick={() => handleJourneyChange(index)}
                  className="group relative flex w-full items-start text-left outline-none"
                >
                  {/* Node */}
                  <div className="relative z-10 mr-5 flex w-10 shrink-0 justify-center">
                    <motion.div
                      animate={{
                        scale: isActive ? 1.15 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                     className={`
  relative flex
  ${compact ? "h-8 w-8" : "h-10 w-10"}
  items-center justify-center
                        rounded-full border
                        ${
                          isActive
                            ? "border-[#5227FF] bg-[#5227FF]/20"
                            : isPast
                              ? "border-[#5227FF] bg-[#5227FF]"
                              : "border-neutral-700 bg-[#120F17]"
                        }
                      `}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobile-journey-glow"
                          className="absolute inset-[-5px] rounded-full border border-[#5227FF]/20"
                        />
                      )}

                      <div
                        className={`
                          h-3 w-3 rounded-full
                          ${
                            isActive
                              ? "bg-[#5227FF]"
                              : isPast
                                ? "bg-white"
                                : "bg-neutral-600"
                          }
                        `}
                      />
                    </motion.div>
                  </div>

                  {/* Journey summary */}
                  <div
                    className={`
                      mb-4 flex-1 rounded-2xl border p-4
                      transition-all duration-300
                      ${
                        isActive
                          ? "border-[#5227FF]/40 bg-[#5227FF]/5"
                          : "border-white/5 bg-white/[0.02] group-hover:border-white/10"
                      }
                    `}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p
                          className={`
                            text-xs font-medium uppercase tracking-[0.2em]
                            ${
                              isActive
                                ? "text-[#5227FF]"
                                : "text-neutral-500"
                            }
                          `}
                        >
                          {item.year}
                        </p>

                        <h3 className="mt-1 text-sm font-semibold text-white">
                          {item.title}
                        </h3>
                      </div>

                      <span
                        className={`
                          text-base transition-transform duration-300
                          ${
                            isActive
                              ? "translate-x-0 text-[#5227FF]"
                              : "-translate-x-1 text-neutral-600"
                          }
                        `}
                      >
                        →
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-neutral-500">
                      {item.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            ACTIVE JOURNEY DETAIL
        ====================================================== */}

        <div
  className={`
    relative
    ${compact ? "mt-6 min-h-0" : "mt-8 min-h-[360px] md:mt-24"}
  `}
>
          <AnimatePresence
            mode="wait"
            custom={direction}
          >
            <motion.div
              key={activeJourney.year}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 60 : -60,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -60 : 60,
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className={`
  mx-auto
  ${compact ? "max-w-xl" : "max-w-3xl"}
`}
            >
              {/* Year */}
            <div className="mb-3 flex items-center justify-center gap-2">
  <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#5227FF] md:text-sm">
    {activeJourney.year}
  </p>

  {activeJourney.current && (
  <span className="flex items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/5 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-green-400">
    <span className="relative flex h-1.5 w-1.5">
      <motion.span
        animate={{
          scale: [1, 1.8, 1],
          opacity: [1, 0.4, 1],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full bg-green-400"
      />

      <span className="relative h-1.5 w-1.5 rounded-full bg-green-400" />
    </span>

    Current
  </span>
)}
</div>

              {/* Title */}
             <h3
  className={`
    text-center font-bold tracking-tight text-white text-base md:text-4xl"}
  `}
>
                {activeJourney.title}
              </h3>

              {/* Role */}
              <p
  className={`
    mt-2 text-center text-neutral-400 text-xs
  `}
>
                {activeJourney.role}
              </p>

              {/* Company */}
              <p className="mt-1 text-center text-xs text-neutral-500">
                {activeJourney.company}
              </p>

              {/* Description */}
             <div
  className={`
    relative overflow-hidden rounded-3xl
    border border-white/10
    bg-white/[0.03]
    backdrop-blur-xl
    text-xs
    ${compact ? "mt-5 p-4" : "mt-8 p-5 md:mt-10 md:p-8"}
  `}
>
    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(82,39,255,0.08),transparent_55%)]" />
               <p
  className={`
    text-center leading-6 text-neutral-300
    ${compact ? "text-xs" : "text-sm md:text-base"}
  `}
>
                  {activeJourney.description}
                </p>

                {/* Technologies */}
                <div
  className={`
    flex flex-wrap justify-center gap-2
    ${compact ? "mt-4" : "mt-6 md:mt-7"}
  `}
>
                  {activeJourney.technologies.map((technology) => (
                    <span
  key={technology}
  className="
    rounded-full
    border border-white/10
    bg-white/[0.04]
    px-3 py-1.5
    text-xs text-neutral-400
    transition-all duration-300
    hover:border-[#5227FF]/40
    hover:bg-[#5227FF]/10
    hover:text-white
  "
>
  {technology}
</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}