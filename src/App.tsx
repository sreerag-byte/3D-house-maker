import React, { useState, useEffect } from 'react';
import { 
  Box, 
  UploadCloud, 
  Settings, 
  FolderOpen, 
  Bell, 
  Search, 
  Zap, 
  Globe,
  ChevronRight,
  Archive,
  MessageSquare,
  LayoutGrid,
  Sparkles,
  Sun,
  Moon,
  Command,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { ThreeViewer } from './components/ThreeViewer';
import { ControlPanel } from './components/ControlPanel';
import { UploadForm } from './components/UploadForm';
import { ChatInterface } from './components/ChatInterface';
import { PlanCollection } from './components/PlanCollection';
import { RealisticCube } from './components/RealisticCube';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [reconstructionData, setReconstructionData] = useState<any | null>(null);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [viewerConfig, setViewerConfig] = useState({
    daylight: true,
    wireframe: false,
    shadows: true,
    ortho: false,
    labels: true,
    materials: true,
    ambient: true,
    edges: true
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (isBooting) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsBooting(false), 800);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isBooting]);

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 3));
    setTimeout(() => setNotifications(prev => prev.slice(0, -1)), 4000);
  };

  const handleUploadSuccess = (data?: any) => {
    setReconstructionData(data || {});
    setActiveTab('viewer');
    addNotification("Your design is ready to view!");
  };

  if (isBooting) {
    return (
      <div className={cn("fixed inset-0 flex flex-col items-center justify-center z-[100] font-sans transition-colors duration-500", isDarkMode ? "bg-[#0A0A0B]" : "bg-white")}>
        <div className="relative flex flex-col items-center max-w-sm w-full px-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-48 h-48 mb-6"
          >
            <RealisticCube isDarkMode={isDarkMode} className="w-full h-full" />
          </motion.div>
          
          <div className="w-full space-y-6 text-center">
            <div>
              <h1 className={cn("text-4xl font-extrabold tracking-tighter mb-2", isDarkMode ? "text-white" : "text-gray-900")}>Arch2Mesh</h1>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Architectural Intelligence v4.0</p>
            </div>
            
            <div className={cn("relative h-1 rounded-full overflow-hidden", isDarkMode ? "bg-white/5" : "bg-gray-100")}>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
                className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "flex h-screen font-sans selection:bg-orange-500/20 transition-colors duration-300 overflow-hidden",
      isDarkMode ? "bg-[#0A0A0B] text-gray-100" : "bg-[#F2F4F7] text-gray-900"
    )}>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-white/80 dark:bg-black/40 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 z-40">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">System Live</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Latency: 12ms</span>
              </div>
            </div>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-white/10" />
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type="text"
                placeholder="Search projects..."
                className="bg-gray-100/50 dark:bg-white/5 h-11 w-64 pl-12 pr-4 rounded-2xl border border-transparent dark:border-white/5 text-xs font-medium focus:outline-none focus:bg-white dark:focus:bg-white/10 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500/50 transition-all shadow-sm"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 shadow-sm">
                  <Command className="w-2.5 h-2.5 text-gray-400" />
                  <span className="text-[9px] font-bold text-gray-400">K</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-gray-900 dark:text-white uppercase tracking-widest">Studio Team</span>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map(i => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -2, zIndex: 10 }}
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-gray-900 bg-gray-100 dark:bg-white/5 overflow-hidden shadow-sm cursor-pointer"
                      >
                        <img src={`https://picsum.photos/seed/${i+20}/50/50`} alt="Team" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </motion.div>
                    ))}
                  </div>
                  <button className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 dark:border-white/10 flex items-center justify-center text-gray-400 hover:text-orange-500 hover:border-orange-500 transition-all">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="h-8 w-px bg-gray-200 dark:bg-white/10" />

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-11 h-11 rounded-2xl flex items-center justify-center bg-white dark:bg-white/5 text-gray-400 hover:text-orange-500 transition-all border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-900/20 dark:shadow-white/10">
                Publish Project
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="h-full w-full"
            >
              {activeTab === 'upload' && (
                <div className="h-full flex items-center justify-center">
                  <UploadForm onUploadSuccess={handleUploadSuccess} />
                </div>
              )}

              {activeTab === 'chat' && (
                <div className="h-full">
                  <ChatInterface />
                </div>
              )}

              {activeTab === 'collection' && (
                <div className="h-full">
                  <PlanCollection />
                </div>
              )}

              {activeTab === 'viewer' && (
                <div className="h-full flex gap-6">
                  <div className="flex-1 glass-panel rounded-[2.5rem] overflow-hidden relative soft-shadow">
                    <ThreeViewer data={reconstructionData} config={viewerConfig} isDarkMode={isDarkMode} />
                  </div>
                  <ControlPanel config={viewerConfig} setConfig={setViewerConfig} />
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center mb-6">
                    <Archive className="w-8 h-8 text-gray-300 dark:text-white/20" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No projects yet</h3>
                  <p className="text-sm text-gray-400 max-w-xs">Start by uploading a floor plan or chatting with our AI assistant.</p>
                  <button 
                    onClick={() => setActiveTab('upload')}
                    className="mt-8 px-8 py-3 bg-orange-500 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
                  >
                    Create New
                  </button>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="h-full max-w-2xl mx-auto py-12">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10">Account Settings</h2>
                  <div className="space-y-6">
                    {[
                      { label: 'Profile Information', desc: 'Update your name and photo' },
                      { label: 'Preferences', desc: 'Manage notifications and display' },
                      { label: 'Security', desc: 'Password and authentication' },
                      { label: 'Billing', desc: 'Manage your subscription' }
                    ].map((item, i) => (
                      <div key={i} className="glass-card p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{item.label}</h4>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="h-12 flex items-center justify-between px-10 bg-white dark:bg-[#0A0A0B] border-t border-gray-100 dark:border-white/5 z-40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System: Fast</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-3.5 h-3.5 text-gray-200 dark:text-white/10" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Location: Global</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status: Ready</span>
          </div>
        </footer>

        {/* Global Notifications */}
        <div className="fixed bottom-16 right-12 z-[60] flex flex-col gap-3 pointer-events-none">
          <AnimatePresence>
            {notifications.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className="bg-gray-900 text-white p-4 rounded-2xl flex items-center gap-4 pointer-events-auto shadow-2xl"
              >
                <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-[11px] font-bold tracking-wide">{note}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
