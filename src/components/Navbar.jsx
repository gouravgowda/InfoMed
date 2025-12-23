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
        <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled
            ? 'py-4 bg-white/70 backdrop-blur-xl shadow-lg border-b border-slate-200/50'
            : 'py-6 bg-transparent'
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">

                    {/* Logo Section */}
                    <Link to="/" className="flex items-center space-x-3 group outline-none">
                        <div className="w-20 h-20 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                            <img src="/logo.png" alt="MedInfo Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className={`text-xl font-black tracking-tighter ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
                            MED<span className="text-primary-600">INFO</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-5 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all duration-300 relative group ${isActive(link.path)
                                    ? 'text-primary-600'
                                    : 'text-slate-500 hover:text-primary-500'
                                    }`}
                            >
                                <div className="flex items-center space-x-2">
                                    {link.icon && <link.icon size={14} />}
                                    <span>{link.name}</span>
                                </div>
                                {isActive(link.path) && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></span>
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* User Section (Right) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-primary-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <div className="relative">
                                <button
                                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                    className="flex items-center space-x-3 px-3 py-1.5 bg-slate-100/50 rounded-2xl border border-slate-200/50 hover:bg-white transition-all group outline-none"
                                >
                                    <div className="w-8 h-8 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center font-black">
                                        {user.name[0]}
                                    </div>
                                    <span className="text-xs font-black text-slate-700 tracking-tight">{user.name}</span>
                                    <ChevronDown size={14} className={`text-slate-400 transition-transform duration-300 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Desktop User Dropdown */}
                                {isUserMenuOpen && (
                                    <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-3 animate-fade-up overflow-hidden">
                                        <div className="px-4 py-4 border-b border-slate-50">
                                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Status Protocol</p>
                                            <div className="flex items-center space-x-2 text-emerald-600">
                                                <Award size={14} />
                                                <span className="text-xs font-black">Verified Clinician</span>
                                            </div>
                                        </div>
                                        <div className="py-2">
                                            <Link
                                                to="/profile"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-all font-bold text-sm"
                                            >
                                                <User size={18} />
                                                <span>Clinical Profile</span>
                                            </Link>
                                            <Link
                                                to="/settings"
                                                onClick={() => setIsUserMenuOpen(false)}
                                                className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-600 transition-all font-bold text-sm"
                                            >
                                                <Settings size={18} />
                                                <span>Lab Settings</span>
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-rose-50 text-rose-500 transition-all font-bold text-sm text-left"
                                            >
                                                <LogOut size={18} />
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
                            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-all outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-100 transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-screen opacity-100 py-8' : 'max-h-0 opacity-0'
                }`}>
                <div className="px-6 space-y-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-4 rounded-2xl text-lg font-black uppercase tracking-tight transition-all ${isActive(link.path)
                                ? 'bg-primary-50 text-primary-600'
                                : 'text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                {link.icon && <link.icon size={20} />}
                                <span>{link.name}</span>
                            </div>
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-slate-100">
                        {!isAuthenticated ? (
                            <Link
                                to="/login"
                                onClick={() => setIsOpen(false)}
                                className="block w-full text-center bg-slate-900 text-white px-8 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-slate-900/10"
                            >
                                Sign In
                            </Link>
                        ) : (
                            <div className="space-y-2">
                                <Link
                                    to="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-4 rounded-2xl text-slate-600 font-bold hover:bg-slate-50"
                                >
                                    Clinical Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-4 rounded-2xl text-rose-500 font-bold hover:bg-rose-50"
                                >
                                    Sign Out
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
