import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { Users, DollarSign, Clock, Twitter, Linkedin, Share2 } from './Icons';
import { SkeletonLoader } from './ui/SkeletonLoader';

// --- HELPER COMPONENTS & FUNCTIONS ---

const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);
const formatNumber = (number: number) => new Intl.NumberFormat('en-US').format(Math.round(number));
const formatPercentage = (percentage: number) => isFinite(percentage) ? `${Math.round(percentage)}%` : '0%';

// Custom hook for animating numbers
const useAnimatedNumber = (targetValue: number, duration = 750) => {
  const [currentValue, setCurrentValue] = useState(0);
  // FIX: Initialize useRef with null to provide an argument, which may be required by the project's React type definitions.
  const frameRef = useRef<number | null>(null);
  const prevValueRef = useRef(0);

  useEffect(() => {
    const startValue = prevValueRef.current;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic
      const nextValue = startValue + (targetValue - startValue) * easedProgress;

      setCurrentValue(nextValue);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        setCurrentValue(targetValue);
        prevValueRef.current = targetValue;
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      prevValueRef.current = targetValue; // Store final value on cleanup
    };
  }, [targetValue, duration]);

  return currentValue;
};

// Animated Number Display Component
const AnimatedNumber: React.FC<{ value: number; formatter: (val: number) => string }> = ({ value, formatter }) => {
  const animatedValue = useAnimatedNumber(value);
  return <span>{formatter(animatedValue)}</span>;
};


// --- LEAD CAPTURE MODAL ---
const ReportModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { email: string; companyName: string }) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const companyName = formData.get('companyName') as string;
    onSubmit({ email, companyName });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative transform transition-all" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 text-2xl" aria-label="Close modal">&times;</button>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">Get Your Personalized ROI Report</h3>
        <p className="text-slate-600 mb-6">Enter your email to receive a detailed PDF report with your calculations.</p>
        <form onSubmit={handleFormSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="modal-email" className="block text-sm font-medium text-slate-700 mb-1">Business Email</label>
              <input type="email" id="modal-email" name="email" placeholder="you@company.com" required className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label htmlFor="modal-company" className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
              <input type="text" id="modal-company" name="companyName" placeholder="Your Company Inc." required className="w-full h-11 px-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full h-12 px-8 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-bold text-base transition-colors">Send My Report</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- PRESETS & DATA ---
const industryPresets = {
  'E-commerce': { employees: '50', hourlyRate: '25', manualHours: '15' },
  'Healthcare': { employees: '100', hourlyRate: '55', manualHours: '12' },
  'Finance': { employees: '75', hourlyRate: '65', manualHours: '10' },
};
type Industry = keyof typeof industryPresets;

// --- MAIN ROI CALCULATOR COMPONENT ---

export const RoiCalculator: React.FC = () => {
  const [employees, setEmployees] = useState('25');
  const [hourlyRate, setHourlyRate] = useState('45');
  const [manualHours, setManualHours] = useState('8');
  const [automationPercentage, setAutomationPercentage] = useState(70);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<Industry | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const hasStarted = useRef(false);
  
  const numEmployees = parseInt(employees) || 0;
  const numHourlyRate = parseFloat(hourlyRate) || 0;
  const numManualHours = parseFloat(manualHours) || 0;

  // --- ANALYTICS TRACKING ---
  const trackEvent = useCallback((eventName: string, params: object) => {
    // Google Analytics
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
    // Facebook Pixel (example)
    // if (window.fbq) {
    //   window.fbq('trackCustom', eventName, params);
    // }
  }, []);

  const handleStart = () => {
    if (!hasStarted.current) {
      trackEvent('roi_calculator_start', { event_category: 'engagement' });
      hasStarted.current = true;
    }
  };

  // --- CALCULATION LOGIC ---
  const implementationCost = useMemo(() => {
    if (numEmployees <= 50) return 30000;
    if (numEmployees <= 200) return 50000;
    return 75000;
  }, [numEmployees]);

  const results = useMemo(() => {
    const weeklyHoursSaved = numEmployees * numManualHours * (automationPercentage / 100);
    const annualHoursSaved = weeklyHoursSaved * 52;
    const annualSavings = annualHoursSaved * numHourlyRate;
    const monthlySavings = annualSavings / 12;
    const roi = implementationCost > 0 ? ((annualSavings - implementationCost) / implementationCost) * 100 : 0;
    const paybackMonths = monthlySavings > 0 ? implementationCost / monthlySavings : 0;
    return { annualSavings, monthlySavings, annualHoursSaved, weeklyHoursSaved, roi, paybackMonths, implementationCost };
  }, [numEmployees, numHourlyRate, numManualHours, automationPercentage, implementationCost]);

  const paybackPeriodText = useMemo(() => {
    if (results.paybackMonths <= 0 || !isFinite(results.paybackMonths)) return 'N/A';
    if (results.paybackMonths < 12) return `${Math.ceil(results.paybackMonths)} months`;
    return `${(results.paybackMonths / 12).toFixed(1)} years`;
  }, [results.paybackMonths]);

  // Debounced tracking for calculation changes
  useEffect(() => {
    const handler = setTimeout(() => {
      if (hasStarted.current) {
        trackEvent('roi_calculation_complete', {
          event_category: 'engagement',
          value: results.annualSavings,
          employees: numEmployees,
          hourly_rate: numHourlyRate,
          automation_pct: automationPercentage,
        });
      }
    }, 800);
    return () => clearTimeout(handler);
  }, [results.annualSavings, numEmployees, numHourlyRate, automationPercentage, trackEvent]);

  // --- EVENT HANDLERS ---
  const handlePresetChange = (industry: Industry) => {
    const preset = industryPresets[industry];
    setEmployees(preset.employees);
    setHourlyRate(preset.hourlyRate);
    setManualHours(preset.manualHours);
    setActivePreset(industry);
    setHasInteracted(true);
    trackEvent('roi_preset_selected', { event_category: 'engagement', industry });
  };
  
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>, isFloat = false) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (isFloat) {
      let sanitized = value.replace(/[^0-9.]/g, '');
      const firstDotIndex = sanitized.indexOf('.');
      if (firstDotIndex !== -1) {
        sanitized = sanitized.substring(0, firstDotIndex + 1) + sanitized.substring(firstDotIndex + 1).replace(/\./g, '');
      }
      setter(sanitized);
    } else {
      setter(value.replace(/\D/g, ''));
    }
    setActivePreset(null);
    setHasInteracted(true);
  };

  const handleDownloadReport = () => {
    setIsModalOpen(true);
    trackEvent('conversion_roi_report_initiated', { event_category: 'conversion' });
  };

  const handleReportSubmit = (data: { email: string; companyName: string }) => {
    trackEvent('conversion_roi_report_submitted', { event_category: 'conversion', value: results.annualSavings });
    setIsModalOpen(false);
    alert(`Thank you, ${data.companyName}! Your personalized ROI report is on its way to ${data.email}.`);
  };

  const handleSocialShare = (platform: 'twitter' | 'linkedin') => {
    const text = `We could save an estimated ${formatCurrency(results.annualSavings)} annually by implementing AI with Lumin Agency! Calculate your own ROI:`;
    const url = window.location.href + '#roi-calculator';
    let shareUrl = '';
    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else {
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=AI%20ROI%20Calculation&summary=${encodeURIComponent(text)}`;
    }
    window.open(shareUrl, '_blank');
    trackEvent('social_share', { event_category: 'engagement', platform });
  };
  
  return (
    <>
      <ReportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleReportSubmit} />
      <section className="bg-slate-900 py-20 relative overflow-hidden" id="roi-calculator">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(96,165,250,0.2)_0%,_transparent_40%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Calculate Your AI ROI</h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">Use our interactive calculator to see how much your business could save.</p>
          </div>
          
          <div className="mb-8 flex flex-wrap justify-center items-center gap-3">
            <span className="text-slate-300 font-medium">Industry Presets:</span>
            {Object.keys(industryPresets).map((industry) => (
              <button key={industry} onClick={() => handlePresetChange(industry as Industry)} className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activePreset === industry ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}>
                {industry}
              </button>
            ))}
          </div>

          <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 min-h-[600px]">
            {/* --- INPUTS --- */}
            <div className="p-10 text-white">
              <div className="grid gap-8">
                {[
                  { id: 'employees', label: 'Number of Employees', value: employees, handler: handleInputChange(setEmployees), icon: Users, unit: '', isFloat: false, help: 'Full-time employees on repetitive tasks.' },
                  { id: 'hourly-rate', label: 'Average Hourly Cost', value: hourlyRate, handler: handleInputChange(setHourlyRate, true), icon: DollarSign, unit: '$', isFloat: true, help: 'Fully-loaded cost (salary + benefits).' },
                  { id: 'manual-hours', label: 'Manual Hours/Week', value: manualHours, handler: handleInputChange(setManualHours, true), icon: Clock, unit: '', isFloat: true, help: 'Hours per employee on automatable tasks.' },
                ].map(input => (
                  <div key={input.id}>
                    <label htmlFor={input.id} className="flex items-center font-semibold mb-2 text-lg text-slate-200"><input.icon className="w-5 h-5 mr-2 opacity-70" />{input.label}</label>
                    <div className="relative">
                      {input.unit && <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{input.unit}</span>}
                      <input type="text" inputMode={input.isFloat ? "decimal" : "numeric"} id={input.id} value={input.value} onChange={input.handler} onFocus={handleStart} placeholder="0" className={`w-full p-4 rounded-xl text-lg font-semibold bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition ${input.unit ? 'pl-8' : ''}`} />
                    </div>
                     <span className="text-sm text-slate-400 mt-2 block">{input.help}</span>
                  </div>
                ))}
                <div>
                  <label htmlFor="automation-percentage" className="block font-semibold mb-2 text-lg text-slate-200">AI Automation Potential</label>
                  <input type="range" id="automation-percentage" min="30" max="90" value={automationPercentage} onFocus={handleStart} onChange={(e) => { setAutomationPercentage(parseInt(e.target.value)); setActivePreset(null); setHasInteracted(true); }} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer range-thumb" />
                  <div className="flex justify-between mt-2 text-sm text-slate-400">
                    <span>30%</span>
                    <span className="font-bold text-blue-400">{automationPercentage}%</span>
                    <span>90%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* --- RESULTS --- */}
            {hasInteracted ? (
              <div className="p-10 bg-slate-900/50 border-l border-slate-700">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white">Your Potential Savings</h3>
                </div>
                <div className="grid grid-cols-1 gap-5 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl text-center">
                    <div className="text-4xl font-extrabold"><AnimatedNumber value={results.annualSavings} formatter={formatCurrency} /></div>
                    <div className="font-semibold mt-1">Annual Cost Savings</div>
                    <div className="text-sm opacity-80 mt-1"><AnimatedNumber value={results.monthlySavings} formatter={formatCurrency} />/month</div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { value: results.annualHoursSaved, label: 'Hours Saved/Year', formatter: formatNumber },
                      { value: results.roi, label: 'ROI (Year 1)', formatter: formatPercentage },
                      { value: results.paybackMonths, label: 'Payback', formatter: () => paybackPeriodText },
                    ].map(res => (
                      <div key={res.label} className="bg-slate-800 p-4 rounded-xl">
                        <div className="text-2xl font-bold text-white"><AnimatedNumber value={res.value} formatter={res.formatter} /></div>
                        <div className="text-sm text-slate-400 mt-1">{res.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-700 text-center">
                  <h4 className="text-xl font-bold text-white mb-4">Ready to realize these savings?</h4>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <button onClick={() => trackEvent('conversion_cta_click', { event_category: 'conversion', cta_type: 'primary' })} className="px-6 py-3 rounded-xl font-semibold text-white cta-primary transition-all">Get Custom AI Strategy</button>
                    <button onClick={handleDownloadReport} className="px-6 py-3 rounded-xl font-semibold text-blue-300 bg-slate-800 hover:bg-slate-700 transition-all">Download Full Report</button>
                  </div>

                  <div className="border-t border-slate-700 pt-6">
                    <h4 className="text-md font-semibold text-slate-300 mb-3 flex items-center justify-center"><Share2 className="w-4 h-4 mr-2"/>Share Your Results</h4>
                    <div className="flex justify-center gap-4">
                        <button onClick={() => handleSocialShare('twitter')} aria-label="Share results on Twitter" className="flex items-center gap-2 text-slate-400 hover:text-white"><Twitter className="w-5 h-5"/> Twitter</button>
                        <button onClick={() => handleSocialShare('linkedin')} aria-label="Share results on LinkedIn" className="flex items-center gap-2 text-slate-400 hover:text-white"><Linkedin className="w-5 h-5"/> LinkedIn</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 bg-slate-900/50 border-l border-slate-700">
                <div className="mb-6">
                  <h3 className="text-3xl font-bold text-white">Your Potential Savings</h3>
                </div>
                <div className="grid grid-cols-1 gap-5 mb-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white p-6 rounded-2xl text-center">
                    <SkeletonLoader className="h-10 w-48 mx-auto bg-white/30" />
                    <SkeletonLoader className="h-6 w-32 mx-auto mt-2 bg-white/30" />
                    <SkeletonLoader className="h-4 w-24 mx-auto mt-2 bg-white/30" />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-slate-800 p-4 rounded-xl space-y-2">
                        <SkeletonLoader className="h-7 w-16 mx-auto bg-slate-700" />
                        <SkeletonLoader className="h-4 w-20 mx-auto bg-slate-700" />
                      </div>
                    ))}
                  </div>
                </div>
                 <div className="pt-6 border-t border-slate-700 text-center">
                  <SkeletonLoader className="h-7 w-3/4 mx-auto bg-slate-700 mb-4" />
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <SkeletonLoader className="h-12 w-48 bg-slate-700 rounded-xl" />
                    <SkeletonLoader className="h-12 w-48 bg-slate-700 rounded-xl" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};