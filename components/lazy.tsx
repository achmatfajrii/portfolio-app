// components/lazy.tsx
'use client';
import dynamic from 'next/dynamic';

export const Lanyard = dynamic(() => import('@/components/react-bits/Lanyard'), { ssr: false });
export const DotField = dynamic(() => import('@/components/react-bits/DotField'), { ssr: false });
export const CardSwap = dynamic(() => import('@/components/react-bits/CardSwap'), { ssr: false });
export const WarpText = dynamic(() => import('@/components/react-bits/WarpText'), { ssr: false });