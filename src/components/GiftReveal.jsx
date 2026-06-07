import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, Box } from '@react-three/drei';
import confetti from 'canvas-confetti';
import * as THREE from 'three';

export default function GiftReveal() {
  const [opened, setOpened] = useState(false);
  const boxRef = useRef();

  useFrame((state) => {
    if (boxRef.current && !opened) {
      boxRef.current.rotation.y += 0.01;
      boxRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    
    // Trigger massive confetti
    var duration = 5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0844', '#ffb199', '#f6d365', '#fda085', '#fecfef']
      });
      confetti({
        ...defaults, particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0844', '#ffb199', '#f6d365', '#fda085', '#fecfef']
      });
    }, 250);
  };

  return (
    <group position={[0, 0, 0]}>
      {!opened ? (
        <Float speed={5} rotationIntensity={1} floatIntensity={2}>
          <group ref={boxRef} onClick={handleOpen} onPointerOver={() => document.body.style.cursor = 'pointer'} onPointerOut={() => document.body.style.cursor = 'auto'}>
            <Box args={[2, 2, 2]}>
              <meshStandardMaterial color="#ff0844" metalness={0.5} roughness={0.2} />
            </Box>
            {/* Ribbon horizontal */}
            <Box args={[2.05, 0.2, 2.05]}>
              <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.1} />
            </Box>
            {/* Ribbon vertical */}
            <Box args={[0.2, 2.05, 2.05]}>
              <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.1} />
            </Box>
            <Html position={[0, 2, 0]} center>
              <div style={{ background: 'rgba(255,255,255,0.8)', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 'bold', color: '#ff0844', whiteSpace: 'nowrap', animation: 'pulse 1.5s infinite' }}>
                Tap to Open!
              </div>
            </Html>
          </group>
        </Float>
      ) : (
        <Html center transform>
          <div className="glass-panel" style={{ width: '800px', animation: 'fadeInUp 1s ease forwards' }}>
            <h1 className="title" style={{fontSize: '3rem', marginBottom: '2rem'}}>Happy Birthday My World Best!</h1>
            <p className="message-text" style={{fontSize: '1.4rem', color: '#ff0844', fontWeight: 500}}>
              Knowing you is one of the biggest blessings in my life and I’m happy we crossed paths. May God elevate you, may he grant your heart desires. You deserve all the good things in this world.
            </p>
            <h2 className="romantic-script" style={{fontSize: '4rem', marginTop: '2rem'}}>
              I love you so much my Amuzu
            </h2>
          </div>
        </Html>
      )}
    </group>
  );
}
