
import React from 'react';
import { Linkedin } from './Icons';

const teamMembers = [
  {
    name: 'Dr. Evelyn Reed',
    title: 'Founder & AI Strategist',
    bio: 'With a PhD in Machine Learning, Evelyn has led AI initiatives at top tech firms before founding Lumin Agency to make advanced AI accessible to all businesses.',
    imageUrl: 'https://i.pravatar.cc/300?u=evelyn',
    linkedinUrl: '#',
  },
  {
    name: 'Marcus Chen',
    title: 'Lead AI Engineer',
    bio: 'Marcus is an expert in building and deploying scalable AI models. He turns complex business challenges into elegant, automated solutions.',
    imageUrl: 'https://i.pravatar.cc/300?u=marcus',
    linkedinUrl: '#',
  },
  {
    name: 'Jasmine Patel',
    title: 'Client Success Manager',
    bio: 'Jasmine ensures every client achieves their desired outcomes. She bridges the gap between technical implementation and business goals.',
    imageUrl: 'https://i.pravatar.cc/300?u=jasmine',
    linkedinUrl: '#',
  },
];

export const Team: React.FC = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold">The Experts Behind Your AI Transformation</h2>
        <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">
          We are a dedicated team of AI specialists, engineers, and strategists passionate about helping your business thrive.
        </p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
        {teamMembers.map((member) => (
          <div key={member.name} className="text-center">
            <div className="relative inline-block">
              <img
                className="h-40 w-40 rounded-full object-cover mx-auto ring-4 ring-white shadow-lg"
                src={member.imageUrl}
                alt={`Headshot of ${member.name}`}
              />
               <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-2 right-2 h-10 w-10 bg-white rounded-full flex items-center justify-center text-blue-600 hover:bg-slate-100 transition-colors shadow-md"
                aria-label={`${member.name}'s LinkedIn Profile`}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
            <h3 className="mt-6 text-xl font-bold text-slate-900">{member.name}</h3>
            <p className="text-blue-600 font-semibold">{member.title}</p>
            <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};