import React from 'react';
import { 
  Box, 
  UploadCloud, 
  FolderOpen, 
  Settings, 
  Zap, 
  LogOut, 
  ChevronRight,
  Sparkles,
  Palette,
  Layout
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

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'upload', icon: UploadCloud, label: 'CREATE', desc: 'New Space' },
    { id: 'chat', icon: Zap, label: 'AI CHAT', desc: 'Chat to Build' },
    { id: 'collection', icon: Layout, label: 'GALLERY', desc: 'Perfect Plans' },
    { id: 'viewer', icon: Sparkles, label: 'STUDIO', desc: 'Magic View' },
    { id: 'projects', icon: FolderOpen, label: 'ARCHIVE', desc: 'Saved' },
  ];

  return (
    <aside className="w-20 h-full flex flex-col items-center py-6 z-50 relative bg-[#0A0A0B] border-r border-white/5">
      {/* Logo Area */}
      <div className="flex flex-col items-center mb-10 group cursor-pointer">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(249,115,22,0.3)]"
        >
          <Box className="w-6 h-6 text-black" />
        </motion.div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 relative",
                  isActive 
                    ? "bg-white/10 text-orange-500 shadow-inner" 
                    : "text-white/30 hover:text-white/60 hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-1.5 bg-[#18181B] text-white rounded border border-white/10 opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-2xl">
                  <p className="text-[10px] font-mono font-bold tracking-widest">{item.label}</p>
                </div>
              </motion.button>
              
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Secondary Actions & Profile */}
      <div className="mt-auto flex flex-col gap-4 items-center w-full px-2">
        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('settings')}
          className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 relative",
            activeTab === 'settings'
              ? "bg-white/10 text-orange-500"
              : "text-white/30 hover:text-white/60 hover:bg-white/5"
          )}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        {/* Profile */}
        <div className="relative group w-10 h-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-full h-full rounded-lg bg-white/5 flex items-center justify-center cursor-pointer overflow-hidden border border-white/10"
          >
            <img src="https://picsum.photos/seed/designer/120/120" alt="User" className="w-full h-full object-cover opacity-80" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white/20 hover:text-red-500/60 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </aside>
  );
}
