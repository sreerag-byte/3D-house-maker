import React, { useState, useRef } from 'react';
import { UploadCloud, FileImage, CheckCircle, Loader2, Zap } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface UploadFormProps {
  onUploadSuccess: (data: any) => void;
}

export function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [planFile, setPlanFile] = useState<File | null>(null);
  const [elevationFile, setElevationFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const planInputRef = useRef<HTMLInputElement>(null);
  const elevationInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'plan' | 'elevation') => {
    const file = e.target.files?.[0];
    if (file) {
      if (type === 'plan') setPlanFile(file);
      else setElevationFile(file);
    }
  };

  const handleUpload = async () => {
    if (!planFile || !elevationFile) {
      setError("Please select both a floor plan and an elevation image.");
      return;
    }

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('plan', planFile);
    formData.append('elevation', elevationFile);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-12 glass-panel rounded-[2rem] relative overflow-hidden group">
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors duration-700" />
      
      <div className="relative z-10 text-left mb-12">
        <div className="inline-block px-3 py-1 bg-orange-500/10 border border-orange-500/20 rounded-full mb-4">
          <p className="text-[8px] font-black text-orange-500 uppercase tracking-[0.4em]">Neural Processing Unit</p>
        </div>
        <h2 className="text-6xl font-display font-black tracking-tighter text-white mb-4 uppercase italic leading-none">
          Initialize <span className="text-gradient">Scan</span>
        </h2>
        <p className="text-slate-400 font-mono text-[10px] uppercase tracking-[0.2em] leading-relaxed max-w-md">
          Feed the engine with 2D architectural data to reconstruct high-fidelity volumetric geometry.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Plan Upload */}
        <div 
          className={cn(
            "relative flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer group/item",
            planFile 
              ? "bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-orange-500/30 hover:bg-white/10"
          )}
          onClick={() => planInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={planInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'plan')}
          />
          {planFile ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] truncate w-full text-center px-4">{planFile.name}</span>
              <span className="text-[8px] font-bold uppercase mt-2 opacity-50 tracking-widest">Footprint Vectorized</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 group-hover/item:text-slate-200">
              <UploadCloud className="w-12 h-12 mb-6 transition-transform duration-500 group-hover/item:-translate-y-2" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Floor Plan</span>
              <span className="text-[8px] font-bold uppercase mt-2 opacity-30 tracking-widest">Top-Down View</span>
            </div>
          )}
        </div>

        {/* Elevation Upload */}
        <div 
          className={cn(
            "relative flex flex-col items-center justify-center p-10 rounded-3xl border-2 border-dashed transition-all duration-500 cursor-pointer group/item",
            elevationFile 
              ? "bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-[0_0_30px_rgba(249,115,22,0.1)]" 
              : "bg-white/5 border-white/10 hover:border-orange-500/30 hover:bg-white/10"
          )}
          onClick={() => elevationInputRef.current?.click()}
        >
          <input 
            type="file" 
            ref={elevationInputRef} 
            className="hidden" 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'elevation')}
          />
          {elevationFile ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] truncate w-full text-center px-4">{elevationFile.name}</span>
              <span className="text-[8px] font-bold uppercase mt-2 opacity-50 tracking-widest">Height Analyzed</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-slate-400 group-hover/item:text-slate-200">
              <FileImage className="w-12 h-12 mb-6 transition-transform duration-500 group-hover/item:-translate-y-2" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Elevation</span>
              <span className="text-[8px] font-bold uppercase mt-2 opacity-30 tracking-widest">Frontal View</span>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-8 p-5 bg-red-500/10 border border-red-500/20 text-red-400 font-black text-[10px] uppercase tracking-[0.2em] text-center rounded-2xl">
          {error}
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!planFile || !elevationFile || isUploading}
        className={cn(
          "w-full py-6 rounded-2xl font-black text-slate-950 uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-4 text-xs overflow-hidden relative",
          (!planFile || !elevationFile || isUploading)
            ? "bg-slate-800 text-slate-500 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-400 shadow-lg shadow-orange-500/20 active:scale-[0.98]"
        )}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Synthesizing Mesh...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            Execute Reconstruction
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-1000" />
      </button>
    </div>
  );
}
