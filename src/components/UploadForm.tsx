import React, { useState, useRef } from 'react';
import { 
  UploadCloud, 
  Loader2,
  Cpu,
  Globe,
  Binary
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
    <div className="w-full max-w-2xl font-mono">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-2">Data_Ingestion</h2>
        <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">Upload_Blueprints_For_Neural_Processing</p>
      </div>

      <div 
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={cn(
          "relative h-96 rounded-lg border-2 border-dashed transition-all flex flex-col items-center justify-center p-12 overflow-hidden",
          dragActive ? "border-orange-500 bg-orange-500/5" : "border-white/5 bg-[#121214]",
          isUploading ? "pointer-events-none" : "cursor-pointer"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="absolute inset-0 technical-grid opacity-20" />
        
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
              <div className="w-20 h-20 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-orange-500/50 transition-all">
                <UploadCloud className="w-10 h-10 text-white/20" />
              </div>
              <p className="text-sm font-bold text-white/80 tracking-widest uppercase mb-2">Drop_Source_Files</p>
              <p className="text-[10px] text-white/20 font-medium uppercase tracking-widest">Supports: JPG, PNG, PDF (MAX 50MB)</p>
              
              <div className="mt-12 flex items-center gap-4">
                <div className="h-px w-12 bg-white/5" />
                <span className="text-[8px] font-bold text-white/10 uppercase tracking-[0.5em]">OR</span>
                <div className="h-px w-12 bg-white/5" />
              </div>

              <button className="mt-12 px-8 py-3 bg-white/5 border border-white/10 text-[10px] font-bold text-white/60 tracking-widest uppercase hover:bg-white/10 hover:text-white transition-all rounded">
                Browse_Local_Storage
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center relative z-10"
            >
              <div className="w-24 h-24 relative mb-8">
                <div className="absolute inset-0 border-2 border-orange-500/20 rounded-full" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 border-2 border-t-orange-500 rounded-full"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
                </div>
              </div>
              <p className="text-xs font-bold text-orange-500 tracking-[0.3em] uppercase animate-pulse">Processing_Neural_Weights...</p>
              <div className="mt-8 w-64 h-1 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corner Accents */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/20" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/20" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/20" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/20" />
      </div>

      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          { label: 'ENCRYPTION', status: 'AES-256' },
          { label: 'VALIDATION', status: 'ACTIVE' },
          { label: 'PARSER', status: 'v4.0' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/5 p-4 rounded flex flex-col gap-1">
            <span className="text-[8px] font-bold text-white/20 tracking-widest uppercase">{stat.label}</span>
            <span className="text-[10px] font-bold text-white/60 tracking-widest">{stat.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
