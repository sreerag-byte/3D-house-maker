import React, { useState, useCallback } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  Smile,
  Heart,
  Coffee,
  Palette
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadFormProps {
  onUploadSuccess: (data: any) => void;
}

export function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected);
      setError(null);
      setStep(2);
    } else {
      setError('Oops! Please pick a cool image file.');
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setStep(3);

    // Simulate funky synthesis process
    for (let i = 0; i <= 100; i += 2) {
      setProgress(i);
      await new Promise(r => setTimeout(r, 50));
    }

    onUploadSuccess({
      id: 'mock-id',
      meshUrl: '/mock-mesh.glb',
      metadata: { walls: 12, area: 150 }
    });
  };

  return (
    <div className="glass-panel rounded-[4rem] p-16 deep-depth border-white/60 relative overflow-hidden">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="space-y-12"
            >
              <div className="w-32 h-32 rounded-[2.5rem] bg-orange-500 flex items-center justify-center mx-auto shadow-xl animate-float">
                <UploadCloud className="text-white w-16 h-16" />
              </div>
              <div>
                <h2 className="text-5xl font-display font-black text-amber-900 tracking-tight mb-4">Add New Space</h2>
                <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest">Pick a floor plan image to start the magic</p>
              </div>
              
              <label className="block group cursor-pointer">
                <div className="border-4 border-dashed border-amber-900/10 rounded-[3rem] p-16 transition-all group-hover:border-orange-500/40 group-hover:bg-white/40">
                  <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-3xl bg-white flex items-center justify-center deep-depth group-hover:scale-110 transition-transform">
                      <Smile className="text-orange-500 w-8 h-8" />
                    </div>
                    <p className="text-lg font-black text-amber-900">Drop your plan here or click to browse</p>
                    <p className="text-[10px] font-bold text-amber-900/20 uppercase tracking-widest">PNG, JPG or SVG (Max 10MB)</p>
                  </div>
                </div>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </motion.div>
          )}

          {step === 2 && file && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-12"
            >
              <div className="relative w-64 h-64 mx-auto rounded-[3rem] overflow-hidden deep-depth border-8 border-white">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-orange-500/20 mix-blend-overlay" />
              </div>
              
              <div>
                <h2 className="text-4xl font-display font-black text-amber-900 tracking-tight mb-2">{file.name}</h2>
                <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest">Looks great! Ready to build?</p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-6 bg-white text-amber-900 text-sm font-black uppercase tracking-widest rounded-3xl hover:bg-amber-50 transition-all deep-depth"
                >
                  Change it
                </button>
                <button 
                  onClick={handleUpload}
                  className="flex-[2] py-6 bg-amber-900 text-white text-sm font-black uppercase tracking-widest rounded-3xl hover:bg-orange-600 transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  Build My Space
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-12"
            >
              <div className="relative w-48 h-48 mx-auto">
                <svg className="w-full h-full rotate-[-90deg]">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="text-amber-900/5"
                  />
                  <motion.circle
                    cx="96"
                    cy="96"
                    r="80"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    strokeDasharray="502"
                    animate={{ strokeDashoffset: 502 - (502 * progress) / 100 }}
                    className="text-orange-500"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl font-display font-black text-amber-900">{progress}%</span>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-4xl font-display font-black text-amber-900 tracking-tight">Doing the Magic...</h2>
                <div className="flex items-center justify-center gap-3">
                  <Sparkles className="w-5 h-5 text-orange-500 animate-pulse" />
                  <p className="text-sm font-bold text-amber-900/40 uppercase tracking-widest">
                    {progress < 25 && "Waking up the magic..."}
                    {progress >= 25 && progress < 50 && "Finding the walls..."}
                    {progress >= 50 && progress < 75 && "Painting with 3D pixels..."}
                    {progress >= 75 && "Adding a pinch of love..."}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[Sparkles, Palette, Coffee].map((Icon, i) => (
                  <div key={i} className={cn(
                    "p-6 rounded-3xl transition-all duration-500",
                    progress > (i + 1) * 30 ? "bg-orange-500 text-white shadow-lg" : "bg-white/40 text-amber-900/20"
                  )}>
                    <Icon className="w-6 h-6 mx-auto" />
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 p-4 bg-red-50 rounded-2xl flex items-center gap-3 text-red-600"
          >
            <AlertCircle className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-widest">{error}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
