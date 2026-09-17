export type PortfolioCategory = 'all' | 'portrait' | 'editorial' | 'brand';

export interface PortfolioItem {
  id: number;
  title: string;
  category: 'portrait' | 'editorial' | 'brand';
  categoryLabel: string;
  image: string;
  alt: string;
  aspect: 'portrait' | 'landscape' | 'square' | 'tall';
  dimensions: string;
  year: string;
  camera: string;
  lens: string;
  lighting: string;
  location: string;
  description: string;
}

export interface SpecialtyItem {
  id: string;
  iconName: 'Camera' | 'Aperture' | 'Briefcase';
  icon3d: string;
  tag: string;
  title: string;
  description: string;
}

export interface PricingTier {
  id: string;
  name: string;
  price: string;
  duration: string;
  isPopular?: boolean;
  includes: string[];
  ctaText: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  package: string;
  preferredDate: string;
  locationPreference: string;
  message: string;
}
