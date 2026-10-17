// components/in-view.tsx
'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

export function InView({
  children,
  fallback = null,
  rootMargin = '200px',
}: {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref} className="h-full w-full">{visible ? children : fallback}</div>;
}