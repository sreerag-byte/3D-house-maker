import React from 'react';
import { 
  Sun, 
  Moon, 
  Maximize2, 
  Minimize2, 
  Box, 
  Grid, 
  Camera, 
  Download, 
  Trash2, 
  RotateCcw,
  Ruler,
  Type,
  Eye,
  EyeOff,
  Wind,
  Zap,
  Palette,
  Compass,
  Map,
  Share2
} from 'lucide-react';
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

  const FeatureItem = ({ icon: Icon, label, active, onClick }: any) => (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group relative overflow-hidden",
        active 
          ? "bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.1)]" 
          : "bg-white/5 border-white/5 text-slate-500 hover:border-white/20 hover:text-slate-200"
      )}
    >
      <Icon className={cn(
        "w-5 h-5 mb-3 transition-transform duration-300 group-hover:scale-110",
        active ? "drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" : ""
      )} />
      <span className="text-[8px] font-black uppercase tracking-[0.1em] text-center leading-none">{label}</span>
      {active && (
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent pointer-events-none" />
      )}
    </button>
  );

  return (
    <div className="w-full lg:w-80 h-full glass-panel flex flex-col overflow-y-auto custom-scrollbar z-30">
      <div className="p-8 border-b border-white/5">
        <h3 className="font-display font-black text-xs uppercase tracking-[0.3em] text-slate-400">System Parameters</h3>
      </div>

      <div className="p-8 space-y-10">
        {/* Group 1: Visuals */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h4 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">Rendering Engine</h4>
            <div className="w-1 h-1 rounded-full bg-orange-500 animate-ping" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={Grid} label="Wireframe" active={config.wireframe} onClick={() => toggleConfig('wireframe')} />
            <FeatureItem icon={Sun} label="Daylight" active={config.daylight} onClick={() => toggleConfig('daylight')} />
            <FeatureItem icon={Moon} label="Night" active={!config.daylight} onClick={() => toggleConfig('daylight')} />
            <FeatureItem icon={Zap} label="Shadows" active={config.shadows} onClick={() => toggleConfig('shadows')} />
            <FeatureItem icon={Wind} label="Ambient" active={config.ambient} onClick={() => toggleConfig('ambient')} />
            <FeatureItem icon={Eye} label="Edges" active={config.edges} onClick={() => toggleConfig('edges')} />
          </div>
        </section>

        {/* Group 2: Tools */}
        <section>
          <h4 className="text-[9px] font-black text-slate-600 uppercase mb-5 tracking-[0.3em]">Analysis Suite</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={Ruler} label="Measure" active={config.measure} onClick={() => toggleConfig('measure')} />
            <FeatureItem icon={Compass} label="North" active={config.north} onClick={() => toggleConfig('north')} />
            <FeatureItem icon={Map} label="Terrain" active={config.terrain} onClick={() => toggleConfig('terrain')} />
            <FeatureItem icon={Type} label="Labels" active={config.labels} onClick={() => toggleConfig('labels')} />
            <FeatureItem icon={Palette} label="Materials" active={config.materials} onClick={() => toggleConfig('materials')} />
            <FeatureItem icon={Box} label="Furniture" active={config.furniture} onClick={() => toggleConfig('furniture')} />
          </div>
        </section>

        {/* Group 3: Viewport */}
        <section>
          <h4 className="text-[9px] font-black text-slate-600 uppercase mb-5 tracking-[0.3em]">Viewport Matrix</h4>
          <div className="grid grid-cols-3 gap-3">
            <FeatureItem icon={Camera} label="Capture" onClick={() => alert('Screenshot captured!')} />
            <FeatureItem icon={RotateCcw} label="Reset" onClick={() => alert('Camera reset')} />
            <FeatureItem icon={Maximize2} label="Focus" onClick={() => alert('Model focused')} />
            <FeatureItem icon={Minimize2} label="Ortho" active={config.ortho} onClick={() => toggleConfig('ortho')} />
            <FeatureItem icon={EyeOff} label="Hide UI" onClick={() => alert('UI hidden')} />
            <FeatureItem icon={Share2} label="Share" onClick={() => alert('Link copied!')} />
          </div>
        </section>

        {/* Group 4: Export */}
        <section className="pt-6">
          <button className="w-full py-4 bg-orange-500 hover:bg-orange-400 text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl transition-all duration-300 shadow-lg shadow-orange-500/20 flex items-center justify-center gap-3 active:scale-95">
            <Download className="w-4 h-4" />
            Export Neural Mesh
          </button>
          <button className="w-full py-4 mt-4 text-slate-500 hover:text-red-400 text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-2">
            <Trash2 className="w-3 h-3" />
            Purge Workspace
          </button>
        </section>
      </div>
    </div>
  );
}
