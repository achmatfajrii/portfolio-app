'use client';
import { useEffect, useState } from 'react';
import ProfileCardWrapper from '@/components/react-bits/ProfileCardWrapper';
import AboutInteractive from '@/components/AboutInteractive';
import BackgroundVisual from '@/components/BackgroundVisual';
import ApproachVisual from '@/components/ApproachVisual';
import LearningVisual from '@/components/LearningVisual';
import LookingForVisual from '@/components/LookingForVisual';

const VISUALS = [
  ProfileCardWrapper,
  BackgroundVisual,
  ApproachVisual,
  LearningVisual,
  LookingForVisual,
];

function useIsMdViewport() {
  const [isMd, setIsMd] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const update = () => setIsMd(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return isMd;
}

export function AboutSection() {
  const [aboutSelected, setAboutSelected] = useState(0);
  const isMd = useIsMdViewport();
  const Visual = VISUALS[aboutSelected];

  return (
    <section id="about" className="bg-[#0E0C14] py-8 md:pt-24">
      <div className="container grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="relative w-full min-w-0 flex flex-row items-center justify-center text-muted-foreground">
          <AboutInteractive
            selected={aboutSelected}
            onSelect={setAboutSelected}
            visual={isMd === false ? <Visual /> : null}
          />
        </div>

        {isMd && (
          <div className="space-y-4">
            <Visual />
          </div>
        )}
      </div>
    </section>
  );
}