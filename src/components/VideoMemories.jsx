import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

function SmartVideoPlane({ url, position, rotation, isActive }) {
  const meshRef = useRef();
  
  // Create video element once
  const [video] = useState(() => {
    const vid = document.createElement("video");
    vid.src = url;
    vid.crossOrigin = "Anonymous";
    vid.loop = true;
    vid.muted = true; // Muted for autoplay
    vid.playsInline = true; // Crucial for mobile performance
    return vid;
  });

  // Smart Focus: Only play if this video is the active one
  useEffect(() => {
    if (isActive) {
      video.play().catch(e => console.warn("Video autoplay prevented", e));
    } else {
      video.pause();
    }
  }, [isActive, video]);

  return (
    <Float speed={isActive ? 2 : 0.5} rotationIntensity={isActive ? 0.2 : 0} floatIntensity={isActive ? 0.5 : 0} position={position} rotation={rotation}>
      <mesh ref={meshRef}>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial>
          <videoTexture attach="map" args={[video]} colorSpace={THREE.SRGBColorSpace} />
        </meshBasicMaterial>
      </mesh>
    </Float>
  );
}

export default function VideoMemories() {
  const groupRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  // Carousel variables
  const items = 5;
  const radius = 6;
  const rotationSpeed = 0.3;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Rotate the carousel
      const currentRotation = t * rotationSpeed;
      groupRef.current.rotation.y = currentRotation;

      // Calculate which item is currently closest to the camera (front)
      // The camera is looking down the -Z axis at the origin. 
      // The item closest to camera is the one whose global Z is maximum (closest to camera position Z=10)
      // Or simply based on the rotation angle
      const normalizedRotation = currentRotation % (Math.PI * 2);
      
      // Each item is offset by (i / items) * Math.PI * 2
      // When the group rotates by currentRotation, the item's world angle is itemAngle + currentRotation
      // The item in front has a world angle close to 0 (or PI*2) because camera looks at Z from Z>0
      let maxZ = -Infinity;
      let active = 0;

      for (let i = 0; i < items; i++) {
        const itemAngle = (i / items) * Math.PI * 2;
        const worldAngle = itemAngle + currentRotation;
        const z = Math.cos(worldAngle) * radius;
        if (z > maxZ) {
          maxZ = z;
          active = i;
        }
      }
      
      if (active !== activeIndex) {
        setActiveIndex(active);
      }
    }
  });

  const positions = [];
  for(let i=0; i<items; i++) {
    const angle = (i / items) * Math.PI * 2;
    positions.push({
      pos: [Math.sin(angle) * radius, 0, Math.cos(angle) * radius],
      rot: [0, angle, 0] // Face outward
    });
  }

  const videoUrls = [
    "/assets/Video1.mp4",
    "/assets/Video2.mp4",
    "/assets/Video3.mp4",
    "/assets/Video4.mp4",
    "/assets/Video5.mp4"
  ];

  return (
    <group>
      <Html position={[0, -4, 0]} center transform>
        <div style={{ textAlign: 'center', width: '600px', background: 'rgba(255,255,255,0.3)', padding: '1rem', borderRadius: '15px', backdropFilter: 'blur(10px)' }}>
          <p style={{fontFamily: 'Poppins', fontSize: '1.2rem', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
            "I hope your day is as happy as you make me. Thank you for all the things you do for me, I don’t take them for granted."
          </p>
        </div>
      </Html>

      <group ref={groupRef} position={[0, 0.5, 0]}>
        {videoUrls.map((url, index) => (
          <SmartVideoPlane 
            key={index}
            url={url} 
            position={positions[index].pos} 
            rotation={positions[index].rot} 
            isActive={activeIndex === index}
          />
        ))}
      </group>
    </group>
  );
}
