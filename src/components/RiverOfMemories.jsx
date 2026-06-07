import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture, useVideoTexture, Float, Stars, Text } from '@react-three/drei';
import * as THREE from 'three';

// Fallback materials in case assets are missing
const ErrorMaterial = () => <meshBasicMaterial color="red" wireframe />;

function MediaPlane({ position, rotation, texturePath, type, text }) {
  const meshRef = useRef();
  
  // Conditionally load texture (using standard texture for now, user will swap)
  // We'll catch errors gracefully if the user hasn't added the file yet.
  let tex = null;
  try {
    if (type === 'video') {
       // useVideoTexture requires a valid video. We will use a standard material if it fails.
       tex = useVideoTexture(texturePath, { muted: true, loop: true, start: true });
    } else {
       tex = useTexture(texturePath);
    }
  } catch (e) {
    console.warn(`Could not load ${texturePath}. Please add it to public/assets/`);
  }

  useFrame((state) => {
    // Gentle floating
    if (meshRef.current) {
      meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <planeGeometry args={[4, 3]} />
          {tex ? (
            <meshStandardMaterial map={tex} side={THREE.DoubleSide} emissive="#222" emissiveIntensity={0.5} />
          ) : (
            <meshStandardMaterial color="#333" />
          )}
        </mesh>
        {text && (
          <Text
            position={[0, -2, 0.5]}
            fontSize={0.4}
            color="#ffd700"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/cinzel/v19/8vIcdryL0igB2pQ5_Hk.woff"
          >
            {text}
          </Text>
        )}
      </Float>
    </group>
  );
}

export default function RiverOfMemories({ onComplete }) {
  const { camera } = useThree();
  const groupRef = useRef();
  const [started] = useState(Date.now());

  useFrame((state) => {
    const elapsed = (Date.now() - started) / 1000;
    
    // Move camera forward slowly through the Z axis
    // Start at z=10, move to z=-30 over 20 seconds
    const progress = Math.min(elapsed / 20, 1);
    camera.position.z = THREE.MathUtils.lerp(10, -30, progress);
    
    // Add slight sway to camera
    camera.position.x = Math.sin(elapsed * 0.5) * 2;
    camera.position.y = Math.cos(elapsed * 0.3) * 1;
    
    // Look slightly ahead
    camera.lookAt(0, 0, camera.position.z - 10);

    // When we reach the end, trigger finale
    if (progress >= 1) {
      onComplete();
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} color="#ffd700" />
      <pointLight position={[0, 0, -10]} intensity={2} color="#ff8c00" />

      <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />

      {/* The Gallery setup along the Z axis */}
      <MediaPlane 
        position={[-3, 1, 0]} 
        rotation={[0, 0.2, 0]} 
        texturePath="/assets/image1.jpg" 
        type="image" 
        text="Where it started" 
      />
      
      <MediaPlane 
        position={[4, -1, -8]} 
        rotation={[0, -0.3, 0]} 
        texturePath="/assets/video1.mp4" 
        type="video" 
        text="The laughs" 
      />
      
      <MediaPlane 
        position={[-4, 2, -16]} 
        rotation={[0, 0.4, 0]} 
        texturePath="/assets/image2.jpg" 
        type="image" 
        text="The adventures" 
      />
      
      <MediaPlane 
        position={[3, -2, -24]} 
        rotation={[0, -0.2, 0]} 
        texturePath="/assets/image3.jpg" 
        type="image" 
        text="Every single moment" 
      />

      {/* Decorative floating particles */}
      {Array.from({ length: 50 }).map((_, i) => (
        <mesh key={i} position={[(Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * -40]}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#ffd700" />
        </mesh>
      ))}
    </group>
  );
}
