import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Search,
    ArrowRight,
    ShieldCheck,
    Zap,
    BookOpen,
    Plus,
    ChevronRight,
    TrendingUp,
    Clock,
    Mic,
    Camera,
    Upload,
    X,
    Scan
} from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const Home = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    // Voice Search State
    const [isListening, setIsListening] = useState(false);

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
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsListening(true);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setIsListening(false);
                setQuery(transcript);
                navigate(`/search?q=${encodeURIComponent(transcript)}`);
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

    const startScanningProcess = () => {
        setIsScanning(true);
        setScanProgress(0);

        // Simulate scanning progress
        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        // Simulate completion and mock result
        setTimeout(() => {
            clearInterval(interval);
            setIsScanning(false);
            const mockResult = "Aspirin"; // Mock identified pill
            setQuery(mockResult);
            setScannedImage(null);
            // Navigate to search with result
            navigate(`/search?q=${encodeURIComponent(mockResult)}`);
        }, 3000);
    };

    return (
        <div className="flex flex-col bg-slate-50 relative">

            {/* Live Camera Modal */}
            {isCameraOpen && (
                <div className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="relative w-full max-w-lg aspect-[3/4] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                        />

                        {/* Camera Overlay Elements */}
                        <div className="absolute inset-0 pointer-events-none border-[20px] border-black/30 rounded-3xl"></div>
                        <div className="absolute top-8 left-0 right-0 text-center">
                            <span className="bg-black/50 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                                Align Medicine
                            </span>
                        </div>

                        {/* Controls */}
                        <button
                            onClick={() => setIsCameraOpen(false)}
                            className="absolute top-4 right-4 p-3 bg-black/50 text-white rounded-full hover:bg-black/80 transition-all backdrop-blur-md z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
                            <button
                                onClick={handleCapturePhoto}
                                className="w-20 h-20 bg-white rounded-full border-4 border-slate-300 shadow-xl active:scale-95 transition-transform flex items-center justify-center"
                            >
                                <div className="w-16 h-16 bg-white rounded-full border-2 border-slate-900"></div>
                            </button>
                        </div>
                    </div>
                    <p className="text-slate-400 mt-6 font-medium">Capture a clear photo of the packaging or pill</p>
                </div>
            )}

            {/* Visual Search Analysis Modal */}
            {isScanning && (
                <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="w-full max-w-md bg-transparent relative flex flex-col items-center">
                        {/* Scanning Animation UI */}
                        <div className="relative w-64 h-64 mb-8">
                            <div className="absolute inset-0 border-4 border-primary-500/30 rounded-[2rem] animate-pulse"></div>
                            {/* Scanning beam */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-primary-400 shadow-[0_0_15px_rgba(56,189,248,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>

                            {scannedImage ? (
                                <img src={scannedImage} alt="Scanning" className="w-full h-full object-cover rounded-[2rem] opacity-50" />
                            ) : (
                                <div className="w-full h-full bg-slate-800 rounded-[2rem] flex items-center justify-center">
                                    <Scan size={64} className="text-primary-500/50" />
                                </div>
                            )}

                            {/* Corner accents */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-2xl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-2xl"></div>
                        </div>

                        <div className="text-center space-y-4 w-full">
                            <h2 className="text-2xl font-black text-white tracking-tight">Analyzing Composition...</h2>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-primary-500 h-full transition-all duration-100 ease-out"
                                    style={{ width: `${scanProgress}%` }}
                                ></div>
                            </div>
                            <p className="text-primary-400 font-mono text-sm">
                                {scanProgress < 30 ? "Detecting boundaries..." :
                                    scanProgress < 70 ? "Identifying markings..." :
                                        "Matching database..."}
                            </p>
                        </div>
                    </div>
                </div>
            )}


            {/* Premium Hero Section */}
            <section className="relative pt-12 pb-32 overflow-hidden bg-white">
                {/* Abstract background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-50 rounded-full blur-[120px] opacity-60"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] opacity-60"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/p6.png')] opacity-[0.03]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col items-center text-center">
                        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-50 text-primary-600 text-xs font-black uppercase tracking-widest mb-8 border border-primary-100/50 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
                            <TrendingUp size={14} />
                            <span>Next-Gen Clinical Knowledge Hub</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                            Medical Wisdom <br />
                            <span className="text-primary-600">at Your Fingertips.</span>
                        </h1>

                        <p className="text-xl text-slate-500 max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                            Designed for clinical excellence. Search thousands of diseases, medications, and clinical protocols in seconds.
                        </p>

                        {/* Main Search Bar */}
                        <div className="w-full max-w-3xl mb-12 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
                            <form onSubmit={handleSearch} className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                                    <Search size={28} />
                                </div>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={isListening ? "Listening..." : "What are you looking for today?"}
                                    className={`block w-full pl-16 pr-64 py-7 bg-white border border-slate-200 rounded-[2.5rem] text-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-[12px] focus:ring-primary-500/5 focus:border-primary-500 transition-all shadow-2xl shadow-slate-200/50 ${isListening ? 'animate-pulse border-primary-400 ring-4 ring-primary-100' : ''}`}
                                />

                                {/* Action Buttons inside Input */}
                                <div className="absolute right-3 top-3 bottom-3 flex items-center space-x-2">

                                    {/* Voice Button */}
                                    <button
                                        type="button"
                                        onClick={handleVoiceSearch}
                                        className={`p-3 rounded-full transition-all ${isListening ? 'bg-rose-50 text-rose-500 animate-pulse' : 'hover:bg-slate-100 text-slate-400 hover:text-primary-600'}`}
                                        title="Voice Search"
                                    >
                                        <Mic size={24} />
                                    </button>

                                    {/* Vertical Divider */}
                                    <div className="h-8 w-px bg-slate-200 mx-1"></div>

                                    {/* Upload Button */}
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
                                        className="p-3 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-all"
                                        title="Upload Image"
                                    >
                                        <Upload size={24} />
                                    </button>

                                    {/* Camera Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsCameraOpen(true)}
                                        className="p-3 rounded-full hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-all mr-2"
                                        title="Use Camera"
                                    >
                                        <Camera size={24} />
                                    </button>


                                    <button
                                        type="submit"
                                        className="px-8 bg-slate-900 text-white rounded-[1.8rem] font-black text-lg hover:bg-primary-600 transition-all active:scale-95 shadow-lg group-hover:shadow-primary-200 h-full py-0"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            {/* Quick Tags */}
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <span className="text-sm font-bold text-slate-400 uppercase tracking-widest pt-2.5 mr-2">Try:</span>
                                {['Diabetes', 'Aspirin', 'Chest Pain', 'Antibiotics'].map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => { setQuery(tag); navigate(`/search?q=${tag}`); }}
                                        className="px-5 py-2.5 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 rounded-2xl text-sm font-bold text-slate-600 transition-all border border-transparent hover:border-primary-100 shadow-sm"
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
            <section className="py-24 border-y border-slate-100 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={Zap}
                            title="Rapid Diagnostics"
                            description="Logic-driven algorithms to help you narrow down differentials in real-time."
                            color="primary"
                        />
                        <FeatureCard
                            icon={BookOpen}
                            title="High-Yield Library"
                            description="Peer-reviewed clinical pearls simplified for medical rounds and exams."
                            color="indigo"
                        />
                        <FeatureCard
                            icon={ShieldCheck}
                            title="Evidence-Based"
                            description="Content cross-referenced with latest NICE, AHA, and clinical guidelines."
                            color="emerald"
                        />
                    </div>
                </div>
            </section>

            {/* Interactive Feature - "Clinical Insight" */}
            <section className="py-32 bg-slate-50 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden flex flex-col lg:flex-row gap-16 items-center">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-600/20 rounded-full blur-[100px] -mr-40 -mt-40"></div>

                        <div className="lg:w-1/2 relative z-10 text-white">
                            <div className="w-16 h-16 bg-primary-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary-500/20">
                                <Clock size={32} />
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8">
                                Save 40 Minutes <br />
                                <span className="text-primary-400 text-3xl md:text-4xl">on every clinical shift.</span>
                            </h2>
                            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
                                Join 15,000+ medical students who trust MEDINFO to provide accurate clinical answers when every second counts.
                            </p>
                            <div className="space-y-4">
                                {[
                                    "Optimized for quick bedside reference",
                                    "Available offline on mobile devices",
                                    "Weekly clinical updates and news"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center space-x-3">
                                        <div className="w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-400">
                                            <Plus size={14} />
                                        </div>
                                        <span className="font-bold text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-12 group flex items-center space-x-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black hover:bg-primary-500 hover:text-white transition-all shadow-xl shadow-black/20">
                                <span>Start Your Clinical Trial</span>
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>

                        <div className="lg:w-1/2 relative">
                            <div className="bg-white/10 backdrop-blur-3xl border border-white/10 p-4 rounded-[2.5rem] shadow-2xl">
                                <div className="bg-slate-800 rounded-[1.8rem] p-6 text-white border border-slate-700">
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                                                <ShieldCheck size={20} fill="currentColor" opacity={0.2} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black uppercase text-slate-500">Clinical Case</p>
                                                <p className="font-bold">Hypertension Protocol</p>
                                            </div>
                                        </div>
                                        <span className="px-3 py-1 bg-slate-700 rounded-full text-[10px] font-black uppercase">v2.4</span>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="h-4 w-3/4 bg-slate-700 rounded-full animate-pulse"></div>
                                        <div className="h-4 w-1/2 bg-slate-700 rounded-full animate-pulse opacity-50"></div>
                                        <div className="h-20 bg-primary-500/10 border border-primary-500/20 rounded-2xl flex items-center justify-center">
                                            <span className="text-primary-400 font-black tracking-widest uppercase text-xs">Diagnostic Flowchart</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4 pt-4">
                                            <div className="h-12 bg-slate-700/50 rounded-xl"></div>
                                            <div className="h-12 bg-slate-700/50 rounded-xl"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Floating card */}
                            <div className="absolute -bottom-10 -left-10 bg-primary-600 p-6 rounded-3xl shadow-2xl animate-bounce duration-[3000ms]">
                                <TrendingUp size={32} className="text-white" />
                                <p className="text-white font-black mt-2">+12% Efficient</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
