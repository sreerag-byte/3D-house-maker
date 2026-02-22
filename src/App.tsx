import React, { useState, useEffect } from 'react';
import { 
  Box, 
  UploadCloud, 
  Settings, 
  FolderOpen, 
  Bell, 
  Search, 
  User, 
  Shield, 
  Zap, 
  Activity, 
  Cpu, 
  Globe,
  Binary,
  Terminal,
  ChevronRight,
  Maximize2,
  Minimize2,
  MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { ThreeViewer } from './components/ThreeViewer';
import { ControlPanel } from './components/ControlPanel';
import { UploadForm } from './components/UploadForm';
import { ChatInterface } from './components/ChatInterface';
import { PlanCollection } from './components/PlanCollection';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Organic Background Component
function OrganicBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#FF8C42]" />
      <div className="absolute inset-0 bg-mesh opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]" />
      
      {/* Animated Organic Shapes */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.3, 1],
            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
          }}
          transition={{ 
            duration: 15 + Math.random() * 25, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute w-64 h-64 bg-white/10 rounded-full blur-[80px]"
        />
      ))}
      
      {/* Gentle Floating Particles */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          animate={{ 
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{ 
            duration: 5 + Math.random() * 10, 
            repeat: Infinity, 
            delay: Math.random() * 5 
          }}
          className="absolute w-1 h-1 bg-white/40 rounded-full"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('upload');
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
    if (isBooting) {
      const interval = setInterval(() => {
        setBootProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsBooting(false), 1000);
            return 100;
          }
          return prev + Math.random() * 12;
        });
      }, 120);
      return () => clearInterval(interval);
    }
  }, [isBooting]);

  const addNotification = (msg: string) => {
    setNotifications(prev => [msg, ...prev].slice(0, 3));
    setTimeout(() => setNotifications(prev => prev.slice(0, -1)), 5000);
  };

  const handleUploadSuccess = (data: any) => {
    setReconstructionData(data);
    setActiveTab('viewer');
    addNotification("Your architectural vision is ready!");
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-[#FF8C42] flex flex-col items-center justify-center z-[100] overflow-hidden">
        <OrganicBackground />
        <div className="relative z-10 flex flex-col items-center max-w-md w-full px-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            className="w-32 h-32 rounded-[2.5rem] bg-white flex items-center justify-center mb-12 shadow-[0_25px_60px_rgba(45,27,8,0.2)] cartoon-border relative"
          >
            <Box className="text-[#FF8C42] w-16 h-16" />
          </motion.div>
          
          <div className="w-full space-y-8 text-center">
            <div>
              <h1 className="text-5xl font-display font-bold text-[#2D1B08] tracking-tight mb-3">Arch2Mesh</h1>
              <p className="text-sm font-sans text-[#2D1B08]/60 font-medium uppercase tracking-[0.2em]">Crafting your space...</p>
            </div>
            
            <div className="relative h-3 bg-[#2D1B08]/5 rounded-full overflow-hidden cartoon-border p-0.5">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
                className="h-full bg-[#2D1B08] rounded-full"
              />
            </div>

            <div className="flex justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", bootProgress > 40 ? "bg-[#2D1B08]" : "bg-[#2D1B08]/10")} />
                <span className="text-[10px] font-sans font-bold text-[#2D1B08]/40 uppercase tracking-widest">Warming Up</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", bootProgress > 80 ? "bg-[#2D1B08]" : "bg-[#2D1B08]/10")} />
                <span className="text-[10px] font-sans font-bold text-[#2D1B08]/40 uppercase tracking-widest">Ready to Build</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#0A0A0B] text-[#E1E1E3] font-sans selection:bg-orange-500/30 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden technical-grid">
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 opacity-[0.03]">
          <div className="w-full h-1 bg-white animate-scanline" />
        </div>

        {/* Header Bar */}
        <header className="h-14 flex items-center justify-between px-6 border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-md z-30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-white/80">SYSTEM_ACTIVE</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-3 group cursor-pointer">
              <Search className="w-3.5 h-3.5 text-white/30 group-hover:text-white/60 transition-colors" />
              <span className="text-[9px] font-mono text-white/20 tracking-widest group-hover:text-white/40 uppercase">Search_Database</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-7 h-7 rounded border border-white/10 bg-[#18181B] flex items-center justify-center overflow-hidden grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer"
                >
                  <img src={`https://picsum.photos/seed/${i + 40}/40/40`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <div className="h-4 w-px bg-white/10" />
            <button className="relative group">
              <Bell className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
              <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex items-center justify-center overflow-y-auto custom-scrollbar"
              >
                <UploadForm onUploadSuccess={handleUploadSuccess} />
              </motion.div>
            )}

            {activeTab === 'chat' && (
              <motion.div
                key="chat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 overflow-y-auto custom-scrollbar"
              >
                <ChatInterface />
              </motion.div>
            )}

            {activeTab === 'collection' && (
              <motion.div
                key="collection"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 overflow-y-auto custom-scrollbar"
              >
                <PlanCollection />
              </motion.div>
            )}

            {activeTab === 'viewer' && (
              <motion.div
                key="viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col"
              >
                <div className="flex-1 relative">
                  <ThreeViewer data={reconstructionData} config={viewerConfig} />
                </div>
                <div className="h-64 border-t border-white/5 bg-[#0A0A0B]/50 backdrop-blur-sm">
                  <ControlPanel config={viewerConfig} setConfig={setViewerConfig} />
                </div>
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 flex items-center justify-center text-white/20 font-mono text-xs tracking-widest"
              >
                NO_ARCHIVED_PROJECTS_FOUND
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full p-8 overflow-y-auto custom-scrollbar"
              >
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-4xl font-mono font-bold text-white tracking-tight mb-12">SYSTEM_SETTINGS</h2>
                  <div className="space-y-4">
                    {[
                      { label: 'High Detail Mode', desc: 'Renders meshes with maximum organic fidelity', active: true },
                      { label: 'Cloud Syncing', desc: 'Keep your projects safe and accessible everywhere', active: true },
                      { label: 'Smart Labels', desc: 'Automatically identify architectural elements', active: false },
                    ].map((item, i) => (
                      <div key={i} className="bg-[#18181B] p-6 rounded-lg border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all">
                        <div>
                          <p className="text-xs font-mono font-bold text-white/80 tracking-widest mb-1">{item.label}</p>
                          <p className="text-[10px] text-white/40 font-medium">{item.desc}</p>
                        </div>
                        <div className={cn("w-10 h-5 rounded-full p-1 transition-colors", item.active ? "bg-orange-500" : "bg-white/10")}>
                          <div className={cn("w-3 h-3 rounded-full transition-transform", item.active ? "translate-x-5 bg-white" : "translate-x-0 bg-white/40")} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global HUD */}
        <footer className="h-10 flex items-center justify-between px-6 border-t border-white/5 bg-[#0A0A0B] z-30">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-orange-500/60" />
              <span className="text-[9px] font-mono text-white/40 tracking-widest">CPU_LOAD: <span className="text-white/80">12%</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-white/20" />
              <span className="text-[9px] font-mono text-white/40 tracking-widest">NODE: <span className="text-white/80">US-EAST-1</span></span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              <span className="text-[9px] font-mono text-white/40 tracking-widest">STATUS: <span className="text-white/80">READY</span></span>
            </div>
            <div className="flex items-center gap-2">
              <Binary className="w-3.5 h-3.5 text-white/10" />
              <span className="text-[9px] font-mono text-white/40 tracking-widest uppercase">VER_2.1.0_STABLE</span>
            </div>
          </div>
        </footer>

        {/* Global Notifications */}
        <div className="fixed bottom-12 right-12 z-[60] flex flex-col gap-3 pointer-events-none font-mono">
          <AnimatePresence>
            {notifications.map((note, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-[#121214] border border-orange-500/30 p-4 rounded flex items-center gap-4 pointer-events-auto shadow-[0_0_20px_rgba(249,115,22,0.1)]"
              >
                <div className="w-8 h-8 rounded bg-orange-500/10 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-orange-500" />
                </div>
                <p className="text-[10px] font-bold text-white/80 uppercase tracking-widest">{note}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
