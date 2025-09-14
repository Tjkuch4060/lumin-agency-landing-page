
import React, { useMemo, useState, useEffect, useRef } from "react";
// FIX: Removed FileText and Building2 as they are not exported from Icons.tsx and not used.
import { CheckCircle, ArrowRight, Shield, Lock, Star, Quote, ChevronDown, Mail, Phone, Users, DollarSign, Clock, Share2, Twitter, Linkedin, MessageSquare, Zap, Target, PlayIcon, GitHub, MapPin } from "./components/Icons";
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";
import { RoiCalculator } from "./components/RoiCalculator";
import { Faq } from "./components/Faq";
import { AiDemoWidget } from "./components/AiDemoWidget";
import { VideoModal } from "./components/VideoModal";
import { AiVisualization } from "./components/AiVisualization";
import { Footer } from "./components/Footer";


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

const useParallax = (ref: React.RefObject<HTMLElement>, speed: number) => {
  useEffect(() => {
    let animationFrameId: number;
    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (ref.current) {
          const scrolled = window.pageYOffset;
          ref.current.style.transform = `translateY(${scrolled * speed}px)`;
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [ref, speed]);
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

const createLogoSvg = (name: string) => {
    const fontSize = 16;
    const svgWidth = 180;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="32" viewBox="0 0 ${svgWidth} 32">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="600" fill="#64748b">${name}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

// --- DATA ---
const logos = [
  { name: "Summit Legal", src: createLogoSvg("Summit Legal") },
  { name: "Keystone Realty", src: createLogoSvg("Keystone Realty") },
  { name: "Bright Smiles Dental", src: createLogoSvg("Bright Smiles Dental") },
  { name: "GreenScape Co.", src: createLogoSvg("GreenScape Co.") },
  { name: "Innovate Tech", src: createLogoSvg("Innovate Tech") }
];
const metrics = [
    { value: "250+", label: "AI Solutions Deployed" },
    { value: "3x", label: "Average Client ROI" },
    { value: "98%", label: "Client Satisfaction" },
];
const services = [
  {
    id: "custom_chatbots", icon: "🤖", title: "Custom AI Chatbots",
    description: "Intelligent customer service automation that handles 80% of inquiries.",
    features: ["24/7 customer support", "Multi-language support", "CRM integration"],
  },
  {
    id: "process_automation", icon: "🔄", title: "Process Automation",
    description: "Streamline repetitive tasks with intelligent workflows.",
    features: ["Document processing", "Data entry automation", "Email automation"],
  },
  {
    id: "predictive_analytics", icon: "📊", title: "Predictive Analytics",
    description: "Data-driven insights for better business decisions.",
    features: ["Sales forecasting", "Risk assessment", "Customer behavior analysis"],
  }
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
    image: "https://picsum.photos/seed/lumin-case-1/800/600",
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
    image: "https://picsum.photos/seed/lumin-case-2/800/600",
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

  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useParallax(orb1Ref, 0.3);
  useParallax(orb2Ref, 0.1);
  useParallax(orb3Ref, 0.2);

  const trackAIInterest = (service: string) => {
    if (window.gtag) {
      window.gtag('event', 'ai_service_interest', { 'service_type': service });
      alert(`Analytics event tracked for: ${service}`);
    } else {
      console.warn(`Analytics not available. Would have tracked interest in: ${service}`);
    }
  }
  
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
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />

      <section id="hero" className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-slate-900" />
          <div ref={orb1Ref} className="gradient-orb" style={{ width: '400px', height: '400px', background: 'linear-gradient(45deg, #4ecdc4, #3d5a80)', top: '-200px', left: '-200px' }}></div>
          <div ref={orb2Ref} className="gradient-orb" style={{ width: '600px', height: '600px', background: 'linear-gradient(45deg, #a8e6cf, #667eea)', bottom: '-300px', right: '-300px' }}></div>
          <div ref={orb3Ref} className="gradient-orb" style={{ width: '300px', height: '300px', background: 'linear-gradient(45deg, #ffd93d, #ff6b6b)', top: '50%', left: '50%' }}></div>
        </div>
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-800/80 px-4 py-2 border border-slate-700 text-sm hero-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <span className="text-lg">🚀</span>
                <span>Trusted by 500+ companies worldwide</span>
              </div>
              <h1 className="mt-6 text-4xl md:text-6xl font-extrabold leading-tight tracking-tight hero-fade-in-up" style={{ animationDelay: '0.2s' }}>
                Build AI That <br/>
                <span className="text-gradient">
                  Transforms
                </span>
                &nbsp;Your Business
              </h1>
              <p className="mt-6 text-lg/8 text-slate-300 max-w-xl mx-auto lg:mx-0 hero-fade-in-up" style={{ animationDelay: '0.3s' }}>
                Custom AI solutions that increase efficiency by 10x and reduce costs by 60%. See results in 30 days, guaranteed.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start hero-fade-in-up" style={{ animationDelay: '0.4s' }}>
                 <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="relative h-14 px-8 text-base font-bold bg-[color:var(--secondary)] text-white rounded-xl transform transition-transform duration-300 hover:scale-105 flex items-center justify-center pulse-animation" style={{ "--secondary": secondary } as React.CSSProperties}>
                    <div>
                        Get Free AI Audit
                        <span className="block text-xs font-normal opacity-80 -mt-1">Usually $2,500 • Free for limited time</span>
                    </div>
                </a>
                <Button onClick={() => setIsVideoModalOpen(true)} className="h-14 px-6 text-base font-semibold bg-slate-800/80 border border-slate-700 text-white hover:bg-slate-700 rounded-xl transform transition-transform duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  <PlayIcon className="h-5 w-5" />
                  <span>Watch 2-min Demo</span>
                </Button>
              </div>
              <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 hero-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <div className="flex -space-x-2">
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://placehold.co/40x40/e2e8f0/64748b?text=C1" alt="Client 1"/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://placehold.co/40x40/e2e8f0/64748b?text=C2" alt="Client 2"/>
                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-slate-800" src="https://placehold.co/40x40/e2e8f0/64748b?text=C3" alt="Client 3"/>
                  </div>
                   <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                          <Star className="h-4 w-4" /> <Star className="h-4 w-4" /> <Star className="h-4 w-4" /> <Star className="h-4 w-4" /> <Star className="h-4 w-4" />
                      </div>
                      <span>4.9/5 from 200+ reviews</span>
                  </div>
              </div>
            </div>
            <div className="hidden lg:block h-96 hero-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <AiVisualization />
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection id="social-proof" className="bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {metrics.map((metric) => (
              <div key={metric.label}>
                <p className="text-4xl font-bold text-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties}>{metric.value}</p>
                <p className="mt-2 text-slate-600">{metric.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-16">
            <p className="text-center text-sm text-slate-500">Trusted by businesses across professional services, healthcare, real estate, and more</p>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center opacity-80">
              {logos.map((l) => ( <img key={l.name} src={l.src} alt={`${l.name} logo`} className="h-8 w-auto mx-auto" /> ))}
            </div>
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection id="services" className="bg-slate-50 text-slate-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900">Our AI Solutions</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="interactive-card flex flex-col rounded-2xl border-slate-200 bg-white shadow-sm text-center">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-slate-100 text-3xl" aria-hidden="true">{s.icon}</div>
                  <h3 className="mt-6 font-bold text-xl text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-slate-600 flex-grow">{s.description}</p>
                  <ul className="mt-6 space-y-3 text-left">
                    {s.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" aria-hidden="true"/>
                        <span className="text-slate-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                   <Button onClick={() => trackAIInterest(s.id)} className="mt-6 w-full h-11 px-4 text-base font-semibold text-[color:var(--primary)] bg-blue-100/50 hover:bg-blue-100 rounded-lg" style={{ "--primary": primary } as React.CSSProperties}>Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
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
            <div key={study.title} className="grid gap-10 lg:grid-cols-2 items-center">
              <div className={`lg:order-${index % 2 === 1 ? 'last' : 'first'}`}>
                  <img src={study.image} alt={study.imageAlt} className="rounded-2xl shadow-xl w-full h-auto" />
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-slate-900">{study.title}</h3>
                  <blockquote className="mt-4 text-lg text-slate-700 border-l-4 border-[color:var(--primary)] pl-4 italic" style={{ "--primary": primary } as React.CSSProperties}>"{study.quote}"</blockquote>
                  <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                      {study.results.map(res => (
                          <div key={res.label}>
                              <p className="text-3xl font-bold text-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties}>{res.value}</p>
                              <p className="mt-1 text-sm text-slate-600">{res.label}</p>
                          </div>
                      ))}
                  </div>
              </div>
            </div>
          ))}
        </div>
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
                <input type="text" id="companyName" name="companyName" placeholder="Your Company Inc." required className="w-full h-11 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="businessEmail" className="block text-sm font-medium text-slate-300 mb-1">Business Email</label>
                <input type="email" id="businessEmail" name="businessEmail" placeholder="you@company.com" required className="w-full h-11 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-slate-300 mb-1">Industry</label>
                <select id="industry" name="industry" required className="w-full h-11 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500">
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
                <select id="companySize" name="companySize" required className="w-full h-11 px-4 border border-slate-600 bg-slate-900/50 text-white rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option value="">Select Size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full h-12 px-8 rounded-xl bg-[color:var(--secondary)] text-white hover:opacity-90 font-bold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center" style={{ "--secondary": secondary } as React.CSSProperties}>
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
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="h-12 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">Book Strategy Call</a>
            <Button className="h-12 px-8 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">Download AI Guide</Button>
            <a href="#case-studies" className="h-12 px-8 rounded-xl text-white hover:bg-white/10 font-semibold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">View Case Studies</a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}