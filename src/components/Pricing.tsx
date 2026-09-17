import { motion } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { PRICING_TIERS } from '../data/portfolioData';

interface PricingProps {
  onSelectTier: (tierId: string) => void;
}

export function Pricing({ onSelectTier }: PricingProps) {
  return (
    <section id="pricing" className="py-24 px-6 sm:px-8 md:px-16 border-t border-white/10 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <span className="block font-sans text-xs tracking-[0.3em] uppercase text-white/40 mb-3 font-light">
            COMMISSIONS &amp; RATES
          </span>
          <h2 className="font-serif italic text-4xl sm:text-5xl md:text-6xl text-white tracking-[-0.01em]">
            Investment
          </h2>
        </div>

        {/* Hairline Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/15 border border-white/15">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-black p-8 sm:p-10 flex flex-col justify-between relative transition-colors duration-300 ${
                tier.isPopular ? 'md:bg-neutral-950/80 md:shadow-2xl' : ''
              }`}
            >
              {tier.isPopular && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-white text-black px-3 py-1 text-[10px] font-sans font-medium tracking-[0.2em] uppercase">
                  Most Requested
                </div>
              )}

              <div>
                <span className="block font-sans text-xs tracking-[0.25em] uppercase text-white/50 mb-3">
                  {tier.name}
                </span>

                <div className="flex items-baseline gap-2 mb-2">
                  <span className="font-serif text-4xl sm:text-5xl text-white font-normal">
                    {tier.price}
                  </span>
                </div>

                <span className="block font-sans font-light text-sm text-white/40 mb-8 tracking-wider">
                  {tier.duration}
                </span>

                <div className="w-full h-px bg-white/10 mb-8" />

                <ul className="space-y-3.5 mb-10">
                  {tier.includes.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 font-sans font-light text-sm text-white/70 leading-relaxed"
                    >
                      <Check size={14} className="mt-1 text-white/40 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/10">
                <button
                  onClick={() => onSelectTier(tier.id)}
                  className={`w-full group flex items-center justify-between py-3.5 px-5 font-sans text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                    tier.isPopular
                      ? 'bg-white text-black hover:bg-neutral-200'
                      : 'border border-white/20 text-white hover:border-white hover:bg-white/5'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight
                    size={15}
                    className="transform group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
