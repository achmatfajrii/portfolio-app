import type { ReactNode } from "react";
import { FaGithub } from "react-icons/fa";

/* ================================================================== */
/*  EDIT HERE — semua yang perlu kamu ubah saat progres berubah        */
/* ================================================================== */

// "ready" = sudah dikuasai, "learning" = sedang dipelajari. Jujur saja.
const TOOLKIT = [
  { name: "SQL", status: "ready" },
  { name: "Python", status: "learning" },
  { name: "pandas", status: "learning" },
  { name: "Matplotlib", status: "learning" },
] as const;

// Dua baris komentar di sel kosong paling bawah.
const NEXT_CELL_COMMENTS = [
  "collect → clean → explore → visualize → explain",
  "first real dataset goes here",
];

const GITHUB_URL = "https://github.com/achmatfajrii";

/* ================================================================== */

type Status = (typeof TOOLKIT)[number]["status"];

const statusText: Record<Status, string> = {
  ready: "text-emerald-700 dark:text-emerald-300",
  learning: "text-amber-700 dark:text-amber-300",
};

/* ---------- syntax highlighting (hanya span, tanpa library) ---------- */

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
  <span className="italic text-slate-600 dark:text-white/45">{children}</span>
);
const Line = ({ children }: { children?: ReactNode }) => (
  <span className="block">{children ?? "\u00a0"}</span>
);

/* ---------- potongan layout notebook ---------- */

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
        className="select-none whitespace-pre font-mono text-xs leading-6 sm:pt-3 sm:text-right"
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
  selected = false,
  children,
}: {
  label: string;
  selected?: boolean;
  children: ReactNode;
}) {
  return (
    <pre
      tabIndex={0}
      aria-label={label}
      className={`overflow-x-auto rounded-md border bg-slate-50 px-4 py-3 font-mono text-[13px] leading-6 text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-600 dark:bg-black/30 dark:text-white/85 dark:focus-visible:outline-purple-400 ${
        selected
          ? "border-slate-200 border-l-[3px] border-l-purple-600 dark:border-white/10 dark:border-l-purple-400"
          : "border-slate-200 dark:border-white/10"
      }`}
    >
      <code>{children}</code>
    </pre>
  );
}

/* ---------- section ---------- */

export function DataJourneyy() {
  return (
    <section
      id="data"
      aria-labelledby="data-heading"
      className="relative w-full border-t border-purple-200/70 bg-[#F6F3FB] py-16 dark:border-white/5 dark:bg-[#0E0C14] md:py-24"
    >
      <div className="mx-auto lg:max-w-7xl">
        <div className="container">
          {/* Header */}
          <div className="mb-10 max-w-2xl md:mb-12">
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-8 bg-purple-600/60 dark:bg-purple-500/60" />
              <span className="font-mono text-xs text-purple-700 dark:text-purple-400/80">
                Data & Analytics
              </span>
            </div>

            <h2
              id="data-heading"
              className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-white md:text-5xl"
            >
              Learning to find the signal in the data.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-white/60 md:text-base">
              My next chapter is about understanding the story behind the
              numbers: from Python fundamentals to exploring data and
              communicating findings clearly.
            </p>
          </div>

          {/* Notebook window */}
          <div className="max-w-3xl overflow-hidden rounded-xl border border-purple-200 bg-white shadow-[0_24px_60px_-28px_rgba(126,34,206,0.35)] dark:border-white/10 dark:bg-[#120F17] dark:shadow-[0_0_60px_rgba(168,85,247,0.08)]">
            {/* Title bar */}
            <div className="flex items-center gap-3 border-b border-purple-100 bg-slate-50 px-4 py-2.5 dark:border-white/10 dark:bg-white/[0.03]">
              <div className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
              </div>
              <span className="font-mono text-xs text-slate-700 dark:text-white/70">
                data_journey.ipynb
              </span>
              <span className="ml-auto flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-white/55">
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full border-2 border-slate-400 dark:border-white/40"
                />
                Python 3 kernel idle
              </span>
            </div>

            <div className="space-y-6 p-4 sm:p-6">
              {/* Markdown cell */}
              <Row>
                <p className="font-display text-lg font-medium text-slate-900 dark:text-white">
                  Documenting the process, not just the results.
                </p>
              </Row>

              {/* In [1] -> Out[1]: toolkit as a DataFrame */}
              <div className="space-y-3">
                <Row prompt={<InPrompt n="1" />}>
                  <CodeBox label="Input cell 1: my toolkit as a pandas table">
                    <Line>
                      <Kw>import</Kw> pandas <Kw>as</Kw> pd
                    </Line>
                    <Line />
                    <Line>toolkit = [</Line>
                    {TOOLKIT.map((t) => (
                      <Line key={t.name}>
                        {"    ("}
                        <Str>{`"${t.name}"`}</Str>
                        {", "}
                        <Str>{`"${t.status}"`}</Str>
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
                  <div className="overflow-x-auto">
                    <table className="border-collapse font-mono text-xs">
                      <thead>
                        <tr className="border-b border-slate-300 dark:border-white/15">
                          <th scope="col" className="px-3 py-1.5">
                            <span className="sr-only">index</span>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-1.5 text-right font-semibold text-slate-900 dark:text-white"
                          >
                            tool
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-1.5 text-right font-semibold text-slate-900 dark:text-white"
                          >
                            status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {TOOLKIT.map((t, i) => (
                          <tr
                            key={t.name}
                            className="odd:bg-slate-50 dark:odd:bg-white/[0.03]"
                          >
                            <th
                              scope="row"
                              className="px-3 py-1.5 text-right font-semibold text-slate-900 dark:text-white"
                            >
                              {i}
                            </th>
                            <td className="px-4 py-1.5 text-right text-slate-700 dark:text-white/80">
                              {t.name}
                            </td>
                            <td
                              className={`px-4 py-1.5 text-right ${statusText[t.status]}`}
                            >
                              {t.status}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Row>
              </div>

              {/* In [ ]: the empty, selected cell — ready, not yet run */}
              <div className="space-y-4">
                <Row prompt={<InPrompt n=" " />}>
                  <CodeBox
                    selected
                    label="Empty input cell: the next notebook starts here"
                  >
                    {NEXT_CELL_COMMENTS.map((text, i) => (
                      <Line key={text}>
                        <Com>{`# ${text}`}</Com>
                        {i === NEXT_CELL_COMMENTS.length - 1 && (
                          <span
                            aria-hidden
                            className="ml-1 inline-block h-[1.1em] w-[0.5em] translate-y-[0.2em] animate-pulse bg-purple-600 motion-reduce:animate-none dark:bg-purple-400"
                          />
                        )}
                      </Line>
                    ))}
                  </CodeBox>
                </Row>

                <Row>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-purple-300 px-4 py-2 text-sm font-medium text-purple-800 transition-colors hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 dark:border-purple-400/40 dark:text-purple-200 dark:hover:bg-purple-400/10 dark:focus-visible:outline-purple-400"
                  >
                    <FaGithub aria-hidden className="h-4 w-4" />
                    Follow progress on GitHub
                  </a>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
