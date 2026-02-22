import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Box, 
  Maximize, 
  Layers, 
  Activity,
  Download,
  Share2,
  Palette,
  Sparkles,
  Grid,
  Cpu,
  Terminal,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ControlPanelProps {
  config: any;
  setConfig: (config: any) => void;
}

const logs = [
  "INITIALIZING_NEURAL_WEIGHTS...",
  "PARSING_GEOMETRY_DATA...",
  "OPTIMIZING_MESH_TOPOLOGY...",
  "CALCULATING_LIGHT_BOUNCES...",
  "SYSTEM_READY_FOR_INTERACTION",
  "EXPORT_BUFFER_CLEARED",
  "UPDATING_VIEWPORT_STATE...",
];

export function ControlPanel({ config, setConfig }: ControlPanelProps) {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setActiveLogs(prev => [randomLog, ...prev].slice(0, 8));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const toggleConfig = (key: string) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  return (
    <aside className="w-80 h-full flex flex-col gap-4 z-40 overflow-hidden font-mono">
      {/* Parameters Panel */}
      <div className="bg-[#121214] border border-white/5 rounded-lg p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
            <Settings className="text-orange-500 w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white tracking-widest uppercase">Parameters</h3>
            <p className="text-[8px] text-white/20 tracking-widest uppercase">Render_Configuration</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <FeatureItem 
            icon={Sun} 
            label="SUNLIGHT" 
            active={config.daylight} 
            onClick={() => toggleConfig('daylight')} 
          />
          <FeatureItem 
            icon={Grid} 
            label="WIREFRAME" 
            active={config.wireframe} 
            onClick={() => toggleConfig('wireframe')} 
          />
          <FeatureItem 
            icon={Moon} 
            label="SHADOWS" 
            active={config.shadows} 
            onClick={() => toggleConfig('shadows')} 
          />
          <FeatureItem 
            icon={Maximize} 
            label="ORTHO" 
            active={config.ortho} 
            onClick={() => toggleConfig('ortho')} 
          />
          <FeatureItem 
            icon={Palette} 
            label="MATERIALS" 
            active={config.materials} 
            onClick={() => toggleConfig('materials')} 
          />
          <FeatureItem 
            icon={Sparkles} 
            label="AMBIENT" 
            active={config.ambient} 
            onClick={() => toggleConfig('ambient')} 
          />
        </div>

        <div className="mt-8 space-y-2">
          <button className="w-full h-10 bg-orange-500 text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-orange-400 transition-colors flex items-center justify-center gap-2">
            <Download className="w-3.5 h-3.5" />
            EXPORT_.GLB
          </button>
          <button className="w-full h-10 bg-white/5 border border-white/5 text-white/60 text-[10px] font-bold uppercase tracking-widest rounded hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
            <Share2 className="w-3.5 h-3.5" />
            SHARE_LINK
          </button>
        </div>
      </div>

      {/* Terminal/Log Panel */}
      <div className="flex-1 bg-[#121214] border border-white/5 rounded-lg p-6 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-orange-500" />
            <h4 className="text-[10px] font-bold text-white tracking-widest uppercase">System_Logs</h4>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase">LIVE</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2 pr-2">
          <AnimatePresence mode="popLayout">
            {activeLogs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 5 }}
                className="flex items-start gap-3"
              >
                <span className="text-orange-500/40 text-[9px] mt-0.5">{">"}</span>
                <p className="text-[9px] font-medium text-white/40 leading-tight tracking-tight break-all">{log}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-6 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest">CPU_LOAD</span>
            <span className="text-[8px] font-bold text-orange-500 tracking-widest">42%</span>
          </div>
          <div className="h-1 bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '42%' }}
              className="h-full bg-orange-500"
            />
          </div>
        </div>
      </div>
    </aside>
  );
}

function FeatureItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-2 h-20 rounded border transition-all relative overflow-hidden",
        active 
          ? "bg-orange-500/10 border-orange-500/30 text-orange-500" 
          : "bg-white/5 border-white/5 text-white/20 hover:bg-white/10 hover:text-white/40"
      )}
    >
      <Icon className="w-4 h-4" />
      <span className="text-[8px] font-bold uppercase tracking-widest">{label}</span>
      
      {active && (
        <motion.div 
          layoutId={`active-glow-${label}`}
          className="absolute inset-0 bg-orange-500/5 pointer-events-none"
        />
      )}
    </button>
  );
}
