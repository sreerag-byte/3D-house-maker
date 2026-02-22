import React, { Suspense, useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Stage, 
  Environment, 
  ContactShadows, 
  PerspectiveCamera, 
  OrthographicCamera,
  Float,
  Stars,
  Text,
  Edges,
  MeshDistortMaterial,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Box, 
  Compass as CompassIcon, 
  Maximize2, 
  Layers,
  Minimize2,
  Zap,
  Activity,
  Cpu,
  Crosshair,
  RotateCw,
  Move,
  Scan,
  Sparkles,
  Layout
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ViewerProps {
  data: any | null;
  config: any;
}

function ScanningEffect({ height }: { height: number }) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = (Math.sin(clock.getElapsedTime() * 1.5) * 0.5 + 0.5) * height;
    }
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <meshBasicMaterial 
        color="#FF8C42" 
        transparent 
        opacity={0.1} 
        side={THREE.DoubleSide} 
      />
    </mesh>
  );
}

function Model({ data, config }: ViewerProps) {
  const meshRef = useRef<THREE.Group>(null);

  // Mock architectural elements based on data
  const elements = useMemo(() => {
    if (!data) return [];
    return [
      { pos: [0, 1, 0], scale: [4, 2, 4], color: '#ffffff', label: 'Main Hall' },
      { pos: [3, 0.75, 0], scale: [2, 1.5, 2], color: '#f8f8f8', label: 'Studio' },
      { pos: [-3, 0.75, 0], scale: [2, 1.5, 2], color: '#f8f8f8', label: 'Gallery' },
    ];
  }, [data]);

  return (
    <group ref={meshRef}>
      {elements.map((el, i) => (
        <group key={i} position={el.pos as any}>
          <mesh scale={el.scale as any}>
            <boxGeometry />
            {config.materials ? (
              <meshStandardMaterial 
                color={el.color} 
                roughness={0.1} 
                metalness={0.1}
                transparent={config.wireframe}
                opacity={config.wireframe ? 0.2 : 1}
              />
            ) : (
              <meshNormalMaterial wireframe={config.wireframe} />
            )}
            {config.edges && <Edges color="#2D1B08" threshold={15} />}
          </mesh>
          
          {config.labels && (
            <Html distanceFactor={10} position={[0, el.scale[1] / 2 + 0.5, 0]} center>
              <div className="px-4 py-2 bg-white rounded-xl border-2 border-[#2D1B08] shadow-lg whitespace-nowrap">
                <span className="text-[10px] font-bold text-[#2D1B08] uppercase tracking-widest">{el.label}</span>
              </div>
            </Html>
          )}
        </group>
      ))}
      
      {data && <ScanningEffect height={3} />}
    </group>
  );
}

function CompassHUD() {
  const [rotation, setRotation] = useState(0);

  return (
    <div className="absolute bottom-12 left-12 w-32 h-32 glass-panel rounded-full flex items-center justify-center cartoon-border">
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="absolute inset-4 border-2 border-dashed border-[#2D1B08]/10 rounded-full" />
        <motion.div 
          animate={{ rotate: rotation }}
          className="relative z-10"
        >
          <CompassIcon className="w-10 h-10 text-[#FF8C42]" />
        </motion.div>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[8px] font-bold text-[#2D1B08] uppercase tracking-widest">North</div>
      </div>
    </div>
  );
}

export function ThreeViewer({ data, config }: ViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className={cn(
      "relative w-full h-full transition-all duration-700 overflow-hidden",
      isFullscreen ? "fixed inset-0 z-[100] bg-white" : "rounded-[4rem] glass-panel cartoon-border"
    )}>
      {/* Viewport Overlay */}
      <div className="absolute inset-0 pointer-events-none z-10 p-12 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4 px-6 py-3 bg-white rounded-2xl cartoon-border pointer-events-auto shadow-xl">
              <div className="w-3 h-3 rounded-full bg-[#FF8C42] animate-pulse" />
              <span className="text-xs font-bold text-[#2D1B08] uppercase tracking-widest">Studio View</span>
            </div>
            
            <div className="flex flex-col gap-3 pointer-events-auto">
              {[
                { icon: RotateCw, label: 'Orbit' },
                { icon: Move, label: 'Pan' },
                { icon: Scan, label: 'Zoom' },
              ].map((tool, i) => (
                <button key={i} className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#2D1B08]/40 hover:text-[#2D1B08] transition-all cartoon-border shadow-lg">
                  <tool.icon className="w-6 h-6" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 pointer-events-auto">
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#2D1B08]/40 hover:text-[#2D1B08] transition-all cartoon-border shadow-lg"
            >
              {isFullscreen ? <Minimize2 className="w-6 h-6" /> : <Maximize2 className="w-6 h-6" />}
            </button>
            <button className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-[#2D1B08]/40 hover:text-[#2D1B08] transition-all cartoon-border shadow-lg">
              <Layers className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <CompassHUD />
          
          <div className="flex flex-col gap-6 items-end pointer-events-auto">
            <div className="glass-panel p-8 rounded-[2.5rem] cartoon-border flex flex-col gap-4 shadow-2xl">
              <div className="flex items-center gap-4">
                <Sparkles className="w-5 h-5 text-[#FF8C42]" />
                <span className="text-[10px] font-bold text-[#2D1B08] uppercase tracking-widest">Organic Rendering</span>
              </div>
              <div className="h-1.5 w-48 bg-[#2D1B08]/5 rounded-full overflow-hidden cartoon-border p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '85%' }}
                  className="h-full bg-[#2D1B08] rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows dpr={[1, 2]}>
        <color attach="background" args={['#fff9f5']} />
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
          {config.ortho && <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={50} />}
          
          <Stage environment="studio" intensity={0.5}>
            <Model data={data} config={config} />
          </Stage>

          {config.daylight && (
            <>
              <Environment preset="sunset" />
              <directionalLight 
                position={[10, 10, 5]} 
                intensity={1} 
                castShadow 
                shadow-mapSize={[2048, 2048]}
              />
            </>
          )}

          <ContactShadows 
            position={[0, -0.01, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2} 
            far={4.5} 
          />

          <OrbitControls 
            makeDefault 
            enableDamping 
            dampingFactor={0.05}
            minPolarAngle={0}
            maxPolarAngle={Math.PI / 2}
          />

          {config.ambient && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />}
        </Suspense>
      </Canvas>
    </div>
  );
}
