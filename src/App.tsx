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
    <div className="flex h-screen bg-[#FF8C42] text-[#2D1B08] font-sans selection:bg-[#2D1B08]/10 overflow-hidden">
      <OrganicBackground />
      
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex flex-col relative z-10 overflow-hidden">
        {/* Header Bar */}
        <header className="h-24 flex items-center justify-between px-12 backdrop-blur-xl bg-white/20 border-b border-white/20">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#2D1B08]">Studio Active</span>
            </div>
            <div className="h-8 w-px bg-[#2D1B08]/10" />
            <div className="flex items-center gap-4 group cursor-pointer">
              <Search className="w-5 h-5 text-[#2D1B08]/40 group-hover:text-[#2D1B08] transition-colors" />
              <span className="text-xs font-medium text-[#2D1B08]/40 uppercase tracking-widest group-hover:text-[#2D1B08]">Search Projects...</span>
            </div>
          </div>

          <div className="flex items-center gap-10">
            <div className="flex -space-x-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-12 h-12 rounded-2xl border-4 border-[#FF8C42] bg-white flex items-center justify-center overflow-hidden hover:z-10 transition-transform hover:-translate-y-1 cursor-pointer cartoon-border">
                  <img src={`https://picsum.photos/seed/${i + 40}/48/48`} alt="User" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-12 h-12 rounded-2xl border-4 border-[#FF8C42] bg-[#2D1B08] flex items-center justify-center text-xs font-bold text-white cursor-pointer hover:z-10 transition-transform hover:-translate-y-1 cartoon-border">
                +8
              </div>
            </div>
            <div className="h-8 w-px bg-[#2D1B08]/10" />
            <button className="relative group p-2">
              <Bell className="w-6 h-6 text-[#2D1B08]/60 group-hover:text-[#2D1B08] transition-colors" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-white rounded-full border-2 border-[#FF8C42]" />
            </button>
            <div className="w-14 h-14 rounded-[1.25rem] bg-white border border-white/40 flex items-center justify-center group cursor-pointer hover:shadow-xl transition-all cartoon-border">
              <User className="w-7 h-7 text-[#2D1B08]/40 group-hover:text-[#2D1B08] transition-colors" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                className="h-full flex items-center justify-center p-12 overflow-y-auto custom-scrollbar"
              >
                <UploadForm onUploadSuccess={handleUploadSuccess} />
              </motion.div>
            )}

            {activeTab === 'viewer' && (
              <motion.div
                key="viewer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex"
              >
                <div className="flex-1 relative">
                  <ThreeViewer data={reconstructionData} config={viewerConfig} />
                </div>
                <ControlPanel config={viewerConfig} setConfig={setViewerConfig} />
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="h-full p-20 overflow-y-auto custom-scrollbar"
              >
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-center justify-between mb-20">
                    <div>
                      <h2 className="text-7xl font-display font-bold text-[#2D1B08] tracking-tight mb-4 italic">My Studio</h2>
                      <p className="text-xs font-sans text-[#2D1B08]/40 font-bold uppercase tracking-[0.4em]">Your Crafted Spaces</p>
                    </div>
                    <button className="px-10 py-5 bg-[#2D1B08] hover:bg-[#4A2C0F] text-white text-xs font-bold uppercase tracking-[0.3em] rounded-[2rem] transition-all shadow-2xl cartoon-border">
                      New Project
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[...Array(6)].map((_, i) => (
                      <motion.div 
                        key={i}
                        whileHover={{ y: -15, rotate: i % 2 === 0 ? 1 : -1 }}
                        className="glass-panel p-10 rounded-[3rem] border-white/60 group cursor-pointer relative overflow-hidden cartoon-border"
                      >
                        <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/40 transition-colors" />
                        <div className="flex items-center justify-between mb-10">
                          <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center group-hover:scale-110 transition-transform cartoon-border">
                            <Box className="w-8 h-8 text-[#FF8C42]" />
                          </div>
                          <div className="px-4 py-1.5 bg-white border border-[#2D1B08]/10 rounded-full">
                            <span className="text-[10px] font-bold text-[#2D1B08] uppercase tracking-widest">Saved</span>
                          </div>
                        </div>
                        <h3 className="text-3xl font-display font-bold text-[#2D1B08] mb-3">Project_{i + 1}</h3>
                        <p className="text-xs font-sans text-[#2D1B08]/40 font-bold uppercase tracking-widest mb-10">Updated yesterday</p>
                        <div className="flex items-center justify-between pt-8 border-t border-[#2D1B08]/5">
                          <div className="flex items-center gap-3">
                            <Activity className="w-4 h-4 text-[#FF8C42]" />
                            <span className="text-[10px] font-bold text-[#2D1B08]/60 uppercase tracking-widest">Detailed</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-[#2D1B08]/20 group-hover:text-[#2D1B08] group-hover:translate-x-2 transition-all" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                className="h-full p-20 overflow-y-auto custom-scrollbar"
              >
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-7xl font-display font-bold text-[#2D1B08] tracking-tight mb-20 italic">Studio Settings</h2>
                  <div className="space-y-16">
                    <section>
                      <h4 className="text-xs font-bold uppercase tracking-[0.4em] text-[#2D1B08]/40 mb-10">Preferences</h4>
                      <div className="space-y-6">
                        {[
                          { label: 'High Detail Mode', desc: 'Renders meshes with maximum organic fidelity', active: true },
                          { label: 'Cloud Syncing', desc: 'Keep your projects safe and accessible everywhere', active: true },
                          { label: 'Smart Labels', desc: 'Automatically identify architectural elements', active: false },
                        ].map((item, i) => (
                          <div key={i} className="glass-panel p-10 rounded-[2.5rem] border-white/60 flex items-center justify-between group hover:shadow-xl transition-all cartoon-border">
                            <div>
                              <p className="text-sm font-bold text-[#2D1B08] uppercase tracking-widest mb-2">{item.label}</p>
                              <p className="text-xs text-[#2D1B08]/40 font-medium">{item.desc}</p>
                            </div>
                            <div className={cn("w-14 h-8 rounded-full p-1.5 transition-colors cartoon-border", item.active ? "bg-[#2D1B08]" : "bg-white")}>
                              <div className={cn("w-4 h-4 rounded-full transition-transform", item.active ? "translate-x-6 bg-white" : "translate-x-0 bg-[#2D1B08]")} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global HUD */}
        <footer className="h-20 backdrop-blur-xl bg-white/10 flex items-center justify-between px-12 border-t border-white/20">
          <div className="flex items-center gap-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center cartoon-border">
                <Cpu className="w-5 h-5 text-[#FF8C42]" />
              </div>
              <span className="text-[10px] font-bold text-[#2D1B08]/60 uppercase tracking-widest">Studio Load: <span className="text-[#2D1B08]">Light</span></span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center cartoon-border">
                <Globe className="w-5 h-5 text-[#2D1B08]" />
              </div>
              <span className="text-[10px] font-bold text-[#2D1B08]/60 uppercase tracking-widest">Location: <span className="text-[#2D1B08]">Global</span></span>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              <span className="text-[10px] font-bold text-[#2D1B08]/60 uppercase tracking-widest">Status: <span className="text-[#2D1B08]">Ready</span></span>
            </div>
            <div className="flex items-center gap-4">
              <Binary className="w-5 h-5 text-[#2D1B08]/40" />
              <span className="text-[10px] font-bold text-[#2D1B08]/40 uppercase tracking-widest">Version 2.0</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Global Notifications */}
      <div className="fixed bottom-28 right-12 z-[60] flex flex-col gap-6 pointer-events-none">
        <AnimatePresence>
          {notifications.map((note, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 50, scale: 0.9, rotate: 5 }}
              animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
              className="glass-panel p-8 rounded-[2rem] border-white/60 shadow-2xl flex items-center gap-6 pointer-events-auto cartoon-border"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#2D1B08] flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs font-bold text-[#2D1B08] uppercase tracking-widest">{note}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
