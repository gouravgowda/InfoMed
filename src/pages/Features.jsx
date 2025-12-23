import React from 'react';
import {
    Stethoscope,
    Pill,
    Dna,
    Thermometer,
    Activity,
    Library,
    FileText,
    Layers,
    ChevronRight,
    Sparkles
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const Features = () => {
    const allFeatures = [
        {
            icon: Stethoscope,
            title: "Physical Examination",
            description: "Step-by-step guides for clinical exams, including maneuvers, special tests, and normal findings.",
            color: "primary"
        },
        {
            icon: Pill,
            title: "Pharmacology Hub",
            description: "Quick reference for drug classes, mechanism of action, side effects, and adult/pediatric dosing.",
            color: "rose"
        },
        {
            icon: Activity,
            title: "Lab Interpretation",
            description: "Decode abnormal laboratory results with logical differentials and next steps in investigation.",
            color: "indigo"
        },
        {
            icon: Thermometer,
            title: "Differential Diagnosis",
            description: "Evidence-based algorithms to help narrow down possible causes for common patient presentations.",
            color: "emerald"
        },
        {
            icon: Dna,
            title: "Pathophysiology",
            description: "Simplified explanations of disease processes to help you understand the 'why' behind the 'what'.",
            color: "blue"
        },
        {
            icon: Library,
            title: "Clinical Pearls",
            description: "High-yield information and mnemonics commonly asked on rounds and medical board exams.",
            color: "rose"
        },
        {
            icon: FileText,
            title: "ECG Library",
            description: "Reference guide for cardiac rhythm interpretation and common ECG abnormality patterns.",
            color: "emerald"
        },
        {
            icon: Layers,
            title: "Procedural Guides",
            description: "Visual walkthroughs of common clinical procedures like suturing, cannula insertion, and ABGs.",
            color: "indigo"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-20 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-24 relative">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-100/50 text-primary-700 text-[10px] font-black uppercase tracking-widest mb-6 border border-primary-200/30">
                        <Sparkles size={12} />
                        <span>Advanced Clinical Toolkit</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-8 tracking-tighter">
                        Everything you need for <br />
                        <span className="text-primary-600">Clinical Excellence.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        A comprehensive suite of clinical tools designed to support your journey from the classroom to the bedside. Professional guidance at your fingertips.
                    </p>

                    {/* Decorative Background Blob */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary-200/20 blur-[100px] -z-10 rounded-full"></div>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {allFeatures.map((feature, index) => (
                        <div key={index} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                color={feature.color}
                            />
                        </div>
                    ))}
                </div>

                {/* Call to Action UI */}
                <div className="mt-32 relative overflow-hidden bg-slate-900 rounded-[3rem] p-12 md:p-20 text-center">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <h2 className="text-3xl md:text-5xl font-black text-white mb-8 tracking-tight relative z-10">
                        Missing a specific specialty?
                    </h2>
                    <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg font-medium relative z-10">
                        Our medical board is constantly reviewing new content. If you're looking for a specific clinical tool, we're likely building it right now.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
                        <button className="w-full sm:w-auto bg-primary-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-primary-500 transition-all shadow-xl shadow-primary-500/20 active:scale-95">
                            Join Content Waitlist
                        </button>
                        <button className="w-full sm:w-auto bg-white/5 border border-white/10 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-white/10 transition-all active:scale-95">
                            Request a Tool
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
