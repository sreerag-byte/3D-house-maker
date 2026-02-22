import React from 'react';
import { 
  Layout, 
  Box, 
  Layers, 
  Settings, 
  Image as ImageIcon, 
  Maximize, 
  MousePointer2,
  HelpCircle,
  History,
  Share2,
  UploadCloud,
  FolderOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'upload', icon: UploadCloud, label: 'Initialize' },
  { id: 'viewer', icon: Box, label: 'Neural Render' },
  { id: 'projects', icon: FolderOpen, label: 'Workspace' },
  { id: 'settings', icon: Settings, label: 'System' },
];

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-20 lg:w-64 h-full glass-panel flex flex-col transition-all duration-300 z-30">
      <div className="p-8 flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/20 animate-pulse">
          <Box className="text-slate-950 w-7 h-7" />
        </div>
        <div className="hidden lg:block">
          <span className="font-display font-black text-2xl tracking-tighter uppercase text-gradient">Arch2Mesh</span>
          <p className="text-[8px] font-mono text-slate-500 uppercase tracking-[0.4em] -mt-1">Core Engine v1.0</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-8 space-y-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
              activeTab === item.id 
                ? "bg-orange-500/10 text-orange-400 border border-orange-500/20 shadow-[0_0_20px_rgba(249,115,22,0.1)]" 
                : "text-slate-500 hover:text-slate-200 hover:bg-white/5"
            )}
          >
            {activeTab === item.id && (
              <motion.div 
                layoutId="active-nav"
                className="absolute left-0 w-1 h-6 bg-orange-500 rounded-full"
              />
            )}
            <item.icon className={cn(
              "w-5 h-5 transition-all duration-300 group-hover:scale-110",
              activeTab === item.id ? "text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)]" : ""
            )} />
            <span className="hidden lg:block font-bold uppercase text-[10px] tracking-[0.2em]">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-6 mt-auto space-y-4">
        <button className="w-full flex items-center gap-4 px-5 py-3 text-slate-500 hover:text-orange-400 transition-all duration-300 group">
          <HelpCircle className="w-5 h-5 group-hover:rotate-12" />
          <span className="hidden lg:block font-bold uppercase text-[10px] tracking-[0.2em]">Support</span>
        </button>
        
        <div className="p-5 bg-gradient-to-br from-orange-500/10 to-transparent rounded-3xl border border-orange-500/20 hidden lg:block relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] mb-2">Enterprise</p>
          <p className="text-[10px] text-slate-400 mb-4 leading-relaxed">Unlock neural rendering and real-time collaboration.</p>
          <button className="w-full py-3 bg-orange-500 hover:bg-orange-400 text-slate-950 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/20 active:scale-95">
            Upgrade Now
          </button>
        </div>
      </div>
    </aside>
  );
}
