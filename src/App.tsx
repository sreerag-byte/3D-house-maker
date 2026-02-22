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
  Sparkles
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
      <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-[100] font-sans">
        <div className="relative flex flex-col items-center max-w-sm w-full px-10">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-3xl bg-orange-500 flex items-center justify-center mb-10 shadow-[0_15px_40px_rgba(249,115,22,0.3)]"
          >
            <Box className="text-white w-10 h-10" />
          </motion.div>
          
          <div className="w-full space-y-6 text-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Arch2Mesh</h1>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Starting your creative studio...</p>
            </div>
            
            <div className="relative h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${bootProgress}%` }}
                className="h-full bg-orange-500 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8F9FA] font-sans selection:bg-orange-500/20 text-gray-900 overflow-hidden">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-10 bg-white/80 backdrop-blur-md border-b border-gray-100 z-40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Online</span>
            </div>
            <div className="h-4 w-px bg-gray-100" />
            <div className="flex items-center gap-3 group cursor-pointer">
              <Search className="w-4 h-4 text-gray-300 group-hover:text-gray-600 transition-colors" />
              <span className="text-[11px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors">Search your projects...</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                    <img src={`https://picsum.photos/seed/${i+10}/50/50`} alt="Team" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Team Active</span>
            </div>
            <button className="px-5 py-2 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:bg-gray-800 transition-all shadow-lg hover:shadow-gray-900/20">
              Share
            </button>
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
                    <ThreeViewer data={reconstructionData} config={viewerConfig} />
                  </div>
                  <ControlPanel config={viewerConfig} setConfig={setViewerConfig} />
                </div>
              )}

              {activeTab === 'projects' && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-gray-100 flex items-center justify-center mb-6">
                    <Archive className="w-8 h-8 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
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
                  <h2 className="text-3xl font-bold text-gray-900 mb-10">Account Settings</h2>
                  <div className="space-y-6">
                    {[
                      { label: 'Profile Information', desc: 'Update your name and photo' },
                      { label: 'Preferences', desc: 'Manage notifications and display' },
                      { label: 'Security', desc: 'Password and authentication' },
                      { label: 'Billing', desc: 'Manage your subscription' }
                    ].map((item, i) => (
                      <div key={i} className="glass-card p-6 rounded-2xl flex items-center justify-between group cursor-pointer">
                        <div>
                          <h4 className="text-sm font-bold text-gray-900 mb-1">{item.label}</h4>
                          <p className="text-xs text-gray-400">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-900 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <footer className="h-12 flex items-center justify-between px-10 bg-white border-t border-gray-100 z-40">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">System: Fast</span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-3.5 h-3.5 text-gray-200" />
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
