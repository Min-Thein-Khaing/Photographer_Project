import { motion } from 'motion/react';
import { TESTIMONIALS } from '../data/portfolioData';

export function Testimonials() {
  return (
    <section className="py-24 px-6 sm:px-8 md:px-16 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3 font-light">
            PRAISE &amp; REFLECTIONS
          </span>
          <h2 className="font-serif italic text-3xl sm:text-4xl md:text-5xl text-white tracking-[-0.01em]">
            Kind Words
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {TESTIMONIALS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: 'easeOut' }}
              className="flex flex-col justify-between"
            >
              <div>
                <span className="block font-serif text-5xl sm:text-6xl text-white/20 leading-none mb-3 select-none">
                  “
                </span>
                <p className="font-serif italic text-base sm:text-lg text-white/80 leading-[1.8] mb-6">
                  {item.quote}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="font-sans text-xs tracking-[0.15em] uppercase text-white font-normal">
                  {item.author}
                </p>
                <p className="font-sans text-[11px] tracking-[0.15em] uppercase text-white/40 mt-0.5 font-light">
                  {item.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
