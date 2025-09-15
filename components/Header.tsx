import React, { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Case Studies', href: '#case-studies' },
  { name: 'Process', href: '#process' },
  { name: 'FAQ', href: '#faq' },
];

export const Header: React.FC<{ bookingUrl: string }> = ({ bookingUrl }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#hero" className="text-2xl font-bold text-white">Lumin<span className="text-blue-400">.</span></a>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">{link.name}</a>
          ))}
        </nav>
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="hidden md:inline-flex items-center justify-center h-10 px-5 rounded-lg cta-primary text-white font-semibold text-sm transition-transform duration-300">
          Get Free Audit
        </a>
      </div>
    </header>
  );
};