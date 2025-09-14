
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from './Icons';

const faqs = [
  { q: "How fast can we see results?", a: "Most clients see a positive impact within 60–90 days, with some automations showing ROI in the first month. Our goal is to deliver value as quickly as possible." },
  { q: "Is this affordable for a small business?", a: "Yes. We offer flexible pricing models, including project-based fees and retainer options, to fit your budget. Our ROI calculator can show you the potential savings." },
  { q: "Do I need to be a tech expert?", a: "Not at all. We handle all the technical details from strategy to deployment. We explain everything in simple terms, so you're always in the loop without needing to be a tech wizard." },
  { q: "Can you work with my existing tools?", a: "Absolutely. We specialize in integrating AI solutions with popular platforms for CRM, marketing, and operations to ensure a seamless workflow." },
  { q: "Is my business data secure?", a: "Data security is our top priority. We comply with top data privacy standards like GDPR and employ enterprise-grade security measures to protect your information." },
  { q: "How do you measure success?", a: "We define and track KPIs that matter to your business, such as cost savings, hours automated, lead conversion rates, or customer satisfaction scores." },
];

export const Faq: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-600">
            Have questions? We've got answers. If you don't see your question here, feel free to contact us.
          </p>
        </div>
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-slate-200 py-4 last:border-b-0">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex w-full items-center justify-between text-left text-lg font-semibold text-slate-800 hover:text-blue-600 focus:outline-none"
                aria-expanded={openFAQ === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.q}</span>
                {openFAQ === index ? (
                  <ChevronUp className="h-6 w-6 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-6 w-6 flex-shrink-0" />
                )}
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openFAQ === index ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <p className="text-base text-slate-600 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};