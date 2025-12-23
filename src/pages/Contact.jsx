import React, { useState } from 'react';
import {
    Send,
    Mail,
    MessageSquare,
    User,
    Phone,
    MapPin,
    ShieldCheck,
    Globe,
    ArrowRight
} from 'lucide-react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Message received! Since this is a professional frontend-only demo, your data hasn't been sent anywhere. \n\nName: ${formData.name}\nEmail: ${formData.email}`);
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const contactInfo = [
        {
            icon: Mail,
            label: "Scientific Inquiries",
            value: "science@medinfo.hub",
            color: "blue"
        },
        {
            icon: Globe,
            label: "Global Headquarters",
            value: "Medical Plaza, Digital City",
            color: "emerald"
        },
        {
            icon: Phone,
            label: "Urgent Support",
            value: "+1 (555) 000-MED-HUB",
            color: "indigo"
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen pt-24 pb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Contact Information Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-emerald-200/50 shadow-sm">
                            <ShieldCheck size={12} />
                            <span>Verified Clinical Hub</span>
                        </div>
                        <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-8 italic">
                            Connect with our <br />
                            <span className="text-primary-600 not-italic">Medical Board.</span>
                        </h1>
                        <p className="text-lg text-slate-500 font-semibold mb-12 leading-relaxed">
                            Have questions about our clinical protocols or want to contribute to our medical library? Our editorial team is here to help.
                        </p>

                        <div className="space-y-6">
                            {contactInfo.map((item, i) => (
                                <div key={i} className="flex items-start space-x-4 p-6 bg-white rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-md hover:border-emerald-100 transition-all group">
                                    <div className={`w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white transition-all duration-500`}>
                                        <item.icon size={20} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">{item.label}</p>
                                        <p className="font-bold text-slate-900 text-sm tracking-tight">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Contact Form Card */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
                            {/* Background Accent */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100/30 blur-[100px] -mr-32 -mt-32 rounded-full"></div>

                            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Full Identity</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                                <User size={18} />
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="John Smith, MD"
                                                required
                                                className="block w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Official Email</label>
                                        <div className="relative group">
                                            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                                <Mail size={18} />
                                            </div>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="doctor@hospital.org"
                                                required
                                                className="block w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Inquiry Subject</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                            <MessageSquare size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Clinical Protocol Contribution"
                                            className="block w-full pl-12 pr-4 py-5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-slate-400 tracking-widest ml-1">Detailed Message</label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        rows="6"
                                        placeholder="Please describe your inquiry or proposal in detail..."
                                        required
                                        className="block w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all resize-none"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:bg-primary-600 transition-all shadow-2xl shadow-slate-900/20 group active:scale-95"
                                >
                                    <span>Transmit Message</span>
                                    <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>
                        <p className="mt-8 text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
                            System Security: SSL-256 Bit Encrypted Clinical Communication
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
