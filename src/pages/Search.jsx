import React, { useState, useEffect, useRef } from 'react';
import Tesseract from 'tesseract.js';
import { useSearchParams } from 'react-router-dom';
import {
    Search as SearchIcon,
    Info,
    AlertTriangle,
    Pill,
    Activity,
    ChevronRight,
    Globe,
    Loader2,
    Mic,
    Camera,
    X,
    Upload,
    Scan,
    CheckCircle2
} from 'lucide-react';
import { medicines } from '../data/medicines';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get('q') || '');
    const [results, setResults] = useState([]);
    const [wikiResult, setWikiResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const fetchWikipedia = async (q) => {
        setIsLoading(true);
        setWikiResult(null);
        try {
            // Use the Wikipedia REST API for page summaries
            const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(q)}`);
            if (response.ok) {
                const data = await response.json();
                if (data.type === 'standard' || data.type === 'disambiguation') {
                    setWikiResult(data);
                }
            }
        } catch (error) {
            console.error("Wikipedia fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };


    const [history, setHistory] = useState([]);

    useEffect(() => {
        const savedHistory = JSON.parse(localStorage.getItem('medinfo_search_history') || '[]');
        setHistory(savedHistory);
    }, []);

    const addToHistory = (newQuery) => {
        const updatedHistory = [newQuery, ...history.filter(h => h !== newQuery)].slice(0, 5);
        setHistory(updatedHistory);
        localStorage.setItem('medinfo_search_history', JSON.stringify(updatedHistory));
    };

    const removeFromHistory = (itemToRemove, e) => {
        e.stopPropagation();
        const updatedHistory = history.filter(item => item !== itemToRemove);
        setHistory(updatedHistory);
        localStorage.setItem('medinfo_search_history', JSON.stringify(updatedHistory));
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('medinfo_search_history');
    };

    const performSearch = (searchQuery) => {
        if (!searchQuery?.trim()) {
            setResults([]);
            setWikiResult(null);
            return;
        }

        addToHistory(searchQuery);

        const filtered = medicines.filter(m =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.uses.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filtered);

        // Fallback to Wikipedia if no local results
        if (filtered.length === 0) {
            fetchWikipedia(searchQuery);
        } else {
            setWikiResult(null);
        }
    };

    useEffect(() => {
        const q = searchParams.get('q') || '';
        setQuery(q);
        if (q) performSearch(q);
    }, [searchParams]);

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


    const handleSearch = (e) => {
        e?.preventDefault();
        performSearch(query);
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
                    performSearch(interimTranscript);
                    setIsListening(false);
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
            performSearch(bestMatch);
            setScannedImage(null);

        } catch (error) {
            console.error("OCR Error:", error);
            alert("Could not process image.");
            setIsScanning(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-20 relative">

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

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Header */}
                <div className="mb-12">
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                            <SearchIcon size={24} />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search clinical database..."
                            className={`block w-full pl-16 pr-48 py-5 bg-white border border-slate-200 rounded-[2rem] text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-xl shadow-slate-200/50 ${isListening ? 'animate-pulse border-primary-400 ring-4 ring-primary-100' : ''}`}
                        />
                        <div className="absolute right-3 top-2 bottom-2 flex items-center space-x-2">
                            <button type="button" onClick={handleVoiceSearch} className="p-3 rounded-full hover:bg-slate-100 text-slate-400"><Mic size={20} /></button>
                            <div className="h-6 w-px bg-slate-200 mx-1"></div>
                            <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
                            <button type="button" onClick={() => fileInputRef.current?.click()} className="p-3 rounded-full hover:bg-slate-100 text-slate-400"><Upload size={20} /></button>
                            <button type="button" onClick={() => setIsCameraOpen(true)} className="p-3 rounded-full hover:bg-slate-100 text-slate-400"><Camera size={20} /></button>
                            <button type="submit" className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold hover:bg-primary-600 transition-all">Search</button>
                        </div>
                    </form>
                </div>

                {/* Recent Searches (Simplified) */}
                {history.length > 0 && !query && (
                    <div className="mb-12 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">Recent</h3>
                            <button onClick={clearHistory} className="text-xs font-bold text-rose-500">Clear</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {history.map((item, index) => (
                                <button key={index} onClick={() => { setQuery(item); performSearch(item); }} className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:border-primary-200 hover:text-primary-600 transition-all flex items-center gap-2 group">
                                    {item}
                                    <div onClick={(e) => removeFromHistory(item, e)} className="hover:text-rose-500"><X size={12} /></div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results List */}
                <div className="space-y-6">
                    {results.length > 0 ? (
                        results.map((med) => (
                            <div key={med.id} className="neo-card p-8 group animate-fade-up">
                                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                    <div>
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-[10px] font-black uppercase tracking-widest mb-2 border border-primary-100">
                                            {med.category}
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1 group-hover:text-primary-600 transition-colors">
                                            {med.name}
                                        </h2>
                                    </div>
                                    <span className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wide flex items-center">
                                        <CheckCircle2 size={14} className="mr-2 text-emerald-500" />
                                        Verified
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                                <Info size={14} className="mr-2" /> Uses
                                            </h4>
                                            <p className="text-slate-700 font-medium leading-relaxed">{med.uses}</p>
                                        </div>
                                        <div>
                                            <h4 className="flex items-center text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                                <Activity size={14} className="mr-2" /> Dosage
                                            </h4>
                                            <p className="text-slate-700 font-medium leading-relaxed">{med.dosage}</p>
                                        </div>
                                    </div>
                                    <div className="bg-rose-50/50 rounded-2xl p-6 border border-rose-100">
                                        <h4 className="flex items-center text-xs font-black text-rose-500 uppercase tracking-widest mb-4">
                                            <AlertTriangle size={14} className="mr-2" /> Safety Profile
                                        </h4>
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Side Effects</p>
                                                <p className="text-sm text-slate-700 font-medium italic">"{med.sideEffects}"</p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Precautions</p>
                                                <p className="text-sm text-slate-700 font-medium italic">"{med.precautions}"</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : wikiResult ? (
                        <div className="neo-card p-8 animate-fade-up border-indigo-100">
                            <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                <div className="flex-grow">
                                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-2 border border-indigo-100">
                                        <Globe size={12} className="mr-2" />
                                        External Source
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                        {wikiResult.title}
                                    </h2>
                                    <p className="text-slate-500 text-sm mt-1 font-bold">{wikiResult.description}</p>
                                </div>
                                {wikiResult.thumbnail && (
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md">
                                        <img src={wikiResult.thumbnail.source} alt={wikiResult.title} className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <p className="text-slate-700 font-medium leading-relaxed text-lg mb-6">
                                {wikiResult.extract}
                            </p>
                            <div className="flex justify-end">
                                <a href={wikiResult.content_urls.desktop.page} target="_blank" rel="noopener noreferrer" className="btn-primary py-2 px-6 text-sm flex items-center">
                                    Read on Wikipedia <ChevronRight size={16} className="ml-2" />
                                </a>
                            </div>
                        </div>
                    ) : (
                        !query && (
                            <div className="text-center py-24 opacity-50">
                                <SearchIcon size={48} className="mx-auto text-slate-300 mb-4" />
                                <p className="text-slate-400 font-black uppercase tracking-widest">Enter a search term to begin</p>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
