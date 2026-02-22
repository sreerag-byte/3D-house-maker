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

// Technical HUD Component
function ViewerHUD({ config }: { config: any }) {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 p-6 flex flex-col justify-between font-mono">
      {/* Top HUD */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-4">
          <motion.div 
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#0A0A0B]/80 border border-white/10 px-4 py-2 rounded flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
            <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">VIEWPORT_RENDER_ACTIVE</span>
          </motion.div>
          
          <div className="flex gap-2">
            {[Compass, Layers, Box].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="w-10 h-10 bg-[#0A0A0B]/80 border border-white/10 rounded flex items-center justify-center hover:bg-white/5 transition-colors pointer-events-auto cursor-pointer"
              >
                <Icon className="w-4 h-4 text-white/30" />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <motion.div 
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-[#0A0A0B]/80 border border-white/10 px-4 py-2 rounded flex items-center gap-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span className="text-[9px] font-bold text-white/80 tracking-widest uppercase">PRECISION_99.8%</span>
          </motion.div>
          <div className="text-[8px] text-white/20 tracking-widest uppercase">LATENCY: 12ms</div>
        </div>
      </div>

      {/* Bottom HUD */}
      <div className="flex justify-between items-end">
        <div className="bg-[#0A0A0B]/80 border border-white/10 p-4 rounded flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Activity className="w-4 h-4 text-orange-500/60" />
            <div>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">POLYGONS</p>
              <p className="text-[10px] font-bold text-white/80 tracking-widest">124,502</p>
            </div>
          </div>
          <div className="w-px h-6 bg-white/5" />
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-orange-500/60" />
            <div>
              <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest">ENGINE</p>
              <p className="text-[10px] font-bold text-white/80 tracking-widest">NEURAL_v4</p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="w-10 h-10 bg-[#0A0A0B]/80 border border-white/10 rounded flex items-center justify-center pointer-events-auto hover:bg-white/10 transition-colors">
            <Maximize2 className="w-4 h-4 text-white/60" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Technical Scene Component
function Scene({ config }: { config: any }) {
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
      <ambientLight intensity={0.2} />
      <spotLight position={[10, 15, 10]} angle={0.3} penumbra={1} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Environment preset="city" />

      {/* Scene Content */}
      <Center top>
        <group ref={meshRef}>
          {/* Base Plate */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[10, 0.1, 14]} />
            <meshStandardMaterial color="#121214" roughness={0.2} metalness={0.8} />
          </mesh>

          {/* Technical Grid Overlay on Mesh */}
          <mesh position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[10, 14]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.05} wireframe />
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
                color={config.materials ? "#fb923c" : "#ffffff"} 
                wireframe={config.wireframe}
                transparent
                opacity={0.8}
                metalness={0.5}
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
        sectionColor="#ffffff" 
        cellColor="#ffffff" 
        sectionThickness={1}
        cellThickness={0.5}
      />
      
      <ContactShadows 
        position={[0, -0.01, 0]} 
        opacity={0.6} 
        scale={30} 
        blur={2.5} 
        far={4} 
      />
    </>
  );
}

export function ThreeViewer({ data, config }: { data: any, config: any }) {
  return (
    <div className="w-full h-full relative bg-[#0A0A0B]">
      {/* Technical Grid Background */}
      <div className="absolute inset-0 technical-grid opacity-10 pointer-events-none" />
      
      <ViewerHUD config={config} />
      
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <Suspense fallback={null}>
          <Scene config={config} />
        </Suspense>
      </Canvas>

      {/* Scanning Effect Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 opacity-[0.05]">
        <motion.div 
          animate={{ top: ['-100%', '200%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-orange-500 to-transparent"
        />
      </div>
    </div>
  );
}
