import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_IMAGE } from '../data/portfolioData';

export function Hero() {
  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-end select-none">
      {/* Background Image: Full-bleed portrait */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMAGE.url}
          alt={HERO_IMAGE.alt}
          className="w-full h-full object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          style={{
            filter: 'grayscale(100%) contrast(110%) brightness(85%)',
          }}
          loading="eager"
        />

        {/* Top gradient for nav clarity */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 25%, transparent 50%)',
          }}
        />

        {/* Bottom gradient fade for dramatic text contrast */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 35%, rgba(0,0,0,0.1) 65%, transparent 100%)',
          }}
        />
      </div>

      {/* Hero Content positioned at bottom left */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 md:px-16 pb-16 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-block font-sans text-xs sm:text-sm tracking-[0.3em] font-light uppercase text-white/70 mb-4">
            Still Frame Studio
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="font-serif italic text-5xl sm:text-7xl md:text-[8vw] lg:text-[7.5vw] font-normal tracking-[-0.02em] leading-[0.92] max-w-[850px] text-white"
        >
          Photography <br />
          That Says <br />
          Something.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-6 flex items-center gap-4 text-white/50 text-xs tracking-[0.2em] uppercase font-light"
        >
          <span>Portrait &amp; Editorial</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>London &amp; International</span>
        </motion.div>
      </div>

      {/* Scroll indicator prompt */}
      <button
        onClick={scrollToWork}
        className="absolute bottom-8 right-6 md:right-16 z-20 flex flex-col items-center gap-2 group cursor-pointer text-white/60 hover:text-white transition-colors"
        aria-label="Scroll to selected work"
      >
        <span className="hidden sm:inline-block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 group-hover:text-white/80 transition-colors">
          Scroll to explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white/60 transition-colors"
        >
          <ChevronDown size={18} className="text-white/70 group-hover:text-white" />
        </motion.div>
      </button>
    </section>
  );
}
