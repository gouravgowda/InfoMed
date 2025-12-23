import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    Menu,
    X,
    Search,
    ChevronDown,
    ShieldCheck,
    User,
    Settings,
    LogOut,
    Sparkles,
    Award
} from 'lucide-react';

const Navbar = ({ isAuthenticated }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const location = useLocation();

    const user = JSON.parse(localStorage.getItem('medinfo_user') || '{"name": "Dr. Smith"}');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('medinfo_authenticated');
        localStorage.removeItem('medinfo_user');
        window.location.href = '/login';
    };

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Search', path: '/search', icon: Search },
        { name: 'Features', path: '/features' },
        { name: 'About', path: '/about' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${isScrolled
            ? 'py-3 glass border-b border-white/40 shadow-sm'
            : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-3 group outline-none">
                        <div className="w-12 h-12 flex items-center justify-center group-hover:scale-110 transition-all duration-500 bg-gradient-to-br from-primary-50 to-white rounded-xl shadow-lg shadow-primary-500/10 border border-white/50">
                            <img src="/logo.png" alt="MedInfo Logo" className="w-8 h-8 object-contain" />
                        </div>
                        <span className={`text-2xl font-black tracking-tighter text-slate-900 group-hover:text-primary-600 transition-colors`}>
                            MED<span className="text-primary-500">INFO</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2.5 rounded-2xl text-sm font-bold tracking-wide transition-all duration-300 relative group overflow-hidden ${isActive(link.path)
                                    ? 'text-primary-600 bg-primary-50/50'
                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50/50'
                                    }`}
                            >
                                <div className="flex items-center space-x-2 relative z-10">
                                    {link.icon && <link.icon size={16} strokeWidth={2.5} />}
                                    <span>{link.name}</span>
                                </div>
                                {isActive(link.path) && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-400 to-primary-600"></div>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* User Section (Right) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                className="btn-primary"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-3 px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-full border border-slate-200 hover:border-primary-200 transition-all group outline-none shadow-sm"
                                >
                                    <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-600 text-white rounded-full flex items-center justify-center font-black shadow-lg shadow-primary-500/30">
                                        {user.name[0]}
                                    </div>
                                    <span className="text-sm font-bold text-slate-700 pr-2">{user.name}</span>
                                    <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Desktop User Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-4 w-72 glass-card p-2 animate-fade-up z-50">
                                        <div className="px-4 py-4 border-b border-slate-100/50">
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status Protocol</p>
                                            <div className="flex items-center space-x-2 text-emerald-600 bg-emerald-50/50 px-3 py-1.5 rounded-lg border border-emerald-100/50">
                                                <Award size={14} className="animate-pulse-glow" />
                                                <span className="text-xs font-bold">Verified Clinician</span>
                                            </div>
                                        </div>
                                        <div className="p-2 space-y-1">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary-600 transition-all font-bold text-sm group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                                                    <User size={16} />
                                                </div>
                                                <span>Clinical Profile</span>
                                            </Link>
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary-600 transition-all font-bold text-sm group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 group-hover:bg-primary-50 flex items-center justify-center transition-colors">
                                                    <Settings size={16} />
                                                </div>
                                                <span>Lab Settings</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-rose-50 text-rose-500 transition-all font-bold text-sm text-left group"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center transition-colors">
                                                    <LogOut size={16} />
                                                </div>
                                                <span>Terminate Session</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2.5 rounded-xl bg-white/50 hover:bg-white text-slate-600 transition-all outline-none border border-transparent hover:border-slate-200"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full glass border-t border-slate-100 transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                }`}>
                <div className="p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-lg font-bold transition-all ${isActive(link.path)
                                ? 'bg-primary-50 text-primary-600 shadow-sm'
                                : 'text-slate-600 hover:bg-white/50'
                                }`}
                        >
                            {link.icon && <link.icon size={20} />}
                            <span>{link.name}</span>
                        </Link>
                    ))}
                    <div className="pt-4 mt-4 border-t border-slate-200/50 px-2">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="w-full btn-primary flex justify-center items-center"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center space-x-3 px-6 py-4 rounded-2xl bg-white/50 text-slate-700 font-bold"
                                >
                                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                        {user.name[0]}
                                    </div>
                                    <span>My Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-6 py-4 rounded-2xl text-rose-500 font-bold hover:bg-rose-50 flex items-center space-x-3"
                                >
                                    <LogOut size={20} />
                                    <span>Sign Out</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
