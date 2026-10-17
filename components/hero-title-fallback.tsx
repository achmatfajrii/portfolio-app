// components/hero-title-fallback.tsx
export function HeroTitleFallback({ fontSize = 88 }: { fontSize?: number }) {
  return (
    <h1
      className="select-none py-4 text-center uppercase"
      style={{
        fontSize,
        fontWeight: 800,
        letterSpacing: '-0.06em',
        lineHeight: 1,
        color: '#f8f5ff',
      }}
    >
      MY PORTFOLIO
    </h1>
  );
}