import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, MeshWobbleMaterial, Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

function CubeMesh({ isDarkMode }: { isDarkMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} castShadow>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial 
        color={isDarkMode ? "#fb923c" : "#f97316"} 
        roughness={0.1} 
        metalness={0.8} 
        envMapIntensity={2}
      />
    </mesh>
  );
}

export function RealisticCube({ className, isDarkMode = false }: { className?: string, isDarkMode?: boolean }) {
  return (
    <div className={className}>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <CubeMesh isDarkMode={isDarkMode} />
        </Float>

        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
}
