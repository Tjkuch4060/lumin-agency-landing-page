import React from 'react';
import { Star } from './Icons';

interface HeroSectionProps {
  bookingUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ bookingUrl }) => {
  return (
    <section id="hero" className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Neural network pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="neural-net" patternUnits="userSpaceOnUse" width="100" height="100">
              <circle cx="20" cy="20" r="2" fill="currentColor" className="text-blue-400">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="80" cy="40" r="1.5" fill="currentColor" className="text-blue-300">
                <animate attributeName="opacity" values="0.5;0.8;0.5" dur="4s" repeatCount="indefinite" />
              </circle>
              <circle cx="50" cy="80" r="1" fill="currentColor" className="text-blue-500">
                <animate attributeName="opacity" values="0.2;0.9;0.2" dur="2s" repeatCount="indefinite" />
              </circle>
              <line x1="20" y1="20" x2="80" y2="40" stroke="currentColor" strokeWidth="0.5" className="text-blue-400 opacity-30" />
              <line x1="80" y1="40" x2="50" y2="80" stroke="currentColor" strokeWidth="0.5" className="text-blue-400 opacity-30" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-net)" />
        </svg>
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Trust Indicator */}
        <div className="flex justify-center mb-8">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-full px-6 py-2 backdrop-blur-sm">
            <span className="text-blue-400 text-sm font-medium">
              🚀 Trusted by 500+ companies worldwide
            </span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Build AI That{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Transforms
            </span>{' '}
            Your Business
          </h1>
          
          <h2 className="hero-subheadline text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Custom AI solutions tailored for 10x efficiency and fast ROI. See results in 30 days, guaranteed.
          </h2>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="cta-primary text-white px-8 py-4 text-lg font-semibold rounded-lg transition-transform duration-300 inline-flex items-center justify-center">
              Get Free AI Audit
            </a>
            <a href="#roi-calculator" className="bg-transparent border-2 border-gray-600 text-white hover:bg-gray-800 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 inline-flex items-center justify-center">
              Try ROI Calculator
            </a>
          </div>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400" />
              ))}
              <span className="text-white font-semibold ml-2">4.9/5</span>
              <span className="text-gray-400">from 200+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};