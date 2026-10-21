
'use client';

import {
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type {
  ComponentProps,
  CSSProperties,
  KeyboardEvent as ReactKeyboardEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from 'react';
import {
  animate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from 'motion/react';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ArrowDown01Icon,
  Attachment01Icon,
  Calendar03Icon,
  Cancel01Icon,
  ChartLineData01Icon,
  File02Icon,
  Globe02Icon,
  HelpCircleIcon,
  Mail01Icon,
  Mic01Icon,
  PlusSignIcon,
  SparklesIcon,
  Tick02Icon,
} from '@hugeicons/core-free-icons';
import './PromptBar.css';

type HugeIcon = ComponentProps<typeof HugeiconsIcon>['icon'];

type PromptIcon = HugeIcon | ReactNode;

interface PromptOption {
  key: string;
  name: string;
  description?: string;
  icon?: PromptIcon;
  attach?: boolean;
  tag?: string;
}

interface PromptModel extends PromptOption {
  tag?: string;
}

interface PromptSendOptions {
  attachments: string[];
  model: PromptModel | undefined;
  effort: string;
}

type AttachResult = string | string[] | null | undefined;

type MaybePromise<T> = T | Promise<T>;

interface PromptBarProps {
  placeholder?: string;
  sources?: PromptOption[];
  commands?: PromptOption[];
  models?: PromptModel[];
  defaultModel?: string;
  efforts?: string[];
  defaultEffort?: string;
  onEffortChange?: (effort: string) => void;
  busy?: boolean;
  onSend?: (text: string, options: PromptSendOptions) => void;
  onStop?: () => void;
  onAttach?: () => MaybePromise<AttachResult>;
  onDictate?: () => MaybePromise<string | null | undefined>;
  background?: string;
  color?: string;
  menuBackground?: string;
  sparkColor?: string;
  sparkBoost?: number;
  width?: number;
  radius?: number;
  maxRows?: number;
  morphDuration?: number;
  squash?: number;
  tilt?: number;
  pressScale?: number;
  className?: string;
}

interface LatestHandlers {
  onSend?: PromptBarProps['onSend'];
  onStop?: PromptBarProps['onStop'];
  onAttach?: PromptBarProps['onAttach'];
  onDictate?: PromptBarProps['onDictate'];
  onEffortChange?: PromptBarProps['onEffortChange'];
}

interface ParsedToken {
  kind: 'at' | 'slash';
  query: string;
  start: number;
}

interface Particle {
  x: number;
  y: number;
  r: number;
  vy: number;
  sway: number;
  phase: number;
  life: number;
  span: number;
}

const ARROW_UP = [
  12, 4.5, 18.5, 11, 14.25, 11, 14.25, 19.5, 9.75, 19.5,
  9.75, 11, 5.5, 11,
];

const SQUARE = [
  12, 6, 18, 6, 18, 12, 18, 18, 6, 18, 6, 12, 6, 6,
];

const EASE_IN_OUT: [number, number, number, number] = [
  0.77, 0, 0.175, 1,
];

const LINE = 22;
const EDGE = 11;

const DEFAULT_SOURCES: PromptOption[] = [
  {
    key: 'files',
    name: 'Photos & files',
    description: 'Upload from this device',
    icon: Attachment01Icon,
    attach: true,
  },
  {
    key: 'web',
    name: 'Web search',
    description: 'Live results',
    icon: Globe02Icon,
  },
  {
    key: 'sales',
    name: 'Sales data',
    description: 'Revenue and churn',
    icon: ChartLineData01Icon,
  },
  {
    key: 'docs',
    name: 'Documents',
    description: 'Specs, notes, briefs',
    icon: File02Icon,
  },
  {
    key: 'mail',
    name: 'Mail',
    description: 'Read and draft mail',
    icon: Mail01Icon,
  },
  {
    key: 'calendar',
    name: 'Calendar',
    description: 'Events and availability',
    icon: Calendar03Icon,
  },
];

const DEFAULT_COMMANDS: PromptOption[] = [
  {
    key: 'summarize',
    name: '/summarize',
    description: 'Digest the thread so far',
  },
  {
    key: 'compare',
    name: '/compare',
    description: 'Two options side by side',
  },
  {
    key: 'draft',
    name: '/draft',
    description: 'Write a first version',
  },
  {
    key: 'explain',
    name: '/explain',
    description: 'A plain-language walkthrough',
  },
  {
    key: 'tasks',
    name: '/tasks',
    description: 'Turn this into a to-do list',
  },
];

const DEFAULT_MODELS: PromptModel[] = [
  {
    key: 'nova-3',
    name: 'Nova 3',
    tag: 'Flagship',
  },
  {
    key: 'nova-mini',
    name: 'Nova Mini',
    tag: 'Fast',
  },
  {
    key: 'nova-2',
    name: 'Nova 2',
    tag: 'Legacy',
  },
];

const DEFAULT_EFFORTS: string[] = [
  'Low',
  'Medium',
  'High',
  'Extra',
  'Max',
];

const mix = (
  a: number,
  b: number,
  t: number,
): number => a + (b - a) * t;

const pathAt = (
  a: readonly number[],
  b: readonly number[],
  t: number,
): string => {
  let d = '';

  for (let i = 0; i < a.length; i += 2) {
    const ax = a[i] ?? 0;
    const ay = a[i + 1] ?? 0;
    const bx = b[i] ?? 0;
    const by = b[i + 1] ?? 0;

    d += `${i ? 'L' : 'M'}${mix(ax, bx, t).toFixed(2)} ${mix(ay, by, t).toFixed(2)}`;
  }

  return `${d}Z`;
};

const parseToken = (draft: string): ParsedToken | null => {
  const match = /(^|\s)([@/])([\w-]*)$/.exec(draft);

  if (!match) {
    return null;
  }

  const prefix = match[2];
  const before = match[1] ?? '';
  const query = match[3] ?? '';

  if (prefix !== '@' && prefix !== '/') {
    return null;
  }

  return {
    kind: prefix === '@' ? 'at' : 'slash',
    query: query.toLowerCase(),
    start: match.index + before.length,
  };
};

const renderIcon = (
  icon: PromptIcon | null | undefined,
  size: number,
): ReactNode => {
  if (isValidElement(icon)) {
    return icon;
  }

  if (
    icon == null ||
    typeof icon === 'boolean' ||
    typeof icon === 'string' ||
    typeof icon === 'number'
  ) {
    return null;
  }

  return (
    <HugeiconsIcon
      icon={icon as HugeIcon}
      size={size}
      strokeWidth={1.8}
    />
  );
};

interface SendGlyphProps {
  busy: boolean;
  morphDuration: number;
  squash: number;
  tilt: number;
}

function SendGlyph({
  busy,
  morphDuration,
  squash,
  tilt,
}: SendGlyphProps) {
  const reduce = useReducedMotion();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const dir = useRef(busy ? 1 : -1);
  const t = useMotionValue(busy ? 1 : 0);

  useEffect(() => {
    const target = busy ? 1 : 0;

    dir.current = busy ? 1 : -1;

    if (t.get() === target) {
      return undefined;
    }

    const controls = animate(t, [target], {
      duration: reduce ? 0 : morphDuration / 1000,
      ease: EASE_IN_OUT,
    });

    return () => controls.stop();
  }, [busy, morphDuration, reduce, t]);

  useMotionValueEvent(t, 'change', (value: number) => {
    pathRef.current?.setAttribute(
      'd',
      pathAt(ARROW_UP, SQUARE, value),
    );

    const goo = reduce ? 0 : Math.sin(value * Math.PI);
    const sx = 1 - squash * goo;

    if (svgRef.current) {
      svgRef.current.style.transform = goo
        ? `rotate(${dir.current * tilt * goo}deg) scale(${sx}, ${1 / sx})`
        : '';
    }
  });

  return (
    <svg
      ref={svgRef}
      className="prompt-bar__glyph"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    >
      <path
        ref={pathRef}
        d={pathAt(ARROW_UP, SQUARE, t.get())}
      />
    </svg>
  );
}

export default function PromptBar({
  placeholder = 'Ask anything',
  sources = DEFAULT_SOURCES,
  commands = DEFAULT_COMMANDS,
  models = DEFAULT_MODELS,
  defaultModel = '',
  efforts = DEFAULT_EFFORTS,
  defaultEffort = '',
  onEffortChange,
  busy = false,
  onSend,
  onStop,
  onAttach,
  onDictate,
  background = '#27272a',
  color = '#f5f5f5',
  menuBackground = '#323236',
  sparkColor = '#b39dff',
  sparkBoost = 1,
  width = 400,
  radius = 16,
  maxRows = 5,
  morphDuration = 240,
  squash = 0.12,
  tilt = 8,
  pressScale = 0.96,
  className = '',
}: PromptBarProps) {
  const reduce = useReducedMotion();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const glowRef = useRef<HTMLSpanElement | null>(null);
  const sparkRef = useRef<HTMLCanvasElement | null>(null);

  const typing = useRef({
    energy: 0,
    strokes: 0,
  });

  const boost = useRef(sparkBoost);
  boost.current = sparkBoost;

  const rowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastOpen = useRef<string | null>(null);
  const dictation = useRef(0);

  const latest = useRef<LatestHandlers>({});
  latest.current = {
    onSend,
    onStop,
    onAttach,
    onDictate,
    onEffortChange,
  };

  const [draft, setDraft] = useState('');
  const [attachments, setAttachments] = useState<string[]>([]);
  const [modelKey, setModelKey] = useState(defaultModel);

  const [plusOpen, setPlusOpen] = useState(false);
  const [modelOpen, setModelOpen] = useState(false);
  const [effortOpen, setEffortOpen] = useState(false);

  const [effortIndex, setEffortIndex] = useState(() => {
    const index = efforts.indexOf(defaultEffort);

    return index >= 0
      ? index
      : Math.max(0, Math.floor((efforts.length - 1) / 2));
  });

  const [dismissed, setDismissed] = useState(false);
  const [active, setActive] = useState(0);
  const [listening, setListening] = useState(false);
  const [pressed, setPressed] = useState(false);

  const model = models.find((item) => item.key === modelKey)
    ?? models[0];

  const token = dismissed ? null : parseToken(draft);

  const open = plusOpen
    ? 'at'
    : (
        token?.kind
        ?? (
          modelOpen
            ? 'model'
            : effortOpen
              ? 'effort'
              : null
        )
      );

  const query = plusOpen ? '' : (token?.query ?? '');

  const list = useMemo<PromptOption[]>(() => {
    if (open === 'at') {
      return sources.filter((source) =>
        source.name.toLowerCase().includes(query),
      );
    }

    if (open === 'slash') {
      return commands.filter((command) =>
        command.name
          .replace(/^\//, '')
          .toLowerCase()
          .startsWith(query),
      );
    }

    if (open === 'model') {
      return models;
    }

    return [];
  }, [open, query, sources, commands, models]);

  const cursor = Math.min(
    active,
    Math.max(0, list.length - 1),
  );

  const canSend =
    draft.trim().length > 0 || attachments.length > 0;

  const armed = busy || canSend;
  const level = efforts[effortIndex] ?? '';

  const maxed =
    efforts.length > 1 &&
    effortIndex === efforts.length - 1;

  const focusInput = useCallback(() => {
    inputRef.current?.focus({
      preventScroll: true,
    });
  }, []);

  const closeMenus = useCallback(() => {
    setPlusOpen(false);
    setModelOpen(false);
    setEffortOpen(false);
  }, []);

  useLayoutEffect(() => {
    const glow = glowRef.current;

    if (!glow || !open) {
      return;
    }

    const row = rowRefs.current[cursor];

    if (!row) {
      glow.style.opacity = '0';
      return;
    }

    const fresh = lastOpen.current !== open;
    lastOpen.current = open;

    if (fresh) {
      glow.style.transition = 'none';
    }

    glow.style.top = `${row.offsetTop}px`;
    glow.style.height = `${row.offsetHeight}px`;
    glow.style.opacity = '1';

    if (fresh) {
      void glow.offsetHeight;
      glow.style.transition = '';
    }
  }, [open, cursor, list]);

  useEffect(() => {
    if (!open) {
      lastOpen.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (!plusOpen && !modelOpen && !effortOpen) {
      return undefined;
    }

    const onDown = (event: PointerEvent) => {
      if (
        !(event.target instanceof Node) ||
        !rootRef.current?.contains(event.target)
      ) {
        closeMenus();
      }
    };

    document.addEventListener('pointerdown', onDown);

    return () => {
      document.removeEventListener('pointerdown', onDown);
    };
  }, [plusOpen, modelOpen, effortOpen, closeMenus]);

  useLayoutEffect(() => {
    const element = inputRef.current;

    if (!element) {
      return;
    }

    element.style.height = '0px';

    const max = LINE * maxRows;

    element.style.height = `${Math.min(
      element.scrollHeight,
      max,
    )}px`;

    element.style.overflowY =
      element.scrollHeight > max ? 'auto' : 'hidden';
  }, [draft, maxRows]);

  useEffect(
    () => () => {
      dictation.current += 1;
    },
    [],
  );

  useEffect(() => {
    const canvas = sparkRef.current;

    if (!maxed || reduce || !canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return undefined;
    }

    typing.current.strokes = 0;

    let raf = 0;
    let last = performance.now();
    let w = 0;
    let h = 0;
    let due = 0;
    let speed = 1;
    let pulse = 0;

    const parts: Particle[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(
        2,
        window.devicePixelRatio || 1,
      );

      w = rect.width;
      h = rect.height;

      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const spawn = (burst: boolean) => {
      parts.push({
        x: Math.random() * w,
        y: burst
          ? h * (0.2 + Math.random() * 0.8)
          : h + 3,
        r: 0.9 + Math.random() * 1.1,
        vy: -(7 + Math.random() * 9),
        sway: (Math.random() - 0.5) * 10,
        phase: Math.random() * Math.PI * 2,
        life: burst ? Math.random() * 1.2 : 0,
        span: 2.4 + Math.random() * 2.4,
      });
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);

      last = now;

      const typed = typing.current;
      const gain = boost.current;

      typed.energy *= Math.exp(-dt / 0.8);
      pulse *= Math.exp(-dt / 0.16);

      if (typed.strokes > 0) {
        typed.strokes = 0;

        if (gain > 0) {
          pulse = 1;
        }
      }

      const energy = typed.energy * gain;

      speed +=
        (1 + energy * 6 - speed) *
        (1 - Math.exp(-dt / 0.15));

      due += dt;

      while (due > 0.14) {
        due -= 0.14;

        if (parts.length < 30) {
          spawn(false);
        }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = sparkColor;
      ctx.shadowColor = sparkColor;
      ctx.shadowBlur = 6 + energy * 10 + pulse * 6;

      for (let i = parts.length - 1; i >= 0; i -= 1) {
        const particle = parts[i];

        if (!particle) {
          continue;
        }

        particle.life += dt;

        if (particle.life > particle.span) {
          parts.splice(i, 1);
          continue;
        }

        const k = particle.life / particle.span;

        const twinkle =
          0.7
          + 0.3
          * Math.sin(
            (now / 160) * (1 + energy) + particle.phase,
          );

        particle.y += particle.vy * dt * speed;

        if (particle.y < -4) {
          particle.y = h + 3;
          particle.x = Math.random() * w;
        }

        const edge = Math.min(
          1,
          Math.max(0, particle.y / 14),
          Math.max(0, (h - particle.y) / 14),
        );

        ctx.globalAlpha =
          Math.min(
            1,
            Math.sin(k * Math.PI)
              * (0.9 + energy * 0.25)
              * twinkle,
          ) * edge;

        ctx.beginPath();

        ctx.arc(
          particle.x
            + Math.sin(
              (now / 900) * (1 + energy * 0.8)
                + particle.phase,
            ) * particle.sway,
          particle.y,
          particle.r * twinkle * (1 + energy * 0.35),
          0,
          Math.PI * 2,
        );

        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    resize();

    for (let i = 0; i < 26; i += 1) {
      spawn(true);
    }

    const observer = new ResizeObserver(resize);

    observer.observe(canvas);

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      ctx.clearRect(0, 0, w, h);
    };
  }, [maxed, reduce, sparkColor]);

  const setEffort = (index: number) => {
    if (efforts.length === 0) {
      return;
    }

    const next = Math.max(
      0,
      Math.min(efforts.length - 1, index),
    );

    if (next === effortIndex) {
      return;
    }

    setEffortIndex(next);

    const nextEffort = efforts[next];

    if (nextEffort !== undefined) {
      latest.current.onEffortChange?.(nextEffort);
    }
  };

  const effortFromPointer = (
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const k =
      (
        event.clientX
        - rect.left
        - EDGE
      ) / Math.max(1, rect.width - 2 * EDGE);

    setEffort(
      Math.round(k * (efforts.length - 1)),
    );
  };

  const onEffortKey = (
    event: ReactKeyboardEvent<HTMLDivElement>,
  ) => {
    const step =
      event.key === 'ArrowRight' || event.key === 'ArrowUp'
        ? 1
        : event.key === 'ArrowLeft' || event.key === 'ArrowDown'
          ? -1
          : 0;

    if (step) {
      event.preventDefault();
      setEffort(effortIndex + step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      setEffort(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      setEffort(efforts.length - 1);
    } else if (event.key === 'Escape') {
      setEffortOpen(false);
      focusInput();
    }
  };

  const stepAt = (index: number): string =>
    `calc(${EDGE}px + (100% - ${EDGE * 2}px) * ${index / Math.max(1, efforts.length - 1)})`;

  const fillAt = (index: number): string =>
    index === efforts.length - 1
      ? '100%'
      : `calc(${stepAt(index)} + 7px)`;

  const pick = (row: PromptOption) => {
    if (open === 'model') {
      setModelKey(row.key);
      setModelOpen(false);
      focusInput();
      return;
    }

    const head = token
      ? draft.slice(0, token.start)
      : draft;

    if (row.attach) {
      setDraft(head);

      Promise.resolve(
        latest.current.onAttach?.(),
      )
        .then((files) => {
          if (!files) {
            return;
          }

          const nextFiles = Array.isArray(files)
            ? files
            : [files];

          setAttachments((current) => [
            ...current,
            ...nextFiles,
          ]);
        })
        .catch(() => {
          // Avoid an unhandled rejection from an attachment callback.
        });
    } else if (open === 'at') {
      setDraft(`${head}@${row.name} `);
    } else {
      setDraft(`${head}${row.name} `);
    }

    setPlusOpen(false);
    setDismissed(false);
    focusInput();
  };

  const send = () => {
    if (!canSend || busy) {
      return;
    }

    latest.current.onSend?.(draft.trim(), {
      attachments,
      model,
      effort: level,
    });

    setDraft('');
    setAttachments([]);
    setDismissed(false);
    closeMenus();
    focusInput();
  };

  const toggleListen = () => {
    if (listening) {
      dictation.current += 1;
      setListening(false);
      return;
    }

    const seq = ++dictation.current;

    setListening(true);

    Promise.resolve(
      latest.current.onDictate?.(),
    ).then(
      (text) => {
        if (seq !== dictation.current) {
          return;
        }

        setListening(false);

        if (text) {
          setDraft((current) =>
            current.trim()
              ? `${current.trimEnd()} ${text}`
              : text,
          );
        }

        focusInput();
      },
      () => {
        if (seq === dictation.current) {
          setListening(false);
        }
      },
    );
  };

  const onKeyDown = (
    event: ReactKeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (open && list.length > 0) {
      if (
        event.key === 'ArrowDown'
        || event.key === 'ArrowUp'
      ) {
        event.preventDefault();

        setActive(
          (
            cursor
            + (
              event.key === 'ArrowDown'
                ? 1
                : list.length - 1
            )
          ) % list.length,
        );

        return;
      }

      if (
        (event.key === 'Enter' && !event.shiftKey)
        || event.key === 'Tab'
      ) {
        event.preventDefault();

        const selected = list[cursor];

        if (selected) {
          pick(selected);
        }

        return;
      }
    }

    if (event.key === 'Escape') {
      if (open) {
        event.preventDefault();
        setDismissed(true);
        closeMenus();
      }

      return;
    }

    if (
      event.key === 'Enter'
      && !event.shiftKey
      && !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      send();
    }
  };

  const down = (
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (event.button !== 0 || !armed) {
      return;
    }

    setPressed(true);
  };

  const up = () => {
    setPressed(false);
  };

  return (
    <div
      ref={rootRef}
      className={`prompt-bar${className ? ` ${className}` : ''}`}
      data-busy={busy ? '' : undefined}
      data-max={maxed ? '' : undefined}
      style={
        {
          '--pb-bg': background,
          '--pb-ink': color,
          '--pb-menu': menuBackground,
          '--pb-w': `${width}px`,
          '--pb-radius': `${radius}px`,
          '--pb-spark': sparkColor,
          '--pb-press': pressScale,
        } as CSSProperties
      }
    >
      {open ? (
        <div
          className="prompt-bar__menu"
          role={open === 'effort' ? 'dialog' : 'listbox'}
          aria-label={
            open === 'at'
              ? 'Sources'
              : open === 'slash'
                ? 'Commands'
                : open === 'model'
                  ? 'Models'
                  : 'Effort'
          }
          data-kind={open}
        >
          {open === 'effort' ? (
            <>
              <div className="prompt-bar__effort-head">
                <span className="prompt-bar__effort-title">
                  Effort
                </span>

                <span className="prompt-bar__effort-level">
                  {level}
                </span>

                <span
                  className="prompt-bar__effort-help"
                  title="Higher effort thinks longer before answering"
                >
                  <HugeiconsIcon
                    icon={HelpCircleIcon}
                    size={14}
                    strokeWidth={1.8}
                  />
                </span>
              </div>

              <div className="prompt-bar__effort-ends">
                <span>Faster</span>
                <span>Smarter</span>
              </div>

              <div
                className="prompt-bar__effort-track"
                role="slider"
                tabIndex={0}
                aria-label="Effort"
                aria-valuemin={0}
                aria-valuemax={Math.max(0, efforts.length - 1)}
                aria-valuenow={effortIndex}
                aria-valuetext={level}
                style={
                  {
                    '--pb-effort-x': stepAt(effortIndex),
                    '--pb-effort-fill': fillAt(effortIndex),
                  } as CSSProperties
                }
                onPointerDown={(event) => {
                  if (event.button !== 0) {
                    return;
                  }

                  try {
                    event.currentTarget.setPointerCapture(
                      event.pointerId,
                    );
                  } catch {
                    // Pointer capture may not be available.
                  }

                  event.currentTarget.focus({
                    preventScroll: true,
                  });

                  effortFromPointer(event);
                }}
                onPointerMove={(event) => {
                  if (event.buttons & 1) {
                    effortFromPointer(event);
                  }
                }}
                onKeyDown={onEffortKey}
              >
                <span className="prompt-bar__effort-fill" />

                {efforts.map((label, index) => (
                  <i
                    key={label}
                    className="prompt-bar__effort-dot"
                    style={{ left: stepAt(index) }}
                  />
                ))}

                <span className="prompt-bar__effort-thumb" />
              </div>
            </>
          ) : (
            <>
              <span
                ref={glowRef}
                className="prompt-bar__glow"
                aria-hidden="true"
              />

              {list.map((row, index) => (
                <button
                  key={row.key}
                  ref={(element) => {
                    rowRefs.current[index] = element;
                  }}
                  type="button"
                  role="option"
                  aria-selected={index === cursor}
                  className="prompt-bar__row"
                  onMouseDown={(event) => {
                    event.preventDefault();
                  }}
                  onPointerEnter={() => {
                    setActive(index);
                  }}
                  onClick={() => pick(row)}
                >
                  {open === 'at' ? (
                    <span className="prompt-bar__row-icon">
                      {renderIcon(row.icon, 15)}
                    </span>
                  ) : null}

                  <span className="prompt-bar__row-name">
                    {row.name}
                  </span>

                  {row.description ? (
                    <span className="prompt-bar__row-desc">
                      {row.description}
                    </span>
                  ) : null}

                  {open === 'model' ? (
                    <>
                      <span className="prompt-bar__row-tag">
                        {row.tag}
                      </span>

                      <span
                        className="prompt-bar__row-check"
                        data-on={
                          row.key === model?.key
                            ? ''
                            : undefined
                        }
                      >
                        <HugeiconsIcon
                          icon={Tick02Icon}
                          size={13}
                          strokeWidth={2.5}
                        />
                      </span>
                    </>
                  ) : null}
                </button>
              ))}

              {list.length === 0 ? (
                <div className="prompt-bar__empty">
                  No matches for “{query}”
                </div>
              ) : null}
            </>
          )}
        </div>
      ) : null}

      <div
        className="prompt-bar__field"
        role="presentation"
        data-max={maxed ? '' : undefined}
        onPointerDown={(event) => {
          if (
            event.target === event.currentTarget
            || event.target === inputRef.current
          ) {
            closeMenus();
          }
        }}
        onClick={focusInput}
      >
        <canvas
          ref={sparkRef}
          className="prompt-bar__sparks"
          aria-hidden="true"
        />

        {attachments.length > 0 ? (
          <div className="prompt-bar__chips">
            {attachments.map((file, index) => (
              <span
                key={`${file}-${index}`}
                className="prompt-bar__chip"
              >
                <HugeiconsIcon
                  icon={File02Icon}
                  size={12}
                  strokeWidth={2}
                />

                <span className="prompt-bar__chip-name">
                  {file}
                </span>

                <button
                  type="button"
                  className="prompt-bar__chip-x"
                  aria-label={`Remove ${file}`}
                  onClick={() => {
                    setAttachments((current) =>
                      current.filter(
                        (_, itemIndex) => itemIndex !== index,
                      ),
                    );
                  }}
                >
                  <HugeiconsIcon
                    icon={Cancel01Icon}
                    size={10}
                    strokeWidth={2.5}
                  />
                </button>
              </span>
            ))}
          </div>
        ) : null}

        <textarea
          ref={inputRef}
          className="prompt-bar__input"
          rows={1}
          value={draft}
          placeholder={listening ? 'Listening…' : placeholder}
          aria-label="Prompt"
          onChange={(event) => {
            setDraft(event.target.value);

            typing.current.energy = Math.min(
              1.6,
              typing.current.energy + 0.22,
            );

            typing.current.strokes = Math.min(
              4,
              typing.current.strokes + 1,
            );

            setDismissed(false);
            closeMenus();
            setActive(0);
          }}
          onFocus={closeMenus}
          onKeyDown={onKeyDown}
        />

        <div className="prompt-bar__bar">
          <button
            type="button"
            className="prompt-bar__tool"
            aria-label="Add files and sources"
            aria-expanded={plusOpen}
            data-on={plusOpen ? '' : undefined}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onClick={() => {
              setModelOpen(false);
              setEffortOpen(false);
              setActive(0);
              setPlusOpen((current) => !current);
              focusInput();
            }}
          >
            <HugeiconsIcon
              icon={PlusSignIcon}
              size={16}
              strokeWidth={2}
            />
          </button>

          {models.length > 0 ? (
            <button
              type="button"
              className="prompt-bar__pick"
              aria-label="Choose model"
              aria-expanded={modelOpen}
              data-on={modelOpen ? '' : undefined}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                setPlusOpen(false);
                setEffortOpen(false);

                setActive(
                  Math.max(
                    0,
                    models.findIndex(
                      (item) => item.key === modelKey,
                    ),
                  ),
                );

                setModelOpen((current) => !current);
                focusInput();
              }}
            >
              <span>{model?.name ?? 'Model'}</span>

              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={12}
                strokeWidth={2.4}
              />
            </button>
          ) : null}

          {efforts.length > 0 ? (
            <button
              type="button"
              className="prompt-bar__pick"
              aria-label="Choose effort"
              aria-expanded={effortOpen}
              data-on={effortOpen ? '' : undefined}
              data-max={maxed ? '' : undefined}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={() => {
                setPlusOpen(false);
                setModelOpen(false);
                setEffortOpen((current) => !current);
                focusInput();
              }}
            >
              <HugeiconsIcon
                icon={SparklesIcon}
                size={13}
                strokeWidth={2}
              />

              <span>{level}</span>
            </button>
          ) : null}

          <span className="prompt-bar__spacer" />

          {onDictate ? (
            <button
              type="button"
              className="prompt-bar__tool"
              aria-label={
                listening ? 'Stop dictation' : 'Dictate'
              }
              aria-pressed={listening}
              data-on={listening ? '' : undefined}
              onMouseDown={(event) => {
                event.preventDefault();
              }}
              onClick={toggleListen}
            >
              {listening ? (
                <span
                  className="prompt-bar__eq"
                  aria-hidden="true"
                >
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <HugeiconsIcon
                  icon={Mic01Icon}
                  size={15}
                  strokeWidth={2}
                />
              )}
            </button>
          ) : null}

          <button
            type="button"
            className="prompt-bar__send"
            disabled={!armed}
            aria-label={busy ? 'Stop' : 'Send'}
            data-armed={armed ? '' : undefined}
            data-pressed={pressed ? '' : undefined}
            onMouseDown={(event) => {
              event.preventDefault();
            }}
            onPointerDown={down}
            onPointerUp={up}
            onPointerCancel={up}
            onPointerLeave={up}
            onClick={() => {
              if (busy) {
                latest.current.onStop?.();
              } else {
                send();
              }
            }}
          >
            <SendGlyph
              busy={busy}
              morphDuration={morphDuration}
              squash={squash}
              tilt={tilt}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
