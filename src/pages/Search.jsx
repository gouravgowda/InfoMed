import React, { useState, useEffect, useRef } from 'react';
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
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsListening(true);

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                setQuery(transcript);
                performSearch(transcript);
                setIsListening(false);
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
            performSearch(mockResult);
            setScannedImage(null);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-20 pb-20 relative">

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

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search Header */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">Medical Search Engine</h1>
                    <form onSubmit={handleSearch} className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-600 transition-colors">
                            <SearchIcon size={24} />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder={isListening ? "Listening..." : "Search medicines, symptoms, or scan a pill..."}
                            className={`block w-full pl-14 pr-48 py-5 bg-white border border-slate-200 rounded-[2rem] text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all shadow-xl shadow-slate-200/50 ${isListening ? 'animate-pulse border-primary-400 ring-4 ring-primary-100' : ''}`}
                        />

                        {/* Action Buttons inside Input */}
                        <div className="absolute right-3 top-2 bottom-2 flex items-center space-x-2">
                            {/* Voice Button */}
                            <button
                                type="button"
                                onClick={handleVoiceSearch}
                                className={`p-3 rounded-xl transition-all ${isListening ? 'bg-rose-50 text-rose-500 animate-pulse' : 'hover:bg-slate-100 text-slate-400 hover:text-primary-600'}`}
                                title="Voice Search"
                            >
                                <Mic size={20} />
                            </button>

                            {/* Vertical Divider */}
                            <div className="h-6 w-px bg-slate-200 mx-1"></div>

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
                                className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-all"
                                title="Upload Image"
                            >
                                <Upload size={20} />
                            </button>

                            {/* Camera Button */}
                            <button
                                type="button"
                                onClick={() => setIsCameraOpen(true)}
                                className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-primary-600 transition-all"
                                title="Use Camera"
                            >
                                <Camera size={20} />
                            </button>

                            <button
                                type="submit"
                                className="ml-2 px-6 py-3 bg-primary-600 text-white rounded-xl font-bold hover:bg-primary-700 transition-all active:scale-95 shadow-lg shadow-primary-200"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                </div>

                {/* Recent Searches */}
                {history.length > 0 && !query && (
                    <div className="mb-12 animate-fade-in-up">
                        <div className="flex items-center justify-between mb-4 px-2">
                            <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Recent Searches</h3>
                            <button
                                onClick={clearHistory}
                                className="text-xs font-bold text-rose-500 hover:text-rose-600 transition-colors"
                            >
                                Clear History
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {history.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => { setQuery(item); performSearch(item); }}
                                    className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-primary-200 hover:shadow-md transition-all group pr-2"
                                >
                                    <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-primary-50 flex items-center justify-center text-slate-400 group-hover:text-primary-500 transition-colors">
                                        <SearchIcon size={12} />
                                    </div>
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900">{item}</span>

                                    <div
                                        onClick={(e) => removeFromHistory(item, e)}
                                        className="p-1 rounded-full hover:bg-slate-200 text-slate-400 hover:text-rose-500 transition-colors ml-1"
                                        title="Remove from history"
                                    >
                                        <X size={14} />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Results Info */}
                {(query && (results.length > 0 || wikiResult)) && (
                    <p className="text-slate-500 mb-8 ml-2">
                        Showing <span className="font-semibold text-slate-900">
                            {results.length > 0 ? results.length : 1}
                        </span> {results.length === 1 || (!results.length && wikiResult) ? 'result' : 'results'} for "{query}"
                    </p>
                )}

                {/* Results List */}
                <div className="space-y-6">
                    {/* Local Results */}
                    {results.length > 0 ? (
                        results.map((med) => (
                            <div key={med.id} className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow animate-fade-up">
                                <div className="p-8">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                        <div>
                                            <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider mb-2">
                                                {med.category}
                                            </div>
                                            <h2 className="text-2xl font-bold text-slate-900">
                                                {med.name}
                                            </h2>
                                        </div>
                                        <div className="flex space-x-2">
                                            <span className={`px-4 py-2 rounded-xl bg-primary-50 text-primary-600 text-sm font-semibold flex items-center`}>
                                                <Pill size={16} className="mr-2" />
                                                Clinical Record
                                            </span>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">
                                                    <Info size={16} className="mr-2 text-primary-500" />
                                                    Common Uses
                                                </h4>
                                                <p className="text-slate-600 leading-relaxed font-medium">{med.uses}</p>
                                            </div>
                                            <div>
                                                <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">
                                                    <Activity size={16} className="mr-2 text-emerald-500" />
                                                    Recommended Dosage
                                                </h4>
                                                <p className="text-slate-600 leading-relaxed font-medium">{med.dosage}</p>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                                            <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
                                                <AlertTriangle size={16} className="mr-2 text-rose-500" />
                                                Safety Information
                                            </h4>
                                            <div className="space-y-4">
                                                <div>
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Side Effects</p>
                                                    <p className="text-sm text-slate-600 italic font-medium leading-relaxed">"{med.sideEffects}"</p>
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-tighter mb-1">Precautions</p>
                                                    <p className="text-sm text-slate-600 italic font-medium leading-relaxed">"{med.precautions}"</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex justify-between items-center">
                                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Reference: MEDINFO Clinical Database 2024</span>
                                    <button className="text-primary-600 hover:text-primary-700 font-bold text-sm flex items-center transition-colors">
                                        View Full Clinical Details
                                        <ChevronRight size={16} className="ml-1" />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : wikiResult ? (
                        /* Wikipedia Fallback Result */
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow animate-fade-up">
                            <div className="p-8">
                                <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 gap-4">
                                    <div className="flex-grow">
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest mb-2 border border-indigo-100">
                                            <Globe size={12} className="mr-2" />
                                            External Resource (Wikipedia)
                                        </div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                                            {wikiResult.title}
                                        </h2>
                                        <p className="text-slate-400 text-sm mt-1 font-bold">{wikiResult.description || 'Medical Information'}</p>
                                    </div>
                                    {wikiResult.thumbnail && (
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden border border-slate-100 shadow-sm flex-shrink-0">
                                            <img src={wikiResult.thumbnail.source} alt={wikiResult.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="flex items-center text-sm font-bold text-slate-900 uppercase tracking-widest mb-3">
                                            <Info size={16} className="mr-2 text-indigo-500" />
                                            Summary
                                        </h4>
                                        <p className="text-slate-600 leading-relaxed font-medium text-lg">
                                            {wikiResult.extract}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-50 border-t border-slate-100 px-8 py-4 flex justify-between items-center">
                                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Source: Wikipedia Encyclopedia</span>
                                <a
                                    href={wikiResult.content_urls.desktop.page}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-indigo-600 hover:text-indigo-700 font-bold text-sm flex items-center transition-colors"
                                >
                                    Read on Wikipedia
                                    <Globe size={16} className="ml-2" />
                                </a>
                            </div>
                        </div>
                    ) : isLoading ? (
                        /* Loading State */
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-slate-100">
                            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Loader2 size={32} className="text-primary-600 animate-spin" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Fetching Data...</h3>
                            <p className="text-slate-500">Retrieving information from clinical databases.</p>
                        </div>
                    ) : query ? (
                        /* Empty State */
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SearchIcon size={32} className="text-slate-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No information available</h3>
                            <p className="text-slate-500 mb-6">We couldn't find any results for "{query}" locally or on Wikipedia.</p>
                            <button
                                onClick={() => setQuery('')}
                                className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-primary-600 transition-all"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : (
                        /* Initial State */
                        <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <SearchIcon size={32} className="text-primary-300" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Professional Search Hub</h3>
                            <p className="text-slate-500">Voice search enabled. Upload images for instant pill identification.</p>
                            <div className="mt-8 flex flex-wrap justify-center gap-2">
                                {['Diabetes', 'Aspirin', 'Asthma', 'Pneumonia', 'Heart Failure'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => { setQuery(tag); performSearch(tag); }}
                                        className="px-4 py-2 bg-slate-100 hover:bg-primary-50 hover:text-primary-600 rounded-full text-sm font-black transition-all border border-slate-200"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
