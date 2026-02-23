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
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tighter mb-2">Design Gallery</h2>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Explore beautiful floor plans</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-white/5 px-6 py-3 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center gap-4 soft-shadow">
            <Search className="w-4 h-4 text-gray-300" />
            <input 
              type="text" 
              placeholder="Search styles..." 
              className="bg-transparent border-none focus:outline-none text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-300 dark:placeholder:text-white/20"
            />
          </div>
          <button className="w-12 h-12 bg-white dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/10 transition-colors soft-shadow">
            <Filter className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-y-auto custom-scrollbar pr-2 pb-10">
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group bg-white dark:bg-[#0A0A0B] border border-gray-100 dark:border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col transition-all soft-shadow hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
          >
            <div className="h-56 relative overflow-hidden">
              <img 
                src={plan.image} 
                alt={plan.title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/60 backdrop-blur-md flex items-center justify-center text-gray-400 hover:text-orange-500 transition-all shadow-sm">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="px-4 py-1.5 bg-white/90 dark:bg-black/60 backdrop-blur-md text-gray-900 dark:text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {plan.category}
                </span>
              </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{plan.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">{plan.desc}</p>
              </div>
              
              <div className="mt-auto pt-8 border-t border-gray-50 dark:border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Rooms</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{plan.stats.rooms}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-50 dark:bg-white/5" />
                  <div>
                    <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Area</p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{plan.stats.area}</p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 flex items-center justify-center shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
