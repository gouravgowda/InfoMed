import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Settings from './pages/Settings';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const authStatus = localStorage.getItem('medinfo_authenticated') === 'true';
        setIsAuthenticated(authStatus);
    }, []);

    // Protected Route Wrapper
    const ProtectedRoute = ({ children }) => {
        if (!isAuthenticated) return <Navigate to="/login" />;
        return children;
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar isAuthenticated={isAuthenticated} />
            <main className="flex-grow pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/features" element={<Features />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    } />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}

export default App;
