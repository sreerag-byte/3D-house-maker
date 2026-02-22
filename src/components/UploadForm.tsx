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
    <div className="w-full max-w-2xl">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-900 tracking-tighter mb-2">Upload Plan</h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Turn your sketches into 3D models</p>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative h-[32rem] rounded-[3rem] border-4 border-dashed transition-all flex flex-col items-center justify-center p-12 overflow-hidden soft-shadow",
          dragActive ? "border-orange-500 bg-orange-500/5 scale-[1.02]" : "border-gray-100 bg-white",
          isUploading ? "pointer-events-none" : "cursor-pointer"
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
              <div className="w-24 h-24 rounded-3xl bg-gray-50 flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 transition-transform">
                <UploadCloud className="w-12 h-12 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Drop your plan here</h3>
              <p className="text-sm text-gray-400 mb-12">Or click to browse your files</p>
              
              <div className="flex items-center gap-4 mb-12">
                <div className="h-px w-12 bg-gray-100" />
                <span className="text-[10px] font-bold text-gray-200 uppercase tracking-widest">OR</span>
                <div className="h-px w-12 bg-gray-100" />
              </div>

              <button className="px-10 py-4 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-xl hover:bg-gray-800 transition-all">
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
              <div className="w-24 h-24 relative mb-10">
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
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Building your space...</h3>
              <p className="text-sm text-gray-400">This will only take a moment</p>
              <div className="mt-12 w-64 h-2 bg-gray-100 rounded-full overflow-hidden">
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

      <div className="mt-12 grid grid-cols-3 gap-6">
        {[
          { icon: Box, label: '3D Model', value: 'High Quality' },
          { icon: Sparkles, label: 'AI Engine', value: 'Smart v4' },
          { icon: Globe, label: 'Export', value: 'Ready' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] flex flex-col items-center gap-3 soft-shadow">
            <stat.icon className="w-5 h-5 text-orange-500" />
            <div className="text-center">
              <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-[11px] font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
