import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// A highly optimized 3D Heart Geometry
function HeartShape() {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    const x = 0, y = 0;
    s.moveTo(x + 5, y + 5);
    s.bezierCurveTo(x + 5, y + 5, x + 4, y, x, y);
    s.bezierCurveTo(x - 6, y, x - 6, y + 7, x - 6, y + 7);
    s.bezierCurveTo(x - 6, y + 11, x - 3, y + 15.4, x + 5, y + 19);
    s.bezierCurveTo(x + 12, y + 15.4, x + 16, y + 11, x + 16, y + 7);
    s.bezierCurveTo(x + 16, y + 7, x + 16, y, x + 10, y);
    s.bezierCurveTo(x + 7, y, x + 5, y + 5, x + 5, y + 5);
    return s;
  }, []);

  const extrudeSettings = { depth: 2, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
  
  return (
    <extrudeGeometry args={[shape, extrudeSettings]} />
  );
}

export default function ColorfulBackground() {
  const groupRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <>
      <ambientLight intensity={1.5} color="#ffe4e1" />
      <directionalLight position={[10, 10, 10]} intensity={2} color="#ffd700" />
      <pointLight position={[0, -10, 0]} intensity={3} color="#ff69b4" />

      {/* Cinematic Golden Bokeh / Particles */}
      <Sparkles count={800} scale={25} size={3} speed={0.3} opacity={0.8} color="#ffd700" />
      <Sparkles count={400} scale={25} size={6} speed={0.5} opacity={0.5} color="#ff69b4" />
      <Stars radius={40} depth={50} count={2000} factor={4} saturation={1} fade speed={1} />

      <group ref={groupRef}>
        {/* Floating Hearts and Lanterns - Using Standard Materials for high performance */}
        {Array.from({ length: 15 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 30;
          const y = (Math.random() - 0.5) * 30;
          const z = (Math.random() - 0.5) * 20 - 10;
          const scale = Math.random() * 0.05 + 0.02;
          
          return (
            <Float key={i} speed={Math.random() * 2 + 1} rotationIntensity={2} floatIntensity={3} position={[x, y, z]}>
              <mesh scale={[scale, scale, scale]} rotation={[0, 0, Math.PI]}>
                <HeartShape />
                <meshStandardMaterial color={i % 2 === 0 ? "#ff0844" : "#ffb199"} roughness={0.3} metalness={0.8} />
              </mesh>
            </Float>
          );
        })}

        {/* Floating Glowing Orbs (Lanterns) */}
        {Array.from({ length: 20 }).map((_, i) => {
          const x = (Math.random() - 0.5) * 40;
          const y = (Math.random() - 0.5) * 40;
          const z = (Math.random() - 0.5) * 20 - 15;
          const scale = Math.random() * 0.5 + 0.2;
          
          return (
            <Float key={`orb-${i}`} speed={Math.random() * 3 + 1} rotationIntensity={1} floatIntensity={5} position={[x, y, z]}>
              <mesh scale={[scale, scale, scale]}>
                <sphereGeometry args={[1, 32, 32]} />
                <meshStandardMaterial color="#ffd700" emissive="#ff8c00" emissiveIntensity={0.8} roughness={0.1} />
              </mesh>
            </Float>
          );
        })}
      </group>
    </>
  );
}
