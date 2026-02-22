import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Box, 
  Maximize, 
  Layers, 
  Download,
  Share2,
  Palette,
  Sparkles,
  Grid,
  Settings,
  Type,
  Maximize2,
  Zap
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

export function ControlPanel({ config, setConfig }: ControlPanelProps) {
  const toggleConfig = (key: string) => {
    setConfig({ ...config, [key]: !config[key] });
  };

  const controls = [
    { key: 'daylight', label: 'Daylight', icon: Sun },
    { key: 'shadows', label: 'Shadows', icon: Moon },
    { key: 'wireframe', label: 'Structure', icon: Grid },
    { key: 'ortho', label: '3D View', icon: Box },
    { key: 'labels', label: 'Labels', icon: Type },
    { key: 'materials', label: 'Textures', icon: Layers },
    { key: 'ambient', label: 'Soft Light', icon: Zap },
    { key: 'edges', label: 'Outlines', icon: Maximize2 },
  ];

  return (
    <aside className="w-80 h-full flex flex-col gap-6 z-40 overflow-hidden">
      {/* Parameters Panel */}
      <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col soft-shadow flex-1">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Settings className="text-white w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Studio Controls</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Adjust your view</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {controls.map((item) => {
            const isActive = config[item.key];
            return (
              <motion.button
                key={item.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleConfig(item.key)}
                className={cn(
                  "flex flex-col items-center justify-center gap-2 h-24 rounded-2xl border transition-all relative overflow-hidden",
                  isActive 
                    ? "bg-orange-500 border-orange-500 text-white shadow-lg shadow-orange-500/20" 
                    : "bg-gray-50 border-gray-100 text-gray-400 hover:border-gray-200"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 pt-8 border-t border-gray-50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Quality</span>
            <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">High</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '85%' }}
              className="h-full bg-orange-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Export Panel */}
      <div className="bg-gray-900 p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-white uppercase tracking-widest">Live Export</span>
          </div>
          <Download className="w-4 h-4 text-white/40" />
        </div>
        <div className="space-y-3">
          <button className="w-full py-4 bg-white text-gray-900 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-gray-100 transition-all shadow-lg">
            Download .GLB
          </button>
          <button className="w-full py-4 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all">
            Share Link
          </button>
        </div>
      </div>
    </aside>
  );
}
