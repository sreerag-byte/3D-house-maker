import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ControlPanel } from './components/ControlPanel';
import { ThreeViewer } from './components/ThreeViewer';
import { UploadForm } from './components/UploadForm';
import { motion, AnimatePresence } from 'motion/react';
import { Clock } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('upload');
  const [modelData, setModelData] = useState<any>(null);
  const [config, setConfig] = useState({
    wireframe: false,
    daylight: true,
    shadows: true,
    ambient: true,
    edges: true,
    measure: false,
    north: false,
    terrain: false,
    labels: false,
    materials: true,
    furniture: false,
    ortho: false,
  });

  const handleUploadSuccess = (data: any) => {
    setModelData(data);
    setActiveTab('viewer');
  };

  return (
    <div className="flex h-screen w-screen bg-[#020817] text-slate-100 font-sans overflow-hidden relative">
      {/* Background Layer */}
      <div className="fixed inset-0 arch-bg opacity-20 pointer-events-none" />
      <div className="fixed inset-0 bg-mesh opacity-40 pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-[#020817]/50 to-[#020817] pointer-events-none" />

      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header Bar */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-10 bg-slate-950/20 backdrop-blur-xl z-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 px-4 py-2 bg-orange-500/10 rounded-2xl border border-orange-500/20">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse shadow-[0_0_10px_rgba(249,115,22,1)]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] font-black text-orange-500">Neural Engine: Active</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-slate-500">
              <Clock className="w-4 h-4" />
              <span className="text-[10px] font-mono uppercase tracking-widest">Uptime: 124.5h</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center overflow-hidden ring-2 ring-white/5">
                  <img src={`https://picsum.photos/seed/${i+10}/40/40`} alt="user" referrerPolicy="no-referrer" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-slate-950 bg-slate-900 flex items-center justify-center ring-2 ring-white/5 text-[10px] font-black text-slate-500">
                +12
              </div>
            </div>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl border border-white/10 transition-all active:scale-95">
              Collaborate
            </button>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="flex-1 relative flex overflow-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                className="flex-1 flex items-center justify-center p-10 z-10"
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
                className="flex-1 relative flex overflow-hidden"
              >
                <div className="flex-1 relative">
                  <ThreeViewer data={modelData} config={config} />
                </div>
                <ControlPanel config={config} setConfig={setConfig} />
              </motion.div>
            )}

            {activeTab === 'projects' && (
              <motion.div
                key="projects"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex-1 p-12 overflow-y-auto custom-scrollbar z-10"
              >
                <div className="max-w-6xl mx-auto">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h2 className="text-5xl font-display font-black uppercase tracking-tighter text-white italic mb-2">Workspace</h2>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.4em]">Active Neural Clusters</p>
                    </div>
                    <button className="px-8 py-4 bg-orange-500 text-slate-950 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl shadow-lg shadow-orange-500/20">
                      New Cluster
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="glass-card rounded-[2rem] p-8 group cursor-pointer">
                        <div className="aspect-video rounded-2xl bg-slate-900 mb-6 overflow-hidden relative">
                          <img src={`https://picsum.photos/seed/${i+20}/400/225`} alt="project" className="w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="px-2 py-1 bg-orange-500 text-slate-950 text-[8px] font-black uppercase tracking-widest rounded-md">v{i}.0</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-display font-black text-white uppercase tracking-tight mb-2 group-hover:text-orange-400 transition-colors">Neural_Structure_00{i}</h3>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                          <span>3.4M Polygons</span>
                          <span>2h ago</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex-1 p-12 flex items-center justify-center z-10"
              >
                <div className="max-w-2xl w-full glass-panel rounded-[2.5rem] p-12">
                  <h2 className="text-4xl font-display font-black uppercase tracking-tighter text-white italic mb-10">System Config</h2>
                  <div className="space-y-8">
                    {[
                      { label: 'Neural Resolution', value: 'High (4K)' },
                      { label: 'Compute Cluster', value: 'AWS-US-EAST-1' },
                      { label: 'Mesh Optimization', value: 'Enabled' },
                      { label: 'Auto-Save Frequency', value: '5 min' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-4 border-b border-white/5">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{item.label}</span>
                        <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest">{item.value}</span>
                      </div>
                    ))}
                    <button className="w-full py-5 bg-white/5 hover:bg-white/10 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl border border-white/10 transition-all mt-8">
                      Reset System Defaults
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

