import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Building, Hammer } from 'lucide-react';

const BACKGROUND_IMAGES = [
    `${import.meta.env.BASE_URL}landing-hero-new-1.png`,
    `${import.meta.env.BASE_URL}landing-hero-new-2.png`,
    `${import.meta.env.BASE_URL}landing-hero-new-3.png`,
    `${import.meta.env.BASE_URL}landing-hero-new-4.png`,
    `${import.meta.env.BASE_URL}landing-hero-new-5.png`,
    `${import.meta.env.BASE_URL}landing-hero-new-6.png`
];

const Gateway = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Rotate images every 1 second (fast cycle)
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-blue-500/30">
            {/* Background Effects */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 0.5, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0 bg-cover bg-center pointer-events-none"
                    style={{ backgroundImage: `url(${BACKGROUND_IMAGES[currentImageIndex]})` }}
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div> {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15)_0,rgba(0,0,0,0)_70%)] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // Apple-style fluid spring
                className="z-10 text-center mb-8 px-4 relative flex flex-col items-center justify-center"
            >
                <div className="flex flex-col items-center justify-center gap-2 mb-4 group">
                    <motion.img
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        src={`${import.meta.env.BASE_URL}mano-logo.svg`}
                        alt="Mano Consultants"
                        className="h-14 md:h-16 w-auto drop-shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-transform duration-500 group-hover:scale-105"
                    />
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-200 to-gray-500 drop-shadow-2xl"
                    >
                        MANO
                    </motion.span>
                </div>

                <h1 className="text-lg md:text-xl font-bold mb-3 text-gray-200 tracking-wide">
                    Select Your Division
                </h1>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "50px" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    className="h-1 bg-gradient-to-r from-blue-500 to-emerald-500 mx-auto rounded-full mb-3"
                />
                <p className="text-gray-400 max-w-sm mx-auto text-xs md:text-sm font-light">
                    Choose the specific vertical to explore our specialized services.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl px-8 z-10 items-stretch">
                {/* MANO PCPL Option */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                    className="w-full"
                >
                    <Link to="/pcpl" className="group relative h-[400px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent hover:border-blue-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-end p-10 shadow-2xl hover:shadow-[0_0_50px_rgba(37,99,235,0.25)] ring-1 ring-white/5 hover:ring-blue-500/40">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 scale-100 group-hover:scale-110 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent/20 opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                        <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500 flex flex-col items-start">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:border-blue-500 transition-colors duration-300 shadow-xl">
                                <Building className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">MANO PCPL</h2>
                            <p className="text-gray-300 mb-5 line-clamp-2 text-sm md:text-base group-hover:text-white transition-colors leading-relaxed font-medium text-left">
                                Project Management Consultants (PMC), Cost Consultancy, and comprehensive auditing services.
                            </p>
                            <span className="inline-flex items-center text-blue-400 text-base font-bold group-hover:text-white transition-colors border-b-2 border-blue-400/30 pb-0.5 group-hover:border-white">
                                Enter Website <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>
                </motion.div>

                {/* MANO PPL Option */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="w-full"
                >
                    <Link to="/ppl" className="group relative h-[400px] rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 to-transparent hover:border-emerald-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-end p-10 shadow-2xl hover:shadow-[0_0_50px_rgba(16,185,129,0.25)] ring-1 ring-white/5 hover:ring-emerald-500/40">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-40 group-hover:opacity-60 scale-100 group-hover:scale-110 transition-all duration-700"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent/20 opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>

                        <div className="relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500 flex flex-col items-start">
                            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-colors duration-300 shadow-xl">
                                <Hammer className="w-7 h-7 text-white" />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">MANO PPL</h2>
                            <p className="text-gray-300 mb-5 line-clamp-2 text-sm md:text-base group-hover:text-white transition-colors leading-relaxed font-medium text-left">
                                Specialized Engineering, Procurement, and Construction (EPC) solutions.
                            </p>
                            <span className="inline-flex items-center text-emerald-400 text-base font-bold group-hover:text-white transition-colors border-b-2 border-emerald-400/30 pb-0.5 group-hover:border-white">
                                Enter Website <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </div>
                    </Link>
                </motion.div>
            </div>


        </div>
    );
};

export default Gateway;
