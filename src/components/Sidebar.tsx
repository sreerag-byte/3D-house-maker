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
    { id: 'upload', icon: UploadCloud, label: 'Create' },
    { id: 'viewer', icon: Sparkles, label: 'Studio' },
    { id: 'projects', icon: FolderOpen, label: 'Archive' },
    { id: 'settings', icon: Settings, label: 'Config' },
  ];

  return (
    <aside className="w-32 h-full flex flex-col items-center py-12 z-50 relative">
      {/* Sidebar Panel */}
      <div className="absolute inset-y-12 left-8 right-0 glass-panel rounded-[3rem] cartoon-border -z-10" />
      
      {/* Logo Area */}
      <motion.div 
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 rounded-3xl bg-[#2D1B08] flex items-center justify-center mb-16 shadow-2xl cartoon-border cursor-pointer"
      >
        <Box className="w-8 h-8 text-white" />
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-8">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center transition-all duration-300 relative cartoon-border",
                  isActive 
                    ? "bg-[#2D1B08] text-white shadow-xl" 
                    : "bg-white text-[#2D1B08]/40 hover:text-[#2D1B08] hover:bg-white/80"
                )}
              >
                <item.icon className="w-7 h-7" />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-6 px-4 py-2 bg-[#2D1B08] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap cartoon-border z-50">
                  {item.label}
                </div>
              </motion.button>
              
              {isActive && (
                <motion.div 
                  layoutId="active-indicator"
                  className="absolute -left-2 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-[#2D1B08] rounded-full"
                />
              )}
            </div>
          );
        })}
      </nav>

      {/* Profile / Bottom Actions */}
      <div className="mt-auto flex flex-col gap-8 items-center">
        <div className="relative group">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center cursor-pointer cartoon-border overflow-hidden"
          >
            <img src="https://picsum.photos/seed/designer/64/64" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
          
          {/* Upgrade Badge */}
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#FF8C42] border-2 border-[#2D1B08] flex items-center justify-center shadow-lg">
            <Sparkles className="w-4 h-4 text-[#2D1B08]" />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          className="w-16 h-16 rounded-3xl bg-white/40 flex items-center justify-center text-[#2D1B08]/40 hover:text-[#2D1B08] transition-colors cartoon-border"
        >
          <LogOut className="w-7 h-7" />
        </motion.button>
      </div>
    </aside>
  );
}
