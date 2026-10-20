
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
    if (index === activeIndex) return;

    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section
      className={`w-full ${
        compact ? "px-0 py-2" : "px-5 py-20 md:px-6"
      }`}
    >
      {!compact && (
        <div className="mb-14 text-center md:mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-muted-foreground md:text-sm">
            My Journey
          </p>

          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            The path that brought me here.
          </h2>
        </div>
      )}

      <div className="mx-auto w-full max-w-5xl">
        {/* Desktop timeline */}
        <div className="mb-10 hidden md:block">
          {/* Year labels */}
          <div
            className="grid items-end"
            style={{
              gridTemplateColumns: `repeat(${journeyData.length}, minmax(0, 1fr))`,
            }}
          >
            {journeyData.map((item, index) => {
              const previousItem = journeyData[index - 1];

              if (previousItem && previousItem.year === item.year) {
                return null;
              }

              const groupItems = journeyData.filter(
                (entry) => entry.year === item.year,
              );

              const groupStart = index + 1;
              const groupEnd = index + groupItems.length + 1;

              return (
                <div
                  key={`year-${item.year}`}
                  style={{
                    gridColumn: `${groupStart} / ${groupEnd}`,
                  }}
                  className="mb-5 text-center"
                >
                  <span className="text-sm font-semibold tracking-wide text-muted-foreground">
                    {item.year}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Timeline nodes and connecting line */}
          <div
            className="grid items-start"
            style={{
              gridTemplateColumns: `repeat(${journeyData.length}, minmax(0, 1fr))`,
            }}
          >
            {journeyData.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div
                  key={`${item.year}-${item.title}`}
                  className="relative flex min-w-0 flex-col items-center"
                >
                  {index < journeyData.length - 1 && (
                    <div className="absolute left-1/2 right-[-50%] top-5 h-[2px] overflow-hidden rounded-full bg-border">
                      <motion.div
                        initial={false}
                        animate={{
                          width: index < activeIndex ? "100%" : "0%",
                        }}
                        transition={{
                          duration: 0.5,
                          ease: "easeInOut",
                        }}
                        className="h-full bg-gradient-to-r from-primary/70 to-primary"
                      />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => handleJourneyChange(index)}
                    aria-pressed={isActive}
                    aria-label={`${item.year}: ${item.title}`}
                    title={item.title}
                    className="
                      group relative z-10 flex flex-col items-center
                      rounded-full outline-none
                      focus-visible:ring-2
                      focus-visible:ring-primary/50
                      focus-visible:ring-offset-2
                      focus-visible:ring-offset-background
                    "
                  >
                    <motion.div
                      animate={{ scale: isActive ? 1.15 : 1 }}
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
                        items-center justify-center rounded-full
                        border transition-colors duration-300
                        ${
                          isActive
                            ? "border-primary bg-primary/10"
                            : isPast
                              ? "border-primary bg-primary"
                              : "border-border bg-card"
                        }
                      `}
                    >
                      {isActive && (
                        <>
                          <motion.div
                            layoutId="journey-glow"
                            className="absolute inset-[-7px] rounded-full border border-primary/20"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />

                          <motion.div
                            animate={{
                              opacity: [0, 0.35, 0],
                              scale: [0.7, 1.5, 1.8],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                            className="absolute inset-0 rounded-full bg-primary/15"
                          />
                        </>
                      )}

                      <motion.div
                        animate={{ scale: isActive ? 1.2 : 1 }}
                        className={`
                          relative z-10
                          ${compact ? "h-2.5 w-2.5" : "h-3 w-3"}
                          rounded-full
                          ${
                            isActive
                              ? "bg-primary"
                              : isPast
                                ? "bg-primary-foreground"
                                : "bg-muted-foreground/50"
                          }
                        `}
                      />
                    </motion.div>

                    <span
                      className={`
                        mt-4 max-w-full px-1 text-center leading-tight
                        transition-colors duration-300
                        ${compact ? "text-[10px]" : "text-xs"}
                        ${
                          isActive
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground group-hover:text-foreground"
                        }
                      `}
                    >
                      {item.title}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile expandable timeline */}
        <div className="md:hidden">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute bottom-5 left-[19px] top-5 w-[2px] bg-border" />

            {journeyData.map((item, index) => {
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;

              return (
                <div
                  key={`${item.year}-${item.title}`}
                  className="relative"
                >
                  <div className="relative flex items-start">
                    {/* Timeline node */}
                    <div className="relative z-10 mr-5 flex w-10 shrink-0 justify-center">
                      <motion.div
                        animate={{ scale: isActive ? 1.08 : 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className={`
                          relative flex
                          ${compact ? "h-8 w-8" : "h-10 w-10"}
                          items-center justify-center rounded-full border
                          transition-colors duration-300
                          ${
                            isActive
                              ? "border-primary bg-primary/10"
                              : isPast
                                ? "border-primary bg-primary"
                                : "border-border bg-card"
                          }
                        `}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="mobile-journey-glow"
                            className="absolute inset-[-5px] rounded-full border border-primary/20"
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                            }}
                          />
                        )}

                        <div
                          className={`
                            relative z-10 h-3 w-3 rounded-full
                            ${
                              isActive
                                ? "bg-primary"
                                : isPast
                                  ? "bg-primary-foreground"
                                  : "bg-muted-foreground/50"
                            }
                          `}
                        />
                      </motion.div>
                    </div>

                    {/* Clickable milestone summary */}
                    <button
                      type="button"
                      onClick={() => handleJourneyChange(index)}
                      aria-expanded={isActive}
                      aria-controls={`journey-detail-${index}`}
                      aria-label={`${isActive ? "Collapse" : "Expand"} ${item.year}: ${item.title}`}
                      className={`
                        group mb-4 flex min-w-0 flex-1 items-center
                        justify-between gap-3 rounded-2xl border p-4
                        text-left outline-none
                        transition-colors duration-300
                        focus-visible:ring-2 focus-visible:ring-primary/50
                        ${
                          isActive
                            ? "border-primary/40 bg-primary/5"
                            : "border-border bg-card hover:border-primary/30"
                        }
                      `}
                    >
                      <div className="min-w-0">
                        <p
                          className={`
                            text-xs font-medium uppercase tracking-[0.2em]
                            ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            }
                          `}
                        >
                          {item.year}
                        </p>

                        <h3 className="mt-1 text-sm font-semibold leading-snug text-foreground">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {item.role}
                        </p>
                      </div>

                      <motion.span
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        aria-hidden="true"
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </motion.span>
                    </button>
                  </div>

                  {/* Expanded detail appears directly below its milestone */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        id={`journey-detail-${index}`}
                        key={`detail-${item.year}-${item.title}`}
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -6 }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut",
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mb-6 ml-[60px]">
                          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-4">
                            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_55%)]" />

                            {/* Current status */}
                            {item.current && (
                              <div className="relative mb-3">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-green-600 dark:text-green-400">
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
                                      className="absolute inset-0 rounded-full bg-green-500"
                                    />
                                    <span className="relative h-1.5 w-1.5 rounded-full bg-green-500" />
                                  </span>
                                  Current
                                </span>
                              </div>
                            )}

                            <p className="relative text-xs font-medium leading-relaxed text-foreground">
                              {item.company}
                            </p>

                            <p className="relative mt-3 text-xs leading-6 text-muted-foreground">
                              {item.description}
                            </p>

                            {/* Technologies */}
                            <div className="relative mt-4 flex flex-wrap gap-2">
                              {item.technologies.map((technology) => (
                                <span
                                  key={technology}
                                  className="
                                    rounded-full border border-border
                                    bg-muted/50 px-2.5 py-1.5
                                    text-[11px] text-muted-foreground
                                    transition-colors duration-300
                                    hover:border-primary/40
                                    hover:bg-primary/10
                                    hover:text-foreground
                                  "
                                >
                                  {technology}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active journey detail — desktop only */}
        <div
          className={`relative hidden md:block ${
            compact ? "mt-6 min-h-0" : "mt-8 min-h-[360px] md:mt-24"
          }`}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${activeJourney.year}-${activeJourney.title}`}
              custom={direction}
              initial={{
                opacity: 0,
                x: direction > 0 ? 60 : -60,
              }}
              animate={{ opacity: 1, x: 0 }}
              exit={{
                opacity: 0,
                x: direction > 0 ? -60 : 60,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={`mx-auto ${
                compact ? "max-w-xl" : "max-w-3xl"
              }`}
            >
              {/* Current status */}
              <div className="mb-3 flex items-center justify-center gap-2">
                {activeJourney.current && (
                  <span className="flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-green-600 dark:text-green-400">
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
                        className="absolute inset-0 rounded-full bg-green-500"
                      />

                      <span className="relative h-1.5 w-1.5 rounded-full bg-green-500" />
                    </span>

                    Current
                  </span>
                )}
              </div>

              <h3 className="text-center text-base font-bold tracking-tight text-foreground md:text-4xl">
                {activeJourney.title}
              </h3>

              <p className="mt-2 text-center text-xs text-muted-foreground">
                {activeJourney.role}
              </p>

              <p className="mt-1 text-center text-xs text-muted-foreground">
                {activeJourney.company}
              </p>

              {/* Description and technologies */}
              <div
                className={`
                  relative mt-8 overflow-hidden rounded-3xl
                  border border-border bg-card text-xs
                  ${compact ? "p-4" : "p-5 md:mt-10 md:p-8"}
                `}
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--primary)/0.08),transparent_55%)]" />

                <p
                  className={`
                    relative text-center leading-6 text-muted-foreground
                    ${compact ? "text-xs" : "text-sm md:text-base"}
                  `}
                >
                  {activeJourney.description}
                </p>

                <div
                  className={`
                    relative flex flex-wrap justify-center gap-2
                    ${compact ? "mt-4" : "mt-6 md:mt-7"}
                  `}
                >
                  {activeJourney.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="
                        rounded-full border border-border
                        bg-muted/50 px-3 py-1.5
                        text-xs text-muted-foreground
                        transition-colors duration-300
                        hover:border-primary/40
                        hover:bg-primary/10
                        hover:text-foreground
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
