import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Loader2,
  Box,
  Sparkles,
  Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadFormProps {
  onUploadSuccess: (data?: any) => void;
}

export function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  const handleFiles = (file: File) => {
    setIsUploading(true);
    // Simulate upload
    setTimeout(() => {
      setIsUploading(false);
      onUploadSuccess();
    }, 2000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tighter mb-2">Upload Plan</h2>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Turn your sketches into 3D models</p>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative h-[24rem] rounded-[2.5rem] border-4 border-dashed transition-all flex flex-col items-center justify-center p-8 overflow-hidden soft-shadow",
          dragActive ? "border-orange-500 bg-orange-500/5 scale-[1.02]" : "border-gray-100 dark:border-white/5 bg-white dark:bg-[#0A0A0B]",
          isUploading ? "pointer-events-none" : "cursor-pointer hover:border-orange-500/30 hover:bg-gray-50 dark:hover:bg-white/5"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input 
          ref={fileInputRef}
          type="file" 
          className="hidden" 
          onChange={(e) => e.target.files?.[0] && handleFiles(e.target.files[0])}
          accept="image/*"
        />

        <AnimatePresence mode="wait">
          {!isUploading ? (
            <motion.div 
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div className="w-20 h-20 rounded-3xl bg-gray-50 dark:bg-white/5 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="w-10 h-10 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Drop your plan here</h3>
              <p className="text-xs text-gray-400 mb-8">Or click to browse your files</p>
              
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px w-12 bg-gray-100 dark:bg-white/10" />
                <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">OR</span>
                <div className="h-px w-12 bg-gray-100 dark:bg-white/10" />
              </div>

              <button className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold uppercase tracking-widest rounded-xl shadow-xl hover:bg-gray-800 dark:hover:bg-gray-200 transition-all transform hover:scale-105 active:scale-95">
                Select File
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center relative z-10"
            >
              <div className="w-20 h-20 relative mb-8">
                <div className="absolute inset-0 border-4 border-orange-500/10 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-4 border-t-orange-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Building your space...</h3>
              <p className="text-xs text-gray-400">This will only take a moment</p>
              <div className="mt-8 w-48 h-1.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-orange-500"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { icon: Box, label: '3D Model', value: 'High Quality' },
          { icon: Sparkles, label: 'AI Engine', value: 'Smart v4' },
          { icon: Globe, label: 'Export', value: 'Ready' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#0A0A0B] p-5 rounded-[1.5rem] flex flex-col items-center gap-2 soft-shadow border border-gray-50 dark:border-white/5">
            <stat.icon className="w-4 h-4 text-orange-500" />
            <div className="text-center">
              <p className="text-[8px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">{stat.label}</p>
              <p className="text-[10px] font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
