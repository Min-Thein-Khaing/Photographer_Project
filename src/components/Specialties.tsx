import { motion } from 'motion/react';
import { Camera, Aperture, Briefcase } from 'lucide-react';
import { SPECIALTIES } from '../data/portfolioData';

export function Specialties() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Camera':
        return <Camera size={24} className="text-white/40 stroke-[1.5]" />;
      case 'Aperture':
        return <Aperture size={24} className="text-white/40 stroke-[1.5]" />;
      case 'Briefcase':
        return <Briefcase size={24} className="text-white/40 stroke-[1.5]" />;
      default:
        return <Camera size={24} className="text-white/40 stroke-[1.5]" />;
    }
  };

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {SPECIALTIES.map((specialty, index) => (
            <motion.div
              key={specialty.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
              className="flex flex-col items-start"
            >
              <div className="mb-6 p-3 bg-neutral-900 border border-white/10 inline-flex items-center justify-center">
                {getIcon(specialty.iconName)}
              </div>
              <h3 className="font-serif text-2xl text-white mb-3">
                {specialty.title}
              </h3>
              <p className="font-sans font-light text-[0.95rem] leading-[1.75] text-white/60 max-w-[320px]">
                {specialty.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
