import React from 'react';
import {
    Shield,
    Target,
    Users,
    Zap,
    Globe,
    Award,
    BookOpen,
    PieChart,
    ChevronRight
} from 'lucide-react';

const About = () => {
    const values = [
        {
            icon: Target,
            title: "Precision First",
            description: "We source our facts from top-tier clinical journals and peer-reviewed medical databases.",
            color: "primary"
        },
        {
            icon: Users,
            title: "Student Centric",
            description: "Built by students, for students. We know the pressure of rounds and the clarity needed for exams.",
            color: "indigo"
        },
        {
            icon: Zap,
            title: "Rapid Insight",
            description: "Time is the most valuable asset in the hospital. Our tools are optimized for instantaneous answers.",
            color: "emerald"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            {/* Hero Header */}
            <section className="relative pt-24 pb-32 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-100 text-primary-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-primary-200/50">
                                <Globe size={12} />
                                <span>Established 2024</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
                                Empowering the <br />
                                <span className="text-primary-600">Next Generation</span> <br />
                                of Clinicians.
                            </h1>
                            <p className="text-xl text-slate-500 leading-relaxed font-semibold max-w-xl">
                                MEDINFO is more than just a search engine. It's a clinical companion designed to bridge the gap between textbook theory and bedside practice.
                            </p>
                        </div>
                        <div className="lg:w-1/2 relative">
                            <div className="relative z-10 p-4 bg-white rounded-[3rem] shadow-2xl border border-slate-100">
                                <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white">
                                    <div className="flex items-center justify-between mb-12">
                                        <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center text-white shadow-xl shadow-primary-500/20">
                                            <Shield size={32} fill="currentColor" opacity={0.3} />
                                        </div>
                                        <div className="px-4 py-2 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400">
                                            Mission Protocol v1.0
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black mb-6">Our Core Mission</h3>
                                    <p className="text-slate-400 text-lg leading-relaxed font-medium">
                                        To standardize high-quality clinical information and make it universally accessible to healthcare students worldwide, empowering them to provide better patient care through evidence-based wisdom.
                                    </p>
                                </div>
                            </div>
                            {/* Decorative dots */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:20px_20px] opacity-60"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">The MEDINFO Standard</h2>
                        <div className="w-20 h-1.5 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {values.map((val, i) => (
                            <div key={i} className="group p-8 rounded-[3rem] border border-slate-100 hover:border-transparent hover:shadow-2xl hover:shadow-primary-500/5 transition-all duration-500">
                                <div className={`w-14 h-14 bg-slate-50 text-slate-500 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary-600 group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border border-slate-100`}>
                                    <val.icon size={26} />
                                </div>
                                <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">{val.title}</h3>
                                <p className="text-slate-500 font-semibold leading-relaxed">{val.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats/Highlight Section */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { label: "Active Students", value: "15k+", icon: Users },
                            { label: "Medication Files", value: "2.4k", icon: BookOpen },
                            { label: "Case Studies", value: "800+", icon: PieChart },
                            { label: "Accuracy Rate", value: "99.9%", icon: Award }
                        ].map((stat, i) => (
                            <div key={i} className="text-center p-8 bg-white rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 border border-primary-100">
                                    <stat.icon size={20} />
                                </div>
                                <p className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter mb-1">{stat.value}</p>
                                <p className="text-xs font-black uppercase text-slate-400 tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-8">Ready to elevate your clinical game?</h2>
                    <p className="text-lg text-slate-500 mb-12 font-medium">
                        Join the thousands of medical students who are already using MEDINFO to simplify their clinical rotations and excel in their exams.
                    </p>
                    <button className="inline-flex items-center space-x-3 bg-slate-900 text-white px-10 py-5 rounded-[1.8rem] font-black text-lg hover:bg-primary-600 transition-all shadow-xl shadow-black/20 group">
                        <span>Explore Features</span>
                        <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </section>
        </div>
    );
};

export default About;
