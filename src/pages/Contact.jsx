import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, ArrowRight, ShieldCheck } from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Message received! We'll get back to you shortly.");
        setFormData({ name: '', email: '', message: '' });
    };

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    return (
        <div className="min-h-screen flex flex-col pt-24 bg-slate-50">
            <div className="flex-1 max-w-7xl mx-auto px-4 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 pb-12">

                {/* Left Info Column */}
                <div className="flex flex-col justify-center space-y-12">
                    <div>
                        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-8">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span>System Operational</span>
                        </div>
                        <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-6">
                            Let's Talk <br /><span className="text-primary-600">Science.</span>
                        </h1>
                        <p className="text-xl text-slate-500 font-medium max-w-md">
                            Collaborate with us or request specific clinical data adjustments.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {[
                            { icon: Mail, label: "Email", value: "contact@medinfo.hub" },
                            { icon: MapPin, label: "HQ", value: "San Francisco, CA" },
                            { icon: Phone, label: "Phone", value: "+1 (555) 012-3456" }
                        ].map((item, i) => (
                            <div key={i} className="flex items-center space-x-6">
                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-slate-100 shadow-sm text-slate-400">
                                    <item.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-slate-900 font-bold text-lg">{item.value}</p>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">{item.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Form Card */}
                <div className="bg-white rounded-[3rem] p-10 md:p-14 shadow-xl border border-slate-100">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Identity</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Dr. Jane Doe"
                                className="w-full bg-slate-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 rounded-2xl p-5 text-lg font-bold transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Communication Channel</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="jane@hospital.com"
                                className="w-full bg-slate-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 rounded-2xl p-5 text-lg font-bold transition-all outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-slate-400 text-xs font-bold uppercase tracking-widest mb-3 ml-1">Inquiry</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                placeholder="How can we assist?"
                                className="w-full bg-slate-50 border-transparent focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10 rounded-2xl p-5 text-lg font-bold transition-all outline-none resize-none"
                            ></textarea>
                        </div>
                        <button className="w-full bg-slate-900 text-white p-5 rounded-2xl font-black text-lg hover:bg-primary-600 transition-all flex items-center justify-center space-x-2 group">
                            <span>Send Message</span>
                            <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
