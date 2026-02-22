import React from 'react';
import { motion } from 'motion/react';
import { Box, Sparkles, Heart, Share2, Download, Search, Filter } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const PLANS = [
  {
    id: 1,
    title: "The Zen Retreat",
    desc: "Single-story minimalist haven with open courtyards.",
    image: "https://picsum.photos/seed/zen/800/600",
    category: "Minimalist",
    stats: { rooms: 3, area: "1,200 sqft" }
  },
  {
    id: 2,
    title: "Nordic Loft",
    desc: "High ceilings and natural wood finishes for cozy living.",
    image: "https://picsum.photos/seed/nordic/800/600",
    category: "Scandinavian",
    stats: { rooms: 2, area: "950 sqft" }
  },
  {
    id: 3,
    title: "Solaris Villa",
    desc: "Eco-conscious design with maximum solar gain.",
    image: "https://picsum.photos/seed/solar/800/600",
    category: "Eco-Friendly",
    stats: { rooms: 4, area: "2,400 sqft" }
  },
  {
    id: 4,
    title: "Industrial Edge",
    desc: "Raw concrete and steel elements for urban dwellers.",
    image: "https://picsum.photos/seed/industrial/800/600",
    category: "Industrial",
    stats: { rooms: 2, area: "1,100 sqft" }
  },
  {
    id: 5,
    title: "The Glass House",
    desc: "Seamless indoor-outdoor flow with floor-to-ceiling glass.",
    image: "https://picsum.photos/seed/glass/800/600",
    category: "Modern",
    stats: { rooms: 3, area: "1,800 sqft" }
  },
  {
    id: 6,
    title: "Rustic Charm",
    desc: "Traditional stone and timber with modern amenities.",
    image: "https://picsum.photos/seed/rustic/800/600",
    category: "Traditional",
    stats: { rooms: 5, area: "3,200 sqft" }
  }
];

export function PlanCollection() {
  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full font-mono">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-white tracking-tighter uppercase mb-2">Archive_Registry</h2>
          <p className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">Verified_Architectural_Blueprints</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/5 px-4 py-2 rounded border border-white/5 flex items-center gap-3">
            <Search className="w-3.5 h-3.5 text-white/20" />
            <input 
              type="text" 
              placeholder="FILTER_BY_TAG..." 
              className="bg-transparent border-none focus:outline-none text-[10px] font-bold text-white placeholder:text-white/10 uppercase tracking-widest"
            />
          </div>
          <button className="w-10 h-10 bg-white/5 rounded border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
            <Filter className="w-4 h-4 text-white/40" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto custom-scrollbar pr-2 pb-10">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ borderColor: "rgba(249,115,22,0.3)" }}
            className="group bg-[#121214] border border-white/5 rounded-lg overflow-hidden flex flex-col transition-all"
          >
            <div className="h-48 relative overflow-hidden bg-[#0A0A0B]">
              <img 
                src={plan.image} 
                alt={plan.title} 
                className="w-full h-full object-cover opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 technical-grid opacity-20" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-8 h-8 rounded bg-[#0A0A0B]/80 border border-white/10 flex items-center justify-center text-white/40 hover:text-orange-500 transition-all">
                  <Heart className="w-4 h-4" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-2 py-1 bg-white/5 border border-white/10 text-white/40 text-[8px] font-bold uppercase tracking-widest rounded">
                  {plan.category}
                </span>
                <div className="w-6 h-6 rounded bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-orange-500" />
                </div>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-1">{plan.title}</h3>
                  <p className="text-[10px] text-white/30 font-medium line-clamp-1">ID: ARCH_REF_{plan.id * 1024}</p>
                </div>
              </div>
              
              <p className="text-[11px] text-white/50 leading-relaxed mb-6 line-clamp-2">{plan.desc}</p>
              
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-0.5">UNITS</p>
                    <p className="text-[10px] font-bold text-white/60">{plan.stats.rooms}R</p>
                  </div>
                  <div className="w-px h-4 bg-white/5" />
                  <div>
                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mb-0.5">DIM</p>
                    <p className="text-[10px] font-bold text-white/60">{plan.stats.area}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded bg-white/5 border border-white/5 text-white/40 flex items-center justify-center hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
