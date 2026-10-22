// components/react-bits/DotField.tsx
'use client';
import { memo, useEffect, useId, useRef, type HTMLAttributes } from 'react';

const TWO_PI = Math.PI * 2;
const REST_EPS = 0.02; // selisih (px) di bawah ini dianggap sudah diam
const MAX_DPR = 1.5;

interface DotFieldProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  dotRadius?: number;
  dotSpacing?: number;
  cursorRadius?: number;
  cursorForce?: number;
  bulgeOnly?: boolean;
  bulgeStrength?: number;
  glowRadius?: number;
  sparkle?: boolean;
  waveAmplitude?: number;
  gradientFrom?: string;
  gradientTo?: string;
  glowColor?: string;
}

interface Config {
  dotRadius: number;
  dotSpacing: number;
  cursorRadius: number;
  cursorForce: number;
  bulgeOnly: boolean;
  bulgeStrength: number;
  sparkle: boolean;
  waveAmplitude: number;
  gradientFrom: string;
  gradientTo: string;
}

// Structure-of-arrays: lebih hemat memori & tanpa alokasi objek per dot.
interface Dots {
  count: number;
  ax: Float32Array; // posisi anchor
  ay: Float32Array;
  sx: Float32Array; // posisi tergambar
  sy: Float32Array;
  vx: Float32Array; // kecepatan (mode non-bulge)
  vy: Float32Array;
}

const EMPTY: Dots = {
  count: 0,
  ax: new Float32Array(0),
  ay: new Float32Array(0),
  sx: new Float32Array(0),
  sy: new Float32Array(0),
  vx: new Float32Array(0),
  vy: new Float32Array(0),
};

const DotField = memo(function DotField({
  dotRadius = 1.5,
  dotSpacing = 14,
  cursorRadius = 500,
  cursorForce = 0.1,
  bulgeOnly = true,
  bulgeStrength = 67,
  glowRadius = 160,
  sparkle = false,
  waveAmplitude = 0,
  gradientFrom = 'rgba(168, 85, 247, 0.35)',
  gradientTo = 'rgba(180, 151, 207, 0.25)',
  glowColor = '#120F17',
  className,
  ...rest
}: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);
  const cfgRef = useRef<Config>({
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  });
  const wakeRef = useRef<() => void>(() => {});
  const rebuildRef = useRef<() => void>(() => {});
  const reactId = useId();
  const glowId = `dot-field-glow-${reactId.replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    const glowEl = glowRef.current;

    const reduceMq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerMq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    let dots: Dots = EMPTY;
    let w = 0;
    let h = 0;
    let offsetX = 0;
    let offsetY = 0;
    const mouse = { x: -9999, y: -9999, prevX: -9999, prevY: -9999, speed: 0 };
    let engagement = 0;
    let glowOpacity = 0;
    let lastSpeedT = 0;
    let frame = 0;
    let raf = 0;
    let visible = true;
    let resizeTimer: ReturnType<typeof setTimeout> | undefined;
    let gradient: CanvasGradient | undefined;
    let gradientKey = '';
    let glowX = NaN;
    let glowY = NaN;
    let glowO = -1;

    const buildDots = () => {
      const c = cfgRef.current;
      const step = c.dotRadius + c.dotSpacing;
      if (w <= 0 || h <= 0 || step <= 0) {
        dots = EMPTY;
        return;
      }
      const cols = Math.floor(w / step);
      const rows = Math.floor(h / step);
      const padX = (w % step) / 2;
      const padY = (h % step) / 2;
      const count = cols * rows;
      const ax = new Float32Array(count);
      const ay = new Float32Array(count);
      let i = 0;
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          ax[i] = padX + col * step + step / 2;
          ay[i] = padY + row * step + step / 2;
          i++;
        }
      }
      dots = {
        count,
        ax,
        ay,
        sx: ax.slice(),
        sy: ay.slice(),
        vx: new Float32Array(count),
        vy: new Float32Array(count),
      };
    };

    const measure = () => {
      const rect = parent.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return false;
      w = rect.width;
      h = rect.height;
      offsetX = rect.left + window.scrollX;
      offsetY = rect.top + window.scrollY;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const sampleSpeed = () => {
      const dx = mouse.prevX - mouse.x;
      const dy = mouse.prevY - mouse.y;
      mouse.speed += (Math.sqrt(dx * dx + dy * dy) - mouse.speed) * 0.5;
      if (mouse.speed < 0.001) mouse.speed = 0;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || dots.count === 0) return;
      frame++;

      const c = cfgRef.current;
      const motion = !reduceMq.matches;
      const wave = motion ? c.waveAmplitude : 0;
      const sparkle = motion && c.sparkle;
      const t = frame * 0.02;

      // kecepatan mouse disampel ±50 Hz, sama seperti setInterval 20ms sebelumnya
      if (now - lastSpeedT > 100) lastSpeedT = now - 20;
      while (now - lastSpeedT >= 20) {
        sampleSpeed();
        lastSpeedT += 20;
      }

      engagement += (Math.min(mouse.speed / 5, 1) - engagement) * 0.06;
      if (engagement < 0.001) engagement = 0;
      glowOpacity += (engagement - glowOpacity) * 0.08;
      if (glowOpacity < 0.001) glowOpacity = 0;

      // tulis ke DOM hanya kalau nilainya berubah
      if (glowEl) {
        if (mouse.x !== glowX) {
          glowEl.setAttribute('cx', String(mouse.x));
          glowX = mouse.x;
        }
        if (mouse.y !== glowY) {
          glowEl.setAttribute('cy', String(mouse.y));
          glowY = mouse.y;
        }
        if (glowOpacity !== glowO) {
          glowEl.style.opacity = String(glowOpacity);
          glowO = glowOpacity;
        }
      }

      const key = `${w}|${h}|${c.gradientFrom}|${c.gradientTo}`;
      if (key !== gradientKey) {
        gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, c.gradientFrom);
        gradient.addColorStop(1, c.gradientTo);
        gradientKey = key;
      }

      ctx.clearRect(0, 0, w, h);
      if (gradient) ctx.fillStyle = gradient;

      const { count, ax, ay, sx, sy, vx, vy } = dots;
      const cr = c.cursorRadius;
      const crSq = cr * cr;
      const rad = c.dotRadius / 2;
      const bulge = c.bulgeOnly;
      const eng = engagement;
      const mx = mouse.x;
      const my = mouse.y;
      let moving = false;

      ctx.beginPath();
      for (let i = 0; i < count; i++) {
        const dx = mx - ax[i];
        const dy = my - ay[i];
        const distSq = dx * dx + dy * dy;

        if (distSq < crSq && eng > 0.01) {
          const dist = Math.sqrt(distSq) || 0.0001;
          const cos = dx / dist;
          const sin = dy / dist;
          if (bulge) {
            const k = 1 - dist / cr;
            const push = k * k * c.bulgeStrength * eng;
            sx[i] += (ax[i] - cos * push - sx[i]) * 0.15;
            sy[i] += (ay[i] - sin * push - sy[i]) * 0.15;
          } else {
            const move = (500 / dist) * (mouse.speed * c.cursorForce);
            vx[i] -= cos * move;
            vy[i] -= sin * move;
          }
        } else if (bulge) {
          sx[i] += (ax[i] - sx[i]) * 0.1;
          sy[i] += (ay[i] - sy[i]) * 0.1;
        }

        if (!bulge) {
          vx[i] *= 0.9;
          vy[i] *= 0.9;
          sx[i] += (ax[i] + vx[i] - sx[i]) * 0.1;
          sy[i] += (ay[i] + vy[i] - sy[i]) * 0.1;
        }

        if (!moving) {
          if (Math.abs(sx[i] - ax[i]) > REST_EPS || Math.abs(sy[i] - ay[i]) > REST_EPS) moving = true;
          else if (!bulge && (Math.abs(vx[i]) > REST_EPS || Math.abs(vy[i]) > REST_EPS)) moving = true;
        }

        let drawX = sx[i];
        let drawY = sy[i];
        if (wave > 0) {
          drawY += Math.sin(ax[i] * 0.03 + t) * wave;
          drawX += Math.cos(ay[i] * 0.03 + t * 0.7) * wave * 0.5;
        }

        const r = sparkle && ((Math.imul(i, 2654435761) ^ (frame >> 3)) >>> 0) % 100 < 3 ? rad * 1.8 : rad;
        ctx.moveTo(drawX + r, drawY);
        ctx.arc(drawX, drawY, r, 0, TWO_PI);
      }
      ctx.fill();

      // lanjut hanya kalau masih ada yang bergerak; selain itu loop tidur
      if (moving || wave > 0 || sparkle || engagement > 0 || glowOpacity > 0 || mouse.speed > 0) {
        raf = requestAnimationFrame(tick);
      }
    };

    const wake = () => {
      if (!raf && visible && dots.count > 0) raf = requestAnimationFrame(tick);
    };

    const applyResize = () => {
      if (!measure()) return;
      buildDots();
      gradientKey = '';
      wake();
    };

    let firstResize = true;
    const ro = new ResizeObserver(() => {
      if (firstResize) {
        firstResize = false;
        applyResize();
        return;
      }
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyResize, 100);
    });
    ro.observe(parent);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) {
        mouse.prevX = mouse.x;
        mouse.prevY = mouse.y;
        wake();
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(parent);

    const onMouseMove = (e: MouseEvent) => {
      if (!pointerMq.matches || reduceMq.matches) return; // layar sentuh / reduced motion: statis
      const x = e.pageX - offsetX;
      const y = e.pageY - offsetY;
      if (mouse.x === -9999) {
        mouse.prevX = x;
        mouse.prevY = y;
      }
      mouse.x = x;
      mouse.y = y;
      wake();
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    reduceMq.addEventListener('change', wake);
    pointerMq.addEventListener('change', wake);

    wakeRef.current = wake;
    rebuildRef.current = () => {
      buildDots();
      wake();
    };

    return () => {
      if (raf) cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      reduceMq.removeEventListener('change', wake);
      pointerMq.removeEventListener('change', wake);
      wakeRef.current = () => {};
      rebuildRef.current = () => {};
    };
  }, []);

  // sinkronkan props ke loop tanpa memasang ulang canvas
  useEffect(() => {
    const prev = cfgRef.current;
    cfgRef.current = {
      dotRadius,
      dotSpacing,
      cursorRadius,
      cursorForce,
      bulgeOnly,
      bulgeStrength,
      sparkle,
      waveAmplitude,
      gradientFrom,
      gradientTo,
    };
    if (prev.dotRadius !== dotRadius || prev.dotSpacing !== dotSpacing) rebuildRef.current();
    else wakeRef.current();
  }, [
    dotRadius,
    dotSpacing,
    cursorRadius,
    cursorForce,
    bulgeOnly,
    bulgeStrength,
    sparkle,
    waveAmplitude,
    gradientFrom,
    gradientTo,
  ]);

  return (
    <div className={`relative h-full w-full ${className ?? ''}`.trim()} {...rest}>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <svg
        aria-hidden="true"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      >
        <defs>
          <radialGradient id={glowId}>
            <stop offset="0%" stopColor={glowColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <circle
          ref={glowRef}
          cx="-9999"
          cy="-9999"
          r={glowRadius}
          fill={`url(#${glowId})`}
          style={{ opacity: 0 }}
        />
      </svg>
    </div>
  );
});

DotField.displayName = 'DotField';

export default DotField;
