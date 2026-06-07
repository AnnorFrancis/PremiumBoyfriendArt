import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sparkles, MeshDistortMaterial, Float, Stars } from '@react-three/drei';

export default function Finale() {
  const coreRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.5;
      coreRef.current.rotation.x = t * 0.2;
    }
  });

  return (
    <group position={[0, 0, -5]}>
      <ambientLight intensity={1} />
      <directionalLight position={[0, 5, 5]} intensity={2} color="#ffd700" />
      <pointLight position={[0, 0, 0]} intensity={5} color="#ff8c00" />

      <Stars radius={30} depth={50} count={5000} factor={6} saturation={1} fade speed={2} />
      <Sparkles count={500} scale={10} size={5} speed={1} color="#ffd700" opacity={0.8} />

      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={coreRef}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial color="#ffd700" emissive="#ff8c00" emissiveIntensity={0.8} wireframe />
        </mesh>
      </Float>

      <Float speed={3} rotationIntensity={1} floatIntensity={0.5}>
        <mesh>
          <sphereGeometry args={[1.5, 64, 64]} />
          <MeshDistortMaterial color="#ff4500" emissive="#8b0000" emissiveIntensity={0.5} distort={0.6} speed={3} roughness={0.2} metalness={0.8} />
        </mesh>
      </Float>
    </group>
  );
}
