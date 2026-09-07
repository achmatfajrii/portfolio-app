// components/ProfileCardWrapper.tsx

'use client';

import OptionWheel from './OptionWheel';

export default function OptionWheelWrapper() {
  return (
   <OptionWheel
   className='p-0 m-0 absolute '
  items={['Background', 'Approach', 'Learning', 'Beyond Code', 'Looking For']}
  defaultSelected={2}
  textColor="#a6a6a6"
  activeColor="#ffffff"
  side="left"
  fontSize={2}
  spacing={2}
  curve={2}
  tilt={10}
  blur={2}
  fade={0.25}
  smoothing={150}
  inset={80}
  loop={true}
  draggable={false}
  soundUrl="/assets/sounds/click-soft.mp3"
  soundVolume={0.5}
  onChange={(index, item) => console.log(index, item)}
/>
  );
}