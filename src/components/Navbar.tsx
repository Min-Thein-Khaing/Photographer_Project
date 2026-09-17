import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  onOpenBooking: (selectedTier?: string) => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Specialties', href: '#specialties' },
    { label: 'About', href: '#about' },
    { label: 'Investment', href: '#pricing' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md border-b border-white/10 py-4 shadow-2xl'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-16 flex justify-between items-center">
          {/* Brand Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-2 text-white font-sans text-xs sm:text-sm tracking-[0.25em] font-light uppercase transition-opacity hover:opacity-80"
          >
            <span className="w-2 h-2 rounded-full bg-white transition-transform group-hover:scale-125" />
            STILL FRAME
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="font-sans text-xs tracking-[0.15em] uppercase text-white/70 hover:text-white transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}

            <button
              onClick={() => onOpenBooking()}
              className="ml-4 font-sans text-xs tracking-[0.15em] uppercase px-5 py-2.5 rounded-none border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-1.5"
            >
              Book Session
              <ArrowUpRight size={14} />
            </button>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white/90 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-black flex flex-col justify-between p-8 sm:p-12 md:hidden"
          >
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <span className="font-sans text-xs tracking-[0.25em] font-light uppercase text-white">
                STILL FRAME
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-white/80 hover:text-white p-2"
                aria-label="Close Menu"
              >
                <X size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-8 my-auto py-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.08 }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="font-serif italic text-3xl sm:text-4xl text-white/80 hover:text-white hover:translate-x-2 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="mt-4 w-full text-center py-4 bg-white text-black font-sans uppercase text-xs tracking-[0.2em] font-medium hover:bg-neutral-200 transition-colors"
              >
                Book a Session
              </motion.button>
            </nav>

            <div className="pt-6 border-t border-white/10 flex justify-between items-center text-white/50 text-xs tracking-wider">
              <span>London &amp; Location Worldwide</span>
              <span>© 2025</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
