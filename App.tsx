import React, { useMemo, useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Shield, Lock, Star, Quote, ChevronDown, FileText, Building2, Mail, Phone } from "./components/Icons";
import { Card, CardContent } from "./components/ui/Card";
import { Button } from "./components/ui/Button";

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

const primary = "#1A73E8"; // Blue for trust
const secondary = "#FF6F00"; // Orange for conversion
const neutralLight = "#F5F5F5";
const bookingUrl = "https://cal.com/tyler-kuchelmeister-e0drr4";

const createLogoSvg = (name: string) => {
    // Creates a logo SVG with a uniform font size and enough width for longer names.
    const fontSize = 16;
    const svgWidth = 180;
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="32" viewBox="0 0 ${svgWidth} 32">
        <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Inter, system-ui, sans-serif" font-size="${fontSize}" font-weight="600" fill="#64748b">${name}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${btoa(svg)}`;
};

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
    id: "custom_chatbots",
    icon: "🤖",
    title: "Custom AI Chatbots",
    description: "Intelligent customer service automation that handles 80% of inquiries.",
    features: ["24/7 customer support", "Multi-language support", "CRM integration"],
  },
  {
    id: "process_automation",
    icon: "🔄",
    title: "Process Automation",
    description: "Streamline repetitive tasks with intelligent workflows.",
    features: ["Document processing", "Data entry automation", "Email automation"],
  },
  {
    id: "predictive_analytics",
    icon: "📊",
    title: "Predictive Analytics",
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

const faqs = [
  { q: "How fast can we see results?", a: "Most clients see a positive impact within 60–90 days." },
  { q: "Is this affordable for a small business?", a: "Yes. We offer flexible pricing and pilot projects to fit your budget." },
  { q: "Do I need to be a tech expert?", a: "Not at all. We handle all the technical details for you." },
  { q: "Can you work with my existing tools?", a: "Yes. We integrate with many popular platforms for scheduling, sales, and marketing." },
  { q: "Is my business data secure?", a: "Absolutely. We comply with top data privacy standards like GDPR and CCPA." },
  { q: "How do you measure success?", a: "We focus on KPIs that matter to you, like more customers, saved time, or increased sales." },
];

const testimonials = [
  { quote: "Lumin Agency helped us understand our customers like never before. Our marketing is finally working.", role: "Owner, Local Cafe" },
  { quote: "We're saving over 15 hours a week on scheduling and paperwork thanks to their automation.", role: "Manager, Auto Repair Shop" },
  { quote: "As a small shop, I never thought AI was for me. They made it simple and delivered real results.", role: "Founder, Boutique Clothing Store" },
];

const socialProof = [
  "🤖 Custom AI Development",
  "⚡ 10x Faster Processes",
  "💰 ROI in 30 Days",
];

const processSteps = [
    { n: 1, title: "Discovery Call", description: "Free 30-min consultation to understand your challenges" },
    { n: 2, title: "AI Strategy", description: "Custom roadmap with ROI projections and timeline" },
    { n: 3, title: "Development", description: "Agile development with weekly progress updates" },
    { n: 4, title: "Deployment", description: "Seamless integration with ongoing support" },
];

const defaultHeroContent = {
  headline: "Transform Your Business with Custom AI Solutions",
  subheadline: "We build intelligent automation, chatbots, and AI workflows that increase efficiency by 300% and reduce costs by 40%.",
  cta: "Book Your Free Strategy Call",
};

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
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);
  const [heroContent, setHeroContent] = useState(defaultHeroContent);
  const year = new Date().getFullYear();

  // Performance Optimizations: Personalization & Tracking
  useEffect(() => {
    // Dynamic content based on visitor industry from URL parameter
    const personalizeContent = () => {
      const params = new URLSearchParams(window.location.search);
      const industry = params.get('industry')?.toLowerCase();

      const industryContent: { [key: string]: typeof defaultHeroContent } = {
        'ecommerce': {
          headline: 'AI Solutions for E-commerce Growth',
          subheadline: "Boost sales and automate support with AI-powered chatbots and product recommendations.",
          cta: 'Book a Free E-commerce AI Call'
        },
        'saas': {
          headline: 'AI Automation for SaaS Companies',
          subheadline: "Reduce churn and scale operations with predictive analytics and intelligent workflow automation.",
          cta: 'Book a Free SaaS AI Call'
        }
      };
      
      if (industry && industryContent[industry]) {
        setHeroContent(industryContent[industry]);
      }
    };
    personalizeContent();
  }, []);

  // Track engagement for AI-specific content
  const trackAIInterest = (service: string) => {
    if (window.gtag) {
      window.gtag('event', 'ai_service_interest', {
        'service_type': service,
        'page_location': window.location.href
      });
      alert(`Analytics event tracked for: ${service}`); // For demo purposes
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

  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Lumin Agency",
    description: "AI solutions for small businesses. Grow your revenue and cut costs.",
    url: "https://luminagency.com/ai-agency",
    publisher: { "@type": "Organization", name: "Lumin Agency", url: "https://luminagency.com" },
    mainEntity: {
      "@type": "FAQPage",
      mainEntity: faqs.slice(0,3).map(f => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    }
  }), []);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <JsonLdScript jsonData={jsonLd} />

      {/* Hero */}
      <section id="hero" className="relative isolate overflow-hidden bg-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,_rgba(255,255,255,0.12),_transparent_40%),radial-gradient(circle_at_80%_20%,_rgba(255,255,255,0.15),_transparent_45%)]" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight fade-in-up" style={{ animationDelay: '0.1s' } as React.CSSProperties}>{heroContent.headline}</h1>
              <p className="mt-4 text-lg/7 opacity-90 fade-in-up" style={{ animationDelay: '0.2s' } as React.CSSProperties}>{heroContent.subheadline}</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 fade-in-up" style={{ animationDelay: '0.4s' } as React.CSSProperties}>
                <a
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-12 px-6 text-base font-semibold bg-white text-slate-900 hover:bg-slate-100 focus:ring-2 focus:ring-offset-2 focus:ring-white rounded-xl transform transition-transform duration-300 hover:scale-105 flex items-center justify-center"
                  aria-label={heroContent.cta}
                  data-analytics-event="CTA_Click_Primary"
                >
                  {heroContent.cta}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/80 fade-in-up" aria-label="Social proof snippets" style={{ animationDelay: '0.5s' } as React.CSSProperties}>
                {socialProof.map((sp) => (
                  <span key={sp} className="rounded-full bg-white/10 px-3 py-1">{sp}</span>
                ))}
              </div>
            </div>
            <div className="relative fade-in-up" style={{ animationDelay: '0.2s' } as React.CSSProperties}>
              <img
                src="https://picsum.photos/seed/luminagency-hero/1200/800"
                alt="A friendly small business owner using a tablet with AI-powered analytics."
                width={1200}
                height={800}
                className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section id="social-proof" className="bg-[color:var(--neutralLight)]" style={{ "--neutralLight": neutralLight } as React.CSSProperties}>
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
              {logos.map((l) => (
                <img key={l.name} src={l.src} alt={`${l.name} logo`} className="h-8 w-auto mx-auto" />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Services */}
      <section id="services" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold text-slate-900">Our AI Solutions</h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-1 lg:grid-cols-3">
            {services.map((s) => (
              <Card key={s.title} className="flex flex-col rounded-2xl border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
                <CardContent className="p-8 flex flex-col flex-grow">
                  <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-slate-100 text-3xl" aria-hidden="true">
                    {s.icon}
                  </div>
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
                   <Button
                    onClick={() => trackAIInterest(s.id)}
                    className="mt-6 w-full h-11 px-4 text-base font-semibold text-[color:var(--primary)] bg-blue-100/50 hover:bg-blue-100 rounded-lg"
                    style={{ "--primary": primary } as React.CSSProperties}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Credibility */}
      <section id="tech-stack" className="bg-[color:var(--neutralLight)]" style={{ "--neutralLight": neutralLight } as React.CSSProperties}>
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
              <h2 className="text-center text-3xl md:text-4xl font-bold">Powered by Industry-Leading AI</h2>
              <div className="mt-10 flex justify-center flex-wrap gap-x-8 gap-y-4">
                  {techStack.logos.map(logo => (
                      <span key={logo} className="text-slate-500 font-semibold text-lg">{logo}</span>
                  ))}
              </div>
          </div>
      </section>

      {/* Trust Signals */}
      <section id="trust-signals" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl font-bold text-center lg:text-left">Your Trust & Security is Our Priority</h2>
                    <p className="mt-4 text-slate-600 text-center lg:text-left">We are committed to enterprise-grade security standards and offer guarantees that ensure your peace of mind.</p>
                    <div className="mt-8 flex justify-center lg:justify-start flex-wrap gap-4">
                        {trustSignals.badges.map(badge => (
                            <img key={badge.alt} src={badge.src} alt={badge.alt} className="h-12" />
                        ))}
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
      </section>
      
      {/* Success Stories */}
      <section id="case-studies" className="bg-[color:var(--neutralLight)]" style={{ "--neutralLight": neutralLight } as React.CSSProperties}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 space-y-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Success Stories</h2>
          {caseStudies.map((study, index) => (
            <div key={study.title} className="grid gap-10 lg:grid-cols-2 items-center">
              <div className={`lg:order-${index % 2 === 1 ? 'last' : 'first'}`}>
                  <img src={study.image} alt={study.imageAlt} className="rounded-2xl shadow-xl w-full h-auto" />
              </div>
              <div>
                  <h3 className="text-2xl font-bold text-slate-900">{study.title}</h3>
                  <blockquote className="mt-4 text-lg text-slate-700 border-l-4 border-[color:var(--primary)] pl-4 italic" style={{ "--primary": primary } as React.CSSProperties}>
                    "{study.quote}"
                  </blockquote>
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
      </section>

      {/* Process */}
      <section id="process" className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <h2 className="text-center text-3xl md:text-4xl font-bold">How We Work</h2>
          <p className="mt-4 text-center max-w-2xl mx-auto text-slate-600">Our streamlined process is designed for clarity, speed, and maximum impact.</p>
          <div className="relative mt-16">
            <div className="absolute left-1/2 top-8 hidden h-[calc(100%-4rem)] w-px -translate-x-1/2 bg-slate-200 lg:block" aria-hidden="true"></div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step) => {
                const stepContent = (
                  <>
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--primary)] text-2xl font-bold text-white shadow-lg z-10" style={{ "--primary": primary } as React.CSSProperties}>
                      {step.n}
                    </div>
                    <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-slate-600">{step.description}</p>
                  </>
                );

                if (step.n === 1) {
                  return (
                    <a
                      key={step.title}
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-slate-50 transition-colors duration-300"
                      aria-label="Book your free discovery call"
                    >
                      {stepContent}
                    </a>
                  );
                }

                return (
                  <div key={step.title} className="flex flex-col items-center text-center p-4">
                    {stepContent}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Lead Capture */}
      <section id="lead-magnet" className="bg-[color:var(--neutralLight)]" style={{ "--neutralLight": neutralLight } as React.CSSProperties}>
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-8 text-center">
          <h3 className="text-3xl font-bold">Get Your Free AI Readiness Assessment</h3>
          <p className="mt-4 text-slate-600">Discover how AI can transform your specific business in 15 minutes.</p>
          <Card className="mt-8 text-left bg-white rounded-2xl shadow-lg p-8">
            <form className="grid sm:grid-cols-2 gap-6" onSubmit={handleAssessmentSubmit}>
              <div className="sm:col-span-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                <input type="text" id="companyName" name="companyName" placeholder="Your Company Inc." required className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="businessEmail" className="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
                <input type="email" id="businessEmail" name="businessEmail" placeholder="you@company.com" required className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties} />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-slate-700 mb-1">Industry</label>
                <select id="industry" name="industry" required className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties}>
                  <option value="">Select Industry</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="saas">SaaS</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="companySize" className="block text-sm font-medium text-slate-700 mb-1">Company Size</label>
                <select id="companySize" name="companySize" required className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[color:var(--primary)]" style={{ "--primary": primary } as React.CSSProperties}>
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
      </section>

      {/* Final CTAs */}
      <section id="cta-close" className="bg-[color:var(--primary)] text-white" style={{ "--primary": primary } as React.CSSProperties}>
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold fade-in-up" style={{ animationDelay: '0.1s' } as React.CSSProperties}>Ready to Grow Your Business with AI?</h2>
          <p className="mt-4 max-w-2xl mx-auto text-white/90 fade-in-up" style={{ animationDelay: '0.2s' } as React.CSSProperties}>Take the next step. Our team is ready to help you unlock your business's full potential.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center fade-in-up" style={{ animationDelay: '0.3s' } as React.CSSProperties}>
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="h-12 px-8 rounded-xl bg-[color:var(--secondary)] text-white hover:opacity-90 font-bold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center" style={{ "--secondary": secondary } as React.CSSProperties}>
              Book Strategy Call
            </a>
            <Button className="h-12 px-8 rounded-xl bg-white/10 text-white hover:bg-white/20 font-semibold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">
              Download AI Guide
            </Button>
            <a href="#case-studies" className="h-12 px-8 rounded-xl text-white hover:bg-white/10 font-semibold text-base transform transition-transform duration-300 hover:scale-105 flex items-center justify-center">
              View Case Studies
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <p className="text-lg font-semibold">Lumin Agency</p>
              <p className="mt-2 text-sm text-slate-600">AI solutions for modern businesses.</p>
            </div>
            <nav aria-label="Footer navigation" className="col-span-2 grid grid-cols-2 gap-4">
              {[
                ["Home", "#hero"],
                ["Services", "#services"],
                ["Tech Stack", "#tech-stack"],
                ["Trust & Security", "#trust-signals"],
                ["Case Studies", "#case-studies"],
                ["Process", "#process"],
                ["Contact", "mailto:contact@luminagency.com"],
              ].map(([label, href]) => (
                <a key={label} href={href} className="text-sm text-slate-700 hover:text-slate-900 hover:underline transition-colors duration-300">{label}</a>
              ))}
            </nav>
            <div className="text-sm text-slate-700 space-y-3">
              <p className="font-semibold">Get in Touch</p>
              <a href="mailto:contact@luminagency.com" className="flex items-center gap-2 hover:text-slate-900 transition-colors duration-300"><Mail className="h-4 w-4" aria-hidden="true"/> contact@luminagency.com</a>
              <a href="tel:+1-555-123-4567" className="flex items-center gap-2 hover:text-slate-900 transition-colors duration-300"><Phone className="h-4 w-4" aria-hidden="true"/> +1-555-123-4567</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <p>© {year} Lumin Agency. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-slate-700 hover:underline transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-slate-700 hover:underline transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}