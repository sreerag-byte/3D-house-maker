import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
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
  Edges
} from '@react-three/drei';
import * as THREE from 'three';
import { Box } from 'lucide-react';

interface ViewerProps {
  data: any | null;
  config: any;
}

function HouseModel({ data, config }: { data: any, config: any }) {
  const { layout, specs } = data;
  const { footprint } = layout;
  const { wallHeight, roofType } = specs;
  
  // Create wall geometry by extruding the footprint
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    if (footprint && footprint.length > 0) {
      s.moveTo(footprint[0].x, footprint[0].y);
      for (let i = 1; i < footprint.length; i++) {
        s.lineTo(footprint[i].x, footprint[i].y);
      }
      s.closePath();
    }
    return s;
  }, [footprint]);

  const extrudeSettings = {
    steps: 1,
    depth: wallHeight,
    bevelEnabled: false,
  };

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* Walls */}
      <mesh castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshStandardMaterial 
          color={config.materials ? "#1e293b" : "#ffffff"} 
          wireframe={config.wireframe}
          metalness={0.8}
          roughness={0.2}
        />
        {config.edges && <Edges color="#f97316" threshold={15} />}
      </mesh>

      {/* Roof */}
      <mesh position={[0, 0, wallHeight]} castShadow>
        {roofType === 'gabled' ? (
          <coneGeometry args={[8, 4, 4]} />
        ) : (
          <boxGeometry args={[12, 12, 0.5]} />
        )}
        <meshStandardMaterial 
          color={config.materials ? "#f97316" : "#ffffff"} 
          wireframe={config.wireframe}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>

      {/* Floor */}
      <mesh position={[0, 0, -0.01]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#020617" opacity={0.5} transparent />
        <gridHelper args={[40, 40, "#f97316", "#1e293b"]} rotation={[Math.PI / 2, 0, 0]} />
      </mesh>

      {/* Labels */}
      {config.labels && (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <Text
            position={[0, 0, wallHeight + 5]}
            fontSize={0.8}
            color="#f97316"
            anchorX="center"
            anchorY="middle"
          >
            NEURAL_RECONSTRUCTION_V1
          </Text>
        </Float>
      )}
    </group>
  );
}

function DecorativePlants() {
  return (
    <group>
      {[...Array(8)].map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={1} floatIntensity={1} position={[
          Math.sin(i) * 15,
          -2,
          Math.cos(i) * 15
        ]}>
          <mesh>
            <octahedronGeometry args={[0.5, 0]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={2} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

export function ThreeViewer({ data, config }: ViewerProps) {
  return (
    <div className="w-full h-full bg-[#020817] relative overflow-hidden">
      <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
        {config.ortho ? (
          <OrthographicCamera makeDefault position={[10, 10, 10]} zoom={50} />
        ) : (
          <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={45} />
        )}
        
        <Suspense fallback={null}>
          <color attach="background" args={['#020817']} />
          
          {config.daylight ? (
            <>
              <Environment preset="night" />
              <directionalLight 
                position={[10, 20, 10]} 
                intensity={1.5} 
                castShadow 
                shadow-mapSize={[2048, 2048]}
              />
            </>
          ) : (
            <>
              <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
              <pointLight position={[10, 10, 10]} intensity={2} color="#f97316" />
              <pointLight position={[-10, 5, -10]} intensity={1} color="#1e3a8a" />
            </>
          )}

          <ambientLight intensity={config.ambient ? 0.4 : 0.1} />

          <Stage environment={null} intensity={0.5} adjustCamera={false}>
            {data && <HouseModel data={data} config={config} />}
          </Stage>

          <DecorativePlants />

          {config.shadows && (
            <ContactShadows 
              opacity={0.4} 
              scale={40} 
              blur={2} 
              far={20} 
              resolution={512} 
              color="#f97316" 
            />
          )}
        </Suspense>
        
        <OrbitControls 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI / 1.8}
          enableDamping
          dampingFactor={0.05}
        />
      </Canvas>

      {/* Overlay UI */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1 h-12 bg-orange-500 animate-pulse" />
            <div>
              <h2 className="text-5xl font-display font-black uppercase tracking-tighter text-white italic leading-none">
                {data ? "Neural Render" : "Engine Standby"}
              </h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em] mt-2">
                {data ? `Matrix_ID: ${data.jobId || 'SCAN_001'}` : "Awaiting Volumetric Data"}
              </p>
            </div>
          </div>
          {data && (
            <div className="flex gap-4 mt-4">
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Polys: 4.2M</span>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                <span className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Lat: 12ms</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {!data && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 opacity-20">
            <Box className="w-24 h-24 mx-auto text-orange-500 animate-bounce" />
            <p className="font-display font-bold text-xl uppercase tracking-widest text-orange-500">Initialize Workspace</p>
          </div>
        </div>
      )}

      {/* Bottom Right HUD */}
      <div className="absolute bottom-10 right-10 pointer-events-none hidden lg:block">
        <div className="text-right">
          <p className="text-[10px] font-mono text-orange-500 uppercase tracking-[0.3em] mb-1">Vector Matrix v4.2</p>
          <p className="text-[8px] font-mono text-slate-600 uppercase tracking-widest">Spatial Reconstruction Active</p>
        </div>
      </div>
    </div>
  );
}
