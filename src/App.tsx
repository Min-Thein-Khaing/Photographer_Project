import { useState } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { GrainOverlay } from './components/GrainOverlay';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PortfolioMasonry } from './components/PortfolioMasonry';
import { LightboxModal } from './components/LightboxModal';
import { Specialties } from './components/Specialties';
import { About } from './components/About';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { BookingCTA } from './components/BookingCTA';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';
import { PORTFOLIO_ITEMS } from './data/portfolioData';
import type { PortfolioItem } from './types';

export function App() {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTier, setBookingTier] = useState<string>('signature');

  const handleOpenLightbox = (item: PortfolioItem) => {
    setSelectedItem(item);
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
    setSelectedItem(null);
  };

  const handleOpenBooking = (tierId: string = 'signature') => {
    setBookingTier(tierId);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* 35mm Film Grain Overlay */}
      <GrainOverlay />

      {/* Dynamic Blend-mode Difference Cursor */}
      <CustomCursor />

      {/* Sticky Responsive Header */}
      <Navbar onOpenBooking={() => handleOpenBooking('signature')} />

      {/* Main Page Flow */}
      <main>
        {/* Full-Bleed Hero */}
        <Hero />

        {/* Selected Work Masonry Grid */}
        <PortfolioMasonry onSelectItem={handleOpenLightbox} />

        {/* Photography Disciplines */}
        <Specialties />

        {/* Photographer Bio & Studio Story */}
        <About />

        {/* Investment & Packages */}
        <Pricing onSelectTier={(tierId) => handleOpenBooking(tierId)} />

        {/* Client Praise & Testimonials */}
        <Testimonials />

        {/* Inverted Contrast Booking Call to Action */}
        <BookingCTA onOpenBooking={() => handleOpenBooking('signature')} />
      </main>

      {/* Studio Footer */}
      <Footer />

      {/* Full-Screen Interactive Lightbox */}
      <LightboxModal
        item={selectedItem}
        items={PORTFOLIO_ITEMS}
        isOpen={isLightboxOpen}
        onClose={handleCloseLightbox}
        onSelect={setSelectedItem}
      />

      {/* Session Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        initialTier={bookingTier}
      />
    </div>
  );
}

export default App;
