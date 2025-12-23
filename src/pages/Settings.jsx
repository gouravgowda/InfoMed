import React, { useState } from 'react';
import {
    Shield,
    Bell,
    Eye,
    Smartphone,
    Lock,
    Database,
    Globe,
    ChevronRight,
    User,
    Check,
    Save,
    Moon,
    Volume2
} from 'lucide-react';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaved, setIsSaved] = useState(false);

    const handleSave = () => {
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const tabs = [
        { id: 'profile', label: 'Clinical Identity', icon: User },
        { id: 'notifications', label: 'Alert Protocols', icon: Bell },
        { id: 'security', label: 'Safety & Access', icon: Lock },
        { id: 'display', label: 'Visual Interface', icon: Eye }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col md:flex-row gap-12 items-start">

                    {/* Navigation Sidebar */}
                    <div className="w-full md:w-64 space-y-2">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-8 px-2">Control Hub</h1>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center space-x-3 px-6 py-4 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                        ? 'bg-white text-primary-600 shadow-sm border border-slate-100'
                                        : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                <tab.icon size={20} />
                                <span>{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Configuration Area */}
                    <div className="flex-grow">
                        <div className="bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm">

                            {/* Profile Tab */}
                            {activeTab === 'profile' && (
                                <div className="animate-fade-up">
                                    <div className="flex justify-between items-center mb-10">
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Identity</h2>
                                            <p className="text-slate-400 font-semibold text-sm">Manage how you appear to the medical community.</p>
                                        </div>
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center space-x-2 px-6 py-3 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-primary-600 transition-all shadow-lg active:scale-95"
                                        >
                                            {isSaved ? <Check size={18} /> : <Save size={18} />}
                                            <span>{isSaved ? 'Settings Applied' : 'Update Profile'}</span>
                                        </button>
                                    </div>

                                    <div className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Professional Title</label>
                                                <input
                                                    type="text"
                                                    defaultValue="Dr. John Smith"
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-slate-900"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Clinical Specialty</label>
                                                <select className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-slate-900">
                                                    <option>Internal Medicine</option>
                                                    <option>Cardiology</option>
                                                    <option>Pharmacology</option>
                                                    <option>Emergency Medicine</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Professional Bio / Verified Status</label>
                                            <textarea
                                                rows="4"
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-bold text-slate-900 resize-none"
                                                defaultValue="Senior clinician focusing on evidence-based antibiotic protocols and pharmacological safety across multi-disciplinary teams."
                                            ></textarea>
                                        </div>

                                        <div className="p-6 rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-between">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                                                    <Shield size={24} />
                                                </div>
                                                <div>
                                                    <h4 className="font-black text-emerald-900 leading-none mb-1">Board Verification</h4>
                                                    <p className="text-emerald-700/70 text-xs font-bold">Your clinical credentials have been verified to Expert Level.</p>
                                                </div>
                                            </div>
                                            <button className="px-4 py-2 bg-white text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-200">View Certificate</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Interface Tab (Display) */}
                            {activeTab === 'display' && (
                                <div className="animate-fade-up">
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-8">Visual Interface</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group">
                                            <div className="flex items-center space-x-4">
                                                <Moon size={24} className="text-slate-400 group-hover:text-primary-600" />
                                                <div>
                                                    <h4 className="font-bold text-slate-900">High-Contrast Mode</h4>
                                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">Experimental Feature</p>
                                                </div>
                                            </div>
                                            <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                                                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all"></div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 border border-slate-100 group">
                                            <div className="flex items-center space-x-4">
                                                <Volume2 size={24} className="text-slate-400 group-hover:text-primary-600" />
                                                <div>
                                                    <h4 className="font-bold text-slate-900">Audio Feedback</h4>
                                                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-widest mt-1">Clinical Round Mode</p>
                                                </div>
                                            </div>
                                            <div className="w-12 h-6 bg-primary-600 rounded-full relative cursor-pointer">
                                                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full transition-all shadow-sm"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Other tabs as placeholders */}
                            {(activeTab === 'notifications' || activeTab === 'security') && (
                                <div className="text-center py-20 animate-fade-up">
                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                                        <Database size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">Protocol Restricted</h3>
                                    <p className="text-slate-500 font-medium">This configuration panel is locked in the professional demo version.</p>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
