import { motion } from 'motion/react';
import { ArrowUpRight, Mail } from 'lucide-react';

interface BookingCTAProps {
  onOpenBooking: () => void;
}

export function BookingCTA({ onOpenBooking }: BookingCTAProps) {
  return (
    <section id="book" className="py-28 sm:py-36 px-6 sm:px-8 md:px-16 bg-white text-black select-none">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-sans text-xs tracking-[0.3em] uppercase text-black/50 mb-6 font-medium"
        >
          READY WHEN YOU ARE
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-serif italic text-4xl sm:text-6xl md:text-[5vw] text-black font-normal leading-[1.05] tracking-[-0.01em] mb-6 max-w-2xl"
        >
          Let’s Create Something.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="font-sans font-light text-base sm:text-lg text-black/70 max-w-xl leading-relaxed mb-10"
        >
          Sessions available in London and on location across the UK &amp; worldwide. Enquiries typically responded to within 48 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-5 w-full sm:w-auto"
        >
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto bg-black text-white px-10 py-4 font-sans text-xs sm:text-sm tracking-[0.2em] uppercase font-normal hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer shadow-lg"
          >
            <span>Book a Session</span>
            <ArrowUpRight size={16} className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          <a
            href="mailto:studio@stillframe.photo?subject=Studio%20Session%20Enquiry"
            className="font-sans text-xs tracking-[0.15em] uppercase text-black/70 hover:text-black transition-colors py-3 px-4 flex items-center gap-2 underline underline-offset-4"
          >
            <Mail size={14} />
            <span>Or email us directly →</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
