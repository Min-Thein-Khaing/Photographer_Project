import { motion } from 'motion/react';
import { PHOTOGRAPHER_IMAGE } from '../data/portfolioData';

export function About() {
  return (
    <section id="about" className="py-24 px-6 sm:px-8 md:px-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: Photographer Portrait */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative aspect-[4/5] sm:aspect-square w-full overflow-hidden bg-neutral-900 border border-white/10 group cursor-pointer"
        >
          <img
            src={PHOTOGRAPHER_IMAGE.url}
            alt={PHOTOGRAPHER_IMAGE.alt}
            className="w-full h-full object-cover object-center grayscale contrast-110 brightness-90 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md px-4 py-2.5 border border-white/10 flex justify-between items-center text-[10px] font-sans tracking-[0.2em] uppercase text-white/70">
            <span>Anna Whitfield</span>
            <span>Founder &amp; Principal</span>
          </div>
        </motion.div>

        {/* Right: Editorial Bio & Quote */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col justify-center"
        >
          <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-4 font-light">
            ABOUT
          </span>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-8 tracking-[-0.01em]">
            Anna Whitfield
          </h2>

          <div className="space-y-5 text-white/75 font-sans font-light text-base leading-[1.85]">
            <p>
              I've been photographing people for over a decade. Not the polished,
              over-directed version of people — the actual ones. The ones who laugh
              wrong and hold their breath before the camera clicks. Those are the
              photographs that last.
            </p>

            <blockquote className="my-8 border-l-2 border-white/20 pl-6 py-1 font-serif italic text-xl sm:text-2xl text-white/90 leading-snug">
              &ldquo;The version of you that already exists — that's who we're here to photograph.&rdquo;
            </blockquote>

            <p>
              Still Frame Studio started as a one-person operation in a rented loft in
              East London. It's still that, at its core — a single photographer, a
              deliberate eye, and a belief that a great portrait is an act of collaboration.
            </p>

            <p>
              I work primarily in natural light. I don't over-direct. I don't over-edit.
              What you see is what was there.
            </p>
          </div>

          <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap gap-8 text-xs font-sans tracking-[0.2em] uppercase text-white/50">
            <div>
              <span className="text-white block font-medium">10+ Years</span>
              <span>In Practice</span>
            </div>
            <div>
              <span className="text-white block font-medium">East London</span>
              <span>Daylight Loft</span>
            </div>
            <div>
              <span className="text-white block font-medium">Analog &amp; Digital</span>
              <span>Dual Workflow</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
