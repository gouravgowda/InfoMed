import React, { useState, useRef, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    Mic,
    Camera,
    Upload,
    X,
    Scan,
    TrendingUp,
    Zap,
    BookOpen,
    ShieldCheck,
    Plus,
    ChevronRight,
    Clock,
    Activity,
    Stethoscope,
    Aperture,
    Maximize,
    Minimize
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    // Voice Search State
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');

    // Visual Search State
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);
    const [scannedImage, setScannedImage] = useState(null);
    const fileInputRef = useRef(null);

    // Live Camera State
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    const handleSearch = (e) => {
        e?.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    // --- Voice Search Logic ---
    const handleVoiceSearch = () => {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
                setTranscript('');
            };

            recognition.onresult = (event) => {
                const interimTranscript = Array.from(event.results)
                    .map(result => result[0])
                    .map(result => result.transcript)
                    .join('');
                setTranscript(interimTranscript);

                if (event.results[0].isFinal) {
                    setQuery(interimTranscript);
                    setIsListening(false);
                    navigate(`/search?q=${encodeURIComponent(interimTranscript)}`);
                }
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };
            recognition.onend = () => setIsListening(false);
            recognition.start();
        } else {
            alert("Voice search is not supported in this browser.");
        }
    };

    // --- Visual Search Logic ---
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setScannedImage(imageUrl);
            startScanningProcess();
        }
    };

    // Handle Camera Logic
    useEffect(() => {
        let currentStream = null;
        if (isCameraOpen) {
            (async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({
                        video: { facingMode: 'environment' }
                    });
                    currentStream = stream;
                    streamRef.current = stream;
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (err) {
                    console.error("Error accessing camera:", err);
                    alert("Could not access camera. Please check permissions or try another device.");
                    setIsCameraOpen(false);
                }
            })();
        }
        return () => {
            if (currentStream) {
                currentStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isCameraOpen]);

    const handleCapturePhoto = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            const imageUrl = canvas.toDataURL('image/jpeg');
            setScannedImage(imageUrl);
            setIsCameraOpen(false); // Close camera modal
            startScanningProcess(); // Start scanning overlay
        }
    };

    const startScanningProcess = async () => {
        setIsScanning(true);
        setScanProgress(0);

        try {
            const result = await Tesseract.recognize(
                scannedImage,
                'eng',
                {
                    logger: m => {
                        if (m.status === 'recognizing text') {
                            setScanProgress(Math.floor(m.progress * 100));
                        }
                    }
                }
            );

            const text = result.data.text;
            const words = text.split(/\s+/).map(w => w.replace(/[^a-zA-Z]/g, '')).filter(w => w.length > 3);
            const bestMatch = words.sort((a, b) => b.length - a.length)[0] || "Unknown";

            setIsScanning(false);
            setQuery(bestMatch);
            setScannedImage(null);
            navigate(`/search?q=${encodeURIComponent(bestMatch)}`);

        } catch (error) {
            console.error("OCR Error:", error);
            alert("Could not process image. Please try again.");
            setIsScanning(false);
        }
    };

    return (
        <div className="flex flex-col bg-slate-50 relative overflow-x-hidden">

            {/* Voice Search Overlay ("The Listener") */}
            {isListening && (
                <div className="fixed inset-0 z-[120] bg-slate-900/95 backdrop-blur-3xl flex flex-col items-center justify-center animate-fade-in cursor-pointer" onClick={() => setIsListening(false)}>
                    <div className="relative w-40 h-40 flex items-center justify-center mb-12">
                        {/* Sound Waves */}
                        <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-sound-wave"></div>
                        <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-sound-wave" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute inset-0 rounded-full border-2 border-primary-500/30 animate-sound-wave" style={{ animationDelay: '1s' }}></div>
                        {/* Core Orb */}
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-[0_0_50px_rgba(45,212,191,0.5)] animate-pulse flex items-center justify-center">
                            <Mic size={32} className="text-white" />
                        </div>
                    </div>
                    <h2 className="text-3xl font-black text-white tracking-tight mb-4">Listening...</h2>
                    <p className="text-2xl text-primary-300 font-medium max-w-2xl text-center px-4 min-h-[4rem]">
                        "{transcript || 'Speak now...'}"
                    </p>
                    <p className="absolute bottom-10 text-slate-500 text-sm font-bold uppercase tracking-widest">Tap anywhere to cancel</p>
                </div>
            )}

            {/* Camera Overlay ("The HUD") */}
            {isCameraOpen && (
                <div className="fixed inset-0 z-[120] bg-black flex flex-col animate-in fade-in duration-300">
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="absolute inset-0 w-full h-full object-cover"
                    />

                    {/* HUD UI Layer */}
                    <div className="absolute inset-0 z-10 pointer-events-none flex flex-col justify-between p-6 md:p-10">
                        {/* Top HUD */}
                        <div className="flex justify-between items-start">
                            <div className="bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                    <span className="text-white text-xs font-black uppercase tracking-widest">REC • LIVE</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsCameraOpen(false)}
                                className="pointer-events-auto p-4 bg-black/40 hover:bg-black/60 text-white rounded-full border border-white/10 backdrop-blur-md transition-all"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Center Reticle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/20 rounded-3xl">
                            {/* Corners */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 -mt-1 -ml-1"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 -mt-1 -mr-1"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 -mb-1 -ml-1"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 -mb-1 -mr-1"></div>

                            {/* Center Plus */}
                            <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-primary-500/50 rounded-full -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                        </div>

                        {/* Bottom Controls */}
                        <div className="flex flex-col items-center justify-center pointer-events-auto">
                            <p className="text-white/80 font-mono text-xs mb-8 bg-black/50 px-3 py-1 rounded-md">ALIGN MEDICINE WITHIN FRAME</p>
                            <button
                                onClick={handleCapturePhoto}
                                className="w-24 h-24 rounded-full border-4 border-white/30 flex items-center justify-center group active:scale-95 transition-all"
                            >
                                <div className="w-20 h-20 bg-white rounded-full border-[6px] border-transparent group-hover:border-primary-500 transition-all shadow-[0_0_30px_rgba(255,255,255,0.3)]"></div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Scanning Analysis ("The Brain") */}
            {isScanning && (
                <div className="fixed inset-0 z-[120] bg-slate-900/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

                    <div className="w-full max-w-md relative flex flex-col items-center z-10">
                        {/* Hexagon Spinner */}
                        <div className="absolute -top-32 -left-32 w-64 h-64 border border-primary-500/10 rounded-full animate-hud-spin"></div>
                        <div className="absolute -bottom-32 -right-32 w-80 h-80 border border-primary-500/10 rounded-full animate-hud-spin" style={{ animationDirection: 'reverse' }}></div>

                        <div className="relative w-80 h-80 mb-10 bg-slate-800 rounded-[2.5rem] overflow-hidden border border-slate-700 shadow-2xl">
                            {scannedImage && <img src={scannedImage} alt="Scanning" className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale" />}
                            <div className="absolute inset-0 bg-primary-900/30"></div>

                            {/* Scanning Laser Line */}
                            <div className="absolute left-0 w-full h-1 bg-primary-400 shadow-[0_0_30px_rgba(56,189,248,1)] animate-scan-line z-20"></div>

                            {/* Grid Overlay */}
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-20"></div>
                        </div>

                        <div className="text-center space-y-6 w-full max-w-sm">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight animate-pulse mb-2">Analyzing Data...</h2>
                                <p className="text-primary-400 font-mono text-xs uppercase tracking-[0.2em]">Neural Net Integration</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden border border-slate-700">
                                <div
                                    className="bg-gradient-to-r from-primary-500 to-emerald-400 h-full transition-all duration-150 ease-out shadow-[0_0_15px_rgba(20,184,166,0.6)]"
                                    style={{ width: `${scanProgress}%` }}
                                ></div>
                            </div>

                            {/* Status Log */}
                            <div className="h-8 overflow-hidden text-slate-500 font-mono text-xs">
                                <p className="animate-fade-up">{
                                    scanProgress < 30 ? "> Initializing Image Processing Modules..." :
                                        scanProgress < 60 ? "> Extracting Text Entities..." :
                                            scanProgress < 85 ? "> Querying Medical Database..." :
                                                "> Analysis Complete."
                                }</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Premium Hero Section */}
            <section className="relative pt-32 pb-40 overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-primary-200/40 rounded-full blur-[150px] animate-float opacity-60"></div>
                    <div className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-indigo-200/40 rounded-full blur-[120px] animate-float opacity-60" style={{ animationDelay: '2s' }}></div>
                    <div className="absolute top-[20%] left-[20%] w-[300px] h-[300px] bg-emerald-200/30 rounded-full blur-[80px] animate-float opacity-40" style={{ animationDelay: '4s' }}></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-full glass text-primary-700 text-xs font-black uppercase tracking-widest mb-10 shadow-lg shadow-primary-500/10 animate-fade-in">
                            <TrendingUp size={14} className="text-primary-600" />
                            <span>Next-Gen Clinical Knowledge Hub</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 animate-fade-up">
                            Medical Wisdom <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">at Your Fingertips.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mb-16 leading-relaxed font-medium animate-fade-up" style={{ animationDelay: '100ms' }}>
                            Designed for clinical excellence. Search thousands of diseases, medications, and protocols with AI-assisted clarity.
                        </p>

                        {/* Main Search Bar */}
                        <div className="w-full max-w-4xl mb-16 animate-fade-up" style={{ animationDelay: '200ms' }}>
                            <form onSubmit={handleSearch} className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-8 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                    <Search size={32} />
                                </div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={isListening ? "Listening..." : "Search conditions, drugs, or upload a pill..."}
                                    className={`block w-full pl-20 pr-72 py-8 bg-white/80 backdrop-blur-xl border border-white/60 rounded-[3rem] text-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-[12px] focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] ${isListening ? 'animate-pulse border-primary-400 ring-4 ring-primary-100' : ''}`}
                                />

                                {/* Action Buttons inside Input */}
                                <div className="absolute right-4 top-4 bottom-4 flex items-center space-x-2">
                                    <button
                                        type="button"
                                        onClick={handleVoiceSearch}
                                        className={`p-4 rounded-full transition-all ${isListening ? 'bg-primary-50 text-primary-600 animate-pulse' : 'hover:bg-slate-100 text-slate-400 hover:text-primary-600'}`}
                                        title="Voice Search"
                                    >
                                        <Mic size={24} />
                                    </button>

                                    <div className="h-8 w-px bg-slate-200 mx-2"></div>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={handleImageUpload}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-4 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-all"
                                        title="Upload Image"
                                    >
                                        <Upload size={24} />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsCameraOpen(true)}
                                        className="p-4 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-all mr-2"
                                        title="Use Camera"
                                    >
                                        <Camera size={24} />
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-10 bg-slate-900 text-white rounded-[2rem] font-black text-lg hover:bg-primary-600 transition-all active:scale-95 shadow-lg group-hover:shadow-primary-500/30 h-full py-0"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            {/* Quick Tags */}
                            <div className="mt-8 flex flex-wrap justify-center gap-3">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest pt-3 mr-2">Trending:</span>
                                {['Diabetes Type 2', 'Aspirin', 'Chest Pain Protocol', 'Amoxicillin'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => { setQuery(tag); navigate(`/search?q=${tag}`); }}
                                        className="px-6 py-2.5 glass hover:bg-white hover:text-primary-600 rounded-2xl text-sm font-black text-slate-600 transition-all border border-white/50 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Section */}
            <section className="py-32 bg-white relative z-20 rounded-t-[4rem] -mt-20 border-t border-slate-100 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.05)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="animate-fade-up" style={{ animationDelay: '300ms' }}>
                            <FeatureCard
                                icon={Zap}
                                title="Rapid Diagnostics"
                                description="Logic-driven algorithms to help you narrow down differentials in real-time."
                                color="primary"
                            />
                        </div>
                        <div className="animate-fade-up" style={{ animationDelay: '400ms' }}>
                            <FeatureCard
                                icon={BookOpen}
                                title="High-Yield Library"
                                description="Peer-reviewed clinical pearls simplified for medical rounds and exams."
                                color="indigo"
                            />
                        </div>
                        <div className="animate-fade-up" style={{ animationDelay: '500ms' }}>
                            <FeatureCard
                                icon={ShieldCheck}
                                title="Evidence-Based"
                                description="Content cross-referenced with latest NICE, AHA, and clinical guidelines."
                                color="emerald"
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Interactive Feature - "Clinical Insight" */}
            <section className="py-32 bg-slate-50 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[3.5rem] p-8 md:p-24 relative overflow-hidden flex flex-col lg:flex-row gap-20 items-center shadow-2xl shadow-slate-900/10">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

                        <div className="lg:w-1/2 relative z-10 text-white">
                            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 text-primary-300 text-xs font-black uppercase tracking-widest mb-8 border border-white/10 backdrop-blur-md">
                                <Clock size={16} />
                                <span>Efficiency Logic</span>
                            </div>
                            <h2 className="text-5xl md:text-6xl font-black tracking-tight mb-8 leading-[0.95]">
                                Save 40 Minutes <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-emerald-400">on every clinical shift.</span>
                            </h2>
                            <p className="text-slate-400 text-xl mb-12 leading-relaxed font-medium">
                                Join 15,000+ medical students who trust MEDINFO to provide accurate clinical answers when every second counts.
                            </p>

                            <div className="space-y-6 mb-12">
                                {[
                                    "Optimized for quick bedside reference",
                                    "Offline-ready architecture",
                                    "Verified by Board Certified Physicians"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-4 group">
                                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                                            <Plus size={16} strokeWidth={4} />
                                        </div>
                                        <span className="font-bold text-lg text-slate-300 group-hover:text-white transition-colors">{item}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="group flex items-center space-x-4 bg-white text-slate-900 pl-8 pr-6 py-5 rounded-[2rem] font-black text-lg hover:bg-primary-500 hover:text-white transition-all shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]">
                                <span>Start Your Clinical Trial</span>
                                <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-all">
                                    <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </button>
                        </div>

                        <div className="lg:w-1/2 relative perspective-1000">
                            <div className="relative z-10 bg-white/5 backdrop-blur-2xl border border-white/10 p-4 rounded-[3rem] shadow-2xl transform rotate-y-[-10deg] hover:rotate-y-0 transition-transform duration-700 ease-out">
                                <div className="bg-slate-800 rounded-[2.5rem] p-8 text-white border border-slate-700/50 shadow-inner">
                                    {/* Mock Interface */}
                                    <div className="flex items-center justify-between mb-10">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                <Activity size={24} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Protocol</p>
                                                <p className="font-bold text-lg">Hypertension Management</p>
                                            </div>
                                        </div>
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="p-4 bg-slate-700/50 rounded-2xl border border-slate-600/50 flex justify-between items-center">
                                            <span className="text-sm font-bold text-slate-300">BP {'>'} 140/90 mmHg</span>
                                            <span className="px-3 py-1 bg-rose-500/20 text-rose-400 text-xs font-black uppercase rounded-lg">High</span>
                                        </div>
                                        <div className="h-32 bg-primary-500/5 border border-primary-500/20 rounded-2xl flex flex-col items-center justify-center gap-2 group cursor-pointer hover:bg-primary-500/10 transition-colors">
                                            <Stethoscope size={32} className="text-primary-400 group-hover:scale-110 transition-transform" />
                                            <span className="text-primary-400 font-black tracking-widest uppercase text-xs">View Treatment Algo</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-10 -left-10 bg-gradient-to-br from-primary-500 to-primary-600 p-8 rounded-[2.5rem] shadow-2xl animate-float" style={{ animationDelay: '1s' }}>
                                <TrendingUp size={40} className="text-white mb-4" />
                                <p className="text-white/80 text-xs font-black uppercase tracking-widest mb-1">Efficiency Boost</p>
                                <p className="text-white text-3xl font-black">+42%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
