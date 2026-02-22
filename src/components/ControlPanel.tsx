import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Box, 
  Maximize, 
  Layers, 
  Eye, 
  EyeOff,
  Zap,
  Activity,
  Download,
  Share2,
  Palette,
  Sparkles,
  Smile,
  Coffee,
  Heart,
  Grid
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
  "Waking up the magic...",
  "Finding the walls...",
  "Painting with 3D pixels...",
  "Adding a pinch of love...",
  "Ready for you!",
  "Sparkling up the view...",
];

export function ControlPanel({ config, setConfig }: ControlPanelProps) {
  const [activeLogs, setActiveLogs] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomLog = logs[Math.floor(Math.random() * logs.length)];
      setActiveLogs(prev => [randomLog, ...prev].slice(0, 5));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleConfig = (key: string) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  return (
    <aside className="w-96 h-full flex flex-col gap-8 z-40 overflow-hidden">
      {/* Main Controls */}
      <div className="glass-panel rounded-[3rem] p-10 deep-depth border-white/60">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg">
            <Smile className="text-white w-7 h-7" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-black text-amber-900 tracking-tight">Magic Wand</h3>
            <p className="text-[10px] font-bold text-amber-900/40 uppercase tracking-widest">Tweak your view</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FeatureItem 
            icon={Sun} 
            label="Sunlight" 
            active={config.daylight} 
            onClick={() => toggleConfig('daylight')} 
          />
          <FeatureItem 
            icon={Grid} 
            label="Skeleton" 
            active={config.wireframe} 
            onClick={() => toggleConfig('wireframe')} 
          />
          <FeatureItem 
            icon={Moon} 
            label="Shadows" 
            active={config.shadows} 
            onClick={() => toggleConfig('shadows')} 
          />
          <FeatureItem 
            icon={Maximize} 
            label="Flat View" 
            active={config.ortho} 
            onClick={() => toggleConfig('ortho')} 
          />
          <FeatureItem 
            icon={Palette} 
            label="Colors" 
            active={config.materials} 
            onClick={() => toggleConfig('materials')} 
          />
          <FeatureItem 
            icon={Sparkles} 
            label="Glow" 
            active={config.ambient} 
            onClick={() => toggleConfig('ambient')} 
          />
        </div>

        <div className="mt-10 space-y-4">
          <button className="w-full py-5 bg-amber-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-orange-600 transition-colors shadow-lg flex items-center justify-center gap-3">
            <Download className="w-4 h-4" />
            Save as .GLB
          </button>
          <button className="w-full py-5 bg-white text-amber-900 text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-amber-50 transition-colors deep-depth flex items-center justify-center gap-3">
            <Share2 className="w-4 h-4" />
            Share Link
          </button>
        </div>
      </div>

      {/* Stats/Log Panel */}
      <div className="flex-1 glass-panel rounded-[3rem] p-10 deep-depth border-white/60 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-orange-500" />
            <h4 className="text-sm font-black text-amber-900 uppercase tracking-widest">What's Happening</h4>
          </div>
          <div className="px-3 py-1 bg-white/40 rounded-full">
            <span className="text-[8px] font-black text-amber-900 uppercase tracking-widest">Live</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-4 pr-2">
          <AnimatePresence mode="popLayout">
            {activeLogs.map((log, i) => (
              <motion.div
                key={log + i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex gap-4 group"
              >
                <div className="w-1 h-auto bg-orange-500/20 rounded-full group-hover:bg-orange-500 transition-colors" />
                <div>
                  <p className="text-xs font-bold text-amber-900 leading-relaxed">{log}</p>
                  <p className="text-[9px] font-bold text-amber-900/20 uppercase tracking-widest mt-1">Just now</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-8 pt-8 border-t border-amber-900/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-black text-amber-900/40 uppercase tracking-widest">Magic Level</span>
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">99%</span>
          </div>
          <div className="h-2 bg-amber-900/5 rounded-full overflow-hidden p-0.5">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '99%' }}
              className="h-full bg-orange-500 rounded-full"
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
        "flex flex-col items-center gap-3 p-6 rounded-[2rem] transition-all duration-500 group relative overflow-hidden",
        active 
          ? "bg-orange-500 text-white shadow-lg scale-105" 
          : "bg-white/40 text-amber-900/40 hover:bg-white hover:text-amber-900"
      )}
    >
      <Icon className={cn("w-6 h-6 transition-transform duration-500", active ? "text-white" : "text-amber-900/40 group-hover:text-amber-900")} />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      
      {active && (
        <motion.div 
          layoutId={`active-glow-${label}`}
          className="absolute inset-0 bg-white/10 pointer-events-none"
        />
      )}
    </button>
  );
}
