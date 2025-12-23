import React from 'react';
import {
    Stethoscope, Pill, Dna, Thermometer,
    Activity, Library, FileText, Layers,
    Sparkles, ArrowRight, Microscope, Brain
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const Features = () => {
    const bentoItems = [
        {
            icon: Stethoscope,
            title: "Physical Exam",
            description: "Step-by-step guides for clinical maneuvers and special tests.",
            color: "primary",
            cols: "md:col-span-2"
        },
        {
            icon: Brain,
            title: "Neural Pathways",
            description: "Interactive neuro-anatomy maps.",
            color: "indigo",
            cols: "md:col-span-1"
        },
        {
            icon: Pill,
            title: "Pharmacology",
            description: "Dosing, MOA, and interactions.",
            color: "rose",
            cols: "md:col-span-1"
        },
        {
            icon: Activity,
            title: "Lab Interpretation",
            description: "Decode abnormal results with our algorithmic differential engine.",
            color: "blue",
            cols: "md:col-span-2"
        },
        // Row 2
        {
            icon: Thermometer,
            title: "Differential Diagnosis",
            description: "Symptom-based algorithms.",
            color: "emerald",
            cols: "md:col-span-1"
        },
        {
            icon: Microscope,
            title: "Pathology",
            description: "High-res histology slides.",
            color: "primary",
            cols: "md:col-span-1"
        },
        {
            icon: FileText,
            title: "ECG Library",
            description: "Cardiac rhythm interpretation guide.",
            color: "emerald",
            cols: "md:col-span-1"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-20">
                    <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-primary-50 text-primary-600 border border-primary-100 mb-8">
                        <Sparkles size={14} className="animate-pulse" />
                        <span className="text-xs font-bold uppercase tracking-widest">Clinical Toolkit v2.0</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
                        Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Art of Medicine.</span>
                    </h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium">
                        A comprehensive suite of next-generation tools designed to bridge the gap between textbook theory and clinical reality.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {bentoItems.map((item, index) => (
                        <div key={index} className={`${item.cols} animate-fade-up`} style={{ animationDelay: `${index * 100}ms` }}>
                            <FeatureCard
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                color={item.color}
                            />
                        </div>
                    ))}

                    {/* CTA Block in Grid */}
                    <div className="md:col-span-3 bg-slate-900 rounded-[2.5rem] p-12 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/20 blur-[100px] rounded-full group-hover:bg-primary-500/30 transition-all duration-700"></div>

                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="text-left">
                                <h3 className="text-3xl font-black text-white mb-2">Missing a specialty?</h3>
                                <p className="text-slate-400 font-medium">Request a new module from our medical board.</p>
                            </div>
                            <button className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-lg hover:bg-primary-50 transition-all active:scale-95 flex items-center space-x-2">
                                <span>Submit Request</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
