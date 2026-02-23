import React from 'react';
import { 
  Box, 
  UploadCloud, 
  FolderOpen, 
  Settings, 
  MessageSquare, 
  LogOut, 
  Sparkles,
  LayoutGrid
} from 'lucide-react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { RealisticCube } from './RealisticCube';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'upload', icon: UploadCloud, label: 'New', desc: 'Create space' },
    { id: 'chat', icon: MessageSquare, label: 'Chat', desc: 'Ask AI' },
    { id: 'collection', icon: LayoutGrid, label: 'Gallery', desc: 'Floor plans' },
    { id: 'viewer', icon: Sparkles, label: 'View', desc: '3D Studio' },
    { id: 'projects', icon: FolderOpen, label: 'Saved', desc: 'My projects' },
  ];

  return (
    <aside className="w-24 h-full flex flex-col items-center py-8 z-50 relative bg-white dark:bg-[#0A0A0B] border-r border-gray-100 dark:border-white/5 soft-shadow">
      {/* Logo Area */}
      <div className="flex flex-col items-center mb-12 group cursor-pointer">
        <div className="w-14 h-14 relative">
          <RealisticCube className="w-full h-full" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 flex flex-col gap-4 w-full px-3">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-14 h-14 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all duration-300 relative",
                  isActive 
                    ? "bg-orange-500 text-white shadow-[0_8px_20px_rgba(249,115,22,0.2)]" 
                    : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[8px] font-bold tracking-wider uppercase">{item.label}</span>
                
                {/* Tooltip */}
                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap z-50 shadow-xl">
                  <p className="text-[10px] font-bold">{item.desc}</p>
                  <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900 dark:border-r-white" />
                </div>
              </motion.button>
            </div>
          );
        })}
      </nav>

      {/* Secondary Actions & Profile */}
      <div className="mt-auto flex flex-col gap-4 items-center w-full px-3">
        {/* Settings Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveTab('settings')}
          className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 relative",
            activeTab === 'settings'
              ? "bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white"
              : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
          )}
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        {/* Profile */}
        <div className="relative group w-10 h-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-full h-full rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-white dark:border-gray-900 shadow-sm hover:border-orange-500 transition-colors"
          >
            <img src="https://picsum.photos/seed/designer/120/120" alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </motion.div>
        </div>

        {/* Logout */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center text-gray-300 dark:text-white/20 hover:text-red-500 transition-all"
        >
          <LogOut className="w-5 h-5" />
        </motion.button>
      </div>
    </aside>
  );
}
