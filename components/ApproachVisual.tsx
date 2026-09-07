import BlurText from "./react-bits/BlurText";

export default function ApproachVisual() {
  return (
    <div className="flex w-full h-full items-center justify-center">
    
      <BlurText
  text="Isn't this so cool?!"
  delay={500}
  animateBy="words"
  direction="top"
  className="text-xl text-center sm:text-5xl md:text-7xl"
/>
    </div>
  );
}