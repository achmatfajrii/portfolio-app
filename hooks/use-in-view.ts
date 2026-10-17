// hooks/use-in-view.ts
'use client';
import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(rootMargin = '100px') {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return { ref, inView };
}