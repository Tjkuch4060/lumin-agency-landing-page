import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, Twitter, GitHub, MapPin, Star } from './Icons';

const FooterLink: React.FC<{ href: string, children: React.ReactNode }> = ({ href, children }) => (
    <li>
        <a href={href} className="text-slate-400 hover:text-blue-400 transition-colors duration-300 text-sm py-1 block">{children}</a>
    </li>
);

export const Footer: React.FC = () => {
    const year = new Date().getFullYear();
    const [time, setTime] = useState('');

    useEffect(() => {
        const timerId = setInterval(() => {
            const sfTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'America/Los_Angeles',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            });
            setTime(sfTime);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);


    const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        alert(`Thank you for subscribing, ${email}!`);
        e.currentTarget.reset();
    };

    const changeRegion = (region: string) => {
        console.log("Region changed to:", region);
        alert(`Region has been changed to ${region}. (This is a demo feature)`);
    };

    return (
        <footer id="footer" className="enhanced-footer">
            {/* Newsletter & Trust Section */}
            <div className="border-t border-slate-700 bg-slate-900/50">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-3xl font-bold text-white leading-tight">Stay Ahead with AI Insights</h3>
                            <p className="mt-3 text-slate-400">Join 15,000+ subscribers for weekly insights on AI trends, case studies, and automation strategies.</p>
                        </div>
                        <form onSubmit={handleNewsletterSubmit}>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input type="email" name="email" placeholder="your@email.com" required className="flex-grow h-12 px-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:ring-2 focus:ring-blue-500 transition" />
                                <button type="submit" className="flex-shrink-0 h-12 px-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                                    <span>Subscribe</span>
                                    <span>&rarr;</span>
                                </button>
                            </div>
                            <small className="mt-3 block text-slate-500">✓ No spam • ✓ Unsubscribe anytime</small>
                        </form>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12">
                    {/* Company Info Column */}
                    <div className="md:col-span-3 lg:col-span-2">
                         <h4 className="text-lg font-bold text-white">Lumin Agency</h4>
                        <p className="mt-4 text-slate-400 text-sm leading-6 max-w-sm">
                          We build intelligent AI solutions that transform businesses. From custom chatbots to process automation, we deliver measurable results.
                        </p>
                         <div className="mt-6 flex gap-3">
                            <a href="#" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"><Linkedin className="h-5 w-5"/></a>
                            <a href="#" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"><Twitter className="h-5 w-5"/></a>
                            <a href="#" aria-label="GitHub" className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-700 text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"><GitHub className="h-5 w-5"/></a>
                        </div>
                    </div>
                    {/* Link Columns */}
                    <div>
                        <h4 className="font-semibold text-white">AI Solutions</h4>
                        <ul className="mt-4 space-y-2">
                           <FooterLink href="#services">Custom Chatbots</FooterLink>
                           <FooterLink href="#services">Process Automation</FooterLink>
                           <FooterLink href="#services">Predictive Analytics</FooterLink>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-white">Resources</h4>
                        <ul className="mt-4 space-y-2">
                           <FooterLink href="#case-studies">Case Studies</FooterLink>
                           <FooterLink href="#roi-calculator">ROI Calculator</FooterLink>
                           <FooterLink href="#faq">FAQ</FooterLink>
                        </ul>
                    </div>
                     <div>
                        <h4 className="font-semibold text-white">Company</h4>
                        <ul className="mt-4 space-y-2">
                           <FooterLink href="#">About Us</FooterLink>
                           <FooterLink href="#">Contact</FooterLink>
                           <FooterLink href="#">Careers</FooterLink>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
                        <div className="flex flex-col sm:flex-row items-center gap-x-6 gap-y-3 text-slate-500">
                            <span>&copy; {year} Lumin Agency. All rights reserved.</span>
                            <div className="region-selector">
                                <select
                                    onChange={(e) => changeRegion(e.target.value)}
                                    className="bg-slate-800 border border-slate-700 rounded-md py-1 px-2 text-slate-400 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                    aria-label="Select region"
                                >
                                    <option value="us">🇺🇸 United States</option>
                                    <option value="uk">🇬🇧 United Kingdom</option>
                                    <option value="ca">🇨🇦 Canada</option>
                                </select>
                            </div>
                            <div className="footer-info">
                                <span id="company-time">San Francisco: <span className="time">{time || '...'}</span></span>
                                <span className="status-indicator">
                                    <span className="status-dot online"></span>
                                    Team Available
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-4 text-slate-500">
                            <a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};