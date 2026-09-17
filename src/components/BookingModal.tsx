import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, Calendar, MapPin, Sparkles } from 'lucide-react';
import type { BookingFormData } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTier?: string;
}

export function BookingModal({
  isOpen,
  onClose,
  initialTier = 'signature',
}: BookingModalProps) {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    package: initialTier,
    preferredDate: '',
    locationPreference: 'Studio (East London Loft)',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialTier) {
      setFormData((prev) => ({ ...prev, package: initialTier }));
    }
  }, [initialTier]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      package: 'signature',
      preferredDate: '',
      locationPreference: 'Studio (East London Loft)',
      message: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl bg-neutral-950 border border-white/20 p-6 sm:p-10 shadow-2xl text-white my-8 max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-white/50 hover:text-white border border-white/10 rounded-full hover:border-white transition-all"
            aria-label="Close booking dialog"
          >
            <X size={18} />
          </button>

          {submitted ? (
            <div className="py-12 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/30 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <span className="font-sans text-xs tracking-[0.3em] uppercase text-white/50 mb-2">
                RESERVATION RECEIVED
              </span>
              <h3 className="font-serif italic text-3xl sm:text-4xl text-white mb-4">
                Thank You, {formData.name || 'Friend'}.
              </h3>
              <p className="font-sans font-light text-sm text-white/70 max-w-md leading-relaxed mb-8">
                Your consultation request for the{' '}
                <span className="text-white font-medium capitalize">{formData.package}</span> package has been received. Anna will review your vision and respond via{' '}
                <span className="text-white font-medium">{formData.email}</span> within 48 hours.
              </p>
              <button
                onClick={handleReset}
                className="bg-white text-black px-8 py-3 font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-neutral-200 transition-colors"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div>
              <div className="border-b border-white/10 pb-6 mb-8">
                <div className="flex items-center gap-2 text-white/50 text-xs tracking-[0.25em] uppercase font-light mb-2">
                  <Sparkles size={14} />
                  <span>COMMISSION INQUIRY</span>
                </div>
                <h3 className="font-serif italic text-3xl sm:text-4xl text-white">
                  Schedule Your Session
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm text-white/60 mt-1.5">
                  Complete the form below to begin creative consultation and lock in studio dates.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Package Selection */}
                <div>
                  <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-2.5">
                    Select Package Tier
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'essential', label: 'Essential (£395)' },
                      { id: 'signature', label: 'Signature (£750)' },
                      { id: 'full-day', label: 'Full Day (£1,400)' },
                    ].map((pkg) => (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => setFormData({ ...formData, package: pkg.id })}
                        className={`p-3 text-left border text-xs tracking-wider transition-all ${
                          formData.package === pkg.id
                            ? 'border-white bg-white text-black font-medium'
                            : 'border-white/15 text-white/70 hover:border-white/40 bg-black/40'
                        }`}
                      >
                        {pkg.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Clara Thorne"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="clara@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {/* Preferred Date & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-2 flex items-center gap-1.5">
                      <Calendar size={13} />
                      <span>Target Shoot Date</span>
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full bg-black/50 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div>
                    <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-2 flex items-center gap-1.5">
                      <MapPin size={13} />
                      <span>Shoot Setting</span>
                    </label>
                    <select
                      value={formData.locationPreference}
                      onChange={(e) => setFormData({ ...formData, locationPreference: e.target.value })}
                      className="w-full bg-neutral-900 border border-white/20 px-4 py-3 text-sm text-white focus:outline-none focus:border-white transition-colors"
                    >
                      <option value="Studio (East London Loft)">Studio (East London Loft)</option>
                      <option value="On-Location (London)">On-Location (London)</option>
                      <option value="Client Workspace / Headquarters">Client Workspace / HQ</option>
                      <option value="International / Destination">International / Destination</option>
                    </select>
                  </div>
                </div>

                {/* Vision / Notes */}
                <div>
                  <label className="block font-sans text-xs tracking-[0.15em] uppercase text-white/70 mb-2">
                    Creative Vision &amp; Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about the mood, subjects, wardrobe ideas, or intended use (portfolio, publication, website)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/50 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                {/* Submit button */}
                <div className="pt-4 flex items-center justify-between gap-4">
                  <span className="text-[11px] font-sans text-white/40">
                    * No deposit required for initial consultation
                  </span>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-white text-black px-8 py-3.5 font-sans text-xs tracking-[0.2em] uppercase font-medium hover:bg-neutral-200 transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? 'Sending Inquiry...' : 'Submit Inquiry'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
