import React, { useRef, MouseEvent } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface PlasmicButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'brutalist';
  glowColor?: string;
}

export function PlasmicButton({ 
  children, 
  className, 
  variant = 'primary', 
  glowColor = 'rgba(99, 102, 241, 0.4)',
  ...props 
}: PlasmicButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    buttonRef.current.style.setProperty('--x', `${x}%`);
    buttonRef.current.style.setProperty('--y', `${y}%`);
  };

  if (variant === 'brutalist') {
    return (
      <button
        {...props}
        className={cn(
          "px-6 py-3 bg-white text-black font-bold uppercase tracking-widest brutalist-border",
          className
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      {...props}
      className={cn(
        "plasmic-effect px-6 py-3 rounded-lg font-medium text-white transition-all active:scale-95",
        variant === 'primary' ? "bg-white/10 hover:bg-white/20" : "bg-transparent hover:bg-white/5",
        className
      )}
      style={{ '--glow-color': glowColor } as any}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
