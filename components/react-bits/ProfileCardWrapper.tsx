'use client';

import ProfileCard from './ProfileCard';

export default function ProfileCardWrapper() {
  return (
    <div className="flex justify-center [--pc-h:340px] [--pc-w:244px] sm:[--pc-h:420px] sm:[--pc-w:301px] md:[--pc-h:540px] md:[--pc-w:388px]">  
      <ProfileCard
        name="Achmat Fajri"
        title="Full Stack Developer"
        handle="achmadfajrii"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/assets/profile/achmatfajri.png"
        showUserInfo
        enableTilt={true}
        enableMobileTilt={true}
        mobileTiltSensitivity={5}
        onContactClick={() => console.log('Contact clicked')}
        behindGlowColor="#A855F7"
        iconUrl="/assets/profile/codingpattern.png"
        behindGlowEnabled
        innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
      />
    </div>
  );
}