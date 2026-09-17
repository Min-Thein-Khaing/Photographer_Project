import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/portfolioData';
import type { PortfolioCategory, PortfolioItem } from '../types';

interface PortfolioMasonryProps {
  onSelectItem: (item: PortfolioItem) => void;
}

export function PortfolioMasonry({ onSelectItem }: PortfolioMasonryProps) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('all');

  const categories: { id: PortfolioCategory; label: string }[] = [
    { id: 'all', label: 'All Works' },
    { id: 'portrait', label: 'Portraits' },
    { id: 'editorial', label: 'Editorial' },
    { id: 'brand', label: 'Brand Identity' },
  ];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="work" className="py-24 px-6 sm:px-8 md:px-16 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 font-light">
                SELECTED WORK
              </span>
              <span className="text-white/30">•</span>
              <span className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/40 flex items-center gap-1">
                <Sparkles size={11} /> Hover to reveal color
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.01em]">
              Frames &amp; Folios
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`font-sans text-xs tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'border-white bg-white text-black font-medium'
                    : 'border-white/15 text-white/60 hover:text-white hover:border-white/40 bg-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Masonry Columns */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: (index % 6) * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ scale: 1.015 }}
                onClick={() => onSelectItem(item)}
                className="group relative overflow-hidden break-inside-avoid mb-4 cursor-pointer bg-neutral-900 border border-white/10"
              >
                <div className="relative overflow-hidden aspect-auto">
                  {/* Image: Grayscale by default, smooth transition to full color on hover */}
                  <img
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                    className="w-full h-auto object-cover grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 group-hover:scale-105 transition-all duration-700 ease-out"
                  />

                  {/* Dark Vignette Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6" />

                  {/* Overlay Content on Hover */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none">
                    <div className="flex justify-between items-start">
                      <span className="font-sans text-[10px] tracking-[0.25em] uppercase text-white font-medium bg-black/70 px-2.5 py-1 backdrop-blur-md border border-white/20">
                        {item.categoryLabel}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 shadow-md">
                        <ArrowUpRight size={16} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-serif italic text-lg sm:text-xl text-white font-light tracking-wide drop-shadow-md">
                        {item.title}
                      </h3>
                      <div className="flex items-center justify-between text-[11px] font-sans text-white/80 tracking-wider uppercase mt-1 drop-shadow-sm">
                        <span>{item.dimensions}</span>
                        <span className="underline underline-offset-4 text-white">View Project →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
