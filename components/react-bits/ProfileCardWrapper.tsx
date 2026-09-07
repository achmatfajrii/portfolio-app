'use client';

import ProfileCard from './ProfileCard';

export default function ProfileCardWrapper() {
  return (
    <div className="flex [--pc-max-h:340px] sm:[--pc-max-h:420px] md:[--pc-max-h:540px]">
      <ProfileCard
        name="Achmat Fajri"
        title="Full Stack Developer"
        handle="achmadfajrii"
        status="Online"
        contactText="Contact Me"
        avatarUrl="/assets/profile/achmatfajri.png"
        showUserInfo
        enableTilt={true}
        enableMobileTilt
        onContactClick={() => console.log('Contact clicked')}
        behindGlowColor="#A855F7"
        iconUrl="/assets/profile/codingpattern.png"
        behindGlowEnabled
        innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
      />
    </div>
  );
}