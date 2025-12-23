import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color = 'primary' }) => {
    const colorMap = {
        primary: 'from-primary-500 to-primary-600 shadow-primary-500/20',
        blue: 'from-blue-500 to-blue-600 shadow-blue-500/20',
        indigo: 'from-indigo-500 to-indigo-600 shadow-indigo-500/20',
        emerald: 'from-emerald-500 to-emerald-600 shadow-emerald-500/20',
        rose: 'from-rose-500 to-rose-600 shadow-rose-500/20',
    };

    const gradientClass = colorMap[color] || colorMap.primary;

    return (
        <div className="neo-card p-10 group relative overflow-hidden">
            {/* Background Glow */}
            <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${gradientClass.split(' ')[0]} to-transparent opacity-0 group-hover:opacity-10 rounded-full blur-[60px] transition-all duration-700`}></div>

            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradientClass} flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                {Icon && <Icon size={28} className="text-white" strokeWidth={2.5} />}
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight group-hover:text-primary-600 transition-colors relative z-10">
                {title}
            </h3>

            <p className="text-slate-500 leading-relaxed font-medium text-lg relative z-10">
                {description}
            </p>

            {/* Subtle indicator */}
            <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between group/link relative z-10">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 group-hover/link:text-primary-600 transition-colors">
                    Explore
                </span>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/link:bg-primary-500 group-hover/link:text-white transition-all duration-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;
