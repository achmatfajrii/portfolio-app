'use client';
import { useState } from 'react';
import ProfileCardWrapper from '@/components/react-bits/ProfileCardWrapper';
import AboutInteractive from '@/components/AboutInteractive';
import BackgroundVisual from '@/components/BackgroundVisual';
import ApproachVisual from '@/components/ApproachVisual';
import LearningVisual from '@/components/LearningVisual';
import LookingForVisual from '@/components/LookingForVisual';

export function AboutSection() {
  const [aboutSelected, setAboutSelected] = useState(0);

  const visuals = [
    <ProfileCardWrapper key="profile" />,
    <BackgroundVisual key="background" />,
    <ApproachVisual key="approach" />,
    <LearningVisual key="learning" />,
    <LookingForVisual key="lookingfor" />,
  ];

  return (
    <section id="about" className="bg-[#0E0C14] py-8 md:pt-24">
      <div className="container grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="relative w-full min-w-0 flex flex-row items-center justify-center text-muted-foreground">
          <AboutInteractive
            selected={aboutSelected}
            onSelect={setAboutSelected}
            visual={visuals[aboutSelected]}
          />
        </div>

        {/* Kolom visual hanya md ke atas; di mobile AboutInteractive merender visualnya sendiri */}
        <div className="hidden md:block space-y-4">{visuals[aboutSelected]}</div>
      </div>
    </section>
  );
}