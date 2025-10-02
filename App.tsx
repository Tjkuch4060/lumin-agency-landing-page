

import React, { useMemo, useState, useEffect, useRef } from "react";
// FIX: Removed FileText and Building2 as they are not exported from Icons.tsx and not used.
import { CheckCircle, ArrowRight, Shield, Lock, Star, Quote, ChevronDown, Mail, Phone, Users, DollarSign, Clock, Share2, Twitter, Linkedin, MessageSquare, Zap, Target, PlayIcon, GitHub, MapPin } from "./components/Icons";
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { RoiCalculator } from "./components/RoiCalculator";
import { Faq } from "./components/Faq";
import { AiDemoWidget } from "./components/AiDemoWidget";
import { VideoModal } from "./components/VideoModal";
import { HeroSection } from "./components/Hero";
import { Footer } from "./components/Footer";
import { StatsSection } from "./components/StatsSection";
import Services from "./components/Services";
import { Header } from "./components/Header";
import { Testimonials } from "./components/Testimonials";


// Add gtag to the window interface for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: { [key: string]: any }) => void;
  }
}

/**
 * Lumin Agency Landing Page
 * - Single-file React component
 * - TailwindCSS for layout and styling
 * - Custom UI components for buttons and cards
 * - Accessible, performant, SEO-ready
 */

// --- HOOKS & UTILS ---
const useOnScreen = (ref: React.RefObject<HTMLElement>, rootMargin = '0px -50px 0px -50px') => {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin }
    );
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, rootMargin]);
  return isIntersecting;
};

const AnimatedSection: React.FC<{ children: React.ReactNode, className?: string, id: string }> = ({ children, className, id }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(ref);
  return (
    <section ref={ref} id={id} className={`${className || ''} fade-in-up ${isVisible ? 'visible' : ''}`}>
      {children}
    </section>
  );
};

const primary = "#1A73E8"; // Blue for trust
const secondary = "#FF6F00"; // Orange for conversion

// --- DATA ---
const clientLogos = [
  { name: "Summit Legal", Svg: () => <svg viewBox="0 0 180 40" className="h-10 w-auto"><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor">Summit Legal</text></svg> },
  { name: "Keystone Realty", Svg: () => <svg viewBox="0 0 180 40" className="h-10 w-auto"><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor">Keystone Realty</text></svg> },
  { name: "Bright Smiles Dental", Svg: () => <svg viewBox="0 0 180 40" className="h-10 w-auto"><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor">Bright Smiles Dental</text></svg> },
  { name: "GreenScape Co.", Svg: () => <svg viewBox="0 0 180 40" className="h-10 w-auto"><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor">GreenScape Co.</text></svg> },
  { name: "Innovate Tech", Svg: () => <svg viewBox="0 0 180 40" className="h-10 w-auto"><text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" fill="currentColor">Innovate Tech</text></svg> },
];
const caseStudies = [
  {
    title: "E-commerce Giant Saves $500K Annually",
    quote: "Lumin Agency's AI chatbot reduced our customer service costs by 60% while improving response times from hours to seconds.",
    results: [
      { value: "60%", label: "Cost Reduction" },
      { value: "3 sec", label: "Response Time" },
      { value: "95%", label: "Resolution Rate" },
    ],
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "AI Dashboard showing improved customer service metrics."
  },
  {
    title: "SaaS Firm Automates 85% of Inbound Leads",
    quote: "The lead qualification bot is a game-changer. Our sales team now focuses only on high-value prospects, boosting conversion rates by 25%.",
    results: [
      { value: "85%", label: "Lead Tasks Automated" },
      { value: "25%", label: "Conversion Lift" },
      { value: "40+", label: "Hours Saved Weekly" },
    ],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    imageAlt: "A sales pipeline chart showing a significant increase in qualified leads."
  }
];
const techStack = {
    logos: ["OpenAI", "Google AI", "Anthropic", "AWS", "Microsoft Azure"],
    certifications: [
        { icon: Star, text: "Official OpenAI Partner" },
        { icon: Lock, text: "SOC2 Compliant" },
        { icon: Shield, text: "Enterprise Security" },
    ]
};
const trustSignals = {
    badges: [
        { src: "https://placehold.co/120x40/e2e8f0/64748b?text=SOC2", alt: "SOC2 Compliant" },
        { src: "https://placehold.co/120x40/e2e8f0/64748b?text=GDPR", alt: "GDPR Compliant" },
        { src: "https://placehold.co/120x40/e2e8f0/64748b?text=ISO+27001", alt: "ISO 27001 Certified" },
    ],
    guarantees: [
        "30-day money-back guarantee",
        "Enterprise-grade security",
        "24/7 technical support",
    ]
}
const processSteps = [
    { n: 1, title: "Discovery Call", description: "Free 30-min consultation to understand your challenges" },
    { n: 2, title: "AI Strategy", description: "Custom roadmap with ROI projections and timeline" },
    { n: 3, title: "Development", description: "Agile development with weekly progress updates" },
    { n: 4, title: "Deployment", description: "Seamless integration with ongoing support" },
];

const JsonLdScript: React.FC<{ jsonData: object }> = ({ jsonData }) => {
    useEffect(() => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(jsonData);
      document.head.appendChild(script);
  
      return () => {
        document.head.removeChild(script);
      };
    }, [jsonData]);
  
    return null;
  };

export default function LuminAgencyLandingPage() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const bookingUrl = "https://cal.com/tyler-kuchelmeister-e0drr4";

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find the anchor tag, whether it's the target or one of its parents
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor && anchor.getAttribute('href') && anchor.getAttribute('href') !== '#') {
        const href = anchor.getAttribute('href');
        if (href) {
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
  
          if (targetElement) {
            e.preventDefault();

            // For the hero section, scroll to the absolute top
            if (targetId === 'hero') {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              return;
            }

            const headerHeight = 80; // h-20 in Tailwind = 5rem = 80px
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      }
    };
  
    document.addEventListener('click', handleAnchorClick);
  
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleAssessmentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      console.log("AI Readiness Assessment Submitted:", data);
      alert("Thank you! Your assessment has been submitted.");
      e.currentTarget.reset();
  }

  const jsonLdData = {
    "@context": "https://schema.org", "@type": "WebPage", name: "Lumin Agency",
    description: "AI solutions for small businesses. Grow your revenue and cut costs.",
    url: "https://luminagency.com/ai-agency",
    publisher: { "@type": "Organization", name: "Lumin Agency", url: "https://luminagency.com" },
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100">
      <JsonLdScript jsonData={jsonLdData} />
      <Header bookingUrl={bookingUrl} />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
      <HeroSection bookingUrl={bookingUrl} />

      <StatsSection />

      <AnimatedSection id="client-logos" className="bg-slate-900">
        <div className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
          <p className="text-center text-sm text-slate-400 uppercase tracking-wider font-semibold">Trusted by Industry Leaders</p>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-8 gap-y-10 items-center justify-items-center">
            {clientLogos.map((logo) => (
              <div key={logo.name} title={logo.name} className="flex justify-center text-slate-500 hover:text-white transition-colors duration-300">
                  <logo.Svg />
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection id="services" className="py-20 bg-slate-900">
        <Services />
      </AnimatedSection>
      
      <AiDemoWidget />

      <AnimatedSection id="tech-stack" className="bg-slate-50 text-slate-900">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              <h2 className="text-center text-3xl md:text-4xl font-bold">Powered by Industry-Leading AI</h2>
              <div className="mt-10 flex justify-center flex-wrap gap-x-8 gap-y-4">
                  {techStack.logos.map(logo => ( <span key={logo} className="text-slate-500 font-semibold text-lg">{logo}</span> ))}
              </div>
          </div>
      </AnimatedSection>

      <AnimatedSection id="trust-signals" className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-center lg:text-left">Your Trust & Security is Our Priority</h2>
                    <p className="mt-4 text-slate-600 text-center lg:text-left">We are committed to enterprise-grade security standards and offer guarantees that ensure your peace of mind.</p>
                    <div className="mt-8 flex justify-center lg:justify-start flex-wrap gap-4">
                        {trustSignals.badges.map(badge => ( <img key={badge.alt} src={badge.src} alt={badge.alt} className="h-12" /> ))}
                    </div>
                </div>
                <div className="bg-slate-50 p-8 rounded-2xl">
                    <ul className="space-y-4">
                        {trustSignals.guarantees.map(guarantee => (
                            <li key={guarantee} className="flex items-center gap-3 text-lg">
                                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                                <span className="font-semibold text-slate-800">{guarantee}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection id="case-studies" className="bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 space-y-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Success Stories</h2>
          {caseStudies.map((study, index) => (
            <div key={study.title} className="grid gap-10 lg:grid-cols-2 items-center success-story">
              <div className={`lg:order-${index % 2 === 1 ? 'last' : 'first'}`}>
                  <img src={study.image} alt={study.imageAlt} className="rounded-2xl shadow-xl w-full h-auto object-cover aspect-[4/3]" />
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-slate-900">{study.title}</h3>
                  <blockquote className="mt-4 text-lg text-slate-700 border-l-4 border-[color:var(--primary)] pl-4 italic" style={{ "--primary": primary } as React.CSSProperties}>"{study.quote}"</blockquote>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      {study.results.map(res => (
                          <div key={res.label}>
                              <p className="text-3xl md:text-4xl font-bold text-[color:var(--primary)] stat-number" style={{ "--primary": primary } as React.CSSProperties}>{res.value}</p>
                              <p className="mt-1 text-sm text-slate-600">{res.label}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>
      
      <AnimatedSection id="testimonials" className="bg-slate-50">
        <Testimonials />
      </AnimatedSection>

      <RoiCalculator />

      <AnimatedSection id="process" className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold">How We Work</h2>
          <p className="mt-4 text-center max-w-2xl mx-auto text-slate-600">Our streamlined process is designed for clarity, speed, and maximum impact.</p>
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-slate-200 lg:block" aria-hidden="true"></div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => (
                <div key={step.title} className="flex flex-col items-center text-center p-4">
                  {step.n === 1 ? (
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center hover:scale-105 transition-transform duration-300" aria-label="Book your free discovery call">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--primary)] text-2xl font-bold text-white shadow-lg z-10" style={{ "--primary": primary } as React.CSSProperties}>{step.n}</div>
                      <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-slate-600">{step.description}</p>
                    </a>
                  ) : (
                    <>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--primary)] text-2xl font-bold text-white shadow-lg z-10" style={{ "--primary": primary } as React.CSSProperties}>{step.n}</div>
                      <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                      <p className="mt-2 text-slate-600">{step.description}</p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <Faq />

      <AnimatedSection id="lead-magnet" className="bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 text-center">
          <h3 className="text-3xl font-bold">Get Your Free AI Readiness Assessment</h3>
          <p className="mt-4 text-slate-600">Discover how AI can transform your specific business in 15 minutes.</p>
          <Card className="mt-8 text-left bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-lg p-8">
            <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleAssessmentSubmit}>
              <div className="sm:col-span-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-300 mb-1">Company Name</label>
                <input type="text" id="companyName" name="companyName" placeholder="Your Company Inc." required className="w-full h-12 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 form-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="businessEmail" className="block text-sm font-medium text-slate-300 mb-1">Business Email</label>
                <input type="email" id="businessEmail" name="businessEmail" placeholder="you@company.com" required className="w-full h-12 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 form-input" />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-1">Industry</label>
                <select id="industry" name="industry" required className="w-full h-12 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 form-input">
                  <option value="">Select Industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-slate-300 mb-1">Company Size</label>
                <select id="companySize" name="companySize" required className="w-full h-12 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500 form-input">
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full h-12 px-8 rounded-xl cta-primary text-white font-bold text-base transform transition-transform duration-300 flex items-center justify-center cta-button">
                  Get My Free Assessment
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </AnimatedSection>

      <section id="cta-close" className="bg-slate-800 text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold">Ready to Grow Your Business with AI?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90">Take the next step. Our team is ready to help you unlock your business's full potential.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="h-12 px-8 rounded-xl cta-primary text-white font-bold text-base transform transition-transform duration-300 flex items-center justify-center cta-button">Book Strategy Call</a>
            <Button className="h-12 px-8 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center cta-button">Download AI Guide</Button>
            <a href="#case-studies" className="h-12 px-8 rounded-xl text-white hover:bg-white/10 font-semibold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center cta-button">View Case Studies</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
