import React from 'react';
import { Shield, Target, Users, Zap, Globe, Award, BookOpen, Clock, Heart } from 'lucide-react';

const About = () => {
    return (
        <div className="bg-white min-h-screen pt-24">
            {/* Hero Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="inline-flex items-center justify-center p-3 mb-8 bg-slate-50 rounded-2xl border border-slate-100">
                        <Globe size={20} className="text-slate-400" />
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
                        We serve the <br />
                        <span className="text-primary-600">healers.</span>
                    </h1>
                    <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                        Bridging the gap between medical education and clinical excellence through technology.
                    </p>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="bg-slate-50 py-32 border-y border-slate-100 overflow-hidden relative">
                <div className="max-w-5xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-widest">Our Journey</h2>
                    </div>

                    <div className="relative">
                        {/* Center Line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-slate-200"></div>

                        {[
                            { year: '2023', title: 'Inception', desc: 'Started as a small collection of notes by medical students.' },
                            { year: '2024', title: 'The Platform', desc: 'Launched MEDINFO v1.0 engine to public beta.' },
                            { year: '2025', title: 'Global Reach', desc: 'Serving 15k+ students across 40 countries.' }
                        ].map((item, i) => (
                            <div key={i} className={`flex items-center justify-between mb-24 w-full ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className="w-5/12"></div>
                                <div className="z-10 bg-white border-4 border-primary-100 w-12 h-12 rounded-full flex items-center justify-center font-black text-xs text-primary-600 shadow-sm">
                                    {item.year}
                                </div>
                                <div className={`w-5/12 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                                    <h3 className="text-2xl font-black text-slate-900 mb-2">{item.title}</h3>
                                    <p className="text-slate-500 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">The Medical Board</h2>
                        <p className="text-slate-500 text-lg">Curated by verified professionals.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { name: "Dr. Sarah Chen", role: "Chief Editor", color: "bg-rose-100 text-rose-600" },
                            { name: "Dr. James Wilson", role: "Clinical Lead", color: "bg-blue-100 text-blue-600" },
                            { name: "Dr. Anita Patel", role: "Pharmacology", color: "bg-emerald-100 text-emerald-600" }
                        ].map((member, i) => (
                            <div key={i} className="text-center group">
                                <div className={`w-32 h-32 mx-auto rounded-full ${member.color} flex items-center justify-center text-3xl font-black mb-6 border-4 border-white shadow-xl shadow-slate-100 group-hover:scale-110 transition-transform`}>
                                    {member.name[0]}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                                <p className="text-slate-400 font-medium uppercase tracking-widest text-xs mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
