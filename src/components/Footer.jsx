import React from 'react';
import { Shield, Github, Twitter, Linkedin, Heart, Mail, ArrowRight, BookOpen, Stethoscope, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 pt-24 pb-12 text-slate-300 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="col-span-1 lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center space-x-3 group outline-none w-fit">
                            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-xl border border-white/10">
                                <img src="/logo.png" alt="MedInfo Logo" className="w-6 h-6 object-contain brightness-0 invert" />
                            </div>
                            <span className="text-xl font-black tracking-tighter text-white">
                                MED<span className="text-primary-500">INFO</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed font-medium pr-6">
                            The world's most trusted medical knowledge engine for students and clinicians.
                            Bridging the gap between textbooks and practice with AI-assisted clarity.
                        </p>
                        <div className="flex items-center space-x-4 pt-2">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 group">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold mb-6 flex items-center">
                            Platform
                        </h4>
                        <ul className="space-y-4">
                            {['Home', 'Search Engine', 'Visual Diagnosis', 'Medical Library'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-primary-400 text-sm font-medium transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden text-primary-500 mr-0 group-hover:mr-2">›</span>
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="col-span-1 lg:col-span-2">
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Medical Board', 'Careers', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-slate-400 hover:text-primary-400 text-sm font-medium transition-colors hover:translate-x-1 inline-block">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div className="col-span-1 lg:col-span-4">
                        <h4 className="text-white font-bold mb-6">Clinical Updates</h4>
                        <p className="text-slate-400 text-sm mb-6">
                            Join 15,000+ clinicians receiving our weekly digest of high-yield medical pearls.
                        </p>
                        <div className="flex p-1.5 bg-white/5 border border-white/10 rounded-2xl focus-within:border-primary-500/50 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
                            <div className="pl-3 flex items-center pointer-events-none text-slate-500">
                                <Mail size={18} />
                            </div>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none text-white placeholder-slate-500 text-sm focus:ring-0 w-full ml-2"
                            />
                            <button className="bg-primary-600 hover:bg-primary-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-black/20">
                                Join
                            </button>
                        </div>
                        <div className="mt-8 flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            <Shield size={12} className="text-emerald-500" />
                            <span>HIPAA Compliant & Secure</span>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-slate-500 font-medium">
                    <p>© {new Date().getFullYear()} MEDINFO. All rights reserved.</p>
                    <div className="flex space-x-8">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-white transition-colors">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
