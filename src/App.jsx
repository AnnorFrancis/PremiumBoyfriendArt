import React, { useState, Suspense, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Howl, Howler } from 'howler';

import ColorfulBackground from './components/ColorfulBackground';
import Gateway from './components/Gateway';
import MainHub from './components/MainHub';
import HeartGallery from './components/HeartGallery';
import VideoMemories from './components/VideoMemories';
import GiftReveal from './components/GiftReveal';

export default function App() {
  const [stage, setStage] = useState('gateway'); // gateway, hub, heart, videos, gift
  
  // Audio instances
  const [audioLegend] = useState(new Howl({ src: ['/assets/John_Legend_-_All_Of_Me_(mp3.pm).mp3'], loop: true, volume: 0 }));
  const [audioTems] = useState(new Howl({ src: ['/assets/Tems_-_me_u_(mp3.pm).mp3'], loop: true, volume: 0 }));
  const [audioKendrick] = useState(new Howl({ src: ['/assets/Kendrick_Lamar_-_luther_with_SZA_(mp3.pm).mp3'], loop: true, volume: 0 }));

  const crossfade = (trackIn) => {
    // Fade out all
    if (audioLegend.playing()) audioLegend.fade(audioLegend.volume(), 0, 1000);
    if (audioTems.playing()) audioTems.fade(audioTems.volume(), 0, 1000);
    if (audioKendrick.playing()) audioKendrick.fade(audioKendrick.volume(), 0, 1000);

    // Stop them after fade
    setTimeout(() => {
      if (trackIn !== audioLegend) audioLegend.pause();
      if (trackIn !== audioTems) audioTems.pause();
      if (trackIn !== audioKendrick) audioKendrick.pause();
    }, 1000);

    // Play and fade in new track
    if (!trackIn.playing()) trackIn.play();
    trackIn.fade(0, 0.8, 1000);
  };

  const navigateTo = (newStage) => {
    setStage(newStage);
    
    // Handle Music Changes
    if (newStage === 'hub' || newStage === 'gateway' || newStage === 'gift') {
      crossfade(audioLegend);
    } else if (newStage === 'heart') {
      crossfade(audioTems);
    } else if (newStage === 'videos') {
      crossfade(audioKendrick);
    }
  };

  return (
    <>
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <Suspense fallback={null}>
          <ColorfulBackground />
          
          {/* Conditional 3D Renderings */}
          {stage === 'heart' && <HeartGallery />}
          {stage === 'videos' && <VideoMemories />}
          {stage === 'gift' && <GiftReveal />}
        </Suspense>
      </Canvas>

      <Loader containerStyles={{ background: 'linear-gradient(-45deg, #ff9a9e, #fecfef)' }} />

      <div className="ui-layer">
        {stage === 'gateway' && <Gateway onStart={() => navigateTo('hub')} />}
        {stage === 'hub' && <MainHub onNavigate={navigateTo} />}
        
        {/* Back Button for sub-sections */}
        {(stage === 'heart' || stage === 'videos' || stage === 'gift') && (
          <button className="back-btn interactive" onClick={() => navigateTo('hub')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
        )}
      </div>
    </>
  );
}
