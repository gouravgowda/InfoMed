import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Mail,
    Lock,
    User,
    ShieldCheck,
    ArrowRight,
    Github,
    Chrome,
    Loader2,
    Stethoscope
} from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            const userData = {
                name: isLogin ? 'Dr. John Smith' : formData.name,
                email: formData.email,
                role: 'Medical Professional',
                verified: true,
                joinDate: 'Dec 2024'
            };

            localStorage.setItem('medinfo_user', JSON.stringify(userData));
            localStorage.setItem('medinfo_authenticated', 'true');
            setIsLoading(false);
            navigate('/profile');
            window.location.reload(); // Refresh to update navbar
        }, 1500);
    };

    const handleDemoLogin = () => {
        setIsLoading(true);
        setTimeout(() => {
            const userData = {
                name: 'Dr. Sarah Connor',
                email: 'demo@medinfo.org',
                role: 'Senior Resident',
                verified: true,
                joinDate: 'Jan 2025'
            };
            localStorage.setItem('medinfo_user', JSON.stringify(userData));
            localStorage.setItem('medinfo_authenticated', 'true');
            setIsLoading(false);
            navigate('/');
            window.location.reload();
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-24 pb-12 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100/30 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-100/30 blur-[120px] rounded-full"></div>

            <div className="w-full max-w-[1100px] flex flex-col md:flex-row bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white relative z-10 animate-fade-up">

                {/* Left Side: Branding / Info */}
                <div className="md:w-1/2 bg-slate-900 p-12 md:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                    {/* Dark pattern overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-primary-600 rounded-2xl flex items-center justify-center mb-10 shadow-xl shadow-primary-500/20">
                            <ShieldCheck size={32} />
                        </div>
                        <h2 className="text-4xl font-black tracking-tight mb-6 leading-tight">
                            Join the global <br />
                            <span className="text-primary-400">Clinical Network.</span>
                        </h2>
                        <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-sm mb-12">
                            Access advanced pharmacology tools, clinical pearls, and a community of verified medical students.
                        </p>

                        <div className="space-y-6">
                            {[
                                "Verified Medical Databases",
                                "Personalized Study Dashboards",
                                "Board-Certified Clinical Content"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center space-x-3 text-sm font-bold text-slate-300">
                                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></div>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative z-10 mt-12 pt-12 border-t border-white/5">
                        <div className="flex items-center space-x-4">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <img key={i} src={`https://i.pravatar.cc/100?img=${i + 10}`} className="w-10 h-10 rounded-full border-2 border-slate-900" alt="User" />
                                ))}
                            </div>
                            <p className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none">
                                Joined by 15,000+ <br /> Clinicians
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <div className="md:w-1/2 p-12 md:p-16 bg-white">
                    <div className="max-w-[360px] mx-auto">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
                            {isLogin ? 'Welcome Back' : 'Create Identity'}
                        </h1>
                        <p className="text-slate-500 font-semibold mb-10">
                            {isLogin ? 'Enter your credentials to continue' : 'Start your clinical journey today'}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!isLogin && (
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                            <User size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="John Smith"
                                            className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Professional Email</label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                        <Mail size={18} />
                                    </div>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="doctor@hospital.org"
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center px-1">
                                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Secret Key</label>
                                    {isLogin && <button type="button" className="text-[10px] font-black text-primary-600 uppercase tracking-widest hover:underline">Lost access?</button>}
                                </div>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-300 group-focus-within:text-primary-600 transition-colors">
                                        <Lock size={18} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="••••••••"
                                        className="block w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full inline-flex items-center justify-center space-x-3 px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:bg-primary-600 transition-all shadow-xl shadow-slate-900/10 group disabled:opacity-70 disabled:pointer-events-none active:scale-95"
                            >
                                {isLoading ? (
                                    <Loader2 size={24} className="animate-spin" />
                                ) : (
                                    <>
                                        <span>{isLogin ? 'Establish Session' : 'Create Identity'}</span>
                                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>

                        <div className="my-8 flex items-center space-x-4">
                            <div className="h-px bg-slate-100 flex-grow"></div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Access</span>
                            <div className="h-px bg-slate-100 flex-grow"></div>
                        </div>

                        <button
                            onClick={handleDemoLogin}
                            disabled={isLoading}
                            className="w-full mb-6 flex items-center justify-center space-x-2 py-4 border-2 border-emerald-100 bg-emerald-50 rounded-2xl text-emerald-700 hover:bg-emerald-100 hover:border-emerald-200 transition-all group"
                        >
                            <Stethoscope size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-black uppercase tracking-wide">Enter Demo Mode</span>
                        </button>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center space-x-2 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
                                <Chrome size={20} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
                                <span className="text-xs font-bold text-slate-600">Google</span>
                            </button>
                            <button className="flex items-center justify-center space-x-2 py-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-all group">
                                <Github size={20} className="text-slate-400 group-hover:text-slate-900 transition-colors" />
                                <span className="text-xs font-bold text-slate-600">Github</span>
                            </button>
                        </div>

                        <p className="mt-12 text-center text-sm font-semibold text-slate-500">
                            {isLogin ? "Don't have an ID yet?" : "Already part of the network?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary-600 font-black hover:underline ml-1"
                            >
                                {isLogin ? 'Register now' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
