import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  PerspectiveCamera, 
  Environment, 
  ContactShadows, 
  Grid,
  Center,
} from '@react-three/drei';
import * as THREE from 'three';
import { 
  Maximize2, 
  Compass, 
  Layers, 
  Box, 
  Activity, 
  Zap,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Clean HUD Component
function ViewerHUD({ config }: { config: any }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 p-8 flex flex-col justify-between font-sans">
      {/* Top HUD */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 soft-shadow pointer-events-auto"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">Live View</span>
          </motion.div>
          
          <div className="flex gap-2">
            {[Compass, Layers, Box].map((Icon, i) => (
              <motion.button
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-12 h-12 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/5 rounded-2xl flex items-center justify-center hover:bg-white dark:hover:bg-white/10 transition-all pointer-events-auto soft-shadow"
              >
                <Icon className="w-5 h-5 text-gray-400" />
              </motion.button>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/5 px-6 py-3 rounded-2xl flex items-center gap-4 soft-shadow pointer-events-auto"
          >
            <Sparkles className="w-4 h-4 text-orange-500" />
            <span className="text-[10px] font-bold text-gray-900 dark:text-white uppercase tracking-widest">High Detail</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end">
        <div className="bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/5 p-6 rounded-[2rem] flex items-center gap-10 soft-shadow pointer-events-auto">
          <div className="flex items-center gap-4">
            <Activity className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">Complexity</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">124k Polygons</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-100 dark:bg-white/10" />
          <div className="flex items-center gap-4">
            <Zap className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">Engine</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">Smart v4</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="w-12 h-12 bg-white/80 dark:bg-black/40 backdrop-blur-md border border-gray-100 dark:border-white/5 rounded-2xl flex items-center justify-center pointer-events-auto hover:bg-white dark:hover:bg-white/10 transition-all soft-shadow">
            <Maximize2 className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Scene Component
function Scene({ config, isDarkMode }: { config: any, isDarkMode: boolean }) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[12, 12, 12]} fov={40} />
      <OrbitControls 
        makeDefault 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={50}
      />

      {/* Lighting */}
      <ambientLight intensity={config.ambient ? (isDarkMode ? 0.4 : 0.8) : 0.1} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={isDarkMode ? 2 : 1.5} castShadow={config.shadows} />
      <pointLight position={[-10, -10, -10]} intensity={isDarkMode ? 0.2 : 0.5} />
      
      <Environment preset={isDarkMode ? "night" : "city"} />

      {/* Scene Content */}
      <Center top>
        <group ref={meshRef}>
          {/* Base Plate */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[10, 0.1, 14]} />
            <meshStandardMaterial color={isDarkMode ? "#111" : "#ffffff"} roughness={0.1} metalness={0.1} />
          </mesh>

          {/* Mock Walls */}
          {[
            { pos: [0, 1.5, -7], size: [10, 3, 0.1] },
            { pos: [0, 1.5, 7], size: [10, 3, 0.1] },
            { pos: [-5, 1.5, 0], size: [0.1, 3, 14] },
            { pos: [5, 1.5, 0], size: [0.1, 3, 14] },
            { pos: [0, 1.5, 0], size: [0.1, 3, 4] },
          ].map((wall, i) => (
            <mesh key={i} position={wall.pos as any} castShadow receiveShadow>
              <boxGeometry args={wall.size as any} />
              <meshStandardMaterial 
                color={config.materials ? "#fb923c" : (isDarkMode ? "#444" : "#ffffff")} 
                wireframe={config.wireframe}
                transparent
                opacity={0.9}
                metalness={0.1}
                roughness={0.2}
              />
            </mesh>
          ))}
        </group>
      </Center>

      {/* Ground & Shadows */}
      <Grid 
        infiniteGrid 
        fadeDistance={40} 
        fadeStrength={5} 
        cellSize={1} 
        sectionSize={5} 
        sectionColor={isDarkMode ? "#222" : "#e5e7eb"} 
        cellColor={isDarkMode ? "#111" : "#f3f4f6"} 
        sectionThickness={1}
        cellThickness={0.5}
      />
      
      <ContactShadows 
        position={[0, -0.01, 0]} 
        opacity={isDarkMode ? 0.6 : 0.4} 
        scale={30} 
        blur={2.5} 
        far={4} 
      />
    </>
  );
}

export function ThreeViewer({ data, config, isDarkMode }: { data: any, config: any, isDarkMode: boolean }) {
  return (
    <div className="w-full h-full relative bg-gray-50 dark:bg-[#0A0A0B]">
      <ViewerHUD config={config} />
      
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene config={config} isDarkMode={isDarkMode} />
        </Suspense>
      </Canvas>
    </div>
  );
}
