import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";

/* ================================================================== */
/* EDIT HERE — section content and learning status                     */
/* ================================================================== */

const QUESTION = "Why do some AI suggestions work better than others?";

const TOOLKIT = [
  { name: "SQL", status: "ready" },
  { name: "Python", status: "learning" },
  { name: "pandas", status: "learning" },
  { name: "Matplotlib", status: "learning" },
] as const;

const STAGES = ["collect", "clean", "explore", "visualize", "story"] as const;

// Update this value as your project progresses.
// The current stage is highlighted as "in progress".
const CURRENT_STAGE: (typeof STAGES)[number] = "collect";

const NEXT_UP = "choose a dataset and build my first end-to-end analysis";
const GITHUB_URL = "https://github.com/achmatfajrii";

/* ================================================================== */

type Status = (typeof TOOLKIT)[number]["status"];
type StageState = "done" | "running" | "next";

const currentIndex = STAGES.indexOf(CURRENT_STAGE);

const stageState = (index: number): StageState => {
  if (index < currentIndex) return "done";
  if (index === currentIndex) return "running";
  return "next";
};

const stageStyles: Record<
  StageState,
  { line: string; dot: string; label: string; caption: string }
> = {
  done: {
    line: "border-primary",
    dot: "bg-primary",
    label: "text-foreground",
    caption: "done",
  },
  running: {
    line: "border-primary",
    dot: "bg-primary ring-4 ring-primary/15 animate-pulse motion-reduce:animate-none",
    label: "text-foreground",
    caption: "in progress",
  },
  next: {
    line: "border-dashed border-border",
    dot: "border-2 border-border bg-card",
    label: "text-muted-foreground",
    caption: "next",
  },
};

const statusText: Record<Status, string> = {
  ready: "text-emerald-700 dark:text-emerald-300",
  learning: "text-amber-700 dark:text-amber-300",
};

/* ---------- lightweight syntax highlighting ---------- */

const Kw = ({ children }: { children: ReactNode }) => (
  <span className="text-purple-700 dark:text-purple-300">{children}</span>
);

const Str = ({ children }: { children: ReactNode }) => (
  <span className="text-emerald-700 dark:text-emerald-300">{children}</span>
);

const Fn = ({ children }: { children: ReactNode }) => (
  <span className="text-sky-700 dark:text-sky-300">{children}</span>
);

const Com = ({ children }: { children: ReactNode }) => (
  <span className="italic text-muted-foreground">{children}</span>
);

const Line = ({ children }: { children?: ReactNode }) => (
  <span className="block">{children ?? "\u00a0"}</span>
);

/* ---------- notebook layout ---------- */

function Row({
  prompt,
  children,
}: {
  prompt?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[4.75rem_minmax(0,1fr)] sm:gap-3">
      <div
        aria-hidden
        className="select-none font-mono text-xs leading-6 sm:pt-3 sm:text-right"
      >
        {prompt}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

const InPrompt = ({ n }: { n: string }) => (
  <span className="text-purple-700 dark:text-purple-400">In [{n}]:</span>
);

const OutPrompt = ({ n }: { n: string }) => (
  <span className="text-orange-700 dark:text-orange-300">Out[{n}]:</span>
);

function CodeBox({
  label,
  accented = false,
  children,
}: {
  label: string;
  accented?: boolean;
  children: ReactNode;
}) {
  return (
    <div
      tabIndex={0}
      aria-label={label}
      className={`overflow-x-auto rounded-md border bg-slate-50 px-4 py-3 font-mono text-[13px] leading-6 text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600 dark:bg-black/30 dark:text-white/85 dark:focus-visible:outline-purple-400 ${
        accented
          ? "border-slate-200 border-l-[3px] border-l-purple-600 dark:border-white/10 dark:border-l-purple-400"
          : "border-slate-200 dark:border-white/10"
      }`}
    >
      <div>{children}</div>
    </div>
  );
}

/* ---------- section ---------- */

export function DataJourney() {
  return (
    <section
      id="data"
      aria-labelledby="data-heading"
      className="relative w-full border-t border-border bg-background py-16 text-foreground md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-10 max-w-3xl md:mb-14">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px w-8 bg-primary/70" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Data &amp; Analytics
            </span>
          </div>

          <h2
            id="data-heading"
            className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            Learning data analysis, <span className="text-primary">in the open.</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
            SQL is already in my toolkit. I&apos;m building up Python and pandas,
            and exploring how to turn a good question into a thoughtful,
            evidence-led analysis.
          </p>
        </div>

        {/* Notebook window */}
        <div className="w-full overflow-hidden rounded-xl border border-border bg-card shadow-[0_24px_60px_-28px_rgba(126,34,206,0.20)] dark:shadow-[0_0_60px_rgba(168,85,247,0.08)]">
          {/* Title bar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-border bg-muted/50 px-4 py-2.5">
            <div className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
              <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            </div>
            <span className="font-mono text-xs text-foreground/80">
              data_journey.ipynb
            </span>
            <span className="ml-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <span
                aria-hidden
                className="h-1.5 w-1.5 rounded-full bg-primary"
              />
              Learning in progress
            </span>
          </div>

          <div className="space-y-6 p-4 sm:p-6">
            {/* Markdown cell: the question */}
            <Row>
              <h3 className="text-xl font-semibold text-foreground">
                A question I&apos;m exploring
              </h3>
              <p className="mt-2 border-l-2 border-primary/40 pl-4 text-base leading-7 text-muted-foreground">
                {QUESTION}
              </p>
            </Row>

            {/* In [1]: toolkit -> DataFrame */}
            <div className="space-y-3">
              <Row prompt={<InPrompt n="1" />}>
                <CodeBox label="Illustrative notebook cell: current toolkit">
                  <Line>
                    <Kw>import</Kw> pandas <Kw>as</Kw> pd
                  </Line>
                  <Line />
                  <Line>toolkit = [</Line>
                  {TOOLKIT.map((tool) => (
                    <Line key={tool.name}>
                      {"    ("}
                      <Str>{`"${tool.name}"`}</Str>
                      {", "}
                      <Str>{`"${tool.status}"`}</Str>
                      {"),"}
                    </Line>
                  ))}
                  <Line>]</Line>
                  <Line>
                    pd.<Fn>DataFrame</Fn>(toolkit, columns=[
                    <Str>{'"tool"'}</Str>, <Str>{'"status"'}</Str>])
                  </Line>
                </CodeBox>
              </Row>

              <Row prompt={<OutPrompt n="1" />}>
                <div className="overflow-x-auto rounded-md border border-border">
                  <table className="w-full border-collapse font-mono text-xs">
                    <thead>
                      <tr className="border-b border-border bg-muted/40">
                        <th scope="col" className="px-3 py-2 text-right font-normal text-muted-foreground">
                          <span className="sr-only">index</span>
                        </th>
                        <th scope="col" className="px-4 py-2 text-left font-semibold text-foreground">
                          tool
                        </th>
                        <th scope="col" className="px-4 py-2 text-left font-semibold text-foreground">
                          status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TOOLKIT.map((tool, index) => (
                        <tr key={tool.name} className="border-b border-border/60 last:border-0 odd:bg-muted/20">
                          <th scope="row" className="px-3 py-1.5 text-right font-normal text-muted-foreground">
                            {index}
                          </th>
                          <td className="px-4 py-1.5 text-foreground/90">
                            {tool.name}
                          </td>
                          <td className={`px-4 py-1.5 ${statusText[tool.status]}`}>
                            {tool.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-muted-foreground">
                  A snapshot of the tools I&apos;m using and learning—not an analysis result.
                </p>
              </Row>
            </div>

            {/* In [2]: workflow roadmap */}
            <div className="space-y-4">
              <Row prompt={<InPrompt n="2" />}>
                <CodeBox label="Illustrative notebook cell: data project roadmap">
                  <Line>
                    stages = [
                    {STAGES.map((stage, index) => (
                      <span key={stage}>
                        <Str>{`"${stage}"`}</Str>
                        {index < STAGES.length - 1 ? ", " : ""}
                      </span>
                    ))}
                    ]
                  </Line>
                  <Line>
                    current = <Str>{`"${CURRENT_STAGE}"`}</Str>
                  </Line>
                  <Line />
                  <Line>
                    <Fn>print</Fn>(<Str>{'f"project stage: {current}"'}</Str>)
                  </Line>
                </CodeBox>
              </Row>

              <Row prompt={<OutPrompt n="2" />}>
                <p className="font-mono text-xs text-muted-foreground">
                  project stage: {CURRENT_STAGE}
                </p>

                <ol className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-5 md:gap-4">
                  {STAGES.map((stage, index) => {
                    const state = stageState(index);
                    const style = stageStyles[state];

                    return (
                      <li
                        key={stage}
                        aria-current={state === "running" ? "step" : undefined}
                        className={`relative border-l-2 pb-2 pl-5 last:pb-0 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-5 ${style.line}`}
                      >
                        <span
                          aria-hidden
                          className={`absolute -left-[7px] top-0.5 h-3 w-3 rounded-full md:-top-[7px] md:left-0 ${style.dot}`}
                        />
                        <p className={`font-mono text-sm font-medium ${style.label}`}>
                          {stage}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {style.caption}
                        </p>
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-4 text-[11px] leading-5 text-muted-foreground">
                  The stages are a roadmap I&apos;m learning, not a report of completed project work.
                </p>
              </Row>
            </div>

            {/* Next step: an unexecuted notebook cell */}
            <div className="space-y-3">
              <Row prompt={<InPrompt n=" " />}>
                <CodeBox accented label="Notebook cell: next learning milestone">
                  <Line>
                    <Com>{`# next up: ${NEXT_UP}`}</Com>
                  </Line>
                 <Line>
                    next_step = <Str>{'"first end-to-end data project"'}</Str>
                    <span
                      aria-hidden
                      className="ml-1 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] animate-pulse bg-purple-600 motion-reduce:animate-none dark:bg-purple-400"
                    />
                  </Line>
                </CodeBox>
              </Row>

              <Row>
                <p className="text-sm leading-6 text-muted-foreground">
                  Still building the foundations. The first case study will go here when there&apos;s real work and findings to share.
                </p>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <FaGithub aria-hidden className="h-4 w-4" />
                  Explore my GitHub
                </a>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DataJourney;
