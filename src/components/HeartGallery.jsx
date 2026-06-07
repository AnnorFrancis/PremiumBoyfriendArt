import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image, Float, Text, Html } from '@react-three/drei';
import * as THREE from 'three';

export default function HeartGallery() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t) * 0.1;
      // Gentle rotation to view the images
      groupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* HTML Overlay specific to this view */}
      <Html position={[0, -3.5, 0]} center transform>
        <div style={{ textAlign: 'center', width: '600px', background: 'rgba(255,255,255,0.3)', padding: '1rem', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
          <p style={{fontFamily: 'Poppins', fontSize: '1.2rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
            "You’re the most amazing person I’ve known, and I never take your love for granted."
          </p>
        </div>
      </Html>

      <group ref={groupRef}>
        {/* Heart Formation */}
        {/* Top Left */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[-1.5, 1.5, 0]}>
          <Image url="/assets/Image1.jpeg" scale={[2.5, 2.5]} transparent opacity={0.9} radius={0.2} />
        </Float>
        
        {/* Top Right */}
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5} position={[1.5, 1.5, 0]}>
          <Image url="/assets/Image2.jpeg" scale={[2.5, 2.5]} transparent opacity={0.9} radius={0.2} />
        </Float>

        {/* Bottom Left */}
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5} position={[-1, -1, 0.5]}>
          <Image url="/assets/Image3.jpeg" scale={[2.5, 2.5]} transparent opacity={0.9} radius={0.2} rotation={[0, 0.2, -0.2]} />
        </Float>

        {/* Bottom Right */}
        <Float speed={2.5} rotationIntensity={0.2} floatIntensity={0.5} position={[1, -1, 0.5]}>
          <Image url="/assets/Image4.jpeg" scale={[2.5, 2.5]} transparent opacity={0.9} radius={0.2} rotation={[0, -0.2, 0.2]} />
        </Float>
        
        {/* Center Heart Icon */}
        <Text
          position={[0, 0.5, 1]}
          fontSize={1.5}
          color="#ff0844"
          material-toneMapped={false}
        >
          ❤
        </Text>
      </group>
    </group>
  );
}
