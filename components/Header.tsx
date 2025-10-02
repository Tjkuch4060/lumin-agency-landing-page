import React, { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Process', href: '#process' },
  { name: 'FAQ', href: '#faq' },
];

export const Header: React.FC<{ bookingUrl: string }> = ({ bookingUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold text-white z-50">Lumin<span className="text-blue-400">.</span></a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{link.name}</a>
          ))}
        </nav>
        
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-lg cta-primary text-white font-semibold text-sm transition-transform duration-300">
          Get Free Audit
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white focus:outline-none">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-0 left-0 w-full h-screen bg-slate-900 transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform-none' : '-translate-y-full'}`} style={{paddingTop: '5rem'}}>
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="text-xl font-medium text-slate-300 hover:text-white transition-colors">{link.name}</a>
          ))}
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center justify-center h-12 px-6 rounded-lg cta-primary text-white font-semibold text-base transition-transform duration-300">
            Get Free Audit
          </a>
        </nav>
      </div>
    </header>
  );
};
