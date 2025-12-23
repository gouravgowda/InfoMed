import React from 'react';
import { Shield, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer class="bg-white border-t border-slate-200 pt-16 pb-8">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div class="col-span-1 md:col-span-2">
                        <div class="flex items-center space-x-2 mb-4">
                            <Shield class="h-6 w-6 text-primary-600" />
                            <span class="text-lg font-bold tracking-tight text-slate-900">MEDINFO</span>
                        </div>
                        <p class="text-slate-600 max-w-sm mb-6">
                            Empowering healthcare students with reliable, simplified medical information. Your digital companion for rapid learning and reference.
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-slate-400 hover:text-primary-600 transition-colors">
                                <Github class="h-5 w-5" />
                            </a>
                            <a href="#" class="text-slate-400 hover:text-primary-600 transition-colors">
                                <Twitter class="h-5 w-5" />
                            </a>
                            <a href="#" class="text-slate-400 hover:text-primary-600 transition-colors">
                                <Linkedin class="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Quick Links</h4>
                        <ul class="space-y-2">
                            <li><a href="/" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">Home</a></li>
                            <li><a href="/features" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">Features</a></li>
                            <li><a href="/about" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">About Us</a></li>
                            <li><a href="/contact" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">Contact</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Legal</h4>
                        <ul class="space-y-2">
                            <li><a href="#" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">Privacy Policy</a></li>
                            <li><a href="#" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">Terms of Service</a></li>
                            <li><a href="#" class="text-slate-600 hover:text-primary-600 text-sm transition-colors">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>© {new Date().getFullYear()} MEDINFO. All rights reserved.</p>
                    <p class="mt-4 md:mt-0 italic">Designed for clinical excellence.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
