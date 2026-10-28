// components/portfolio-assistant-lazy.tsx
'use client';
import dynamic from 'next/dynamic';
import { useInteractionReady } from '@/hooks/use-interaction-ready';

const PortfolioAssistant = dynamic(() => import('@/components/PortfolioAssistant'), { ssr: false });

export function PortfolioAssistantLazy() {
  const ready = useInteractionReady(8000);
  return ready ? <PortfolioAssistant /> : null;
}