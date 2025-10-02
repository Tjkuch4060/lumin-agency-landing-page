import React from 'react';
import { Quote } from './Icons';

const testimonials = [
  {
    quote: "Lumin's AI completely revolutionized our workflow. We're doing twice the work with half the effort. It's not just an efficiency boost; it's a competitive advantage.",
    name: 'Sarah Johnson',
    title: 'COO, Innovate Tech',
    avatar: 'https://i.pravatar.cc/150?u=sarah',
  },
  {
    quote: "The ROI was almost immediate. The automation solution paid for itself in three months. I was skeptical at first, but the results speak for themselves. Highly recommended.",
    name: 'David Chen',
    title: 'CEO, Summit Legal',
    avatar: 'https://i.pravatar.cc/150?u=david',
  },
  {
    quote: "Working with the Lumin team was a breeze. They understood our needs perfectly and delivered a solution that exceeded our expectations. Our client satisfaction has never been higher.",
    name: 'Maria Garcia',
    title: 'Founder, Keystone Realty',
    avatar: 'https://i.pravatar.cc/150?u=maria',
  },
];

export const Testimonials: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">What Our Clients Say</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Real results from businesses we've empowered with AI.</p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 testimonial-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 flex flex-col">
            <Quote className="w-8 h-8 text-blue-500/30 mb-4" />
            <p className="text-slate-700 flex-grow">"{testimonial.quote}"</p>
            <div className="mt-6 flex items-center">
              <img src={testimonial.avatar} alt={testimonial.name} className="h-12 w-12 rounded-full object-cover" />
              <div className="ml-4">
                <p className="font-bold text-slate-900">{testimonial.name}</p>
                <p className="text-sm text-slate-500">{testimonial.title}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
