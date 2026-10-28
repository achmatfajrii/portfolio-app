// hooks/use-interaction-ready.ts
'use client';
import { useEffect, useState } from 'react';

/** true setelah interaksi pertama user, ATAU `timeout` ms setelah window load. */
export function useInteractionReady(timeout = 5000) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    const events = ['pointerdown', 'pointermove', 'scroll', 'keydown', 'touchstart'];
    let timer: ReturnType<typeof setTimeout> | undefined;

    function fire() {
      cleanup();
      setReady(true);
    }
    function onLoad() {
      timer = setTimeout(fire, timeout);
    }
    function cleanup() {
      events.forEach((e) => window.removeEventListener(e, fire));
      window.removeEventListener('load', onLoad);
      clearTimeout(timer);
    }

    events.forEach((e) => window.addEventListener(e, fire, { passive: true }));
    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad);
    return cleanup;
  }, [ready, timeout]);

  return ready;
}