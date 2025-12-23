import React from 'react';

const FeatureCard = ({ icon: Icon, title, description, color = 'primary' }) => {
    const colorMap = {
        primary: 'bg-primary-50 text-primary-600 border-primary-100',
        blue: 'bg-blue-50 text-blue-600 border-blue-100',
        indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100',
        emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
        rose: 'bg-rose-50 text-rose-600 border-rose-100',
    };

    return (
        <div className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-100 transition-all duration-500 hover:border-transparent hover:shadow-[0_20px_50px_rgba(8,112,184,0.07)] hover:-translate-y-2">
            {/* Hover Background Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50/50 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>

            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${colorMap[color] || colorMap.primary} border shadow-sm`}>
                {Icon && <Icon size={28} strokeWidth={2.5} />}
            </div>

            <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-primary-600 transition-colors tracking-tight">
                {title}
            </h3>

            <p className="text-slate-500 leading-relaxed font-medium">
                {description}
            </p>

            {/* Subtle indicator */}
            <div className="mt-8 pt-6 border-t border-slate-50 flex items-center text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-primary-400 transition-colors">
                <span>Learn More</span>
                <div className="ml-2 w-0 group-hover:w-4 h-[2px] bg-primary-400 transition-all duration-500"></div>
            </div>
        </div>
    );
};

export default FeatureCard;
