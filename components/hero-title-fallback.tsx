
export function HeroTitleFallback({
  fontSize = 88,
}: {
  fontSize?: number;
}) {
  return (
    <div
      className="select-none py-4 text-center uppercase text-foreground"
      style={{
        fontSize,
        fontWeight: 800,
        letterSpacing: '-0.06em',
        lineHeight: 1,
      }}
      aria-hidden="true"
    >
      MY PORTFOLIO
    </div>
  );
}
