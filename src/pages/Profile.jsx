import React from 'react';
import {
    User,
    ShieldCheck,
    BookOpen,
    History,
    Star,
    Settings,
    Award,
    Activity,
    Heart,
    ChevronRight,
    LogOut,
    Mail,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('medinfo_user') || '{"name": "Dr. John Smith", "email": "john.smith@medmail.com", "role": "Senior Clinician", "verified": true, "joinDate": "Jan 2024"}');

    const handleLogout = () => {
        localStorage.removeItem('medinfo_authenticated');
        localStorage.removeItem('medinfo_user');
        navigate('/login');
        window.location.reload();
    };

    const stats = [
        { label: "Cases Solved", value: "142", icon: Activity, color: "blue" },
        { label: "Articles Read", value: "1.2k", icon: BookOpen, color: "emerald" },
        { label: "Medication Saves", value: "54", icon: Heart, color: "rose" },
        { label: "Verified Level", value: "Expert", icon: Award, color: "primary" }
    ];

    const recentActivity = [
        { title: "Searched for 'Pneumonia Differential'", time: "2 hours ago", type: "search" },
        { title: "Saved 'Amoxicillin' Pediatrics Guide", time: "5 hours ago", type: "save" },
        { title: "Completed 'ECG Interpretation' module", time: "1 day ago", type: "study" },
        { title: "Updated clinical preferences", time: "2 days ago", type: "setting" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-28 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Left Side: Profile Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="bg-white rounded-[3rem] p-8 border border-slate-100 shadow-sm sticky top-28">
                            <div className="text-center mb-8">
                                <div className="relative inline-block mb-6">
                                    <div className="w-32 h-32 bg-slate-100 rounded-[2.5rem] flex items-center justify-center border-4 border-white shadow-xl">
                                        <User size={64} className="text-slate-300" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center text-white shadow-lg">
                                        <ShieldCheck size={20} />
                                    </div>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h2>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">{user.role}</p>

                                <div className="flex justify-center mt-6 gap-2">
                                    <span className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100">Verified Professional</span>
                                    <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100">Gold Member</span>
                                </div>
                            </div>

                            <div className="space-y-4 pt-8 border-t border-slate-50">
                                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <Mail size={18} className="text-slate-400" />
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Email Address</p>
                                        <p className="font-bold text-slate-900 text-sm truncate">{user.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <Briefcase size={18} className="text-slate-400" />
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest leading-none mb-1">Clinical Specialty</p>
                                        <p className="font-bold text-slate-900 text-sm">Internal Medicine</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 space-y-3">
                                <button
                                    onClick={() => navigate('/settings')}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <Settings size={20} className="text-slate-400 group-hover:text-primary-600 transition-colors" />
                                        <span className="font-bold text-slate-600">Account Settings</span>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300" />
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-rose-50 transition-all group"
                                >
                                    <div className="flex items-center space-x-3">
                                        <LogOut size={20} className="text-rose-400 group-hover:text-rose-600 transition-colors" />
                                        <span className="font-bold text-slate-600 group-hover:text-rose-600 transition-colors">Terminate Session</span>
                                    </div>
                                    <ChevronRight size={18} className="text-slate-300" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Dashboard Content */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {stats.map((stat, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center mb-4`}>
                                        <stat.icon size={20} />
                                    </div>
                                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
                                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Recent Clinical Activity */}
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center space-x-3">
                                    <History size={24} className="text-primary-600" />
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Clinical Activity Feed</h3>
                                </div>
                                <button className="text-[10px] font-black uppercase text-primary-600 tracking-widest hover:underline">View All History</button>
                            </div>

                            <div className="space-y-6">
                                {recentActivity.map((act, i) => (
                                    <div key={i} className="flex items-start justify-between group cursor-default">
                                        <div className="flex items-start space-x-4">
                                            <div className="mt-1 w-2 h-2 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></div>
                                            <div>
                                                <p className="font-bold text-slate-800 leading-none mb-2">{act.title}</p>
                                                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{act.time}</p>
                                            </div>
                                        </div>
                                        <button className="text-slate-200 hover:text-primary-400 transition-colors">
                                            <Star size={18} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recommended Modules */}
                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden group">
                            {/* Background pattern */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                            <div className="relative z-10">
                                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-600/20 text-primary-400 text-[9px] font-black uppercase tracking-widest mb-6 border border-primary-600/30">
                                    <Star size={10} />
                                    <span>Recommended for Your Speciality</span>
                                </div>
                                <h3 className="text-2xl font-black mb-4 tracking-tight">Level Up Your Pharmacology</h3>
                                <p className="text-slate-400 font-medium mb-8 max-w-md">Our AI analyzed your recent searches. We recommend the "Advanced Antibiotic Stewardship" clinical module.</p>

                                <button className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-black text-sm hover:bg-primary-400 hover:text-white transition-all">
                                    <span>Start Module</span>
                                    <ChevronRight size={16} />
                                </button>
                            </div>

                            {/* Decorative element */}
                            <div className="absolute top-1/2 right-10 -translate-y-1/2 w-48 h-48 bg-primary-600/20 blur-[60px] rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
