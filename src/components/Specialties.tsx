import { motion } from 'motion/react';
import { SPECIALTIES } from '../data/portfolioData';

export function Specialties() {
  return (
    <section id="specialties" className="py-24 px-6 sm:px-8 md:px-16 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3 font-light">
            WHAT WE DO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.01em]">
            Disciplines &amp; Focus
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {SPECIALTIES.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -6 }}
              className="group relative p-8 sm:p-10 bg-neutral-950/60 border border-white/10 hover:border-white/30 transition-all duration-500 flex flex-col justify-between"
            >
              {/* Top: 3D Icon Container */}
              <div>
                <div className="relative mb-8 flex items-center justify-start">
                  {/* Subtle ambient glow behind 3D icon */}
                  <div className="absolute -inset-2 bg-white/5 rounded-full blur-xl group-hover:bg-white/10 transition-colors duration-500" />
                  
                  {/* 3D Icon Display */}
                  <motion.div
                    whileHover={{ scale: 1.08, rotate: [0, -2, 2, 0] }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-black/80 border border-white/15 p-2 shadow-2xl flex items-center justify-center cursor-pointer"
                  >
                    <img
                      src={specialty.icon3d}
                      alt={`${specialty.title} 3D Icon`}
                      className="w-full h-full object-contain filter grayscale contrast-115 group-hover:grayscale-0 group-hover:contrast-100 group-hover:scale-110 transition-all duration-500"
                    />
                  </motion.div>
                </div>

                {/* Specialty Tag */}
                <span className="inline-block font-sans text-[10px] tracking-[0.25em] uppercase text-white/40 mb-3 font-medium">
                  {specialty.tag}
                </span>

                {/* Title */}
                <h3 className="font-serif text-2xl sm:text-3xl text-white mb-4 group-hover:translate-x-1 transition-transform duration-300">
                  {specialty.title}
                </h3>

                {/* Description */}
                <p className="font-sans font-light text-[0.925rem] leading-[1.8] text-white/65">
                  {specialty.description}
                </p>
              </div>

              {/* Bottom Hairline Highlight */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-sans tracking-[0.15em] uppercase text-white/40 group-hover:text-white/80 transition-colors">
                <span>Explore Discipline</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
