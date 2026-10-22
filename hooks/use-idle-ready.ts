// hooks/use-idle-ready.ts
'use client';
import { useEffect, useState } from 'react';

type Options = { delay?: number; onInteraction?: boolean };

export function useIdleReady({ delay = 0, onInteraction = true }: Options = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let idle: number | undefined;
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const;

    function cleanup() {
      clearTimeout(timer);
      if (idle !== undefined) cancelIdleCallback(idle);
      window.removeEventListener('load', schedule);
      events.forEach((e) => window.removeEventListener(e, go));
    }
    function go() {
      cleanup();
      setReady(true);
    }
    function schedule() {
      timer = setTimeout(() => {
        if ('requestIdleCallback' in window) idle = requestIdleCallback(go, { timeout: 3000 });
        else go();
      }, delay);
    }

    if (onInteraction) events.forEach((e) => window.addEventListener(e, go, { passive: true }));
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule);

    return cleanup;
  }, [delay, onInteraction]);

  return ready;
}