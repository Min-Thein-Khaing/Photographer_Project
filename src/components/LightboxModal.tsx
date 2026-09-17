import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Camera, Sun, MapPin, Calendar, Maximize2, Eye } from 'lucide-react';
import type { PortfolioItem } from '../types';

interface LightboxModalProps {
  item: PortfolioItem | null;
  items: PortfolioItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelect: (item: PortfolioItem) => void;
}

export function LightboxModal({
  item,
  items,
  isOpen,
  onClose,
  onSelect,
}: LightboxModalProps) {
  const [colorMode, setColorMode] = useState<'color' | 'monochrome'>('color');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !item) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const nextIndex = (currentIndex + 1) % items.length;
        onSelect(items[nextIndex]);
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = items.findIndex((i) => i.id === item.id);
        const prevIndex = (currentIndex - 1 + items.length) % items.length;
        onSelect(items[prevIndex]);
      } else if (e.key.toLowerCase() === 'c') {
        setColorMode((prev) => (prev === 'color' ? 'monochrome' : 'color'));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, item, items, onClose, onSelect]);

  if (!isOpen || !item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);
  const prevIndex = (currentIndex - 1 + items.length) % items.length;
  const nextIndex = (currentIndex + 1) % items.length;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 border-b border-white/10 z-20">
          <div className="flex items-center gap-4">
            <span className="font-sans text-xs tracking-[0.25em] uppercase text-white/50">
              FRAME {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/30" />
            <span className="hidden sm:inline-block font-sans text-xs tracking-[0.15em] uppercase text-white/80">
              {item.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Color / Monochrome switch */}
            <button
              onClick={() => setColorMode(colorMode === 'color' ? 'monochrome' : 'color')}
              className="px-3 py-1.5 border border-white/20 text-xs font-sans tracking-wider uppercase text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 cursor-pointer"
              title="Toggle Color / B&W (Hotkey: C)"
            >
              <Eye size={13} />
              <span>{colorMode === 'color' ? 'Natural Color' : 'Pure B&W'}</span>
            </button>

            <button
              onClick={() => {
                window.open(item.image, '_blank');
              }}
              className="p-2 text-white/60 hover:text-white transition-colors"
              title="Open full resolution"
              aria-label="Open full resolution image"
            >
              <Maximize2 size={18} />
            </button>

            <button
              onClick={onClose}
              className="p-2 text-white/70 hover:text-white border border-white/20 rounded-full hover:border-white transition-all cursor-pointer"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
          {/* Previous Button */}
          <button
            onClick={() => onSelect(items[prevIndex])}
            className="absolute left-4 sm:left-8 z-20 p-3 rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-white hover:border-white transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Photograph Container */}
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-h-[70vh] sm:max-h-[75vh] max-w-full flex items-center justify-center relative shadow-2xl"
          >
            <img
              src={item.image}
              alt={item.alt}
              className={`max-h-[70vh] sm:max-h-[75vh] max-w-[90vw] object-contain select-none transition-all duration-500 ${
                colorMode === 'monochrome'
                  ? 'grayscale contrast-110'
                  : 'grayscale-0 contrast-100'
              }`}
            />
          </motion.div>

          {/* Next Button */}
          <button
            onClick={() => onSelect(items[nextIndex])}
            className="absolute right-4 sm:right-8 z-20 p-3 rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-white hover:border-white transition-all backdrop-blur-sm cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Bottom Metadata & Editorial Notes */}
        <div className="border-t border-white/10 bg-black/90 px-6 sm:px-12 py-5 z-20">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif italic text-lg sm:text-xl text-white tracking-wide">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-white/60 font-light mt-1 max-w-xl line-clamp-2 sm:line-clamp-none">
                {item.description}
              </p>
            </div>

            {/* EXIF Metadata badges */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] font-sans tracking-widest uppercase text-white/50">
              <div className="flex items-center gap-1.5" title="Camera & Lens">
                <Camera size={13} className="text-white/70" />
                <span>{item.camera} • {item.lens}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Lighting setup">
                <Sun size={13} className="text-white/70" />
                <span>{item.lighting}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Location">
                <MapPin size={13} className="text-white/70" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center gap-1.5" title="Year">
                <Calendar size={13} className="text-white/70" />
                <span>{item.year}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
